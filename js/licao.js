/*
  licao.js — FERRAMENTA DO SITE (os alunos não precisam copiar este arquivo)

  Dá vida às páginas de lição geradas pelo gerar-aulas.py:
    1. Exercícios corrigidos na hora (escolha, preveja, complete, ache o erro, ordene, código)
    2. Revisão espaçada: cada exercício ganha uma "próxima revisão" (1, 3, 7, 21 e 60 dias)
    3. Botão "Marcar lição como concluída"
    4. Dúvidas da lição (só com a plataforma no ar)
    5. Checkpoint: junta as respostas e manda para o servidor corrigir
  O progresso fica no navegador (chaves "aula:...") e, com login, também na conta.
*/
"use strict";

(function () {
  const corpo = document.body;
  const LICAO = corpo.dataset.licao || null;
  const CHECKPOINT = corpo.dataset.checkpoint || null;
  if (!LICAO && !CHECKPOINT) return;
  const P = window.Plataforma;
  const INTERVALOS = [0, 1, 3, 7, 21, 60]; // dias até a próxima revisão, por caixa (1 a 5)
  const REVISANDO = new URLSearchParams(location.search).get("revisar") === "1";

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }
  function html(tag, classe, conteudo) {
    const e = el(tag, classe);
    e.innerHTML = conteudo; // conteúdo gerado pelo professor (arquivos .md), não pelo aluno
    return e;
  }
  function botao(texto, classe) { const b = el("button", "botao " + (classe || "botao-contorno"), texto); b.type = "button"; return b; }

  /* ---------- Guardar ---------- */
  function ler(chave) { try { return localStorage.getItem("aula:" + chave); } catch (e) { return null; } }
  function gravar(chave, valor) {
    try { if (valor === null) localStorage.removeItem("aula:" + chave); else localStorage.setItem("aula:" + chave, valor); } catch (e) {}
    if (P) P.salvarProgresso("aula:" + chave, valor);
  }
  function hoje(maisDias) {
    const d = new Date();
    d.setDate(d.getDate() + (maisDias || 0));
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function registroEx(n) {
    try { return JSON.parse(ler(LICAO + ":ex:" + n) || "null"); } catch (e) { return null; }
  }
  // Primeira resposta do exercício nesta visita: sobe de caixa se acertou de primeira; volta para a 1 se errou
  function registrar(n, acertouDePrimeira) {
    const r = registroEx(n) || { c: 0, t: 0, a: 0 };
    r.t = (r.t || 0) + 1;
    // Caixas: 1 = volta amanhã, 2 = em 3 dias, 3 = 7 dias, 4 = 21 dias, 5 = 60 dias
    r.c = acertouDePrimeira ? Math.min(5, Math.max(1, r.c || 0) + 1) : 1;
    r.a = acertouDePrimeira || r.a ? 1 : 0;
    r.u = acertouDePrimeira ? 1 : 0;
    r.p = hoje(INTERVALOS[r.c]);
    gravar(LICAO + ":ex:" + n, JSON.stringify(r));
  }

  // Mesma regra do servidor (ServicoEstudos.Normalizar): espaços extras não contam;
  // no "preveja", aspas em volta da resposta também não (quem escreve "71" ou 71 acertou).
  function normalizar(t, tirarAspas) {
    let s = String(t || "").trim().replace(/\s+/g, " ");
    if (tirarAspas) s = s.replace(/^["'`](.*)["'`]$/, "$1");
    return s.replace(/;$/, "");
  }

  /* ---------- Exercícios ---------- */
  const respostasCheckpoint = [];

  document.querySelectorAll(".exercicio").forEach(function (caixa) {
    const n = Number(caixa.dataset.numero);
    const d = JSON.parse(caixa.querySelector(".exercicio-dados").textContent);
    const area = caixa.querySelector(".exercicio-area");
    const retorno = el("div", "exercicio-retorno");
    retorno.setAttribute("aria-live", "polite");
    let primeira = true, erros = 0, terminado = false;

    if (!CHECKPOINT) {
      const reg = registroEx(n);
      if (reg && reg.p && reg.p <= hoje() && REVISANDO) caixa.classList.add("ex-vencido");
      if (reg && reg.a) caixa.classList.add("ex-ja-acertou");
    }

    function mostrar(texto, tipo) {
      retorno.className = "exercicio-retorno " + (tipo ? "retorno-" + tipo : "");
      retorno.innerHTML = texto;
    }
    function acertou(extra) {
      if (terminado) return;
      terminado = true;
      if (primeira) registrar(n, true);
      primeira = false;
      caixa.classList.add("ex-certo");
      mostrar("<strong>Certo!</strong> " + (extra || "") + (d.explicacao ? " " + d.explicacao : ""), "ok");
    }
    function errou(texto) {
      if (primeira) registrar(n, false);
      primeira = false;
      erros++;
      mostrar("<strong>Ainda não.</strong> " + (texto || "Tente de novo.") + (d.dica && erros === 1 ? "" : ""), "erro");
      if (erros >= 2 && verResposta && !terminado) verResposta.hidden = false;
    }

    // Botões comuns: dica e ver resposta
    const rodape = el("div", "exercicio-rodape");
    let verResposta = null;
    if (!CHECKPOINT && d.dica) {
      const bDica = botao("Ver dica", "botao-texto");
      const caixaDica = html("p", "exercicio-dica", "<strong>Dica:</strong> " + d.dica);
      caixaDica.hidden = true;
      bDica.addEventListener("click", function () { caixaDica.hidden = false; bDica.hidden = true; });
      rodape.append(bDica, caixaDica);
    }

    if (d.tipo === "escolha") {
      const lista = el("div", "ex-opcoes");
      lista.setAttribute("role", CHECKPOINT ? "radiogroup" : "group");
      d.opcoes.forEach(function (o, i) {
        const b = el("button", "ex-opcao");
        b.type = "button";
        b.innerHTML = o.html;
        b.addEventListener("click", function () {
          if (CHECKPOINT) {
            lista.querySelectorAll(".ex-opcao").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
            b.setAttribute("aria-pressed", "true");
            respostasCheckpoint[n - 1] = i;
            return;
          }
          if (terminado) return;
          if (o.certa) { b.classList.add("opcao-certa"); acertou(o.retorno); }
          else { b.classList.add("opcao-errada"); b.disabled = true; errou(o.retorno || "Essa não é a resposta."); }
        });
        lista.appendChild(b);
      });
      area.appendChild(lista);
    }

    else if (d.tipo === "preveja") {
      const linha = el("div", "ex-linha-resposta");
      const rot = el("label", "", "O que aparece?");
      const campo = el("input", "ex-campo");
      campo.id = "ex-" + n + "-campo";
      rot.htmlFor = campo.id;
      campo.autocomplete = "off";
      campo.spellcheck = false;
      linha.append(rot, campo);
      area.appendChild(linha);
      if (CHECKPOINT) {
        campo.addEventListener("input", function () { respostasCheckpoint[n - 1] = campo.value; });
      } else {
        const b = botao("Conferir", "botao-primario");
        linha.appendChild(b);
        const conferir = function () {
          if (terminado || !campo.value.trim()) return;
          const ok = d.respostas.some(function (r) { return normalizar(r, true) === normalizar(campo.value, true); });
          ok ? acertou() : errou("Rode o código na cabeça, linha por linha, anotando o valor de cada variável.");
        };
        b.addEventListener("click", conferir);
        campo.addEventListener("keydown", function (e) { if (e.key === "Enter") conferir(); });
        verResposta = botao("Ver a resposta", "botao-texto");
        verResposta.hidden = true;
        verResposta.addEventListener("click", function () {
          terminado = true; verResposta.hidden = true;
          mostrar("<strong>Resposta:</strong> " + escapar(d.respostas[0]) + (d.explicacao ? " " + d.explicacao : "") + " Este exercício volta na revisão.", "revela");
        });
        rodape.appendChild(verResposta);
      }
    }

    else if (d.tipo === "complete") {
      const pre = el("pre", "ex-complete codigo-pre");
      const code = el("code");
      const campos = [];
      d.codigo.split("___").forEach(function (pedaco, i, todos) {
        code.appendChild(document.createTextNode(pedaco));
        if (i < todos.length - 1) {
          const c = el("input", "ex-lacuna");
          c.setAttribute("aria-label", "Lacuna " + (i + 1));
          c.autocomplete = "off"; c.spellcheck = false;
          c.size = 6; // tamanho fixo: não dá pista do tamanho da resposta
          c.addEventListener("input", function () {
            c.size = Math.max(6, c.value.length + 1);
            if (CHECKPOINT) respostasCheckpoint[n - 1] = campos.map(function (x) { return x.value; });
          });
          campos.push(c);
          code.appendChild(c);
        }
      });
      pre.appendChild(code);
      area.appendChild(pre);
      if (!CHECKPOINT) {
        const b = botao("Conferir", "botao-primario");
        area.appendChild(b);
        b.addEventListener("click", function () {
          if (terminado) return;
          let tudo = true;
          campos.forEach(function (c, i) {
            const ok = (d.respostas[i] || []).some(function (r) { return normalizar(r) === normalizar(c.value); });
            c.classList.toggle("lacuna-certa", ok); c.classList.toggle("lacuna-errada", !ok);
            if (!ok) tudo = false;
          });
          tudo ? acertou() : errou("As lacunas em vermelho ainda não estão certas.");
        });
        verResposta = botao("Ver a resposta", "botao-texto");
        verResposta.hidden = true;
        verResposta.addEventListener("click", function () {
          terminado = true; verResposta.hidden = true;
          campos.forEach(function (c, i) { c.value = d.respostas[i][0]; c.size = c.value.length + 1; c.classList.remove("lacuna-errada"); });
          mostrar("<strong>Resposta preenchida.</strong> " + (d.explicacao || "") + " Este exercício volta na revisão.", "revela");
        });
        rodape.appendChild(verResposta);
      }
    }

    else if (d.tipo === "ache-erro") {
      const lista = el("ol", "ex-linhas codigo-pre");
      d.linhas.forEach(function (t, i) {
        const li = el("li");
        const b = el("button", "ex-linha", t || " ");
        b.type = "button";
        b.setAttribute("aria-label", "Linha " + (i + 1) + ": " + t);
        b.addEventListener("click", function () {
          if (CHECKPOINT) {
            lista.querySelectorAll(".ex-linha").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
            b.setAttribute("aria-pressed", "true");
            respostasCheckpoint[n - 1] = i + 1;
            return;
          }
          if (terminado) return;
          if (i + 1 === d.linha) { b.classList.add("linha-certa"); acertou("O erro está na linha " + d.linha + "."); }
          else { b.classList.add("linha-errada"); errou("A linha " + (i + 1) + " está certa. Procure outra."); }
        });
        li.appendChild(b);
        lista.appendChild(li);
      });
      area.append(el("p", "ex-instrucao", "Clique na linha que tem o erro."), lista);
      if (!CHECKPOINT) {
        verResposta = botao("Ver a resposta", "botao-texto");
        verResposta.hidden = true;
        verResposta.addEventListener("click", function () {
          terminado = true; verResposta.hidden = true;
          lista.children[d.linha - 1].firstChild.classList.add("linha-certa");
          mostrar("<strong>O erro está na linha " + d.linha + ".</strong> " + (d.explicacao || "") + " Este exercício volta na revisão.", "revela");
        });
        rodape.appendChild(verResposta);
      }
    }

    else if (d.tipo === "ordene") {
      const lista = el("ol", "ex-ordem");
      function atualizar() {
        if (CHECKPOINT) respostasCheckpoint[n - 1] = Array.from(lista.children).map(function (li) { return li.dataset.texto; });
      }
      d.linhas.forEach(function (t) {
        const li = el("li", "ex-ordem-item");
        li.dataset.texto = t;
        const cod = el("code", "", t);
        const sobe = el("button", "ex-mover", "↑"); sobe.type = "button"; sobe.setAttribute("aria-label", "Subir: " + t);
        const desce = el("button", "ex-mover", "↓"); desce.type = "button"; desce.setAttribute("aria-label", "Descer: " + t);
        sobe.addEventListener("click", function () { if (li.previousElementSibling) lista.insertBefore(li, li.previousElementSibling); sobe.focus(); atualizar(); });
        desce.addEventListener("click", function () { if (li.nextElementSibling) lista.insertBefore(li.nextElementSibling, li); desce.focus(); atualizar(); });
        li.append(sobe, desce, cod);
        lista.appendChild(li);
      });
      atualizar();
      area.append(el("p", "ex-instrucao", "Use ↑ e ↓ para pôr as linhas na ordem em que o programa precisa delas."), lista);
      if (!CHECKPOINT) {
        const b = botao("Conferir", "botao-primario");
        area.appendChild(b);
        b.addEventListener("click", function () {
          if (terminado) return;
          const atual = Array.from(lista.children).map(function (li) { return li.dataset.texto; });
          let certas = 0;
          atual.forEach(function (t, i) {
            const ok = t === d.ordem[i];
            lista.children[i].classList.toggle("ordem-certa", ok);
            lista.children[i].classList.toggle("ordem-errada", !ok);
            if (ok) certas++;
          });
          certas === atual.length ? acertou() : errou(certas + " de " + atual.length + " linhas no lugar certo (em verde).");
        });
        verResposta = botao("Ver a resposta", "botao-texto");
        verResposta.hidden = true;
        verResposta.addEventListener("click", function () {
          terminado = true; verResposta.hidden = true;
          d.ordem.forEach(function (t) {
            const li = Array.from(lista.children).find(function (x) { return x.dataset.texto === t && !x.classList.contains("ordem-final"); });
            li.classList.add("ordem-final"); li.classList.remove("ordem-errada"); lista.appendChild(li);
          });
          mostrar("<strong>Esta é a ordem certa.</strong> " + (d.explicacao || "") + " Este exercício volta na revisão.", "revela");
        });
        rodape.appendChild(verResposta);
      }
    }

    else if (d.tipo === "codigo") {
      window.Laboratorio.editor(area, d.arquivos, {
        testes: d.testes,
        aoTerminar: function (ok) {
          if (terminado) return;
          if (ok) acertou("Todos os testes passaram.");
          else errou("Leia os testes marcados com ✗: cada um diz o que ainda falta.");
        },
      });
    }

    caixa.append(retorno, rodape);
  });

  function escapar(t) { const e = document.createElement("span"); e.textContent = t; return e.innerHTML; }

  /* ---------- Revisão: aviso no topo ---------- */
  if (REVISANDO && LICAO) {
    const vencidos = document.querySelectorAll(".ex-vencido").length;
    const faixa = el("p", "aviso aviso-ok revisao-faixa", vencidos
      ? "Revisão: refaça os " + vencidos + " exercício(s) destacados. Responder sem olhar a lição é o que fixa o conteúdo."
      : "Nada para revisar nesta lição hoje.");
    const alvo = document.querySelector(".licao-corpo");
    if (alvo) alvo.prepend(faixa);
    const primeiro = document.querySelector(".ex-vencido");
    if (primeiro && !location.hash) setTimeout(function () { primeiro.scrollIntoView({ block: "center" }); }, 300);
  }

  /* ---------- Lição: visto e concluída ---------- */
  if (LICAO) {
    if (!ler(LICAO + ":visto")) gravar(LICAO + ":visto", hoje());
    const bConcluir = document.getElementById("btn-concluir");
    const estado = document.getElementById("estado-concluir");
    function pintar() {
      const feita = ler(LICAO + ":concluida");
      bConcluir.textContent = feita ? "Concluída ✓ (clique para desmarcar)" : "Marcar lição como concluída";
      bConcluir.classList.toggle("botao-contorno", !!feita);
      bConcluir.classList.toggle("botao-primario", !feita);
    }
    if (bConcluir) {
      pintar();
      bConcluir.addEventListener("click", function () {
        const feita = ler(LICAO + ":concluida");
        gravar(LICAO + ":concluida", feita ? null : hoje());
        const total = Number(corpo.dataset.exercicios || 0);
        const feitos = document.querySelectorAll(".exercicio.ex-certo, .exercicio.ex-ja-acertou").length;
        estado.textContent = feita ? "" : (total && feitos < total ? "Marcada. Faltam " + (total - feitos) + " exercício(s): vale fazer antes de seguir." : "Boa! Siga para a próxima lição.");
        pintar();
      });
    }
    document.addEventListener("plataforma:progresso", function () { if (bConcluir) pintar(); });
  }

  /* ---------- Dúvidas ---------- */
  async function montarDuvidas() {
    const secao = document.getElementById("duvidas");
    if (!secao || !P) return;
    const eu = await P.eu();
    if (eu.semSistema) return; // site sem servidor (GitHub Pages): sem dúvidas
    secao.hidden = false;
    const lista = document.getElementById("duvidas-lista");
    if (!eu.logado) {
      lista.append(html("p", "", 'Tem dúvida nesta lição? <a href="formacao.html?volta=' + encodeURIComponent(location.pathname) + '">Entre na sua conta</a> para ver as respostas e perguntar.'));
      return;
    }
    async function carregar() {
      lista.textContent = "";
      let itens = [];
      try { itens = await P.api("/api/estudos/duvidas?licao=" + encodeURIComponent(LICAO)); } catch (e) {
        lista.appendChild(el("p", "", "Não foi possível carregar as dúvidas agora."));
        return;
      }
      if (!itens.length) lista.appendChild(el("p", "duvida-vazia", "Ninguém perguntou nada ainda. A sua pergunta, depois de respondida, ajuda os próximos alunos."));
      itens.forEach(function (x) {
        const art = el("article", "duvida" + (x.minha ? " duvida-minha" : ""));
        art.append(el("p", "duvida-pergunta", x.pergunta));
        if (x.resposta) {
          const r = el("div", "duvida-resposta");
          r.append(el("p", "duvida-quem", "Resposta" + (x.respondidaPor ? " de " + x.respondidaPor : "")), el("p", "", x.resposta));
          art.appendChild(r);
        } else {
          art.appendChild(el("p", "duvida-aguardando", "Sua pergunta está aguardando resposta. Você recebe um e-mail quando for respondida."));
        }
        lista.appendChild(art);
      });
    }
    const form = el("form", "duvida-form");
    const rot = el("label", "", "Sua dúvida");
    const txt = el("textarea");
    txt.id = "duvida-texto"; rot.htmlFor = txt.id; txt.rows = 3; txt.maxLength = 2000;
    txt.placeholder = "Diga o que você tentou e onde travou. Se for um erro, cole a mensagem.";
    const bEnviar = el("button", "botao botao-primario", "Enviar dúvida"); bEnviar.type = "submit";
    const aviso = el("p", "aviso"); aviso.hidden = true; aviso.setAttribute("role", "status");
    form.append(rot, txt, bEnviar, aviso);
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      try {
        const r = await P.carregando(bEnviar, function () { return P.api("/api/estudos/duvidas", "POST", { licao: LICAO, pergunta: txt.value }); });
        txt.value = "";
        P.aviso(aviso, r.mensagem, "ok");
        carregar();
      } catch (err) { P.aviso(aviso, err.message, "erro"); }
    });
    secao.appendChild(form);
    carregar();
  }
  if (LICAO) montarDuvidas();

  /* ---------- Checkpoint ---------- */
  if (CHECKPOINT) {
    const bEnviar = document.getElementById("btn-checkpoint");
    const res = document.getElementById("resultado-checkpoint");
    bEnviar.addEventListener("click", async function () {
      res.textContent = "";
      const total = document.querySelectorAll(".exercicio").length;
      const faltam = [];
      for (let i = 0; i < total; i++) if (respostasCheckpoint[i] === undefined || respostasCheckpoint[i] === "") faltam.push(i + 1);
      if (faltam.length && !confirm("Você não respondeu: " + faltam.join(", ") + ". Enviar mesmo assim?")) return;
      if (!P) { res.appendChild(el("p", "aviso aviso-erro", "O checkpoint precisa da plataforma no ar.")); return; }
      const eu = await P.eu();
      if (!eu.logado) { location.href = "formacao.html?volta=" + encodeURIComponent(location.pathname); return; }
      try {
        const r = await P.carregando(bEnviar, function () {
          const respostas = [];
          for (let i = 0; i < total; i++) respostas.push(respostasCheckpoint[i] === undefined ? null : respostasCheckpoint[i]);
          return P.api("/api/estudos/checkpoint/" + encodeURIComponent(CHECKPOINT), "POST", { respostas: respostas });
        });
        const caixa = el("div", "checkpoint-resultado " + (r.aprovado ? "cp-aprovado" : "cp-reprovado"));
        caixa.append(el("p", "cp-nota", "Nota: " + r.nota + "% (" + r.acertos + " de " + r.total + ")"),
          el("p", "", r.aprovado ? "Aprovado! O certificado do módulo está na sua conta." : "Ainda não foi desta vez: precisa de " + r.minima + "%. Revise as lições do módulo e os exercícios em Revisar hoje antes de tentar de novo. (Para ninguém descobrir as respostas por tentativa, as questões certas só aparecem na aprovação.)"));
        if (r.certificado) {
          const a = el("a", "botao botao-primario", "Ver o certificado");
          a.href = "formacao.html?c=" + encodeURIComponent(r.certificado);
          caixa.appendChild(a);
        }
        if (r.restantes !== undefined) caixa.appendChild(el("p", "ajuda", "Tentativas restantes nas próximas 24 horas: " + r.restantes + "."));
        res.appendChild(caixa);
        (r.questoes || []).forEach(function (q, i) {
          const ex = document.getElementById("ex-" + (i + 1));
          if (!ex) return;
          ex.classList.remove("ex-certo", "ex-errado");
          ex.classList.add(q.certa ? "ex-certo" : "ex-errado");
          let ret = ex.querySelector(".exercicio-retorno");
          ret.className = "exercicio-retorno " + (q.certa ? "retorno-ok" : "retorno-erro");
          ret.innerHTML = q.certa ? "<strong>Certa.</strong> " + (q.explicacao || "") : "<strong>Errada.</strong> Reveja a lição sobre isso antes de tentar de novo.";
        });
        res.scrollIntoView({ block: "center" });
      } catch (err) { res.appendChild(el("p", "aviso aviso-erro", err.message)); }
    });
  }
})();
