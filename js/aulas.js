/*
  aulas.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  Usado em três páginas:
    aulas.html        progresso de cada lição e módulo, revisões do dia e certificados
    revisar.html      lista os exercícios que "venceram" hoje (revisão espaçada)
    formacao.html  mostra e confere um certificado pelo código
*/
"use strict";

(function () {
  const P = window.Plataforma;
  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }
  function ler(chave) { try { return localStorage.getItem("aula:" + chave); } catch (e) { return null; } }
  function hoje() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dataBr(iso) { const p = iso.split("-"); return p[2] + "/" + p[1]; }

  function vencidos(indice) {
    const lista = [];
    let proxima = null;
    indice.modulos.forEach(function (m) {
      m.licoes.forEach(function (l) {
        for (let n = 1; n <= l.exercicios; n++) {
          let r = null;
          try { r = JSON.parse(ler(l.id + ":ex:" + n) || "null"); } catch (e) { r = null; }
          if (!r || !r.p) continue;
          if (r.p <= hoje()) lista.push({ modulo: m, licao: l, n: n });
          else if (!proxima || r.p < proxima) proxima = r.p;
        }
      });
    });
    return { lista: lista, proxima: proxima };
  }

  async function indice() {
    const r = await fetch("aulas-indice.json", { cache: "no-cache" });
    return r.json();
  }

  /* ---------- aulas.html ---------- */
  async function paginaAulas() {
    const idx = await indice();
    function pintar() {
      idx.modulos.forEach(function (m) {
        let feitas = 0;
        m.licoes.forEach(function (l) {
          const item = document.querySelector('.aula-item[data-licao="' + l.id + '"]');
          if (!item) return;
          const feita = ler(l.id + ":concluida"), vista = ler(l.id + ":visto");
          if (feita) feitas++;
          item.classList.toggle("aula-feita", !!feita);
          item.classList.toggle("aula-comecada", !feita && !!vista);
          item.querySelector(".aula-estado").textContent = feita ? "✓" : vista ? "…" : "";
          item.querySelector("a").setAttribute("aria-label", l.titulo + (feita ? " (concluída)" : vista ? " (começada)" : ""));
        });
        const prog = document.querySelector('.modulo-progresso[data-modulo="' + m.numero + '"]');
        if (prog && m.licoes.length) prog.textContent = feitas + " de " + m.licoes.length + " lições concluídas";
      });
      const v = vencidos(idx);
      const aviso = document.getElementById("aulas-revisao");
      aviso.textContent = v.lista.length ? v.lista.length + " exercício(s) para revisar hoje."
        : v.proxima ? "Nada para revisar hoje. Próxima revisão: " + dataBr(v.proxima) + "." : "As revisões aparecem aqui depois que você fizer os exercícios.";
    }
    pintar();
    document.addEventListener("plataforma:progresso", pintar);

    if (!P) return;
    const eu = await P.eu();
    if (!eu.logado) return;
    try {
      const certs = await P.api("/api/estudos/certificados");
      if (!certs.length) return;
      const lugar = document.getElementById("meus-certificados");
      lugar.append(el("h2", "", "Meus certificados"));
      const ul = el("ul", "certificados-lista");
      certs.forEach(function (c) {
        const li = el("li");
        const a = el("a", "", "Módulo " + c.modulo + " · " + c.titulo + " (nota " + c.nota + "%)");
        a.href = "formacao.html?c=" + encodeURIComponent(c.codigo);
        li.appendChild(a);
        ul.appendChild(li);
      });
      lugar.appendChild(ul);
    } catch (e) { /* sem certificados */ }
  }

  /* ---------- revisar.html ---------- */
  async function paginaRevisar() {
    const idx = await indice();
    const lugar = document.getElementById("revisao");
    function pintar() {
      lugar.textContent = "";
      const v = vencidos(idx);
      if (!v.lista.length) {
        lugar.append(el("p", "revisao-vazia", v.proxima ? "Nada para revisar hoje. A próxima revisão é em " + dataBr(v.proxima) + "." :
          "Ainda não há revisões. Faça os exercícios das lições: os que você errar voltam aqui no dia seguinte; os que acertar, em 3, 7, 21 e 60 dias."));
        const a = el("a", "botao botao-primario", "Ir para as aulas"); a.href = "aulas.html";
        lugar.appendChild(a);
        return;
      }
      lugar.append(el("p", "", v.lista.length + " exercício(s) para hoje. Tente responder sem reler a lição antes: o esforço de lembrar é o que fixa."));
      const porLicao = {};
      v.lista.forEach(function (x) { (porLicao[x.licao.id] = porLicao[x.licao.id] || { licao: x.licao, modulo: x.modulo, ns: [] }).ns.push(x.n); });
      const ul = el("ul", "revisao-lista");
      Object.keys(porLicao).forEach(function (id) {
        const g = porLicao[id];
        const li = el("li");
        const a = el("a", "", "Módulo " + g.modulo.numero + " · " + g.licao.titulo);
        a.href = id + ".html?revisar=1#ex-" + g.ns[0];
        li.append(a, el("span", "revisao-qtd", " — exercício(s) " + g.ns.join(", ")));
        ul.appendChild(li);
      });
      lugar.appendChild(ul);
    }
    pintar();
    document.addEventListener("plataforma:progresso", pintar);
  }

  /* ---------- formacao.html ---------- */
  async function paginaCertificado() {
    const lugar = document.getElementById("certificado");
    const codigo = new URLSearchParams(location.search).get("c") || "";
    const form = document.getElementById("form-conferir");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      location.search = "?c=" + encodeURIComponent(document.getElementById("codigo-cert").value.trim().toUpperCase());
    });
    if (!codigo) return;
    lugar.textContent = "Conferindo...";
    let r;
    try {
      const resp = await fetch("/api/certificados/" + encodeURIComponent(codigo));
      if (resp.status === 404) { lugar.textContent = "Certificado não encontrado. Confira o código."; return; }
      if (!resp.ok) throw new Error();
      r = await resp.json();
    } catch (e) {
      lugar.textContent = "Não foi possível conferir agora (a conferência precisa da plataforma no ar).";
      return;
    }
    lugar.textContent = "";
    const cert = el("article", "certificado");
    cert.append(
      el("p", "cert-topo", "Catálogo do HTML · Prof. Alan Mateus"),
      el("h2", "cert-titulo", "Certificado"),
      el("p", "cert-texto", "Certificamos que"),
      el("p", "cert-nome", r.nome),
      el("p", "cert-texto", "concluiu o checkpoint do Módulo " + r.modulo + " — " + r.titulo + ", com aproveitamento de " + r.nota + "%, em " + r.data + "."),
      el("p", "cert-codigo", "Código de verificação: " + r.codigo + " · confira em " + location.origin + "/formacao.html"));
    const imprimir = el("button", "botao botao-primario nao-imprimir", "Imprimir ou salvar em PDF");
    imprimir.type = "button";
    imprimir.addEventListener("click", function () { window.print(); });
    lugar.append(cert, imprimir);
  }

  if (document.getElementById("aulas-revisao")) paginaAulas();
  if (document.getElementById("revisao")) paginaRevisar();
  if (document.getElementById("certificado")) paginaCertificado();
})();
