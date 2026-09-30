/*
  trilha.js — FERRAMENTA DO CATÁLOGO (os alunos não precisam copiar este arquivo)

  Usado nas páginas da trilha "Passo a passo". Faz três coisas:
  1. Botão "Copiar" das caixas de terminal: copia só os comandos, sem o "$" e sem os comentários.
  2. Caixas "Pronto quando": guarda no navegador (localStorage) o que o aluno marcou.
  3. Mostra o progresso: no mapa da trilha, em cada página, e na página inicial da trilha.
*/
"use strict";

(function () {
  // "trilha2:" na trilha ("2": a ordem dos passos mudou); as páginas de projetos usam
  // <body data-prefixo="projeto:"> para guardar o progresso separado.
  const PREFIXO = document.body.dataset.prefixo || "trilha2:";

  /* ---------- Guardar e ler do navegador sem quebrar a página ---------- */
  function ler(chave) {
    try {
      return localStorage.getItem(PREFIXO + chave);
    } catch (erro) {
      return null;
    }
  }
  function gravar(chave, valor) {
    try {
      if (valor === null) localStorage.removeItem(PREFIXO + chave);
      else localStorage.setItem(PREFIXO + chave, valor);
    } catch (erro) {}
    // Logado no sistema? O progresso também vai para a conta (plataforma.js)
    if (window.Plataforma) window.Plataforma.salvarProgresso(PREFIXO + chave, valor);
  }

  // Quantos itens de um passo estão marcados
  function feitosNoPasso(numero, total) {
    let feitos = 0;
    for (let i = 1; i <= total; i++) {
      if (ler("passo-" + numero + "-" + i) === "1") feitos++;
    }
    return feitos;
  }

  /* ---------- 1. Copiar comandos ---------- */
  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    return new Promise(function (resolver, rejeitar) {
      const area = document.createElement("textarea");
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const deu = document.execCommand("copy");
      area.remove();
      deu ? resolver() : rejeitar();
    });
  }

  document.querySelectorAll(".terminal").forEach(function (caixa) {
    const botao = caixa.querySelector(".terminal-copiar");
    if (!botao) return;
    botao.addEventListener("click", function () {
      const comandos = Array.from(caixa.querySelectorAll(".t-cmd")).map(function (c) { return c.textContent; });
      copiarTexto(comandos.join("\n")).then(function () {
        botao.textContent = "Copiado ✓";
        botao.classList.add("copiado");
      }).catch(function () {
        botao.textContent = "Selecione e copie";
      });
      setTimeout(function () {
        botao.textContent = "Copiar";
        botao.classList.remove("copiado");
      }, 2000);
    });
  });

  /* ---------- 2. Caixas "Pronto quando" ---------- */
  function atualizarMapa() {
    document.querySelectorAll(".trilha-mapa a[data-passo]").forEach(function (link) {
      const n = link.dataset.passo;
      const total = Number(link.dataset.total);
      const completo = total > 0 && feitosNoPasso(n, total) === total;
      link.classList.toggle("feito", completo);
      if (completo) link.setAttribute("title", "Passo completo");
      else link.removeAttribute("title");
    });
  }

  document.querySelectorAll("[data-progresso]").forEach(function (caixa) {
    const chave = caixa.dataset.progresso;
    caixa.checked = ler(chave) === "1";
    caixa.addEventListener("change", function () {
      gravar(chave, caixa.checked ? "1" : null);
      atualizarMapa();
      atualizarPronto();
    });
  });

  // Quando todos os itens da página estão marcados, a caixa fica verde
  function atualizarPronto() {
    const lista = document.querySelector(".pronto-quando ul");
    if (!lista) return;
    const caixas = lista.querySelectorAll("[data-progresso]");
    const todas = Array.from(caixas).every(function (c) { return c.checked; });
    lista.closest(".pronto-quando").classList.toggle("completo", caixas.length > 0 && todas);
  }

  atualizarMapa();
  atualizarPronto();

  // Quando o progresso da conta chega do servidor, redesenha as marcações
  document.addEventListener("plataforma:progresso", function () {
    document.querySelectorAll("[data-progresso]").forEach(function (caixa) {
      caixa.checked = ler(caixa.dataset.progresso) === "1";
    });
    atualizarMapa();
    atualizarPronto();
    if (typeof atualizarInicio === "function" && cartoes.length > 0) atualizarInicio();
  });

  /* ---------- 3. Página inicial da trilha ---------- */
  const cartoes = document.querySelectorAll(".trilha-card-progresso");
  const geral = document.getElementById("progresso-geral");

  function atualizarInicio() {
    let completos = 0;
    cartoes.forEach(function (cartao) {
      const n = cartao.dataset.passo;
      const total = Number(cartao.dataset.total);
      const feitos = feitosNoPasso(n, total);
      cartao.querySelector(".feitos").textContent = feitos;
      cartao.querySelector(".barrinha span").style.width = (total ? (feitos / total) * 100 : 0) + "%";
      const completo = total > 0 && feitos === total;
      cartao.closest(".trilha-card").classList.toggle("feito", completo);
      if (completo) completos++;
    });
    if (geral) {
      // Na página de projetos: <p id="progresso-geral" data-item="projeto" data-fim="...">
      const item = geral.dataset.item || "passo";
      if (completos === 0) geral.textContent = "Nenhum " + item + " completo ainda.";
      else if (completos === cartoes.length) geral.textContent = geral.dataset.fim || ("Todos os " + completos + " passos completos. Parabéns: o seu site está no ar!");
      else geral.textContent = item.charAt(0).toUpperCase() + item.slice(1) + "s completos: " + completos + " de " + cartoes.length + ".";
    }
  }

  if (cartoes.length > 0) {
    atualizarInicio();

    // Apagar o progresso: pede um segundo clique para confirmar
    const apagar = document.getElementById("apagar-progresso");
    let confirmando = false;
    let espera;
    if (apagar) {
      apagar.addEventListener("click", function () {
        if (!confirmando) {
          confirmando = true;
          apagar.textContent = "Clique de novo para apagar tudo";
          espera = setTimeout(function () {
            confirmando = false;
            apagar.textContent = "Apagar o meu progresso";
          }, 4000);
          return;
        }
        clearTimeout(espera);
        try {
          Object.keys(localStorage).forEach(function (k) {
            if (k.indexOf(PREFIXO) === 0) {
              localStorage.removeItem(k);
              if (window.Plataforma) window.Plataforma.salvarProgresso(k, null);
            }
          });
        } catch (erro) {}
        confirmando = false;
        apagar.textContent = "Progresso apagado";
        atualizarInicio();
        setTimeout(function () { apagar.textContent = "Apagar o meu progresso"; }, 2500);
      });
    }
  }
})();
