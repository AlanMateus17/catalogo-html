/*
  visualizador.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  "Veja o computador executar, linha por linha": pega um código JavaScript, marca
  cada linha (com o acorn, que lê o código como o navegador lê) e roda no sandbox,
  guardando uma foto das variáveis a cada passo. Depois o aluno anda para frente e
  para trás e vê qual linha rodou, o que cada variável vale e o que apareceu no console.

  Limites (honestos): mostra no máximo 2000 passos; o passo é a linha inteira
  (não cada pedaço de uma expressão); valores muito grandes aparecem resumidos.
*/
"use strict";

window.Visualizador = (function () {
  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  /* ---------- Marcar o código ---------- */
  function nomesDoPadrao(p, lista) {
    if (!p) return lista;
    if (p.type === "Identifier") lista.push(p.name);
    else if (p.type === "ObjectPattern") p.properties.forEach(function (q) { nomesDoPadrao(q.type === "RestElement" ? q.argument : q.value, lista); });
    else if (p.type === "ArrayPattern") p.elements.forEach(function (q) { nomesDoPadrao(q, lista); });
    else if (p.type === "RestElement") nomesDoPadrao(p.argument, lista);
    else if (p.type === "AssignmentPattern") nomesDoPadrao(p.left, lista);
    return lista;
  }

  // Nomes declarados diretamente num bloco (let/const/class/function) e var/function do corpo da função
  function declaracoesDoBloco(corpo) {
    const nomes = [];
    corpo.forEach(function (s) {
      if (s.type === "VariableDeclaration" && s.kind !== "var") s.declarations.forEach(function (d) { nomesDoPadrao(d.id, nomes); });
      if (s.type === "ClassDeclaration" && s.id) nomes.push(s.id.name);
      if (s.type === "FunctionDeclaration" && s.id) nomes.push(s.id.name);
    });
    return nomes;
  }
  function varsDaFuncao(corpo) {
    const nomes = [];
    (function andar(no) {
      if (!no || typeof no.type !== "string") return;
      if (no.type === "VariableDeclaration" && no.kind === "var") no.declarations.forEach(function (d) { nomesDoPadrao(d.id, nomes); });
      if (/Function/.test(no.type)) return; // var de outra função não conta
      for (const k in no) {
        if (k === "loc") continue;
        const v = no[k];
        if (Array.isArray(v)) v.forEach(andar); else if (v && typeof v.type === "string") andar(v);
      }
    })({ type: "Program", body: corpo });
    return nomes;
  }

  function instrumentar(codigo) {
    const ast = window.acorn.parse(codigo, { ecmaVersion: "latest", sourceType: "script", locations: true });
    const edicoes = [];
    const ignorar = /^__/;

    function foto(quadros) {
      // quadros: [{ nome, vars: [..] }] do mais externo para o mais interno
      const partes = quadros.map(function (q) {
        const unicos = Array.from(new Set(q.vars)).filter(function (n) { return !ignorar.test(n); });
        const vars = unicos.map(function (n) { return JSON.stringify(n) + ":__v(function(){return " + n + ";})"; }).join(",");
        return "{n:" + JSON.stringify(q.nome) + ",v:{" + vars + "}}";
      });
      return "[" + partes.join(",") + "]";
    }

    function lista(corpo, quadros, extras) {
      // extras: nomes que pertencem a este bloco além dos declarados nele (ex.: i do for, parâmetro do catch)
      const aqui = quadros.slice();
      const topo = aqui[aqui.length - 1];
      aqui[aqui.length - 1] = { nome: topo.nome, vars: topo.vars.concat(extras || [], declaracoesDoBloco(corpo)) };
      corpo.forEach(function (s) {
        if (s.type !== "FunctionDeclaration" && s.type !== "EmptyStatement")
          edicoes.push([s.start, "__p(" + s.loc.start.line + "," + foto(aqui) + ");"]);
        visitar(s, aqui);
      });
      return aqui;
    }

    function corpoSolto(s, quadros, extras) {
      if (!s) return;
      if (s.type === "BlockStatement") { lista(s.body, quadros, extras); return; }
      // if (x) linha;  → vira { __p(...); linha; }
      const aqui = quadros.slice();
      const topo = aqui[aqui.length - 1];
      aqui[aqui.length - 1] = { nome: topo.nome, vars: topo.vars.concat(extras || []) };
      edicoes.push([s.start, "{__p(" + s.loc.start.line + "," + foto(aqui) + ");"]);
      edicoes.push([s.end, "}"]);
      visitar(s, aqui);
    }

    function funcao(f, quadros, nome) {
      const params = [];
      f.params.forEach(function (p) { nomesDoPadrao(p, params); });
      const novo = quadros.concat([{ nome: nome + "()", vars: params.concat(f.body.type === "BlockStatement" ? varsDaFuncao(f.body.body) : []) }]);
      if (f.body.type === "BlockStatement") lista(f.body.body, novo);
      else visitar(f.body, novo);
    }

    function visitar(no, quadros) {
      if (!no || typeof no.type !== "string") return;
      switch (no.type) {
        case "FunctionDeclaration": funcao(no, quadros, no.id ? no.id.name : "função"); return;
        case "FunctionExpression": case "ArrowFunctionExpression": funcao(no, quadros, no.id ? no.id.name : "função"); return;
        case "BlockStatement": lista(no.body, quadros); return;
        case "IfStatement": visitar(no.test, quadros); corpoSolto(no.consequent, quadros); corpoSolto(no.alternate, quadros); return;
        case "ForStatement": {
          const extras = no.init && no.init.type === "VariableDeclaration" && no.init.kind !== "var" ? nomesDoPadrao(no.init.declarations[0].id, []) : [];
          const qs = quadros.slice(); const t = qs[qs.length - 1]; qs[qs.length - 1] = { nome: t.nome, vars: t.vars.concat(extras) };
          [no.init, no.test, no.update].forEach(function (x) { visitar(x, qs); });
          corpoSolto(no.body, quadros, extras); return;
        }
        case "ForOfStatement": case "ForInStatement": {
          const extras = no.left.type === "VariableDeclaration" ? nomesDoPadrao(no.left.declarations[0].id, []) : [];
          visitar(no.right, quadros); corpoSolto(no.body, quadros, extras); return;
        }
        case "WhileStatement": case "DoWhileStatement": visitar(no.test, quadros); corpoSolto(no.body, quadros); return;
        case "SwitchStatement": visitar(no.discriminant, quadros); no.cases.forEach(function (c) { lista(c.consequent, quadros); }); return;
        case "TryStatement":
          visitar(no.block, quadros);
          if (no.handler) lista(no.handler.body.body, quadros, no.handler.param ? nomesDoPadrao(no.handler.param, []) : []);
          if (no.finalizer) visitar(no.finalizer, quadros);
          return;
        case "LabeledStatement": corpoSolto(no.body, quadros); return;
        case "ClassDeclaration": case "ClassExpression":
          no.body.body.forEach(function (m) { if (m.value && /Function/.test(m.value.type)) funcao(m.value, quadros, (no.id ? no.id.name + "." : "") + (m.key.name || "método")); });
          return;
      }
      for (const k in no) {
        if (k === "loc") continue;
        const v = no[k];
        if (Array.isArray(v)) v.forEach(function (x) { visitar(x, quadros); });
        else if (v && typeof v.type === "string") visitar(v, quadros);
      }
    }

    const globais = [{ nome: "global", vars: varsDaFuncao(ast.body) }];
    const final = lista(ast.body, globais);
    edicoes.push([codigo.length, "\n;__p(0," + foto(final) + ");"]);
    let saida = window.Laboratorio.aplicar(codigo, edicoes);
    return window.Laboratorio.protegerLacos(saida).codigo;
  }

  /* ---------- Tela ---------- */
  function montar(raiz, codigo) {
    const caixa = el("div", "vis");
    const botoes = el("div", "vis-botoes");
    const bInicio = el("button", "botao botao-contorno botao-pequeno", "⏮ Início");
    const bVolta = el("button", "botao botao-contorno botao-pequeno", "◀ Voltar");
    const bAnda = el("button", "botao botao-primario botao-pequeno", "Próximo passo ▶");
    const bFim = el("button", "botao botao-contorno botao-pequeno", "Fim ⏭");
    [bInicio, bVolta, bAnda, bFim].forEach(function (b) { b.type = "button"; });
    const contador = el("span", "vis-contador");
    contador.setAttribute("aria-live", "polite");
    botoes.append(bInicio, bVolta, bAnda, bFim, contador);
    const regua = el("input", "vis-regua");
    regua.type = "range"; regua.min = "0"; regua.value = "0";
    regua.setAttribute("aria-label", "Escolher o passo");
    const grade = el("div", "vis-grade");
    const listagem = el("ol", "vis-codigo");
    const linhas = codigo.split("\n").map(function (t) { const li = el("li", "", t || " "); listagem.appendChild(li); return li; });
    const lado = el("div", "vis-lado");
    const tituloVars = el("p", "vis-subtitulo", "Variáveis agora");
    const vars = el("div", "vis-vars");
    const tituloSaida = el("p", "vis-subtitulo", "Console");
    const saida = el("ol", "vis-saida");
    lado.append(tituloVars, vars, tituloSaida, saida);
    grade.append(listagem, lado);
    const explica = el("p", "vis-explica");
    const editar = el("details", "vis-editar");
    editar.append(el("summary", "", "Mudar o código e ver de novo"));
    const area = el("textarea", "lab-editor");
    area.value = codigo; area.spellcheck = false; area.rows = Math.min(16, codigo.split("\n").length + 2);
    area.setAttribute("aria-label", "Código para visualizar");
    const bRefazer = el("button", "botao botao-primario botao-pequeno", "Visualizar este código"); bRefazer.type = "button";
    editar.append(area, bRefazer);
    caixa.append(botoes, regua, grade, explica, editar);
    raiz.appendChild(caixa);

    let passos = [], registro = [], atual = 0, anterior = {};

    function mostrar(i) {
      if (!passos.length) return;
      atual = Math.max(0, Math.min(passos.length - 1, i));
      regua.value = String(atual);
      const p = passos[atual];
      linhas.forEach(function (li, n) { li.classList.toggle("vis-atual", p.linha === n + 1); li.classList.toggle("vis-feita", false); });
      if (p.linha > 0 && linhas[p.linha - 1]) linhas[p.linha - 1].scrollIntoView({ block: "nearest" });
      contador.textContent = "Passo " + (atual + 1) + " de " + passos.length;
      vars.textContent = "";
      const antes = atual > 0 ? mapa(passos[atual - 1]) : {};
      p.quadros.forEach(function (q) {
        const nomes = Object.keys(q.v);
        const bloco = el("div", "vis-quadro");
        bloco.appendChild(el("p", "vis-quadro-nome", q.n === "global" ? "Programa principal" : "Dentro de " + q.n));
        if (!nomes.length) bloco.appendChild(el("p", "vis-vazio", "(nenhuma variável ainda)"));
        const tabela = el("dl", "vis-tabela");
        nomes.forEach(function (n) {
          const valor = q.v[n] === "⟂" ? "(ainda não criada)" : q.v[n];
          const dt = el("dt", "", n), dd = el("dd", "", valor);
          const chave = q.n + "." + n;
          if (antes[chave] !== undefined && antes[chave] !== q.v[n]) { dt.classList.add("vis-mudou"); dd.classList.add("vis-mudou"); }
          if (q.v[n] === "⟂") dd.classList.add("vis-tdz");
          tabela.append(dt, dd);
        });
        bloco.appendChild(tabela);
        vars.appendChild(bloco);
      });
      saida.textContent = "";
      registro.slice(0, p.nsaida).forEach(function (s) { saida.appendChild(el("li", s.nivel === "erro" ? "lab-erro" : "", s.texto)); });
      if (!p.nsaida) saida.appendChild(el("li", "vis-vazio", "(nada ainda)"));
      explica.textContent = p.linha === 0 ? "Fim: o programa terminou. Estas são as variáveis no final."
        : "A linha " + p.linha + " (destacada) é a próxima a rodar. As variáveis mostram os valores ANTES dela rodar; em amarelo, o que mudou no passo anterior.";
      bVolta.disabled = bInicio.disabled = atual === 0;
      bAnda.disabled = bFim.disabled = atual === passos.length - 1;
    }
    function mapa(p) {
      const m = {};
      p.quadros.forEach(function (q) { Object.keys(q.v).forEach(function (n) { m[q.n + "." + n] = q.v[n]; }); });
      return m;
    }

    async function executar(cod) {
      explica.textContent = "Preparando...";
      let marcado;
      try { marcado = instrumentar(cod); }
      catch (e) {
        passos = []; vars.textContent = ""; saida.textContent = "";
        explica.textContent = "Erro de escrita" + (e.loc ? " na linha " + e.loc.line : "") + ": " + window.Laboratorio.traduzirSintaxe(e.message);
        return;
      }
      const r = await window.Laboratorio.rodar({ modo: "trace", js: marcado, limite: 4000 });
      passos = r.passos || [];
      registro = r.saida || [];
      regua.max = String(Math.max(0, passos.length - 1));
      if (r.erro && passos.length) {
        passos[passos.length - 1] = Object.assign({}, passos[passos.length - 1]);
      }
      mostrar(0);
      if (r.erro) {
        const aviso = el("p", "lab-erro vis-erro", "O programa parou com erro depois do último passo: " + r.erro.nome + ": " + r.erro.mensagem);
        explica.after(aviso);
        setTimeout(function () { aviso.remove(); }, 15000);
      }
      if (!passos.length) explica.textContent = "Nada para mostrar: o código não tem linhas que rodam.";
    }

    bInicio.addEventListener("click", function () { mostrar(0); });
    bVolta.addEventListener("click", function () { mostrar(atual - 1); });
    bAnda.addEventListener("click", function () { mostrar(atual + 1); });
    bFim.addEventListener("click", function () { mostrar(passos.length - 1); });
    regua.addEventListener("input", function () { mostrar(Number(regua.value)); });
    caixa.addEventListener("keydown", function (e) {
      if (e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") { e.preventDefault(); mostrar(atual + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(atual - 1); }
    });
    bRefazer.addEventListener("click", function () {
      codigo = area.value;
      listagem.textContent = "";
      linhas.length = 0;
      codigo.split("\n").forEach(function (t) { const li = el("li", "", t || " "); listagem.appendChild(li); linhas.push(li); });
      executar(codigo);
    });
    executar(codigo);
  }

  document.querySelectorAll(".visualizador").forEach(function (raiz) {
    montar(raiz, raiz.querySelector(".visualizador-codigo").value);
  });

  return { instrumentar: instrumentar };
})();
