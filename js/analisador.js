/*
  analisador.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  O que faz:
  Lê um código HTML, CSS ou JavaScript e separa cada pedaço (tag, atributo,
  seletor, propriedade, valor, palavra-chave, método, evento, sinal...).
  Para cada pedaço, procura a explicação no dicionário (js/dicionario-dados.js).
  Nomes que não são da linguagem, e sim inventados por quem escreveu o código
  (classes, ids, variáveis, funções, variáveis CSS...), são marcados como
  "criados por você", com todas as linhas em que aparecem nos três arquivos.

  Quem usa: painel-codigos.js (o "Entenda o código") e dicionario.html.

  Uso:
    const resultado = Analisador.analisar({ html: "...", css: "...", js: "..." });
    resultado.html.tokens  -> [{ t: "texto", c: "classe-de-cor", ref: "id-do-termo", u: "chave-do-nome", linha: 3 }]
    resultado.nomes        -> nomes criados por você e onde aparecem
    resultado.faltando     -> pedaços que ainda não têm explicação no dicionário
*/
"use strict";

(function () {
  const DIC = window.DICIONARIO;
  if (!DIC) {
    console.warn("dicionario-dados.js não foi carregado: o analisador não tem as explicações.");
    return;
  }

  /* ---------- Índice: "lang|cat" -> { palavra: id } ---------- */
  const INDICE = {};
  Object.keys(DIC.termos).forEach(function (id) {
    const termo = DIC.termos[id];
    const grupo = termo.lang + "|" + termo.cat;
    INDICE[grupo] = INDICE[grupo] || {};
    const casa = termo.lang === "js" ? function (x) { return x; } : function (x) { return x.toLowerCase(); };
    [termo.chave].concat(termo.alias || []).forEach(function (palavra) {
      if (!(casa(palavra) in INDICE[grupo])) INDICE[grupo][casa(palavra)] = id;
    });
  });
  function achar(lang, cat, palavra) {
    const grupo = INDICE[lang + "|" + cat];
    if (!grupo) return null;
    const chave = lang === "js" ? palavra : palavra.toLowerCase();
    return Object.prototype.hasOwnProperty.call(grupo, chave) ? grupo[chave] : null;
  }

  /* ---------- Coleção de resultados de uma análise ---------- */
  function novaAnalise() {
    return { nomes: {}, faltando: [] };
  }
  function usarNome(analise, chave, tipo, nome, lang, linha, papel) {
    if (!analise.nomes[chave]) analise.nomes[chave] = { chave: chave, tipo: tipo, nome: nome, usos: [] };
    const reg = analise.nomes[chave];
    // o tipo "mais forte" vence (ex.: a classe foi criada no HTML e usada no CSS)
    if (papel === "cria") reg.tipo = tipo;
    reg.usos.push({ lang: lang, linha: linha, papel: papel || "usa" });
    return chave;
  }
  function falta(analise, lang, oque, texto, linha) {
    analise.faltando.push({ lang: lang, oque: oque, texto: texto, linha: linha });
  }

  // Divide o código em pedaços com a linha de cada um
  function Saida(lang) {
    this.lang = lang;
    this.tokens = [];
    this.linha = 1;
  }
  Saida.prototype.add = function (t, c, ref, u, extra) {
    const token = { t: t, c: c || "", linha: this.linha };
    if (ref) token.ref = ref;
    if (u) token.u = u;
    if (extra) token.extra = extra;
    this.tokens.push(token);
    for (let i = 0; i < t.length; i++) if (t[i] === "\n") this.linha++;
    return token;
  };

  /* =====================================================================
     HTML
     ===================================================================== */
  const ATTR_ID = ["id"];
  const ATTR_REF_ID = ["for", "aria-controls", "aria-labelledby", "aria-describedby", "list"];

  function analisarHTML(codigo, analise) {
    const s = new Saida("html");
    let i = 0;
    const n = codigo.length;
    while (i < n) {
      // comentário
      if (codigo.startsWith("<!--", i)) {
        const fim = codigo.indexOf("-->", i);
        const f = fim === -1 ? n : fim + 3;
        s.add(codigo.slice(i, f), "com", "html-esp-comentario");
        i = f;
        continue;
      }
      // <!DOCTYPE html>
      if (codigo.startsWith("<!", i)) {
        const f = codigo.indexOf(">", i) + 1 || n;
        s.add(codigo.slice(i, f), "tag", "html-esp-doctype");
        i = f;
        continue;
      }
      // tag
      const m = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(codigo.slice(i, i + 40));
      if (m) {
        const nome = m[1].toLowerCase();
        const refTag = achar("html", "tag", nome);
        if (!refTag) falta(analise, "html", "tag", nome, s.linha);
        s.add(m[0].slice(0, m[0].length - m[1].length), "pun", refTag);
        s.add(m[1], "tag", refTag);
        i += m[0].length;
        // atributos
        while (i < n) {
          const resto = codigo.slice(i, i + 200);
          const esp = /^\s+/.exec(resto);
          if (esp) { s.add(esp[0]); i += esp[0].length; continue; }
          if (resto.startsWith("/>")) { s.add("/>", "pun", refTag); i += 2; break; }
          if (resto[0] === ">") { s.add(">", "pun", refTag); i += 1; break; }
          const a = /^[^\s=>\/"']+/.exec(resto);
          if (!a) { s.add(resto[0]); i += 1; continue; }
          const nomeAttr = a[0];
          const baixo = nomeAttr.toLowerCase();
          let refAttr = achar("html", "attr", baixo);
          let uAttr = null;
          if (!refAttr && baixo.startsWith("data-")) {
            refAttr = achar("html", "attr", "data-*");
            uAttr = usarNome(analise, "data:" + baixo.slice(5), "data", nomeAttr, "html", s.linha, "cria");
          }
          if (!refAttr) falta(analise, "html", "atributo", nomeAttr, s.linha);
          s.add(nomeAttr, "attr", refAttr, uAttr);
          i += nomeAttr.length;
          // = valor
          const igual = /^\s*=\s*/.exec(codigo.slice(i, i + 20));
          if (!igual) continue;
          s.add(igual[0], "pun");
          i += igual[0].length;
          let aspas = codigo[i] === '"' || codigo[i] === "'" ? codigo[i] : "";
          let valor, total;
          if (aspas) {
            const fim = codigo.indexOf(aspas, i + 1);
            valor = codigo.slice(i + 1, fim === -1 ? n : fim);
            total = valor.length + 2;
          } else {
            valor = /^[^\s>]*/.exec(codigo.slice(i))[0];
            total = valor.length;
          }
          if (aspas) s.add(aspas, "val");
          valorAtributo(s, analise, baixo, valor);
          if (aspas) s.add(aspas, "val");
          i += total;
        }
        continue;
      }
      // texto até a próxima tag
      let prox = codigo.indexOf("<", i + 1);
      if (codigo[i] === "<") prox = codigo.indexOf("<", i + 1);
      const fimTexto = prox === -1 ? n : prox;
      textoHTML(s, analise, codigo.slice(i, fimTexto));
      i = fimTexto;
    }
    return s;
  }

  function valorAtributo(s, analise, attr, valor) {
    if (attr === "class") {
      valor.split(/(\s+)/).forEach(function (parte) {
        if (!parte) return;
        if (/^\s+$/.test(parte)) { s.add(parte, "val"); return; }
        s.add(parte, "val usr", null, usarNome(analise, "classe:" + parte, "classe", parte, "html", s.linha, "cria"));
      });
      return;
    }
    if (ATTR_ID.indexOf(attr) !== -1 && valor) {
      s.add(valor, "val usr", null, usarNome(analise, "id:" + valor, "id", valor, "html", s.linha, "cria"));
      return;
    }
    if (ATTR_REF_ID.indexOf(attr) !== -1 && valor) {
      valor.split(/(\s+)/).forEach(function (parte) {
        if (!parte) return;
        if (/^\s+$/.test(parte)) { s.add(parte, "val"); return; }
        s.add(parte, "val usr", null, usarNome(analise, "id:" + parte, "id", parte, "html", s.linha, "usa"));
      });
      return;
    }
    if ((attr === "href" || attr === "src") && valor.charAt(0) === "#" && valor.length > 1) {
      s.add("#", "val");
      s.add(valor.slice(1), "val usr", null, usarNome(analise, "id:" + valor.slice(1), "id", valor.slice(1), "html", s.linha, "usa"));
      return;
    }
    s.add(valor, "val");
  }

  function textoHTML(s, analise, texto) {
    const re = /&([a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g;
    let ultimo = 0;
    let m;
    while ((m = re.exec(texto))) {
      if (m.index > ultimo) s.add(texto.slice(ultimo, m.index), "txt");
      const ref = m[1].charAt(0) === "#" ? null : achar("html", "ent", m[1]);
      if (!ref && m[1].charAt(0) !== "#") falta(analise, "html", "entidade", m[0], s.linha);
      s.add(m[0], "ent", ref);
      ultimo = m.index + m[0].length;
    }
    if (ultimo < texto.length) s.add(texto.slice(ultimo), "txt");
  }

  /* =====================================================================
     CSS
     ===================================================================== */
  function pedacosCSS(codigo) {
    const re = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[a-zA-Z-]+)|(#[a-zA-Z0-9_-]+)|(-?(?:\d+\.?\d*|\.\d+)(?:%|[a-zA-Z]+)?)|(--[a-zA-Z0-9_-]+|-?[a-zA-Z_][a-zA-Z0-9_-]*)|(\s+)|(::|[\s\S])/g;
    const lista = [];
    let m;
    while ((m = re.exec(codigo))) {
      let tipo = m[1] ? "com" : m[2] ? "str" : m[3] ? "at" : m[4] ? "hash" : m[5] ? "num" : m[6] ? "id" : m[7] ? "ws" : "pun";
      lista.push({ t: m[0], tipo: tipo });
    }
    return lista;
  }

  function analisarCSS(codigo, analise) {
    const s = new Saida("css");
    const p = pedacosCSS(codigo);
    const pilha = [];          // "bloco" (@media), "keyframes", "regra"
    let modo = "sel";          // sel | at | prop | valor
    let atAtual = "";
    let propAtual = "";
    let depoisDoNomeKeyframes = false;
    let parenSel = 0;          // dentro de :not( ), :has( )...
    let parenNth = false;
    let dentroColchete = false;
    let dentroFuncao = [];     // pilha de funções no valor
    let seletorAntes = false;  // último pedaço do seletor era um seletor simples (para detectar descendente)

    function prox(k) {         // próximo pedaço que não é espaço
      for (let j = k + 1; j < p.length; j++) if (p[j].tipo !== "ws" && p[j].tipo !== "com") return p[j];
      return null;
    }
    function naPilha() { return pilha[pilha.length - 1]; }
    function extra(ref) { return ref; }

    for (let k = 0; k < p.length; k++) {
      const x = p[k];
      const t = x.t;
      if (x.tipo === "com") { s.add(t, "com", "css-esp-comentario"); continue; }

      /* ----- fecha bloco ----- */
      if (t === "}") {
        const saiu = pilha.pop();
        s.add(t, "pun", saiu === "regra" ? "css-esp-regra" : null);
        modo = "sel";
        seletorAntes = false;
        continue;
      }

      /* ----- seletores ----- */
      if (modo === "sel") {
        if (x.tipo === "ws") {
          const seguinte = prox(k);
          // espaço entre dois seletores = combinador descendente
          if (seletorAntes && seguinte && parenSel === 0 && !dentroColchete &&
              !/^[>+~,{)]$/.test(seguinte.t) && naPilha() !== "keyframes") {
            s.add(t, "", null, null, "css-sel-sel-descendente");
          } else s.add(t);
          continue;
        }
        if (x.tipo === "at") {
          atAtual = t.toLowerCase();
          const ref = achar("css", "at", atAtual);
          if (!ref) falta(analise, "css", "regra @", t, s.linha);
          s.add(t, "at", ref);
          modo = "at";
          depoisDoNomeKeyframes = atAtual === "@keyframes";
          continue;
        }
        if (t === "{") {
          s.add(t, "pun", "css-esp-regra");
          pilha.push("regra");
          modo = "prop";
          parenSel = 0;
          continue;
        }
        if (naPilha() === "keyframes") {
          if (x.tipo === "id" && (t === "from" || t === "to")) { s.add(t, "sel", achar("css", "valor", "from")); continue; }
          s.add(t, x.tipo === "num" ? "num" : "pun");
          continue;
        }
        if (dentroColchete) {
          if (t === "]") { s.add(t, "pun", "css-sel-sel-atributo"); dentroColchete = false; seletorAntes = true; continue; }
          if (x.tipo === "id") {
            const b = t.toLowerCase();
            let ref = achar("html", "attr", b);
            let u = null;
            if (!ref && b.startsWith("data-")) { ref = achar("html", "attr", "data-*"); u = usarNome(analise, "data:" + b.slice(5), "data", t, "css", s.linha, "usa"); }
            if (!ref) falta(analise, "css", "atributo no seletor", t, s.linha);
            s.add(t, "attr", ref, u);
            continue;
          }
          s.add(t, x.tipo === "str" ? "str" : "pun");
          continue;
        }
        if (t === "[") { s.add(t, "pun", "css-sel-sel-atributo", null, seletorAntes ? "css-sel-sel-composto" : null); dentroColchete = true; continue; }
        if (t === ".") {
          const nome = p[k + 1];
          if (nome && nome.tipo === "id") {
            s.add(".", "sel", "css-sel-sel-classe", null, seletorAntes ? "css-sel-sel-composto" : null);
            s.add(nome.t, "sel usr", null, usarNome(analise, "classe:" + nome.t, "classe", nome.t, "css", s.linha, "usa"));
            k++;
            seletorAntes = true;
            continue;
          }
        }
        if (x.tipo === "hash") {
          s.add("#", "sel", "css-sel-sel-id", null, seletorAntes ? "css-sel-sel-composto" : null);
          const nome = t.slice(1);
          s.add(nome, "sel usr", null, usarNome(analise, "id:" + nome, "id", nome, "css", s.linha, "usa"));
          seletorAntes = true;
          continue;
        }
        if ((t === ":" || t === "::") && p[k + 1] && p[k + 1].tipo === "id") {
          const nome = t + p[k + 1].t.toLowerCase();
          const ref = achar("css", "pseudo", nome);
          if (!ref) falta(analise, "css", "pseudo", nome, s.linha);
          s.add(t + p[k + 1].t, "pseudo", ref);
          k++;
          if (p[k + 1] && p[k + 1].t === "(") {
            s.add("(", "pun", ref);
            k++;
            if (nome === ":nth-child" || nome === ":nth-of-type") parenNth = true;
            parenSel++;
          }
          seletorAntes = true;
          continue;
        }
        if (t === ")" && parenSel > 0) { s.add(t, "pun"); parenSel--; parenNth = false; seletorAntes = true; continue; }
        if (parenNth) { s.add(t, "num"); continue; }
        if (x.tipo === "id") {
          const b = t.toLowerCase();
          const ref = achar("html", "tag", b);
          if (!ref) falta(analise, "css", "tag no seletor", t, s.linha);
          s.add(t, "sel", ref, null, "css-sel-sel-tag");
          seletorAntes = true;
          continue;
        }
        if (t === "*") { s.add(t, "sel", "css-sel-sel-universal"); seletorAntes = true; continue; }
        if (t === ">") { s.add(t, "op", "css-sel-sel-filho"); seletorAntes = false; continue; }
        if (t === "+") { s.add(t, "op", "css-sel-sel-irmao-prox"); seletorAntes = false; continue; }
        if (t === "~") { s.add(t, "op", "css-sel-sel-irmaos"); seletorAntes = false; continue; }
        if (t === ",") { s.add(t, "op", parenSel ? null : "css-sel-sel-virgula"); seletorAntes = false; continue; }
        s.add(t, "pun");
        continue;
      }

      /* ----- regra @ (antes do { ou do ;) ----- */
      if (modo === "at") {
        if (t === "{") {
          s.add(t, "pun");
          pilha.push(atAtual === "@keyframes" ? "keyframes" : "bloco");
          modo = "sel";
          seletorAntes = false;
          continue;
        }
        if (t === ";") { s.add(t, "pun"); modo = "sel"; continue; }
        if (x.tipo === "ws") { s.add(t); continue; }
        if (depoisDoNomeKeyframes && x.tipo === "id") {
          s.add(t, "usr", null, usarNome(analise, "keyframes:" + t, "keyframes", t, "css", s.linha, "cria"));
          depoisDoNomeKeyframes = false;
          continue;
        }
        if (x.tipo === "id") {
          const b = t.toLowerCase();
          let ref = achar("css", "at", b);
          if (!ref && (b === "max-width" || b === "max-height")) ref = achar("css", "at", "max-width-mq");
          if (!ref && (b === "min-width" || b === "min-height")) ref = achar("css", "at", "min-width-mq");
          if (!ref) ref = achar("css", "valor", b);
          if (!ref && (b === "and" || b === "not" || b === "only" || b === "reduce" || b === "no-preference")) { s.add(t, "kw"); continue; }
          if (!ref) falta(analise, "css", "condição de @media", t, s.linha);
          s.add(t, "prop", ref);
          continue;
        }
        if (x.tipo === "num") { numeroCSS(s, analise, t); continue; }
        if (x.tipo === "str") { s.add(t, "str"); continue; }
        s.add(t, "pun");
        continue;
      }

      /* ----- dentro da regra: propriedade ----- */
      if (modo === "prop") {
        if (x.tipo === "ws" || t === ";") { s.add(t, t === ";" ? "pun" : ""); continue; }
        if (x.tipo === "id") {
          propAtual = t.toLowerCase();
          if (t.startsWith("--")) {
            s.add(t, "prop usr", null, usarNome(analise, "var:" + t, "var", t, "css", s.linha, "cria"), "css-esp-custom-prop");
          } else {
            const ref = achar("css", "prop", propAtual);
            if (!ref) falta(analise, "css", "propriedade", t, s.linha);
            s.add(t, "prop", ref);
          }
          continue;
        }
        if (t === ":") { s.add(t, "pun", "css-esp-regra"); modo = "valor"; dentroFuncao = []; continue; }
        // Regra aninhada ou algo inesperado: trata como seletor
        s.add(t, "pun");
        continue;
      }

      /* ----- dentro da regra: valor ----- */
      if (modo === "valor") {
        if (t === ";") { s.add(t, "pun", "css-esp-regra"); modo = "prop"; continue; }
        if (x.tipo === "ws") { s.add(t); continue; }
        if (x.tipo === "id") {
          const seguinte = p[k + 1];
          // função: nome(
          if (seguinte && seguinte.t === "(") {
            const b = t.toLowerCase();
            const ref = achar("css", "func", b);
            if (!ref) falta(analise, "css", "função", t, s.linha);
            s.add(t, "fn", ref);
            if (b === "url") {
              // url(...) guarda um caminho: lê tudo até o ")"
              let dentro = "";
              let j = k + 2;
              while (j < p.length && p[j].t !== ")") { dentro += p[j].t; j++; }
              s.add("(", "pun", ref);
              s.add(dentro, "str");
              if (j < p.length) s.add(")", "pun", ref);
              k = j;
              continue;
            }
            dentroFuncao.push(b);
            continue;
          }
          if (t.startsWith("--")) {
            s.add(t, "usr", null, usarNome(analise, "var:" + t, "var", t, "css", s.linha, "usa"));
            continue;
          }
          const b = t.toLowerCase();
          if (dentroFuncao[dentroFuncao.length - 1] === "attr") {
            // attr(href): o nome de um atributo do HTML
            const refA = achar("html", "attr", b);
            if (!refA) falta(analise, "css", "atributo em attr()", t, s.linha);
            s.add(t, "attr", refA);
            continue;
          }
          if (propAtual === "grid-area") {
            s.add(t, "usr", null, usarNome(analise, "area:" + t, "area", t, "css", s.linha, "usa"));
            continue;
          }
          if (propAtual === "animation" || propAtual === "animation-name") {
            if (!achar("css", "valor", b) && !achar("css", "valor", t)) {
              s.add(t, "usr", null, usarNome(analise, "keyframes:" + t, "keyframes", t, "css", s.linha, "usa"));
              continue;
            }
          }
          if (t === "important" && s.tokens.length && s.tokens[s.tokens.length - 1].t === "!") {
            s.tokens[s.tokens.length - 1].ref = "css-esp-important";
            s.tokens[s.tokens.length - 1].c = "kw";
            s.add(t, "kw", "css-esp-important");
            continue;
          }
          let ref = achar("css", "valor", b);
          if (!ref) ref = achar("css", "prop", b);           // transition: background-color
          if (!ref && dentroFuncao[dentroFuncao.length - 1] === "linear-gradient" && b === "to") ref = achar("css", "valor", "to");
          if (!ref && (propAtual === "font-family" || propAtual === "font")) { s.add(t, "val"); continue; }
          if (!ref) falta(analise, "css", "valor", t, s.linha);
          s.add(t, "val", ref);
          continue;
        }
        if (t === ")") { dentroFuncao.pop(); s.add(t, "pun"); continue; }
        if (t === "(") { s.add(t, "pun"); continue; }
        if (x.tipo === "num") { numeroCSS(s, analise, t); continue; }
        if (x.tipo === "hash") { s.add(t, "num", "css-unid-hex"); continue; }
        if (x.tipo === "str") {
          if (propAtual === "grid-template-areas") {
            s.add(t.charAt(0), "str");
            t.slice(1, -1).split(/(\s+)/).forEach(function (parte) {
              if (!parte) return;
              if (/^\s+$/.test(parte) || parte === ".") { s.add(parte, "str"); return; }
              s.add(parte, "str usr", null, usarNome(analise, "area:" + parte, "area", parte, "css", s.linha, "cria"));
            });
            s.add(t.charAt(t.length - 1), "str");
            continue;
          }
          s.add(t, "str");
          continue;
        }
        if (t === "!") { s.add(t, "kw"); continue; }
        s.add(t, "pun");
        continue;
      }
      s.add(t);
    }
    return s;
  }

  function numeroCSS(s, analise, t) {
    const m = /^(-?(?:\d+\.?\d*|\.\d+))(%|[a-zA-Z]+)?$/.exec(t);
    if (!m || !m[2]) { s.add(t, "num"); return; }
    const ref = achar("css", "unid", m[2].toLowerCase());
    if (!ref) falta(analise, "css", "unidade", m[2], s.linha);
    s.add(m[1], "num", ref);
    s.add(m[2], "num", ref);
  }

  /* =====================================================================
     JavaScript
     ===================================================================== */
  const PONTUACAO = ["===", "!==", "...", "**=", "=>", "**", "&&", "||", "??", "?.", "==", "!=", "<=", ">=", "++", "--", "+=", "-=", "*=", "/=", "%="];
  const PALAVRAS_JS = ["const", "let", "var", "function", "return", "if", "else", "for", "of", "in", "while", "do", "try", "catch", "finally", "new", "true", "false", "null", "undefined", "instanceof", "typeof", "switch", "case", "default", "break", "continue", "class", "this", "async", "await", "import", "export", "from", "throw"];
  const OPERADOR_REF = {
    "=": "=", "===": "===", "==": "===", "!==": "!==", "!=": "!==", "<": "<", ">": "<", "<=": "<", ">=": "<",
    "&&": "&&", "||": "||", "!": "!", "??": "??", "?.": "?.", "+": "+", "-": "-*/", "*": "-*/", "/": "-*/",
    "%": "%", "++": "++", "--": "++", "+=": "+=", "-=": "+=", "*=": "+=", "/=": "+=", "...": "...", "=>": "=>",
  };
  const SINAL_REF = { ";": "js-esp-ponto-virgula", "{": "js-esp-chaves", "}": "js-esp-chaves", "(": "js-esp-parenteses", ")": "js-esp-parenteses", "[": "js-esp-colchetes", "]": "js-esp-colchetes", ".": "js-esp-ponto" };

  function pedacosJS(codigo) {
    const lista = [];
    let i = 0;
    const n = codigo.length;
    while (i < n) {
      const c = codigo[i];
      const resto = codigo.slice(i, i + 4);
      if (/\s/.test(c)) {
        const m = /^\s+/.exec(codigo.slice(i));
        lista.push({ t: m[0], tipo: "ws" }); i += m[0].length; continue;
      }
      if (resto.startsWith("//")) {
        let f = codigo.indexOf("\n", i); if (f === -1) f = n;
        lista.push({ t: codigo.slice(i, f), tipo: "com" }); i = f; continue;
      }
      if (resto.startsWith("/*")) {
        let f = codigo.indexOf("*/", i + 2); f = f === -1 ? n : f + 2;
        lista.push({ t: codigo.slice(i, f), tipo: "com" }); i = f; continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        let j = i + 1;
        while (j < n && codigo[j] !== c) { if (codigo[j] === "\\") j++; j++; }
        lista.push({ t: codigo.slice(i, j + 1), tipo: "str" }); i = j + 1; continue;
      }
      const num = /^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/.exec(codigo.slice(i, i + 30));
      if (num && !(c === "." && lista.length && lista[lista.length - 1].tipo === "id")) {
        lista.push({ t: num[0], tipo: "num" }); i += num[0].length; continue;
      }
      const ident = /^[A-Za-z_$][\w$]*/.exec(codigo.slice(i, i + 80));
      if (ident) { lista.push({ t: ident[0], tipo: "id" }); i += ident[0].length; continue; }
      let achou = null;
      for (const pontuacao of PONTUACAO) if (codigo.startsWith(pontuacao, i)) { achou = pontuacao; break; }
      if (achou === "?." && /\d/.test(codigo[i + 2] || "")) achou = null;
      achou = achou || c;
      lista.push({ t: achou, tipo: "pun" }); i += achou.length;
    }
    return lista;
  }

  function camelParaHifen(nome) {
    return nome.replace(/[A-Z]/g, function (l) { return "-" + l.toLowerCase(); });
  }

  function analisarJS(codigo, analise) {
    const s = new Saida("js");
    const p = pedacosJS(codigo);
    const sig = [];                 // índices dos pedaços significativos (sem espaço e comentário)
    p.forEach(function (x, k) { if (x.tipo !== "ws" && x.tipo !== "com") sig.push(k); });
    const posSig = {};
    sig.forEach(function (k, j) { posSig[k] = j; });
    function S(j) { return j >= 0 && j < sig.length ? p[sig[j]] : null; }

    /* 1ª passada: nomes criados (const, let, function, parâmetros, chaves de objetos) */
    const declarados = {};          // nome -> tipo
    const lugarDeCriar = {};        // posições onde um nome é criado
    function declara(k, tipo, forca) {
      const nome = S(k).t;
      if (forca || !declarados[nome]) declarados[nome] = tipo;
      lugarDeCriar[k] = true;
    }
    const chavesObjeto = {};
    for (let j = 0; j < sig.length; j++) {
      const x = S(j);
      if (x.tipo !== "id" && x.t !== "(") continue;
      if (x.t === "const" || x.t === "let" || x.t === "var") {
        let k = j + 1;
        if (S(k) && (S(k).t === "{" || S(k).t === "[")) {   // desestruturação
          const fecha = S(k).t === "{" ? "}" : "]";
          k++;
          while (S(k) && S(k).t !== fecha) { if (S(k).tipo === "id") declara(k, x.t, true); k++; }
        } else if (S(k) && S(k).tipo === "id") declara(k, x.t, true);
      }
      if (x.t === "function") {
        let k = j + 1;
        if (S(k) && S(k).tipo === "id") { declara(k, "function", true); k++; }
        if (S(k) && S(k).t === "(") {
          k++;
          while (S(k) && S(k).t !== ")") { if (S(k).tipo === "id") declara(k, "param"); k++; }
        }
      }
      if (x.t === "catch" && S(j + 1) && S(j + 1).t === "(" && S(j + 2) && S(j + 2).tipo === "id") declara(j + 2, "param");
      // arrow: nome => ou (a, b) =>
      if (x.tipo === "id" && S(j + 1) && S(j + 1).t === "=>") declara(j, "param");
      if (x.t === "(") {
        let k = j + 1; const nomes = [];
        while (S(k) && (S(k).tipo === "id" || S(k).t === ",")) { if (S(k).tipo === "id") nomes.push(k); k++; }
        if (S(k) && S(k).t === ")" && S(k + 1) && S(k + 1).t === "=>") nomes.forEach(function (pos) { declara(pos, "param"); });
      }
      // chave de objeto: { chave: ...  ou , chave: ...
      if (x.tipo === "id" && S(j + 1) && S(j + 1).t === ":" && S(j - 1) && (S(j - 1).t === "{" || S(j - 1).t === ",")) chavesObjeto[x.t] = true;
      // atalho { texto, feita: false }
      if (x.tipo === "id" && S(j - 1) && S(j - 1).t === "{" && S(j + 1) && (S(j + 1).t === "," || S(j + 1).t === "}") && S(j - 2) && /^[=(,:\[]$|^return$/.test(S(j - 2).t)) chavesObjeto[x.t] = true;
    }

    /* 2ª passada: classificar cada pedaço */
    let ternarios = 0;
    const OPC = INDICE["js|opcao"] || {};
    for (let k = 0; k < p.length; k++) {
      const x = p[k];
      const t = x.t;
      if (x.tipo === "ws") { s.add(t); continue; }
      if (x.tipo === "com") { s.add(t, "com", "js-esp-comentario"); continue; }
      const j = posSig[k];
      const antes = S(j - 1);
      const depois = S(j + 1);

      if (x.tipo === "num") { s.add(t, "num", "js-esp-numero"); continue; }

      if (x.tipo === "str") {
        stringJS(s, analise, t, S(j - 2), antes, S(j - 4));
        continue;
      }

      if (x.tipo === "id") {
        // depois de um ponto: método ou propriedade
        if (antes && (antes.t === "." || antes.t === "?.")) {
          const dono = S(j - 2);
          if (dono && dono.t === "dataset") {
            s.add(t, "prop usr", null, usarNome(analise, "data:" + camelParaHifen(t), "data", "data-" + camelParaHifen(t), "js", s.linha, "usa"));
            continue;
          }
          if (dono && dono.t === "style") {
            // elemento.style.propriedade: propriedade do CSS escrita em camelCase
            s.add(t, "prop", achar("js", "membro", "backgroundColor"));
            continue;
          }
          let ref = achar("js", "membro", t);
          if (t === "catch") ref = achar("js", "membro", "then");
          if (!ref && chavesObjeto[t]) {
            s.add(t, "prop usr", null, usarNome(analise, "chave:" + t, "chave", t, "js", s.linha, "usa"));
            continue;
          }
          if (!ref) ref = achar("js", "global", t);
          // propriedade desconhecida de um objeto seu (ex.: dados que vieram de uma API)
          if (!ref && dono && dono.tipo === "id" && Object.prototype.hasOwnProperty.call(declarados, dono.t)) {
            s.add(t, "prop usr", null, usarNome(analise, "chave:" + t, "chave", t, "js", s.linha, "usa"));
            continue;
          }
          if (!ref) falta(analise, "js", "método/propriedade", t, s.linha);
          s.add(t, depois && depois.t === "(" ? "fn" : "prop", ref);
          continue;
        }
        // chave de objeto (antes dos dois-pontos)
        if (depois && depois.t === ":" && antes && (antes.t === "{" || antes.t === ",") && ternarios === 0) {
          if (Object.prototype.hasOwnProperty.call(OPC, t)) { s.add(t, "prop", OPC[t]); continue; }
          s.add(t, "prop usr", null, usarNome(analise, "chave:" + t, "chave", t, "js", s.linha, "cria"));
          continue;
        }
        if (PALAVRAS_JS.indexOf(t) !== -1) {
          let ref = achar("js", "palavra", t);
          if (t === "function" && depois && depois.t === "(") {
            s.add(t, "kw", ref, null, "js-esp-funcao-anonima");
            continue;
          }
          if (t === "finally") ref = achar("js", "palavra", "try");
          if (!ref) falta(analise, "js", "palavra-chave", t, s.linha);
          s.add(t, "kw", ref);
          continue;
        }
        if (Object.prototype.hasOwnProperty.call(declarados, t)) {
          const tipo = declarados[t];
          const papel = lugarDeCriar[j] ? "cria" : "usa";
          const tipoNome = tipo === "function" ? "funcao" : tipo === "param" ? "param" : "jsvar";
          const extra = tipo === "param" && /^(e|ev|evt|evento|event)$/.test(t) ? "js-esp-evento-objeto" : (tipo === "param" ? "js-esp-parametro" : null);
          const u = usarNome(analise, "js:" + t, tipoNome, t, "js", s.linha, papel);
          if (analise.nomes[u].decl === undefined && tipo !== "param" && tipo !== "function") analise.nomes[u].decl = tipo;
          s.add(t, depois && depois.t === "(" ? "fn usr" : "usr", null, u, extra);
          continue;
        }
        let ref = achar("js", "global", t);
        if (ref) { s.add(t, "glob", ref); continue; }
        // atalho { texto, feita }
        if (chavesObjeto[t]) { s.add(t, "prop usr", null, usarNome(analise, "chave:" + t, "chave", t, "js", s.linha, "usa")); continue; }
        falta(analise, "js", "nome", t, s.linha);
        s.add(t, "");
        continue;
      }

      // pontuação e operadores
      if (t === "?") { ternarios++; s.add(t, "op", "js-op-ternario"); continue; }
      if (t === ":" ) {
        if (ternarios > 0) { ternarios--; s.add(t, "op", "js-op-ternario"); continue; }
        s.add(t, "pun");
        continue;
      }
      if (OPERADOR_REF[t]) {
        const ref = achar("js", "op", OPERADOR_REF[t]);
        s.add(t, "op", ref);
        continue;
      }
      if (SINAL_REF[t]) { s.add(t, "pun", SINAL_REF[t]); continue; }
      s.add(t, "pun");
    }
    return s;
  }

  // Strings: o sentido depende de onde estão (nome de evento, seletor, classe, id, chave...)
  function stringJS(s, analise, t, funcao, abre, dono) {
    const dentro = t.slice(1, -1);
    const aspas = t.charAt(0);
    const nomeFuncao = abre && abre.t === "(" && funcao ? funcao.t : null;
    const ref = "js-esp-texto";

    function comAspas(fn) { s.add(aspas, "str", ref); fn(); s.add(aspas, "str", ref); }

    if (nomeFuncao === "addEventListener" || nomeFuncao === "removeEventListener") {
      const refEv = achar("js", "evento", dentro);
      if (!refEv) falta(analise, "js", "evento", dentro, s.linha);
      comAspas(function () { s.add(dentro, "str ev", refEv); });
      return;
    }
    if (nomeFuncao === "querySelector" || nomeFuncao === "querySelectorAll" || nomeFuncao === "closest" || nomeFuncao === "matches") {
      comAspas(function () { seletorEmTexto(s, analise, dentro); });
      return;
    }
    if (nomeFuncao === "getElementById") {
      comAspas(function () { s.add(dentro, "str usr", null, usarNome(analise, "id:" + dentro, "id", dentro, "js", s.linha, "usa")); });
      return;
    }
    if (dono && dono.t === "classList" && /^(add|remove|toggle|contains|replace)$/.test(nomeFuncao || "")) {
      comAspas(function () { s.add(dentro, "str usr", null, usarNome(analise, "classe:" + dentro, "classe", dentro, "js", s.linha, "usa")); });
      return;
    }
    if (/^(setAttribute|getAttribute|removeAttribute|hasAttribute|toggleAttribute)$/.test(nomeFuncao || "")) {
      const b = dentro.toLowerCase();
      let refA = achar("html", "attr", b);
      let u = null;
      if (!refA && b.startsWith("data-")) { refA = achar("html", "attr", "data-*"); u = usarNome(analise, "data:" + b.slice(5), "data", dentro, "js", s.linha, "usa"); }
      if (!refA) falta(analise, "js", "atributo", dentro, s.linha);
      comAspas(function () { s.add(dentro, "str attr", refA, u); });
      return;
    }
    if (nomeFuncao === "createElement") {
      const refT = achar("html", "tag", dentro.toLowerCase());
      if (!refT) falta(analise, "js", "tag", dentro, s.linha);
      comAspas(function () { s.add(dentro, "str tag", refT); });
      return;
    }
    if (/^(getItem|setItem|removeItem)$/.test(nomeFuncao || "") && dono && dono.t === "localStorage") {
      comAspas(function () { s.add(dentro, "str usr", null, usarNome(analise, "storage:" + dentro, "storage", dentro, "js", s.linha, "usa")); });
      return;
    }
    s.add(t, "str", ref);
  }

  function seletorEmTexto(s, analise, texto) {
    const re = /([.#])([a-zA-Z_][\w-]*)|\[([a-zA-Z-]+)|(::?)([a-zA-Z-]+)|([a-zA-Z][a-zA-Z0-9]*)/g;
    let ultimo = 0;
    let m;
    while ((m = re.exec(texto))) {
      if (m.index > ultimo) s.add(texto.slice(ultimo, m.index), "str");
      if (m[1]) {
        const tipo = m[1] === "." ? "classe" : "id";
        s.add(m[1], "str", m[1] === "." ? "css-sel-sel-classe" : "css-sel-sel-id");
        s.add(m[2], "str usr", null, usarNome(analise, tipo + ":" + m[2], tipo, m[2], "js", s.linha, "usa"));
      } else if (m[3]) {
        const b = m[3].toLowerCase();
        let refA = achar("html", "attr", b);
        let u = null;
        if (!refA && b.startsWith("data-")) { refA = achar("html", "attr", "data-*"); u = usarNome(analise, "data:" + b.slice(5), "data", m[3], "js", s.linha, "usa"); }
        s.add("[", "str", "css-sel-sel-atributo");
        s.add(m[3], "str attr", refA, u);
      } else if (m[4]) {
        const nome = m[4] + m[5].toLowerCase();
        const refP = achar("css", "pseudo", nome);
        if (!refP) falta(analise, "js", "pseudo", nome, s.linha);
        s.add(m[4] + m[5], "str", refP);
      } else if (m[6]) {
        const refT = achar("html", "tag", m[6].toLowerCase());
        if (refT) s.add(m[6], "str tag", refT, null, "css-sel-sel-tag");
        else s.add(m[6], "str");
      }
      ultimo = m.index + m[0].length;
    }
    if (ultimo < texto.length) s.add(texto.slice(ultimo), "str");
  }

  /* =====================================================================
     Juntar tudo
     ===================================================================== */
  function analisar(trecho) {
    const analise = novaAnalise();
    const saida = { nomes: analise.nomes, faltando: analise.faltando };
    // A ordem importa pouco: os nomes são ligados pelos três arquivos
    if (trecho.html) saida.html = analisarHTML(trecho.html, analise);
    if (trecho.css) saida.css = analisarCSS(trecho.css, analise);
    if (trecho.js) saida.js = analisarJS(trecho.js, analise);
    return saida;
  }

  /* Textos que explicam cada tipo de nome criado por você */
  const TIPOS_NOME = {
    classe: { titulo: "Classe criada por você", o: "Um nome de classe. Não é uma palavra do HTML nem do CSS: quem escreveu o código escolheu. No HTML aparece em class=\"...\"; no CSS, com um ponto na frente (.nome); no JavaScript, em classList ou querySelector(\".nome\").", como: "Pode trocar por outro nome, desde que troque em TODOS os lugares listados. Use minúsculas, sem espaço e sem acento (separe palavras com hífen)." },
    id: { titulo: "id criado por você", o: "O nome único de um elemento. Quem escreveu o código escolheu. No HTML aparece em id=\"...\"; no CSS, com # na frente; no JavaScript, em getElementById(\"nome\") ou querySelector(\"#nome\"); em links, href=\"#nome\"; em for e aria-controls, sem o #.", como: "Pode trocar, mas em todos os lugares listados. Não pode haver dois elementos com o mesmo id na página." },
    var: { titulo: "Variável CSS criada por você", o: "Uma variável do CSS: o nome começa com -- e foi inventado por quem escreveu. É criada com --nome: valor; e usada com var(--nome).", como: "Troque o valor onde ela é criada e todos os lugares que usam var() mudam juntos." },
    keyframes: { titulo: "Nome de animação criado por você", o: "O nome de uma animação @keyframes. É criado depois de @keyframes e usado na propriedade animation.", como: "Os dois nomes (no @keyframes e no animation) precisam ser iguais." },
    area: { titulo: "Nome de área do grid criado por você", o: "Um nome de área do grid. É desenhado em grid-template-areas e usado em grid-area.", como: "O nome no grid-area tem que ser igual ao do desenho." },
    jsvar: { titulo: "Constante/variável criada por você", o: "Um nome que guarda um valor no JavaScript. Foi criado com const ou let por quem escreveu o código.", como: "Pode trocar por outro nome, desde que troque em todas as linhas listadas. Use camelCase (minhaVariavel), sem acento." },
    funcao: { titulo: "Função criada por você", o: "Uma função com nome escolhido por quem escreveu o código. É criada com function nome() { } e roda quando é chamada: nome() ou pelo addEventListener.", como: "Troque o nome em todas as linhas listadas. Um bom nome diz o que a função faz (abrirMenu, calcularImc)." },
    param: { titulo: "Parâmetro criado por você", o: "Um nome entre os parênteses de uma função. Ele recebe um valor quando a função é chamada. Só existe dentro daquela função.", como: "Pode trocar o nome, dentro da função toda." },
    data: { titulo: "Atributo data-* criado por você", o: "Um atributo de dados inventado por quem escreveu o código (data-algumacoisa). No JavaScript é lido com elemento.dataset.algumaCoisa (o hífen vira letra maiúscula).", como: "O nome depois de data- é livre, em minúsculas com hífen." },
    storage: { titulo: "Chave do localStorage criada por você", o: "O nome com que o valor fica guardado no navegador. Quem escreveu escolheu.", como: "Use o mesmo nome no setItem (guardar) e no getItem (ler)." },
    chave: { titulo: "Propriedade de objeto criada por você", o: "Um nome de propriedade de um objeto { nome: valor } que quem escreveu o código inventou.", como: "Use o mesmo nome ao criar o objeto e ao ler (objeto.nome)." },
  };

  window.Analisador = { analisar: analisar, TIPOS_NOME: TIPOS_NOME, achar: achar };
})();
