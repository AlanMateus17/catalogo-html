/*
  laboratorio.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  Roda o código do aluno com segurança, dentro de um iframe isolado (sandbox.html),
  e monta os editores dos blocos "Experimente" e dos exercícios de código.

    Laboratorio.rodar({ modo, html, css, js, testes, preview })  → Promise com o resultado
    Laboratorio.editor(raiz, arquivos, { testes, aoTerminar })  → editor com abas, Rodar e resultado
*/
"use strict";

window.Laboratorio = (function () {
  const NOMES = { html: "HTML", css: "CSS", js: "JavaScript" };
  let contador = 0;

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  /* ---------- Proteção contra laço sem fim (e checagem de sintaxe) ---------- */
  function protegerLacos(js) {
    if (!js || !window.acorn) return { codigo: js || "" };
    let ast;
    try {
      ast = window.acorn.parse(js, { ecmaVersion: "latest", sourceType: "script", locations: true, allowReturnOutsideFunction: false });
    } catch (e) {
      return { erroSintaxe: { mensagem: traduzirSintaxe(e.message), linha: e.loc ? e.loc.line : null } };
    }
    const edicoes = [];
    (function andar(no) {
      if (!no || typeof no.type !== "string") return;
      if (/^(For|ForIn|ForOf|While|DoWhile)Statement$/.test(no.type) && no.body) {
        if (no.body.type === "BlockStatement") edicoes.push([no.body.start + 1, "__laco();"]);
        else { edicoes.push([no.body.start, "{__laco();"]); edicoes.push([no.body.end, "}"]); }
      }
      for (const k in no) {
        if (k === "loc") continue;
        const v = no[k];
        if (Array.isArray(v)) v.forEach(andar);
        else if (v && typeof v.type === "string") andar(v);
      }
    })(ast);
    return { codigo: aplicar(js, edicoes) };
  }

  function aplicar(texto, edicoes) {
    edicoes.sort(function (a, b) { return b[0] - a[0]; });
    edicoes.forEach(function (e) { texto = texto.slice(0, e[0]) + e[1] + texto.slice(e[0]); });
    return texto;
  }

  function traduzirSintaxe(msg) {
    const trocas = [
      [/Unexpected token \(?(.*?)\)?$/i, "Símbolo inesperado $1: confira parênteses, chaves e vírgulas perto daqui."],
      [/Unterminated string constant/i, "Texto sem fechar: faltou fechar as aspas."],
      [/Unexpected character/i, "Caractere inesperado: tem algum símbolo que o JavaScript não reconhece."],
      [/Identifier '(.*?)' has already been declared/i, "O nome $1 já foi criado antes (let/const não podem ser criados duas vezes)."],
      [/Assigning to rvalue/i, "Atribuição inválida: do lado esquerdo do = precisa ter um nome de variável."],
      [/Unterminated template/i, "Template string sem fechar: faltou a crase `."],
    ];
    for (const [re, txt] of trocas) if (re.test(msg)) return msg.replace(/\s*\(\d+:\d+\)$/, "").replace(re, txt);
    return msg.replace(/\s*\(\d+:\d+\)$/, "");
  }

  /* ---------- Rodar no sandbox ---------- */
  function rodar(opcoes) {
    return new Promise(function (resolver) {
      const quadro = document.createElement("iframe");
      quadro.setAttribute("sandbox", "allow-scripts allow-modals");
      quadro.setAttribute("title", "Resultado do seu código");
      quadro.className = "laboratorio-quadro";
      const limite = opcoes.limite || 3000;
      let terminou = false;
      const alvo = opcoes.preview;
      if (alvo) { alvo.textContent = ""; alvo.appendChild(quadro); }
      else { quadro.hidden = true; document.body.appendChild(quadro); }

      function fim(resultado) {
        if (terminou) return;
        terminou = true;
        window.removeEventListener("message", ouvir);
        clearTimeout(relogio);
        if (!alvo) quadro.remove();
        resolver(resultado);
      }
      function ouvir(e) {
        if (e.source !== quadro.contentWindow || !e.data) return;
        if (e.data.tipo === "pronto") {
          const base = location.href.replace(/[^/]*([?#].*)?$/, "");
          quadro.contentWindow.postMessage({ tipo: "rodar", modo: opcoes.modo || "js", html: opcoes.html || "", css: opcoes.css || "",
            js: opcoes.js || "", testes: opcoes.testes || [], limite: limite, base: base }, "*");
        } else if (e.data.tipo === "resultado") {
          fim(e.data);
        }
      }
      window.addEventListener("message", ouvir);
      const relogio = setTimeout(function () {
        fim({ saida: [], testes: [], passos: [], erro: { nome: "Tempo esgotado", mensagem: "O código demorou demais para terminar. Tem algum laço que nunca para?" } });
      }, limite + 4000);
      quadro.src = "sandbox.html?r=" + (++contador);
    });
  }

  /* ---------- Editor com abas ---------- */
  function editor(raiz, arquivos, opcoes) {
    opcoes = opcoes || {};
    const langs = ["html", "css", "js"].filter(function (l) { return l in arquivos; });
    const iniciais = Object.assign({}, arquivos);
    const temPagina = langs.indexOf("html") >= 0 || langs.indexOf("css") >= 0;
    const caixa = el("div", "lab");
    const abas = el("div", "lab-abas");
    abas.setAttribute("role", "tablist");
    const areas = {};
    langs.forEach(function (lang, i) {
      const aba = el("button", "lab-aba", NOMES[lang]);
      aba.type = "button";
      aba.setAttribute("role", "tab");
      aba.setAttribute("aria-selected", i === 0 ? "true" : "false");
      const area = el("textarea", "lab-editor");
      area.value = arquivos[lang];
      area.spellcheck = false;
      area.setAttribute("autocapitalize", "off");
      area.setAttribute("aria-label", "Código " + NOMES[lang]);
      area.rows = Math.max(5, Math.min(18, (arquivos[lang] || "").split("\n").length + 2));
      area.hidden = i !== 0;
      area.addEventListener("keydown", function (e) {
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          const ini = area.selectionStart;
          area.setRangeText("  ", ini, area.selectionEnd, "end");
        } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault(); botaoRodar.click();
        }
      });
      aba.addEventListener("click", function () {
        abas.querySelectorAll(".lab-aba").forEach(function (a) { a.setAttribute("aria-selected", "false"); });
        aba.setAttribute("aria-selected", "true");
        Object.keys(areas).forEach(function (l) { areas[l].hidden = l !== lang; });
        area.focus();
      });
      areas[lang] = area;
      if (langs.length > 1) abas.appendChild(aba);
    });
    const botaoRodar = el("button", "botao botao-primario", opcoes.testes ? "Rodar e conferir ▶" : "Rodar ▶");
    botaoRodar.type = "button";
    const botaoVoltar = el("button", "botao botao-contorno", "Voltar ao início");
    botaoVoltar.type = "button";
    const barra = el("div", "lab-botoes");
    barra.append(botaoRodar, botaoVoltar);
    const preview = el("div", "lab-preview");
    preview.hidden = true;
    const saida = el("ol", "lab-saida");
    saida.setAttribute("aria-live", "polite");
    saida.setAttribute("aria-label", "Saída");
    saida.hidden = true;
    const testes = el("ul", "lab-testes");
    testes.setAttribute("aria-live", "polite");
    testes.hidden = true;
    if (langs.length > 1) caixa.appendChild(abas);
    Object.keys(areas).forEach(function (l) { caixa.appendChild(areas[l]); });
    caixa.append(barra, el("p", "lab-legenda", "Ctrl + Enter também roda. O código roda isolado: nada aqui estraga a página."), preview, saida, testes);
    raiz.appendChild(caixa);

    function linha(lista, texto, classe) { lista.appendChild(el("li", classe || "", texto)); }

    botaoVoltar.addEventListener("click", function () {
      Object.keys(areas).forEach(function (l) { areas[l].value = iniciais[l]; });
      saida.hidden = true; testes.hidden = true; preview.hidden = true;
    });

    botaoRodar.addEventListener("click", async function () {
      saida.textContent = ""; testes.textContent = "";
      const js = areas.js ? areas.js.value : "";
      const protegido = protegerLacos(js);
      if (protegido.erroSintaxe) {
        saida.hidden = false;
        linha(saida, "Erro de escrita" + (protegido.erroSintaxe.linha ? " na linha " + protegido.erroSintaxe.linha : "") + ": " + protegido.erroSintaxe.mensagem, "lab-erro");
        if (opcoes.aoTerminar) opcoes.aoTerminar(false);
        return;
      }
      botaoRodar.disabled = true;
      preview.hidden = !temPagina;
      const r = await rodar({ modo: temPagina ? "pagina" : "js", html: areas.html ? areas.html.value : "", css: areas.css ? areas.css.value : "",
        js: protegido.codigo, testes: opcoes.testes, preview: temPagina ? preview : null });
      botaoRodar.disabled = false;
      const temSaida = r.saida.length || r.erro;
      saida.hidden = !temSaida && temPagina;
      r.saida.forEach(function (s) { linha(saida, s.texto, s.nivel === "erro" ? "lab-erro" : s.nivel === "aviso" ? "lab-aviso" : ""); });
      if (r.erro) {
        linha(saida, r.erro.nome + ": " + r.erro.mensagem, "lab-erro");
        const dica = dicaDeErro(r.erro);
        if (dica) linha(saida, dica, "lab-aviso");
      } else if (!r.saida.length && !temPagina) {
        linha(saida, "(rodou sem erro; nada foi mostrado: use console.log para ver valores)", "lab-nada");
      }
      let todos = true;
      if (opcoes.testes && opcoes.testes.length) {
        testes.hidden = false;
        r.testes.forEach(function (t) {
          if (!t.ok) todos = false;
          const li = el("li", t.ok ? "teste-ok" : "teste-falhou");
          li.append(el("span", "teste-marca", t.ok ? "✓" : "✗"), document.createTextNode(" " + t.msg + (t.erro ? " (" + t.erro + ")" : "")));
          testes.appendChild(li);
        });
        if (!r.testes.length) todos = false;
      }
      if (opcoes.aoTerminar) opcoes.aoTerminar(todos && !r.erro, r);
    });
    return { valores: function () { const v = {}; Object.keys(areas).forEach(function (l) { v[l] = areas[l].value; }); return v; } };
  }

  function dicaDeErro(erro) {
    const m = (erro.mensagem || "");
    if (/is not defined/.test(m)) return "Dica: esse nome não existe. Confira se escreveu igual (maiúsculas contam) e se criou antes de usar.";
    if (/is not a function/.test(m)) return "Dica: você usou () em algo que não é função. Confira o nome do método.";
    if (/Cannot read properties of (null|undefined)/.test(m)) return "Dica: você tentou pegar algo de um valor vazio (null ou undefined). O elemento ou a variável existe mesmo?";
    if (/Assignment to constant/.test(m)) return "Dica: const não pode receber outro valor. Use let se o valor muda.";
    if (/before initialization/.test(m)) return "Dica: você usou a variável antes da linha que a cria.";
    return "";
  }

  return { rodar: rodar, editor: editor, protegerLacos: protegerLacos, traduzirSintaxe: traduzirSintaxe, aplicar: aplicar };
})();

// Blocos "Experimente" das lições
document.querySelectorAll(".laboratorio").forEach(function (raiz) {
  const dados = JSON.parse(raiz.querySelector(".laboratorio-dados").textContent);
  window.Laboratorio.editor(raiz, dados.arquivos);
});
