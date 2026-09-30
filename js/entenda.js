/*
  entenda.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  O que faz:
  Recebe o resultado do analisador.js e monta, em cada aba de código:
    1. o código colorido, em que cada palavra pode ser clicada;
    2. a lista "Entenda este código", com a explicação de cada tag, atributo,
       seletor, propriedade, valor, comando, evento e nome criado por você,
       e as linhas em que aparece.
  Clicar numa palavra do código abre a explicação dela na lista.
  Abrir uma explicação marca no código todas as vezes que aquela palavra aparece.

  Quem usa: painel-codigos.js.
*/
"use strict";

(function () {
  const DIC = window.DICIONARIO;
  const A = window.Analisador;
  if (!DIC || !A) return;

  const NOME_LANG = { html: "HTML", css: "CSS", js: "JavaScript" };
  const DOC = { html: "doc-html.html", css: "formacao.html", js: "formacao.html" };
  const ROTULO = {};
  DIC.grupos.forEach(function (g) { ROTULO[g.lang + "|" + g.cat] = g.rotulo; });

  // Pedaços que são só sinais: vão para o fim da lista
  const SINAIS = new Set([
    "js-esp-ponto-virgula", "js-esp-chaves", "js-esp-parenteses", "js-esp-colchetes", "js-esp-ponto",
    "js-esp-texto", "js-esp-numero", "js-esp-comentario", "css-esp-comentario", "html-esp-comentario", "css-esp-regra",
  ]);

  // Onde ficam as páginas do site (as demos estão em demos/, um nível abaixo)
  const BASE = (document.currentScript && document.currentScript.src.replace(/js\/entenda\.js.*$/, "")) || "";
  let contador = 0;

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  function listaLinhas(linhas, artigo) {
    const unicas = Array.from(new Set(linhas)).sort(function (a, b) { return a - b; });
    if (artigo) return (unicas.length === 1 ? "na linha " : "nas linhas ") + unicas.join(", ");
    return (unicas.length === 1 ? "linha " : "linhas ") + unicas.join(", ");
  }

  /* ---------- Item de um termo do dicionário ---------- */
  function itemTermo(id, linhas, lang) {
    const termo = DIC.termos[id];
    const item = el("details", "termo");
    item.dataset.ref = id;
    const resumo = el("summary", "termo-resumo");
    resumo.append(
      el("code", "termo-nome", termo.nome),
      el("span", "termo-cat termo-cat-" + termo.lang, NOME_LANG[termo.lang] + " · " + (ROTULO[termo.lang + "|" + termo.cat] || "")),
      el("span", "termo-linhas", "Neste código: " + listaLinhas(linhas))
    );
    item.appendChild(resumo);
    const corpo = el("dl", "termo-corpo");
    [["O que é", termo.o], ["Quando usar", termo.quando], ["Onde", termo.onde]].forEach(function (par) {
      corpo.append(el("dt", "", par[0]), el("dd", "", par[1]));
    });
    corpo.append(el("dt", "", "Como usar"));
    const dd = el("dd");
    const pre = el("pre", "termo-exemplo");
    pre.appendChild(el("code", "", termo.como));
    dd.appendChild(pre);
    corpo.appendChild(dd);
    item.appendChild(corpo);
    const link = el("a", "termo-doc", "Ver na documentação de " + NOME_LANG[termo.lang]);
    link.href = BASE + DOC[termo.lang] + "#t-" + id;
    item.appendChild(link);
    return item;
  }

  /* ---------- Item de um nome criado por você ---------- */
  function itemNome(nome, linhas) {
    const tipo = A.TIPOS_NOME[nome.tipo] || { titulo: "Nome criado por você", o: "", como: "" };
    const item = el("details", "termo termo-usr");
    item.dataset.u = nome.chave;
    const resumo = el("summary", "termo-resumo");
    resumo.append(
      el("code", "termo-nome", nome.nome),
      el("span", "termo-cat termo-cat-usr", tipo.titulo + (nome.decl ? " (" + nome.decl + ")" : "")),
      el("span", "termo-linhas", "Neste código: " + listaLinhas(linhas))
    );
    item.appendChild(resumo);
    const corpo = el("dl", "termo-corpo");
    corpo.append(el("dt", "", "O que é"), el("dd", "", tipo.o));
    corpo.append(el("dt", "", "Onde aparece"));
    const dd = el("dd");
    const ul = el("ul", "termo-usos");
    const porLang = {};
    nome.usos.forEach(function (u) {
      const chave = u.lang;
      porLang[chave] = porLang[chave] || { cria: [], usa: [] };
      porLang[chave][u.papel === "cria" ? "cria" : "usa"].push(u.linha);
    });
    ["html", "css", "js"].forEach(function (l) {
      if (!porLang[l]) return;
      const partes = [];
      if (porLang[l].cria.length) partes.push("criado " + listaLinhas(porLang[l].cria, true));
      if (porLang[l].usa.length) partes.push("usado " + listaLinhas(porLang[l].usa, true));
      ul.appendChild(el("li", "", NOME_LANG[l] + ": " + partes.join("; ")));
    });
    const langs = Object.keys(porLang);
    if (langs.length > 1) {
      ul.appendChild(el("li", "termo-liga", "Este nome liga " + langs.map(function (l) { return NOME_LANG[l]; }).join(" e ") + ": se mudar num arquivo, mude nos outros."));
    }
    dd.appendChild(ul);
    corpo.appendChild(dd);
    corpo.append(el("dt", "", "Posso mudar?"), el("dd", "", tipo.como));
    item.appendChild(corpo);
    return item;
  }

  /* ---------- Monta uma aba ---------- */
  function montar(area, code, analise, lang) {
    const saida = analise[lang];
    if (!saida) return;
    contador++;

    // 1. Código colorido, uma <span class="linha"> por linha (o CSS numera as linhas)
    const frag = document.createDocumentFragment();
    let linha = el("span", "linha");
    frag.appendChild(linha);
    saida.tokens.forEach(function (tk) {
      const partes = tk.t.split("\n");
      partes.forEach(function (parte, i) {
        if (i > 0) {
          linha.appendChild(document.createTextNode("\n"));
          linha = el("span", "linha");
          frag.appendChild(linha);
        }
        if (!parte) return;
        if (!tk.c && !tk.ref && !tk.u && !tk.extra) { linha.appendChild(document.createTextNode(parte)); return; }
        const span = el("span", "tk " + tk.c.split(" ").filter(Boolean).map(function (c) { return "tk-" + c; }).join(" "), parte);
        if (tk.extra) span.dataset.extra = tk.extra;
        if (tk.ref) span.dataset.ref = tk.ref;
        if (tk.u) span.dataset.u = tk.u;
        if ((tk.ref && !SINAIS.has(tk.ref)) || tk.u) span.classList.add("tk-link");
        linha.appendChild(span);
      });
    });
    // a última linha vazia (depois do último Enter) não ganha número
    if (!linha.textContent) linha.remove();
    code.textContent = "";
    code.classList.add("com-linhas");
    code.appendChild(frag);

    // 2. Juntar os termos na ordem em que aparecem
    const ordem = [];
    const vistos = {};
    function anotar(chave, linha) {
      if (!vistos[chave]) { vistos[chave] = []; ordem.push(chave); }
      vistos[chave].push(linha);
    }
    saida.tokens.forEach(function (tk) {
      if (tk.u) anotar("u|" + tk.u, tk.linha);
      else if (tk.ref) anotar("r|" + tk.ref, tk.linha);
      if (tk.extra) anotar("r|" + tk.extra, tk.linha);
    });

    const blocoLinguagem = el("div", "entenda-grupo");
    const blocoNomes = el("div", "entenda-grupo");
    const blocoSinais = el("div", "entenda-grupo");
    let nLing = 0, nNomes = 0, nSinais = 0;
    ordem.forEach(function (chave) {
      const [tipo, valor] = [chave.slice(0, 1), chave.slice(2)];
      if (tipo === "u") {
        blocoNomes.appendChild(itemNome(analise.nomes[valor], vistos[chave]));
        nNomes++;
      } else if (SINAIS.has(valor)) {
        blocoSinais.appendChild(itemTermo(valor, vistos[chave], lang));
        nSinais++;
      } else {
        blocoLinguagem.appendChild(itemTermo(valor, vistos[chave], lang));
        nLing++;
      }
    });

    const entenda = el("details", "entenda");
    const resumo = el("summary", "entenda-resumo");
    resumo.append(
      el("span", "entenda-titulo", "Entenda este código"),
      el("span", "entenda-conta", (nLing + nNomes + nSinais) + " explicações")
    );
    entenda.appendChild(resumo);
    const dica = el("p", "entenda-dica", "Clique em qualquer palavra colorida do código para ver a explicação dela aqui. Ao abrir uma explicação, o código marca onde ela aparece.");
    entenda.appendChild(dica);

    function titulo(texto, n, descricao) {
      const h = el("h4", "entenda-subtitulo", texto + " (" + n + ")");
      const p = el("p", "entenda-desc", descricao);
      return [h, p];
    }
    if (nLing) entenda.append.apply(entenda, titulo("Palavras do " + NOME_LANG[lang], nLing, "Fazem parte da linguagem: escreva exatamente assim.").concat(blocoLinguagem));
    if (nNomes) entenda.append.apply(entenda, titulo("Nomes criados por você", nNomes, "Não são da linguagem: quem escreveu o código escolheu. Dá para trocar, desde que em todos os lugares.").concat(blocoNomes));
    if (nSinais) entenda.append.apply(entenda, titulo("Sinais, textos e comentários", nSinais, "A pontuação que organiza o código.").concat(blocoSinais));
    area.appendChild(entenda);

    // 3. Clicar numa palavra abre a explicação
    code.addEventListener("click", function (evento) {
      const alvo = evento.target.closest(".tk[data-ref], .tk[data-u]");
      if (!alvo) return;
      const seletor = alvo.dataset.u ? '.termo[data-u="' + CSS.escape(alvo.dataset.u) + '"]' : '.termo[data-ref="' + CSS.escape(alvo.dataset.ref) + '"]';
      const item = entenda.querySelector(seletor);
      if (!item) return;
      entenda.open = true;
      item.open = true;
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      item.classList.remove("termo-piscar");
      void item.offsetWidth;          // reinicia a animação
      item.classList.add("termo-piscar");
      item.querySelector("summary").focus({ preventScroll: true });
    });

    // 4. Abrir uma explicação marca as palavras no código
    entenda.addEventListener("toggle", function (evento) {
      const item = evento.target;
      if (!item.classList || !item.classList.contains("termo")) return;
      const ref = item.dataset.ref && CSS.escape(item.dataset.ref);
      const seletor = item.dataset.u ? '.tk[data-u="' + CSS.escape(item.dataset.u) + '"]' : '.tk[data-ref="' + ref + '"], .tk[data-extra="' + ref + '"]';
      code.querySelectorAll(seletor).forEach(function (tk) { tk.classList.toggle("tk-marcado", item.open); });
    }, true);
  }

  window.Entenda = { montar: montar };
})();
