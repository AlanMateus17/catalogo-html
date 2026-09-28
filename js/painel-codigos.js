/*
  painel-codigos.js — FERRAMENTA DO CATÁLOGO (os alunos não precisam copiar este arquivo)

  O que faz:
  Procura na página todo elemento com o atributo data-codigo="nome" e coloca ali
  um painel "Ver código" com o HTML, o CSS e o JS daquela funcionalidade,
  cada um com um botão Copiar. Os códigos vêm de js/codigos-dados.js.

  Como colocar um painel numa página:
      <div class="codigo" data-codigo="galeria"></div>
  (o nome é o id do trecho, igual ao nome da pasta em trechos/)

  Na página codigos.html, o elemento #lista-codigos recebe TODOS os painéis,
  agrupados, e o campo #filtro-codigos filtra pelo nome.
*/
"use strict";

(function () {
  const dados = window.CODIGOS;
  if (!dados) {
    console.warn("codigos-dados.js não foi carregado: os painéis de código não vão aparecer.");
    return;
  }

  const NOMES = { html: "HTML", css: "CSS", js: "JavaScript" };
  const ARQUIVOS = { html: "index.html", css: "css/estilo.css", js: "js/script.js" };
  const ONDE_PADRAO = {
    html: "Cole no index.html, dentro do <body>, no lugar onde o elemento deve aparecer.",
    css: "Cole no final do css/estilo.css.",
    js: "Cole no final do js/script.js.",
  };
  let contador = 0;   // garante ids únicos quando o mesmo painel aparece duas vezes

  /* ---------- Copiar para a área de transferência (com plano B) ---------- */
  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    // Plano B para quando o navegador bloqueia a área de transferência
    return new Promise(function (resolver, rejeitar) {
      const area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const deu = document.execCommand("copy");
      area.remove();
      deu ? resolver() : rejeitar();
    });
  }

  /* ---------- Monta um painel ---------- */
  function montarPainel(id, mostrarLinkExemplo) {
    const trecho = dados.trechos[id];
    if (!trecho) {
      console.warn("Trecho de código não encontrado:", id);
      return null;
    }
    contador++;
    const prefixo = "cod-" + id + "-" + contador;
    const linguagens = ["html", "css", "js"].filter(function (l) { return trecho[l]; });

    const painel = document.createElement("details");
    painel.className = "codigo-painel";
    painel.dataset.busca = (trecho.titulo + " " + trecho.nota + " " + id).toLowerCase();

    // Linha que abre e fecha
    const resumo = document.createElement("summary");
    resumo.className = "codigo-resumo";
    const rotulo = document.createElement("span");
    rotulo.className = "codigo-rotulo";
    rotulo.textContent = "Ver código";
    const titulo = document.createElement("span");
    titulo.className = "codigo-titulo";
    titulo.textContent = trecho.titulo;
    const quais = document.createElement("span");
    quais.className = "codigo-linguagens";
    linguagens.forEach(function (l) {
      const selo = document.createElement("span");
      selo.className = "codigo-selo codigo-selo-" + l;
      selo.textContent = l === "js" ? "JS" : NOMES[l];
      quais.appendChild(selo);
    });
    resumo.append(rotulo, titulo, quais);
    painel.appendChild(resumo);

    const corpo = document.createElement("div");
    corpo.className = "codigo-corpo";

    const nota = document.createElement("p");
    nota.className = "codigo-nota";
    nota.textContent = trecho.nota;
    corpo.appendChild(nota);

    // Links: a demo (só este código, numa página em branco) e o exemplo no Catálogo
    const links = document.createElement("p");
    links.className = "codigo-links";
    const demo = document.createElement("a");
    demo.href = "demos/" + id + ".html";
    demo.textContent = "Abrir a demo deste código";
    links.appendChild(demo);
    if (mostrarLinkExemplo && trecho.exemplo) {
      const exemplo = document.createElement("a");
      exemplo.href = trecho.exemplo;
      exemplo.textContent = "Ver no Catálogo";
      links.appendChild(exemplo);
    }
    corpo.appendChild(links);

    // Abas HTML / CSS / JS
    const abas = document.createElement("div");
    abas.className = "codigo-abas";
    abas.setAttribute("role", "tablist");
    abas.setAttribute("aria-label", "Linguagens de " + trecho.titulo);
    corpo.appendChild(abas);

    const botoes = [];
    const paineis = [];

    linguagens.forEach(function (l, i) {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "codigo-aba";
      botao.id = prefixo + "-aba-" + l;
      botao.setAttribute("role", "tab");
      botao.setAttribute("aria-controls", prefixo + "-painel-" + l);
      botao.setAttribute("aria-selected", String(i === 0));
      if (i !== 0) botao.tabIndex = -1;
      botao.textContent = (i + 1) + ". " + NOMES[l];
      abas.appendChild(botao);
      botoes.push(botao);

      const area = document.createElement("div");
      area.className = "codigo-area";
      area.id = prefixo + "-painel-" + l;
      area.setAttribute("role", "tabpanel");
      area.setAttribute("aria-labelledby", botao.id);
      area.hidden = i !== 0;

      const topo = document.createElement("div");
      topo.className = "codigo-topo";
      const onde = document.createElement("p");
      onde.className = "codigo-onde";
      const arquivo = document.createElement("strong");
      arquivo.textContent = ARQUIVOS[l];
      onde.append(arquivo, " ", (trecho.onde && trecho.onde[l]) || ONDE_PADRAO[l]);
      const copiar = document.createElement("button");
      copiar.type = "button";
      copiar.className = "codigo-copiar";
      copiar.textContent = "Copiar " + NOMES[l];
      copiar.addEventListener("click", function () {
        copiarTexto(trecho[l]).then(function () {
          copiar.textContent = "Copiado ✓";
          copiar.classList.add("copiado");
        }).catch(function () {
          copiar.textContent = "Selecione e use Ctrl + C";
        });
        setTimeout(function () {
          copiar.textContent = "Copiar " + NOMES[l];
          copiar.classList.remove("copiado");
        }, 2000);
      });
      topo.append(onde, copiar);

      const pre = document.createElement("pre");
      pre.className = "codigo-pre";
      pre.tabIndex = 0;   // dá para rolar o código pelo teclado
      const code = document.createElement("code");
      code.textContent = trecho[l];   // textContent: o código aparece como texto, não é executado
      pre.appendChild(code);

      area.append(topo, pre);
      corpo.appendChild(area);
      paineis.push(area);
    });

    function ativar(i) {
      botoes.forEach(function (b, k) {
        b.setAttribute("aria-selected", String(k === i));
        b.tabIndex = k === i ? 0 : -1;
        paineis[k].hidden = k !== i;
      });
    }
    botoes.forEach(function (b, i) {
      b.addEventListener("click", function () { ativar(i); });
      b.addEventListener("keydown", function (evento) {
        let novo = null;
        if (evento.key === "ArrowRight") novo = (i + 1) % botoes.length;
        if (evento.key === "ArrowLeft") novo = (i - 1 + botoes.length) % botoes.length;
        if (novo !== null) {
          ativar(novo);
          botoes[novo].focus();
        }
      });
    });

    if (linguagens.length > 1) {
      const lembrete = document.createElement("p");
      lembrete.className = "codigo-lembrete";
      lembrete.textContent = "Copie as " + linguagens.length + " abas, cada uma no seu arquivo. Faltando uma, a funcionalidade não funciona.";
      corpo.appendChild(lembrete);
    }

    painel.appendChild(corpo);
    return painel;
  }

  /* ---------- Painéis soltos pela página: <div data-codigo="id"> ---------- */
  document.querySelectorAll("[data-codigo]").forEach(function (lugar) {
    const painel = montarPainel(lugar.dataset.codigo, false);
    if (painel) lugar.appendChild(painel);
  });

  /* ---------- Página codigos.html: todos os painéis, agrupados ---------- */
  const lista = document.getElementById("lista-codigos");
  if (lista) {
    let grupoAtual = null;
    let secao = null;
    dados.ordem.forEach(function (id) {
      const trecho = dados.trechos[id];
      if (trecho.grupo !== grupoAtual) {
        grupoAtual = trecho.grupo;
        secao = document.createElement("section");
        secao.className = "codigo-grupo";
        const h2 = document.createElement("h2");
        h2.className = "codigo-grupo-titulo";
        h2.textContent = grupoAtual;
        secao.appendChild(h2);
        lista.appendChild(secao);
      }
      secao.appendChild(montarPainel(id, true));
    });

    const filtro = document.getElementById("filtro-codigos");
    const contagem = document.getElementById("contagem-codigos");
    function filtrar() {
      const termo = filtro ? filtro.value.toLowerCase().trim() : "";
      let visiveis = 0;
      lista.querySelectorAll(".codigo-painel").forEach(function (p) {
        const combina = p.dataset.busca.includes(termo);
        p.hidden = !combina;
        if (combina) visiveis++;
      });
      lista.querySelectorAll(".codigo-grupo").forEach(function (g) {
        g.hidden = !g.querySelector(".codigo-painel:not([hidden])");
      });
      if (contagem) {
        contagem.textContent = visiveis === 0 ? "Nenhum código encontrado." : visiveis + (visiveis === 1 ? " código" : " códigos");
      }
    }
    if (filtro) filtro.addEventListener("input", filtrar);
    filtrar();
  }
})();
