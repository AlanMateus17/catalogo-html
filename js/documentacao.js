/*
  documentacao.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  Usado pelas páginas de Documentação (doc-html.html, formacao.html, formacao.html,
  dicionario.html). Faz quatro coisas:
    1. Colore os exemplos de código (<pre class="doc-codigo" data-lang="css">)
       e explica qualquer palavra clicada, numa caixa logo abaixo do exemplo.
    2. Monta a "Referência completa" a partir do dicionário:
       <div data-referencia="html"></div>  (ou "css", "js", "todas")
    3. Liga os "brinquedos": caixas interativas para experimentar
       (<div data-brinquedo="flex">, "caixa", "grid", "especificidade",
       "seletores", "posicao", "console", "arvore").
    4. Na página dicionario.html, lista os termos dos códigos que ainda
       não têm explicação (<div id="termos-faltando">).
*/
"use strict";

(function () {
  const DIC = window.DICIONARIO;
  const A = window.Analisador;
  const NOME_LANG = { html: "HTML", css: "CSS", js: "JavaScript" };
  const PAGINA = { html: "doc-html.html", css: "formacao.html", js: "formacao.html" };

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }
  function rotuloGrupo(lang, cat) {
    const g = DIC.grupos.find(function (x) { return x.lang === lang && x.cat === cat; });
    return g ? g.rotulo : "";
  }
  // Link para a explicação completa: na mesma página, se ela tiver a referência daquela linguagem
  function linkTermo(id) {
    const termo = DIC.termos[id];
    const aqui = document.querySelector('[data-referencia="' + termo.lang + '"], [data-referencia="todas"]');
    return (aqui ? "" : PAGINA[termo.lang]) + "#t-" + id;
  }

  /* =====================================================================
     1. Exemplos coloridos e clicáveis
     ===================================================================== */
  const SINAIS = new Set(["js-esp-ponto-virgula", "js-esp-chaves", "js-esp-parenteses", "js-esp-colchetes", "js-esp-ponto", "css-esp-regra"]);

  function colorir(pre) {
    const lang = pre.dataset.lang;
    const code = pre.querySelector("code") || pre;
    const texto = code.textContent;
    const trecho = {};
    trecho[lang] = texto;
    const analise = A.analisar(trecho);
    const saida = analise[lang];
    const frag = document.createDocumentFragment();
    saida.tokens.forEach(function (tk) {
      if (!tk.c && !tk.ref && !tk.u) { frag.appendChild(document.createTextNode(tk.t)); return; }
      const span = el("span", "tk " + tk.c.split(" ").filter(Boolean).map(function (c) { return "tk-" + c; }).join(" "), tk.t);
      if (tk.ref) span.dataset.ref = tk.ref;
      if (tk.u) { span.dataset.u = tk.u; span.dataset.tipo = analise.nomes[tk.u].tipo; }
      if ((tk.ref && !SINAIS.has(tk.ref)) || tk.u) span.classList.add("tk-link");
      frag.appendChild(span);
    });
    code.textContent = "";
    code.appendChild(frag);

    const caixa = el("div", "doc-explica");
    caixa.hidden = true;
    caixa.setAttribute("aria-live", "polite");
    pre.after(caixa);

    pre.addEventListener("click", function (evento) {
      const tk = evento.target.closest(".tk-link");
      if (!tk) return;
      pre.querySelectorAll(".tk-marcado").forEach(function (x) { x.classList.remove("tk-marcado"); });
      tk.classList.add("tk-marcado");
      caixa.textContent = "";
      if (tk.dataset.u) {
        const tipo = A.TIPOS_NOME[tk.dataset.tipo] || { titulo: "Nome criado por você", o: "" };
        caixa.append(el("p", "doc-explica-nome", tk.textContent + " — " + tipo.titulo), el("p", "", tipo.o));
      } else {
        const termo = DIC.termos[tk.dataset.ref];
        const nome = el("p", "doc-explica-nome", termo.nome + " — " + NOME_LANG[termo.lang] + " · " + rotuloGrupo(termo.lang, termo.cat));
        const link = el("a", "", "Explicação completa, com exemplo");
        link.href = linkTermo(tk.dataset.ref);
        caixa.append(nome, el("p", "", termo.o), el("p", "", "Quando usar: " + termo.quando), link);
      }
      caixa.hidden = false;
    });
  }

  /* =====================================================================
     2. Referência completa
     ===================================================================== */
  function montarReferencia(lugar) {
    const qual = lugar.dataset.referencia;
    const langs = qual === "todas" ? ["html", "css", "js"] : [qual];
    const busca = el("input", "ref-busca");
    busca.type = "search";
    busca.id = "busca-" + qual;
    busca.placeholder = "Ex.: flex, querySelector, alt, :hover";
    busca.setAttribute("autocomplete", "off");
    const rotulo = el("label", "ref-rotulo", "Procurar na referência");
    rotulo.htmlFor = busca.id;
    const contagem = el("p", "ref-contagem");
    contagem.setAttribute("aria-live", "polite");
    lugar.append(rotulo, busca, contagem);

    const artigos = [];
    langs.forEach(function (lang) {
      if (langs.length > 1) lugar.appendChild(el("h3", "ref-lang", NOME_LANG[lang]));
      DIC.grupos.filter(function (g) { return g.lang === lang; }).forEach(function (g) {
        const grupo = el("section", "ref-grupo");
        grupo.appendChild(el(langs.length > 1 ? "h4" : "h3", "ref-grupo-titulo", g.rotulo + " (" + g.ids.length + ")"));
        const lista = el("div", "ref-lista");
        g.ids.forEach(function (id) {
          const t = DIC.termos[id];
          const art = el("details", "ref-termo");
          art.id = "t-" + id;
          art.dataset.busca = (t.nome + " " + t.chave + " " + (t.alias || []).join(" ") + " " + t.o).toLowerCase();
          const sum = el("summary");
          sum.append(el("code", "termo-nome", t.nome), el("span", "ref-curto", t.o.split(". ")[0].replace(/\.$/, "") + "."));
          art.appendChild(sum);
          const dl = el("dl", "termo-corpo");
          [["O que é", t.o], ["Quando usar", t.quando], ["Onde", t.onde]].forEach(function (par) {
            dl.append(el("dt", "", par[0]), el("dd", "", par[1]));
          });
          if (t.alias && t.alias.length) dl.append(el("dt", "", "Também vale para"), el("dd", "", t.alias.join(", ")));
          dl.append(el("dt", "", "Como usar"));
          const dd = el("dd");
          const pre = el("pre", "termo-exemplo");
          pre.appendChild(el("code", "", t.como));
          dd.appendChild(pre);
          dl.appendChild(dd);
          art.appendChild(dl);
          lista.appendChild(art);
          artigos.push(art);
        });
        grupo.appendChild(lista);
        lugar.appendChild(grupo);
      });
    });

    function filtrar() {
      const termo = busca.value.toLowerCase().trim();
      let n = 0;
      artigos.forEach(function (a) {
        const ok = !termo || a.dataset.busca.includes(termo);
        a.hidden = !ok;
        if (ok) n++;
        if (termo && ok && n <= 3) a.open = true;
      });
      lugar.querySelectorAll(".ref-grupo").forEach(function (g) {
        g.hidden = !g.querySelector(".ref-termo:not([hidden])");
      });
      contagem.textContent = n === 0 ? "Nada encontrado. Tente outra palavra." : n + (n === 1 ? " termo" : " termos");
    }
    busca.addEventListener("input", filtrar);
    filtrar();
  }

  // Abrir o termo do endereço (#t-...)
  function abrirDoEndereco() {
    if (!location.hash.startsWith("#t-")) return;
    const alvo = document.getElementById(location.hash.slice(1));
    if (!alvo) return;
    alvo.hidden = false;
    alvo.open = true;
    alvo.closest(".ref-grupo") && (alvo.closest(".ref-grupo").hidden = false);
    alvo.scrollIntoView({ block: "start" });
    alvo.classList.add("termo-piscar");
  }

  /* =====================================================================
     3. Brinquedos
     ===================================================================== */
  function controle(rotulo, input) {
    const l = el("label", "brinq-controle");
    l.append(el("span", "", rotulo), input);
    return l;
  }
  function select(opcoes, inicial) {
    const s = el("select");
    opcoes.forEach(function (o) { const op = el("option", "", o); op.value = o; s.appendChild(op); });
    s.value = inicial || opcoes[0];
    return s;
  }
  function range(min, max, valor, passo) {
    const r = el("input");
    r.type = "range"; r.min = min; r.max = max; r.value = valor; r.step = passo || 1;
    return r;
  }
  function codigoVivo() {
    const pre = el("pre", "brinq-codigo");
    const code = el("code");
    pre.appendChild(code);
    return { pre: pre, mostrar: function (t) { code.textContent = t; } };
  }

  const BRINQUEDOS = {};

  /* ----- Flexbox ----- */
  BRINQUEDOS.flex = function (raiz) {
    const dir = select(["row", "column", "row-reverse", "column-reverse"]);
    const just = select(["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"]);
    const alin = select(["stretch", "flex-start", "center", "flex-end", "baseline"]);
    const wrap = select(["nowrap", "wrap"]);
    const gap = range(0, 40, 8);
    const controles = el("div", "brinq-controles");
    controles.append(controle("flex-direction", dir), controle("justify-content", just), controle("align-items", alin), controle("flex-wrap", wrap), controle("gap", gap));
    const palco = el("div", "brinq-palco brinq-flex");
    ["1", "2", "3", "4", "5"].forEach(function (n, i) {
      const item = el("div", "brinq-item", n);
      item.style.padding = ["10px", "22px 10px", "10px 30px", "16px", "8px 14px"][i];
      palco.appendChild(item);
    });
    const vivo = codigoVivo();
    function atualizar() {
      palco.style.flexDirection = dir.value;
      palco.style.justifyContent = just.value;
      palco.style.alignItems = alin.value;
      palco.style.flexWrap = wrap.value;
      palco.style.gap = gap.value + "px";
      vivo.mostrar(".caixa {\n  display: flex;\n  flex-direction: " + dir.value + ";\n  justify-content: " + just.value + ";\n  align-items: " + alin.value + ";\n  flex-wrap: " + wrap.value + ";\n  gap: " + gap.value + "px;\n}");
    }
    raiz.append(controles, palco, vivo.pre);
    raiz.addEventListener("input", atualizar);
    atualizar();
  };

  /* ----- Grid ----- */
  BRINQUEDOS.grid = function (raiz) {
    const colunas = select(["1fr 1fr 1fr", "200px 1fr", "1fr 2fr", "repeat(4, 1fr)", "repeat(auto-fit, minmax(120px, 1fr))"]);
    const gap = range(0, 40, 10);
    const largura = range(40, 100, 100);
    const controles = el("div", "brinq-controles");
    controles.append(controle("grid-template-columns", colunas), controle("gap", gap), controle("largura da caixa (%)", largura));
    const palco = el("div", "brinq-palco brinq-grid");
    for (let i = 1; i <= 7; i++) palco.appendChild(el("div", "brinq-item", String(i)));
    const vivo = codigoVivo();
    function atualizar() {
      palco.style.gridTemplateColumns = colunas.value;
      palco.style.gap = gap.value + "px";
      palco.style.width = largura.value + "%";
      vivo.mostrar(".grade {\n  display: grid;\n  grid-template-columns: " + colunas.value + ";\n  gap: " + gap.value + "px;\n}");
    }
    raiz.append(controles, palco, vivo.pre);
    raiz.addEventListener("input", atualizar);
    atualizar();
  };

  /* ----- Modelo de caixa ----- */
  BRINQUEDOS.caixa = function (raiz) {
    const largura = range(80, 260, 160);
    const padding = range(0, 40, 16);
    const borda = range(0, 20, 4);
    const margem = range(0, 40, 20);
    const sizing = select(["content-box", "border-box"]);
    const controles = el("div", "brinq-controles");
    controles.append(controle("width", largura), controle("padding", padding), controle("border", borda), controle("margin", margem), controle("box-sizing", sizing));
    const palco = el("div", "brinq-palco brinq-caixa-palco");
    const m = el("div", "bx bx-margem");
    const b = el("div", "bx bx-borda");
    const p = el("div", "bx bx-padding");
    const c = el("div", "bx bx-conteudo", "conteúdo");
    p.appendChild(c); b.appendChild(p); m.appendChild(b); palco.appendChild(m);
    const legenda = el("p", "brinq-legenda");
    const vivo = codigoVivo();
    function atualizar() {
      const W = +largura.value, P = +padding.value, B = +borda.value, M = +margem.value;
      const borderBox = sizing.value === "border-box";
      const conteudo = borderBox ? Math.max(0, W - 2 * P - 2 * B) : W;
      const total = borderBox ? W : W + 2 * P + 2 * B;
      m.style.padding = M + "px";
      b.style.padding = B + "px";
      p.style.padding = P + "px";
      c.style.width = conteudo + "px";
      legenda.textContent = "Largura ocupada na tela (sem a margem): " + total + "px. Conteúdo: " + conteudo + "px. " +
        (borderBox ? "Com border-box, o width (" + W + "px) já inclui padding e borda." : "Com content-box, o width vale só para o conteúdo; padding e borda somam por fora: " + W + " + 2×" + P + " + 2×" + B + " = " + total + "px.");
      vivo.mostrar(".caixa {\n  box-sizing: " + sizing.value + ";\n  width: " + W + "px;\n  padding: " + P + "px;\n  border: " + B + "px solid;\n  margin: " + M + "px;\n}");
    }
    raiz.append(controles, palco, legenda, vivo.pre);
    raiz.addEventListener("input", atualizar);
    atualizar();
  };

  /* ----- Position ----- */
  BRINQUEDOS.posicao = function (raiz) {
    const pos = select(["static", "relative", "absolute", "sticky"]);
    const topo = range(0, 80, 20);
    const esq = range(0, 120, 30);
    const controles = el("div", "brinq-controles");
    controles.append(controle("position (da caixa amarela)", pos), controle("top", topo), controle("left", esq));
    const palco = el("div", "brinq-palco brinq-pos");
    palco.appendChild(el("p", "brinq-pos-aviso", "Esta área cinza é o pai, com position: relative. Role dentro dela para ver o sticky."));
    for (let i = 1; i <= 2; i++) palco.appendChild(el("div", "brinq-item brinq-pos-bloco", "Irmão " + i));
    const alvo = el("div", "brinq-item brinq-pos-alvo", "Eu");
    palco.insertBefore(alvo, palco.children[2]);
    for (let i = 3; i <= 6; i++) palco.appendChild(el("div", "brinq-item brinq-pos-bloco", "Irmão " + i));
    const legenda = el("p", "brinq-legenda");
    const vivo = codigoVivo();
    const TEXTO = {
      static: "static: a posição normal. top e left são ignorados.",
      relative: "relative: sai do lugar pelo top/left, mas o espaço original continua reservado (veja o buraco).",
      absolute: "absolute: sai do fluxo (os irmãos sobem) e se posiciona em relação ao pai relative.",
      sticky: "sticky: fica no fluxo normal e gruda quando a rolagem chega ao top. Role a área cinza.",
    };
    function atualizar() {
      alvo.style.position = pos.value;
      alvo.style.top = topo.value + "px";
      alvo.style.left = pos.value === "sticky" ? "auto" : esq.value + "px";
      legenda.textContent = TEXTO[pos.value];
      vivo.mostrar(".pai { position: relative; }\n.eu {\n  position: " + pos.value + ";\n  top: " + topo.value + "px;\n  left: " + esq.value + "px;\n}");
    }
    raiz.append(controles, palco, legenda, vivo.pre);
    raiz.addEventListener("input", atualizar);
    atualizar();
  };

  /* ----- Especificidade ----- */
  function especificidade(seletor) {
    let s = seletor.replace(/"[^"]*"|'[^']*'/g, "");
    let a = 0, b = 0, c = 0;
    // :not(), :is(), :has() contam pelo que tem dentro; :where() conta zero
    s = s.replace(/:where\([^)]*\)/g, "");
    s = s.replace(/:(not|is|has)\(([^)]*)\)/g, function (_, __, dentro) { return " " + dentro + " "; });
    a += (s.match(/#[\w-]+/g) || []).length;
    b += (s.match(/\.[\w-]+/g) || []).length;
    b += (s.match(/\[[^\]]*\]/g) || []).length;
    b += (s.match(/(^|[^:]):(?!:)[\w-]+(\([^)]*\))?/g) || []).length;
    c += (s.match(/::[\w-]+/g) || []).length;
    const semResto = s.replace(/#[\w-]+|\.[\w-]+|\[[^\]]*\]|::?[\w-]+(\([^)]*\))?/g, " ");
    c += (semResto.match(/(^|[\s>+~,(])([a-zA-Z][\w-]*)/g) || []).length;
    return [a, b, c];
  }
  BRINQUEDOS.especificidade = function (raiz) {
    const s1 = el("input"); s1.value = "nav a"; s1.type = "text";
    const s2 = el("input"); s2.value = ".menu a:hover"; s2.type = "text";
    const controles = el("div", "brinq-controles brinq-controles-largos");
    controles.append(controle("Seletor 1", s1), controle("Seletor 2", s2));
    const saida = el("div", "brinq-espec");
    saida.setAttribute("aria-live", "polite");
    function atualizar() {
      saida.textContent = "";
      saida.append(mostrarLinha(s1.value.trim()), mostrarLinha(s2.value.trim()));
      const x = especificidade(s1.value.trim());
      const y = especificidade(s2.value.trim());
      let vence = 0;
      for (let i = 0; i < 3; i++) { if (x[i] !== y[i]) { vence = x[i] > y[i] ? 1 : 2; break; } }
      saida.appendChild(el("p", "brinq-vencedor", vence === 0 ? "Empate: vence a regra que estiver MAIS PARA BAIXO no arquivo CSS." : "Vence o seletor " + vence + ". Compare da esquerda para a direita: o primeiro número diferente decide."));
    }
    function mostrarLinha(sel) {
      const [a, b, c] = especificidade(sel);
      const linha = el("p", "brinq-espec-linha");
      linha.append(el("code", "", sel || "(vazio)"), " → ", el("strong", "", "(" + a + ", " + b + ", " + c + ")"), " ",
        el("span", "brinq-espec-det", a + " id · " + b + " classe/atributo/pseudo-classe · " + c + " tag/pseudo-elemento"));
      return linha;
    }
    raiz.append(controles, saida);
    raiz.addEventListener("input", atualizar);
    atualizar();
  };

  /* ----- Testar seletores ----- */
  const HTML_SELETORES = [
    '<header class="topo">',
    '  <nav class="menu">',
    '    <a href="#" class="ativo">Início</a>',
    '    <a href="#sobre">Sobre</a>',
    '  </nav>',
    '</header>',
    '<main>',
    '  <section id="sobre">',
    '    <h2>Sobre</h2>',
    '    <p class="destaque">Primeiro parágrafo.</p>',
    '    <p>Segundo <a href="https://exemplo.com" target="_blank">link</a>.</p>',
    '  </section>',
    '  <ul>',
    '    <li>Um</li>',
    '    <li class="destaque">Dois</li>',
    '    <li>Três</li>',
    '  </ul>',
    '</main>',
  ];
  BRINQUEDOS.seletores = function (raiz) {
    const entrada = el("input"); entrada.type = "text"; entrada.value = ".destaque";
    entrada.setAttribute("autocomplete", "off");
    const sugestoes = el("div", "brinq-sugestoes");
    ["p", ".destaque", "#sobre", "nav a", ".menu > a", "li:nth-child(2)", "a[target]", "h2 + p", "section p", "li, h2", "p.destaque", ":not(li)"].forEach(function (s) {
      const bt = el("button", "brinq-chip", s); bt.type = "button";
      bt.addEventListener("click", function () { entrada.value = s; atualizar(); });
      sugestoes.appendChild(bt);
    });
    const controles = el("div", "brinq-controles brinq-controles-largos");
    controles.append(controle("Escreva um seletor CSS", entrada));
    // Monta o HTML de verdade (escondido) e a visualização linha a linha
    const modelo = document.createElement("div");
    modelo.innerHTML = HTML_SELETORES.join("\n");   // texto fixo nosso, não vem do usuário
    const vista = el("pre", "brinq-codigo brinq-vista");
    const linhas = [];
    const elementos = Array.from(modelo.querySelectorAll("*"));
    const linhaDoElemento = [];   // elemento número i está na linha linhaDoElemento[i]
    HTML_SELETORES.forEach(function (texto, n) {
      const linha = el("span", "brinq-linha", texto + "\n");
      (texto.match(/<[a-z]/g) || []).forEach(function () { linhaDoElemento.push(n); });
      linhas.push(linha);
      vista.appendChild(linha);
    });
    const resultado = el("p", "brinq-legenda");
    resultado.setAttribute("aria-live", "polite");
    function atualizar() {
      linhas.forEach(function (l) { l.classList.remove("brinq-achou"); });
      let achados;
      try {
        achados = entrada.value.trim() ? Array.from(modelo.querySelectorAll(entrada.value)) : [];
      } catch (erro) {
        resultado.textContent = "Esse seletor não é válido. Confira pontos, # e colchetes.";
        return;
      }
      achados.forEach(function (e) {
        const linha = linhas[linhaDoElemento[elementos.indexOf(e)]];
        if (linha) linha.classList.add("brinq-achou");
      });
      resultado.textContent = achados.length === 0 ? "Nenhum elemento escolhido." : achados.length + (achados.length === 1 ? " elemento escolhido (marcado em amarelo)." : " elementos escolhidos (marcados em amarelo).");
    }
    raiz.append(controles, sugestoes, vista, resultado);
    entrada.addEventListener("input", atualizar);
    atualizar();
  };

  /* ----- Console de JavaScript ----- */
  function dicaDeErro(erro) {
    const msg = String(erro && erro.message || erro);
    if (erro instanceof SyntaxError) return "Erro de escrita (SyntaxError): falta fechar um parêntese, uma chave ou aspas, ou sobrou algum sinal.";
    if (/is not defined/.test(msg)) return "ReferenceError: você usou um nome que não existe. Confira se escreveu igual (maiúsculas contam) e se criou com const/let antes.";
    if (/Cannot read properties of (null|undefined)/.test(msg)) return "TypeError: você tentou usar algo que está vazio (null/undefined). Muito comum quando o querySelector não achou o elemento.";
    if (/is not a function/.test(msg)) return "TypeError: você chamou com () algo que não é função. Confira o nome do método.";
    if (/Assignment to constant/.test(msg)) return "TypeError: tentou dar outro valor a uma const. Use let se o valor precisa mudar.";
    return "";
  }
  function formatar(v) {
    if (typeof v === "string") return v;
    try { return JSON.stringify(v); } catch (e) { return String(v); }
  }
  BRINQUEDOS.console = function (raiz) {
    const inicial = raiz.querySelector("textarea") ? raiz.querySelector("textarea").value : 'console.log("Olá!");';
    raiz.textContent = "";
    const area = el("textarea", "brinq-editor");
    area.value = inicial;
    area.rows = Math.min(14, inicial.split("\n").length + 1);
    area.spellcheck = false;
    area.setAttribute("aria-label", "Código JavaScript para rodar");
    const rodar = el("button", "botao botao-primario", "Rodar ▶"); rodar.type = "button";
    const limpar = el("button", "botao botao-contorno", "Limpar saída"); limpar.type = "button";
    const voltar = el("button", "botao botao-contorno", "Voltar ao exemplo"); voltar.type = "button";
    const barra = el("div", "brinq-botoes"); barra.append(rodar, limpar, voltar);
    const saida = el("ol", "brinq-saida");
    saida.setAttribute("aria-live", "polite");
    saida.setAttribute("aria-label", "Saída do console");
    function escrever(texto, classe) { saida.appendChild(el("li", classe || "", texto)); }
    rodar.addEventListener("click", async function () {
      saida.textContent = "";
      // Na plataforma (com proteção CSP), o código roda isolado no sandbox do laboratório
      if (window.Laboratorio) {
        const prot = window.Laboratorio.protegerLacos(area.value);
        if (prot.erroSintaxe) { escrever("Erro de escrita" + (prot.erroSintaxe.linha ? " na linha " + prot.erroSintaxe.linha : "") + ": " + prot.erroSintaxe.mensagem, "brinq-erro"); return; }
        const r = await window.Laboratorio.rodar({ modo: "js", js: prot.codigo });
        r.saida.forEach(function (s) { escrever(s.texto, s.nivel === "erro" ? "brinq-erro" : s.nivel === "aviso" ? "brinq-aviso" : ""); });
        if (r.erro) {
          escrever(r.erro.nome + ": " + r.erro.mensagem, "brinq-erro");
          const dica = dicaDeErro({ name: r.erro.nome, message: r.erro.mensagem });
          if (dica) escrever(dica, "brinq-aviso");
        } else if (!r.saida.length) escrever("(rodou sem erro; nada foi mostrado: use console.log para ver valores)", "brinq-nada");
        return;
      }
      const falso = {
        log: function () { escrever(Array.from(arguments).map(formatar).join(" ")); },
        error: function () { escrever(Array.from(arguments).map(formatar).join(" "), "brinq-erro"); },
        warn: function () { escrever(Array.from(arguments).map(formatar).join(" "), "brinq-aviso"); },
      };
      falso.info = falso.log;
      try {
        new Function("console", area.value)(falso);
        if (!saida.children.length) escrever("(rodou sem erro; nada foi mostrado: use console.log para ver valores)", "brinq-nada");
      } catch (erro) {
        if (erro instanceof EvalError || /Content Security Policy|unsafe-eval/.test(String(erro))) {
          escrever("Este visualizador bloqueia a execução de código. No seu computador ou no GitHub Pages o console funciona.", "brinq-aviso");
          return;
        }
        escrever(erro.name + ": " + erro.message, "brinq-erro");
        const dica = dicaDeErro(erro);
        if (dica) escrever(dica, "brinq-aviso");
      }
    });
    limpar.addEventListener("click", function () { saida.textContent = ""; });
    voltar.addEventListener("click", function () { area.value = inicial; saida.textContent = ""; });
    area.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") rodar.click();
    });
    raiz.append(area, barra, el("p", "brinq-legenda", "Dica: Ctrl + Enter também roda. Mude o código à vontade: nada aqui estraga a página."), saida);
  };

  /* ----- Árvore do HTML ----- */
  BRINQUEDOS.arvore = function (raiz) {
    const inicial = raiz.querySelector("textarea") ? raiz.querySelector("textarea").value : "<p>Olá</p>";
    raiz.textContent = "";
    const area = el("textarea", "brinq-editor");
    area.value = inicial;
    area.rows = Math.min(12, inicial.split("\n").length + 1);
    area.spellcheck = false;
    area.setAttribute("aria-label", "HTML para ver como árvore");
    const arvore = el("div", "brinq-arvore");
    const aviso = el("p", "brinq-legenda");
    aviso.setAttribute("aria-live", "polite");
    function ramo(no) {
      const li = el("li");
      const nome = el("code", "brinq-no", "<" + no.tagName.toLowerCase() + ">");
      li.appendChild(nome);
      Array.from(no.attributes).forEach(function (a) {
        li.append(" ", el("span", "brinq-attr", a.name + '="' + a.value + '"'));
      });
      const filhos = Array.from(no.childNodes).filter(function (f) {
        return f.nodeType === 1 || (f.nodeType === 3 && f.textContent.trim());
      });
      if (filhos.length) {
        const ul = el("ul");
        filhos.forEach(function (f) {
          if (f.nodeType === 3) ul.appendChild(el("li", "brinq-texto", "texto: \"" + f.textContent.trim() + "\""));
          else ul.appendChild(ramo(f));
        });
        li.appendChild(ul);
      }
      return li;
    }
    function atualizar() {
      // DOMParser lê o HTML como o navegador leria, mas sem mostrar nem rodar nada
      const doc = new DOMParser().parseFromString("<body>" + area.value + "</body>", "text/html");
      arvore.textContent = "";
      const ul = el("ul", "brinq-raiz");
      Array.from(doc.body.childNodes).forEach(function (f) {
        if (f.nodeType === 1) ul.appendChild(ramo(f));
        else if (f.nodeType === 3 && f.textContent.trim()) ul.appendChild(el("li", "brinq-texto", "texto: \"" + f.textContent.trim() + "\""));
      });
      arvore.appendChild(ul);
      const limpoDigitado = area.value.replace(/\s+/g, "").toLowerCase();
      const limpoLido = doc.body.innerHTML.replace(/\s+/g, "").toLowerCase().replace(/=""/g, "");
      aviso.textContent = limpoDigitado.replace(/=""/g, "") === limpoLido
        ? "O navegador leu o HTML do jeito que você escreveu."
        : "Atenção: o navegador precisou CONSERTAR o seu HTML (tag sem fechar, tag fora do lugar ou fechada na ordem errada). A árvore mostra como ele entendeu.";
    }
    raiz.append(area, aviso, arvore);
    area.addEventListener("input", atualizar);
    atualizar();
  };

  /* =====================================================================
     4. Termos sem explicação (página dicionario.html)
     ===================================================================== */
  function termosFaltando(lugar) {
    if (!window.CODIGOS) { lugar.textContent = "Os códigos não foram carregados."; return; }
    const faltas = {};
    window.CODIGOS.ordem.forEach(function (id) {
      const r = A.analisar(window.CODIGOS.trechos[id]);
      r.faltando.forEach(function (f) {
        const chave = NOME_LANG[f.lang] + " · " + f.oque + ": " + f.texto;
        faltas[chave] = faltas[chave] || new Set();
        faltas[chave].add(window.CODIGOS.trechos[id].titulo);
      });
    });
    const chaves = Object.keys(faltas).sort();
    if (!chaves.length) {
      lugar.appendChild(el("p", "doc-ok", "Todas as palavras dos " + window.CODIGOS.ordem.length + " códigos do site têm explicação."));
      return;
    }
    const ul = el("ul");
    chaves.forEach(function (c) { ul.appendChild(el("li", "", c + " (em: " + Array.from(faltas[c]).join(", ") + ")")); });
    lugar.append(el("p", "", chaves.length + " palavras sem explicação. Acrescente-as em trechos/dicionario.json e rode o gerar-codigos.py."), ul);
  }

  /* =====================================================================
     Início
     ===================================================================== */
  window.Documentacao = { colorir: colorir };
  if (DIC && A) {
    document.querySelectorAll("pre.doc-codigo[data-lang]").forEach(colorir);
    document.querySelectorAll("[data-referencia]").forEach(montarReferencia);
    const faltando = document.getElementById("termos-faltando");
    if (faltando) termosFaltando(faltando);
  }
  // Botão Copiar das caixas de prompt (página ia.html)
  document.querySelectorAll(".prompt-copiar").forEach(function (botao) {
    botao.addEventListener("click", function () {
      const texto = botao.closest(".prompt-caixa").querySelector("pre").textContent;
      const feito = function () { botao.textContent = "Copiado ✓"; setTimeout(function () { botao.textContent = "Copiar"; }, 2000); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(feito).catch(function () { botao.textContent = "Selecione e use Ctrl + C"; });
      } else {
        botao.textContent = "Selecione e use Ctrl + C";
      }
    });
  });

  document.querySelectorAll("[data-brinquedo]").forEach(function (raiz) {
    const montar = BRINQUEDOS[raiz.dataset.brinquedo];
    if (montar) {
      raiz.classList.add("brinquedo-pronto");
      montar(raiz);
    }
  });
  // Os experimentos e a referência aumentam a página depois que ela abriu:
  // se o endereço tem #secao, rola de novo até ela, agora no lugar certo.
  if (location.hash && !location.hash.startsWith("#t-")) {
    const alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo) alvo.scrollIntoView({ block: "start", behavior: "instant" });
  }
  abrirDoEndereco();
  window.addEventListener("hashchange", abrirDoEndereco);

  // Índice lateral: marca a seção que está na tela
  const links = Array.from(document.querySelectorAll(".doc-indice a[href^='#']"));
  if (links.length && "IntersectionObserver" in window) {
    const vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        links.forEach(function (a) {
          const ativo = a.getAttribute("href") === "#" + entrada.target.id;
          if (ativo) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    links.forEach(function (a) {
      const alvo = document.getElementById(a.getAttribute("href").slice(1));
      if (alvo) vigia.observe(alvo);
    });
  }
})();
