/*
  verificador.js — FERRAMENTA DO CATÁLOGO (os alunos não precisam copiar este arquivo)

  Lê a pasta do projeto que o aluno escolhe e confere:
    - pastas e nomes de arquivos;
    - cada HTML: <head>, h1, caminhos do CSS, do JS e das imagens, alt, ids, links do menu;
    - cada CSS: <style> perdido, chaves, caminhos dentro de url(...);
    - cada JS: <script> perdido, erro de sintaxe, ids que o código procura e não existem.

  Nada é enviado para a internet: os arquivos são lidos só no navegador.
  A função window.verificarProjeto(arquivos) faz a análise; a página só mostra o resultado.
*/
"use strict";

(function () {
  /* =================================================================
     1. FERRAMENTAS PEQUENAS
     ================================================================= */
  const EH_TEXTO = /\.(html?|css|js|json|txt|md|svg)$/i;
  const EXTERNO = /^(https?:)?\/\/|^(mailto|tel|data|javascript|blob):/i;

  function extensao(caminho) {
    const m = caminho.match(/\.([^./]+)$/);
    return m ? m[1].toLowerCase() : "";
  }
  function pastaDe(caminho) {
    const i = caminho.lastIndexOf("/");
    return i === -1 ? "" : caminho.slice(0, i);
  }
  // Número da linha de uma posição no texto
  function linhaDe(texto, posicao) {
    return texto.slice(0, posicao).split("\n").length;
  }
  // Resolve um caminho relativo ("../img/foto.jpg") a partir da pasta de um arquivo
  function resolver(pastaBase, relativo) {
    let limpo = relativo.split("#")[0].split("?")[0].trim();
    if (!limpo) return null;
    try { limpo = decodeURI(limpo); } catch (erro) {}
    const partes = limpo.startsWith("/") ? [] : (pastaBase ? pastaBase.split("/") : []);
    for (const pedaco of limpo.split("/")) {
      if (pedaco === "" || pedaco === ".") continue;
      if (pedaco === "..") {
        if (partes.length === 0) return { foraDaPasta: true };
        partes.pop();
      } else {
        partes.push(pedaco);
      }
    }
    return { caminho: partes.join("/") };
  }
  function tiraComentariosHtml(texto) {
    return texto.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
  }
  function tiraComentariosCss(texto) {
    return texto.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  }

  /* =================================================================
     2. A ANÁLISE
     arquivos: [{ caminho: "css/estilo.css", texto: "..." ou null, tamanho: 1234 }]
     ================================================================= */
  function verificarProjeto(arquivos) {
    const resultados = [];
    function anotar(grupo, status, titulo, detalhe, corrigir, link, itens) {
      resultados.push({ grupo, status, titulo, detalhe: detalhe || "", corrigir: corrigir || "", link: link || "", itens: itens || [] });
    }

    // Ignora a pasta .git e outras que não fazem parte do site
    arquivos = arquivos.filter((a) => !/(^|\/)(\.git|node_modules|\.vscode)(\/|$)/.test(a.caminho));

    const existe = new Set(arquivos.map((a) => a.caminho));
    const semCaixa = new Map(arquivos.map((a) => [a.caminho.toLowerCase(), a.caminho]));
    const porCaminho = new Map(arquivos.map((a) => [a.caminho, a]));

    // Confere se um arquivo referenciado existe; devolve null quando está tudo certo
    function conferirReferencia(pastaBase, relativo) {
      const r = resolver(pastaBase, relativo);
      if (!r) return null;
      if (r.foraDaPasta) return { problema: "fora", alvo: relativo };
      if (existe.has(r.caminho)) return null;
      const parecido = semCaixa.get(r.caminho.toLowerCase());
      if (parecido) return { problema: "maiuscula", alvo: r.caminho, real: parecido };
      return { problema: "falta", alvo: r.caminho };
    }
    function explicarReferencia(p) {
      if (p.problema === "maiuscula") return `"${p.alvo}" não existe, mas existe "${p.real}". No GitHub Pages, maiúsculas e minúsculas contam.`;
      if (p.problema === "fora") return `"${p.alvo}" aponta para fora da pasta do projeto.`;
      return `"${p.alvo}" não existe na pasta do projeto.`;
    }

    const htmls = arquivos.filter((a) => /\.html?$/i.test(a.caminho) && a.texto !== null);
    const csss = arquivos.filter((a) => extensao(a.caminho) === "css" && a.texto !== null);
    const jss = arquivos.filter((a) => extensao(a.caminho) === "js" && a.texto !== null);
    const usados = new Set();        // arquivos CSS e JS que algum HTML conecta
    const idsDoSite = new Set();     // todos os ids de todos os HTML

    /* ---------- Pastas e nomes ---------- */
    const G_PASTA = "Pastas e nomes de arquivos";
    if (existe.has("index.html")) {
      anotar(G_PASTA, "ok", "Existe um index.html na pasta principal");
    } else {
      const errado = arquivos.find((a) => a.caminho.toLowerCase() === "index.html");
      const dentro = arquivos.find((a) => /(^|\/)index\.html$/i.test(a.caminho));
      if (errado) {
        anotar(G_PASTA, "erro", "O arquivo principal precisa se chamar index.html, em minúsculas",
          `Encontrei "${errado.caminho}".`, "Renomeie para index.html. O GitHub Pages só abre index.html.", "passo-3-projeto.html#criar");
      } else if (dentro) {
        anotar(G_PASTA, "erro", "O index.html não está na pasta principal",
          `Ele está em "${dentro.caminho}". Parece que você escolheu a pasta de cima.`,
          "Escolha a pasta que tem o index.html dentro dela.", "passo-3-projeto.html#criar");
      } else {
        anotar(G_PASTA, "erro", "Não encontrei nenhum index.html",
          "Todo site precisa de um index.html: é a página que abre primeiro.", "Crie o index.html na pasta principal do projeto.", "passo-3-projeto.html#criar");
      }
    }
    const nomesRuins = arquivos.map((a) => a.caminho).filter((c) => /\s|[A-Z]|[^\x00-\x7F]/.test(c));
    if (nomesRuins.length) {
      anotar(G_PASTA, "aviso", "Nomes com espaço, maiúscula ou acento",
        "Funcionam no seu computador, mas costumam quebrar no GitHub Pages.",
        "Renomeie para minúsculas, sem espaço (use hífen) e sem acento. Depois corrija os caminhos no código.",
        "passo-3-projeto.html#fotos", nomesRuins);
    } else {
      anotar(G_PASTA, "ok", "Todos os nomes estão em minúsculas, sem espaço e sem acento");
    }
    const pesados = arquivos.filter((a) => /\.(jpe?g|png|gif|webp)$/i.test(a.caminho) && a.tamanho > 2 * 1024 * 1024);
    if (pesados.length) {
      anotar(G_PASTA, "aviso", "Imagens com mais de 2 MB",
        "Deixam o site lento, principalmente no celular.",
        "Diminua as fotos (por exemplo, para 1600 px de largura) antes de colocar no site.", "", pesados.map((a) => `${a.caminho} (${(a.tamanho / 1048576).toFixed(1)} MB)`));
    }

    /* ---------- Cada HTML ---------- */
    htmls.forEach(function (arq) {
      const G = "HTML: " + arq.caminho;
      const texto = arq.texto;
      const pasta = pastaDe(arq.caminho);
      const doc = new DOMParser().parseFromString(texto, "text/html");
      const semComent = tiraComentariosHtml(texto);

      doc.querySelectorAll("[id]").forEach((el) => idsDoSite.add(el.id));

      // <head>
      if (/^\s*(<!--[\s\S]*?-->\s*)*<!doctype html>/i.test(texto)) anotar(G, "ok", "Tem <!DOCTYPE html> na primeira linha");
      else anotar(G, "erro", "Falta o <!DOCTYPE html> na primeira linha", "Sem ele, o navegador entra num modo antigo e alguns tamanhos ficam errados.", "Coloque <!DOCTYPE html> como primeira linha do arquivo.", "passo-3-projeto.html#abrir");

      const lang = doc.documentElement.getAttribute("lang");
      if (lang) anotar(G, "ok", `Idioma definido (lang="${lang}")`);
      else anotar(G, "aviso", "Falta o idioma na tag <html>", "Leitores de tela usam o idioma para pronunciar o texto.", 'Escreva <html lang="pt-BR">.', "passo-3-projeto.html#abrir");

      if (doc.querySelector("meta[charset]")) anotar(G, "ok", "Tem <meta charset>");
      else anotar(G, "erro", "Falta <meta charset=\"UTF-8\">", "Sem ele, acentos podem virar símbolos estranhos.", 'Coloque <meta charset="UTF-8"> logo no começo do <head>.', "passo-3-projeto.html#abrir");

      if (doc.querySelector('meta[name="viewport"]')) anotar(G, "ok", "Tem <meta name=\"viewport\">");
      else anotar(G, "erro", "Falta o <meta name=\"viewport\">", "Sem ele, o celular mostra o site minúsculo.", 'Coloque <meta name="viewport" content="width=device-width, initial-scale=1.0"> no <head>.', "passo-5-css.html#celular");

      const titulo = doc.querySelector("title");
      if (titulo && titulo.textContent.trim()) anotar(G, "ok", `Título: "${titulo.textContent.trim()}"`);
      else anotar(G, "erro", "Falta o <title> (ou ele está vazio)", "É o texto da aba do navegador e do resultado no Google.", "Escreva o nome do site dentro de <title></title>, no <head>.", "passo-3-projeto.html#abrir");

      const h1s = doc.querySelectorAll("h1").length;
      if (h1s === 1) anotar(G, "ok", "Tem exatamente um <h1>");
      else if (h1s === 0) anotar(G, "erro", "Não tem nenhum <h1>", "O h1 é o título principal da página.", "Coloque um <h1> com o título do site, normalmente na primeira seção.", "passo-4-html.html#planejar");
      else anotar(G, "aviso", `Tem ${h1s} títulos <h1>`, "O ideal é um h1 por página; as seções usam h2.", "Troque os h1 extras por h2.", "passo-4-html.html#planejar");

      const faltamPartes = ["header", "nav", "main", "footer"].filter((t) => !doc.querySelector(t));
      if (faltamPartes.length === 0) anotar(G, "ok", "Tem <header>, <nav>, <main> e <footer>");
      else anotar(G, "aviso", "Faltam tags de estrutura", `Não encontrei: ${faltamPartes.map((t) => "<" + t + ">").join(", ")}.`, "Use as tags semânticas: elas ajudam o Google e os leitores de tela.", "codigos.html");

      // CSS conectado
      const linksCss = Array.from(doc.querySelectorAll('link[rel~="stylesheet"][href]')).map((l) => l.getAttribute("href"));
      const cssLocais = linksCss.filter((h) => !EXTERNO.test(h));
      if (cssLocais.length === 0) {
        anotar(G, "aviso", "Nenhum arquivo CSS conectado", "", 'Coloque <link rel="stylesheet" href="css/estilo.css"> no <head>.', "passo-3-projeto.html#abrir");
      }
      cssLocais.forEach(function (href) {
        const p = conferirReferencia(pasta, href);
        const r = resolver(pasta, href);
        if (r && r.caminho) usados.add(r.caminho);
        if (!p) anotar(G, "ok", `CSS conectado: ${href}`);
        else {
          if (p.real) usados.add(p.real);
          anotar(G, "erro", `O CSS "${href}" não foi encontrado`, explicarReferencia(p), "Deixe o href igual ao caminho real do arquivo, letra por letra.", "passo-3-projeto.html#live-server");
        }
      });

      // JS conectado
      doc.querySelectorAll("script[src]").forEach(function (s) {
        const src = s.getAttribute("src");
        if (EXTERNO.test(src)) return;
        const p = conferirReferencia(pasta, src);
        const r = resolver(pasta, src);
        if (r && r.caminho) usados.add(r.caminho);
        if (!p) anotar(G, "ok", `JavaScript conectado: ${src}`);
        else {
          if (p.real) usados.add(p.real);
          anotar(G, "erro", `O JavaScript "${src}" não foi encontrado`, explicarReferencia(p), "Deixe o src igual ao caminho real do arquivo, letra por letra.", "passo-3-projeto.html#live-server");
        }
        const noHead = s.closest("head") !== null;
        if (noHead && !s.hasAttribute("defer") && !s.hasAttribute("async") && s.getAttribute("type") !== "module") {
          anotar(G, "erro", `O <script src="${src}"> está no <head> sem defer`, "Ele vai rodar antes de a página existir e dar erro \"Cannot read properties of null\".", 'Acrescente defer: <script src="js/script.js" defer></script>.', "passo-6-js.html#erros");
        }
      });

      // Imagens: caminho e alt
      const semAlt = [];
      const imgsFaltando = [];
      for (const m of semComent.matchAll(/<img\b[^>]*>/gi)) {
        const tag = m[0];
        const linha = linhaDe(texto, m.index);
        if (!/\balt\s*=/i.test(tag)) semAlt.push(`linha ${linha}: ${tag.slice(0, 80)}`);
        const src = (tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i) || [])[1];
        if (src && !EXTERNO.test(src)) {
          const p = conferirReferencia(pasta, src);
          if (p) imgsFaltando.push(`linha ${linha}: ${explicarReferencia(p)}`);
        }
      }
      // Outras mídias: vídeo, áudio, legenda, poster
      for (const m of semComent.matchAll(/<(source|video|audio|track)\b[^>]*>/gi)) {
        for (const atr of ["src", "poster"]) {
          const valor = (m[0].match(new RegExp("\\b" + atr + "\\s*=\\s*[\"']([^\"']*)[\"']", "i")) || [])[1];
          if (valor && !EXTERNO.test(valor)) {
            const p = conferirReferencia(pasta, valor);
            if (p) imgsFaltando.push(`linha ${linhaDe(texto, m.index)}: ${explicarReferencia(p)}`);
          }
        }
      }
      const totalImgs = doc.querySelectorAll("img").length;
      if (semAlt.length) anotar(G, "erro", `${semAlt.length} imagem(ns) sem alt`, "O alt é o que uma pessoa cega \"ouve\" no lugar da foto.", 'Coloque alt="descrição da foto" em cada <img>. Imagem só decorativa: alt="".', "passo-4-html.html#montar", semAlt);
      else if (totalImgs) anotar(G, "ok", `Todas as ${totalImgs} imagens têm alt`);
      if (imgsFaltando.length) anotar(G, "erro", "Imagem ou mídia não encontrada", "O navegador vai mostrar um espaço vazio no lugar.", "Confira o nome e a pasta de cada arquivo, letra por letra.", "passo-7-verificar.html#f12", imgsFaltando);
      else if (totalImgs) anotar(G, "ok", "Todas as imagens foram encontradas na pasta");

      // ids repetidos
      const contagem = new Map();
      doc.querySelectorAll("[id]").forEach((el) => contagem.set(el.id, (contagem.get(el.id) || 0) + 1));
      const repetidos = Array.from(contagem).filter(([, n]) => n > 1).map(([id, n]) => `id="${id}" aparece ${n} vezes`);
      if (repetidos.length) anotar(G, "erro", "ids repetidos", "Um id só pode existir uma vez por página. O JavaScript sempre pega o primeiro.", "Troque os repetidos por outro nome, ou use class.", "passo-4-html.html#montar", repetidos);
      else anotar(G, "ok", "Nenhum id repetido");

      // Links do menu (#id) e links para outras páginas
      const ancorasQuebradas = [];
      const paginasFaltando = [];
      doc.querySelectorAll("a[href]").forEach(function (a) {
        const href = a.getAttribute("href");
        if (href.startsWith("#")) {
          const alvo = href.slice(1);
          if (alvo && !contagem.has(decodeURIComponent(alvo))) ancorasQuebradas.push(`href="${href}" (texto: "${a.textContent.trim().slice(0, 40)}")`);
        } else if (!EXTERNO.test(href)) {
          const p = conferirReferencia(pasta, href);
          if (p) paginasFaltando.push(explicarReferencia(p));
        }
      });
      if (ancorasQuebradas.length) anotar(G, "erro", "Links que apontam para ids que não existem", "O clique não leva a lugar nenhum.", 'O href="#contato" precisa de um elemento com id="contato", escrito igual.', "passo-4-html.html#montar", ancorasQuebradas);
      else anotar(G, "ok", "Todos os links com # levam a ids que existem");
      if (paginasFaltando.length) anotar(G, "aviso", "Links para arquivos que não existem", "", "Crie a página ou arquivo, ou corrija o href.", "", paginasFaltando);

      // label for sem campo
      const labelsSoltas = Array.from(doc.querySelectorAll("label[for]")).map((l) => l.getAttribute("for")).filter((f) => !contagem.has(f));
      if (labelsSoltas.length) anotar(G, "aviso", "<label for> sem campo correspondente", "", 'O for="x" do label precisa ser igual ao id="x" do campo.', "", labelsSoltas.map((f) => `for="${f}"`));

      // Nova aba sem noopener
      const semNoopener = Array.from(doc.querySelectorAll('a[target="_blank"]')).filter((a) => !/noopener|noreferrer/.test(a.getAttribute("rel") || "")).map((a) => a.getAttribute("href"));
      if (semNoopener.length) anotar(G, "aviso", 'Links com target="_blank" sem rel="noopener"', "Por segurança, todo link que abre em nova aba deve ter rel=\"noopener\".", 'Acrescente rel="noopener noreferrer".', "", semNoopener);

      // Tags abertas e fechadas
      const semCodigo = semComent.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");
      const desiguais = [];
      ["div", "section", "article", "main", "header", "footer", "nav", "ul", "ol", "table", "form"].forEach(function (tag) {
        const abre = (semCodigo.match(new RegExp("<" + tag + "\\b", "gi")) || []).length;
        const fecha = (semCodigo.match(new RegExp("</" + tag + "\\s*>", "gi")) || []).length;
        if (abre !== fecha) desiguais.push(`<${tag}> abre ${abre} vez(es) e fecha ${fecha}`);
      });
      if (desiguais.length) anotar(G, "erro", "Tags abertas e fechadas em número diferente", "Uma tag sem fechar (ou fechada a mais) deixa a página torta dali para baixo.", "Procure no VS Code: clique na tag de abertura e veja qual é a de fechamento. O validador do W3C mostra a linha.", "passo-4-html.html#validar", desiguais);
      else anotar(G, "ok", "As tags principais abrem e fecham em número igual");
    });

    /* ---------- Cada CSS ---------- */
    csss.forEach(function (arq) {
      const G = "CSS: " + arq.caminho;
      const texto = arq.texto;
      const pasta = pastaDe(arq.caminho);
      if (!texto.trim()) { anotar(G, "aviso", "O arquivo está vazio"); return; }
      if (!usados.has(arq.caminho)) anotar(G, "aviso", "Nenhum HTML conecta este CSS", "As regras dele não valem em nenhuma página.", 'Confira o <link rel="stylesheet" href="..."> no <head>.', "passo-3-projeto.html#live-server");

      const tag = texto.search(/<\/?style\b/i);
      if (tag !== -1) anotar(G, "erro", `Tem <style> dentro do arquivo CSS (linha ${linhaDe(texto, tag)})`, "Dentro do .css não existe tag: o arquivo inteiro já é CSS.", "Apague <style> e </style>.", "passo-5-css.html#cores");

      const abertos = (texto.match(/\/\*/g) || []).length;
      const fechados = (texto.match(/\*\//g) || []).length;
      if (abertos > fechados) anotar(G, "erro", "Comentário /* sem o */ de fechamento", "Tudo depois dele vira comentário e é ignorado.", "Feche o comentário com */.", "passo-5-css.html#cores");

      const semComent = tiraComentariosCss(texto).replace(/"[^"\n]*"|'[^'\n]*'/g, '""');
      const chavesAbre = (semComent.match(/{/g) || []).length;
      const chavesFecha = (semComent.match(/}/g) || []).length;
      if (chavesAbre !== chavesFecha) anotar(G, "erro", `Chaves desiguais: ${chavesAbre} "{" e ${chavesFecha} "}"`, "Uma regra sem } faz o navegador ignorar as regras seguintes.", "Procure a regra que ficou sem fechar, normalmente perto do fim do último código colado.", "passo-5-css.html#celular");
      else anotar(G, "ok", `As chaves estão fechadas (${chavesAbre} regras)`);

      const urls = [];
      // Procura os url(...) no texto sem comentários, mas ainda com as aspas
      for (const m of tiraComentariosCss(texto).matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
        const caminho = m[1].trim();
        if (EXTERNO.test(caminho)) continue;
        const p = conferirReferencia(pasta, caminho);
        if (p) {
          let dica = explicarReferencia(p);
          if (p.problema === "falta" && pasta && !caminho.startsWith("../") && existe.has(caminho)) dica += ` Dentro do CSS, o caminho parte da pasta "${pasta}": use "../${caminho}".`;
          urls.push(`linha ${linhaDe(texto, m.index)}: ${dica}`);
        }
      }
      if (urls.length) anotar(G, "erro", "Arquivo de url(...) não encontrado", "", 'No CSS, o caminho parte da pasta css: use url("../img/foto.jpg").', "passo-5-css.html#celular", urls);

      if (/@media/.test(texto)) anotar(G, "ok", "Tem regras para telas diferentes (@media)");
      else anotar(G, "aviso", "Nenhum @media", "Pode estar tudo certo, mas confira o site numa tela de celular.", "Teste com F12 + Ctrl + Shift + M.", "passo-5-css.html#celular");
    });

    /* ---------- Cada JS ---------- */
    jss.forEach(function (arq) {
      const G = "JavaScript: " + arq.caminho;
      const texto = arq.texto;
      if (!texto.trim()) { anotar(G, "aviso", "O arquivo está vazio"); return; }
      if (!usados.has(arq.caminho)) anotar(G, "aviso", "Nenhum HTML conecta este JavaScript", "O código dele não roda em nenhuma página.", 'Confira o <script src="..." defer></script> no <head>.', "passo-3-projeto.html#live-server");

      const tag = texto.search(/<\/?script\b/i);
      if (tag !== -1) anotar(G, "erro", `Tem <script> dentro do arquivo JS (linha ${linhaDe(texto, tag)})`, "Dentro do .js não existe tag: o arquivo inteiro já é JavaScript.", "Apague <script> e </script>.", "passo-6-js.html#erros");

      try {
        new Function(texto);   // só confere se o código está bem escrito; não executa nada
        anotar(G, "ok", "Sem erro de sintaxe");
      } catch (erro) {
        if (erro instanceof SyntaxError) {
          anotar(G, "erro", "Erro de sintaxe: " + erro.message, "Com um erro de sintaxe, nenhuma linha do arquivo roda.", "Procure parênteses, chaves ou aspas sem fechar, normalmente no último código colado. O Console (F12) mostra a linha.", "passo-6-js.html#erros");
        } else {
          anotar(G, "info", "Não foi possível conferir a sintaxe nesta página", "Abra o site com o F12 e confira a aba Console.");
        }
      }

      const procurados = new Map();
      const padroes = [/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)/g, /querySelector(?:All)?\(\s*["'`]#([\w-]+)[^"'`]*["'`]\s*\)/g];
      padroes.forEach(function (re) {
        for (const m of texto.matchAll(re)) {
          if (!procurados.has(m[1])) procurados.set(m[1], linhaDe(texto, m.index));
        }
      });
      const naoExistem = Array.from(procurados).filter(([id]) => !idsDoSite.has(id)).map(([id, linha]) => `linha ${linha}: id="${id}"`);
      if (naoExistem.length) anotar(G, "aviso", "O JavaScript procura ids que não existem em nenhum HTML", "O código dessas partes não vai fazer nada (ou vai dar erro de null).", "Deixe o id igual no HTML e no JS. Se você não usa aquela funcionalidade, apague o trecho do JS.", "passo-6-js.html#erros", naoExistem);
      else if (procurados.size) anotar(G, "ok", `Os ${procurados.size} ids que o JavaScript procura existem no HTML`);
    });

    if (!htmls.length && !csss.length && !jss.length) {
      anotar(G_PASTA, "erro", "Nenhum arquivo .html, .css ou .js encontrado", "", "Escolha a pasta do seu projeto.");
    }
    return resultados;
  }
  window.verificarProjeto = verificarProjeto;

  /* =================================================================
     3. MOSTRAR O RESULTADO NA PÁGINA
     ================================================================= */
  const area = document.getElementById("resultado-verificacao");
  if (!area) return;
  const resumo = document.getElementById("resumo-verificacao");
  const soProblemas = document.getElementById("so-problemas");
  const ICONES = { ok: "✓", aviso: "!", erro: "✕", info: "i" };
  const NOMES = { ok: "Certo", aviso: "Atenção", erro: "Corrigir", info: "Informação" };
  let ultimo = null;

  function mostrar(nomeProjeto, arquivos, resultados) {
    ultimo = { nomeProjeto, arquivos, resultados };
    const erros = resultados.filter((r) => r.status === "erro").length;
    const avisos = resultados.filter((r) => r.status === "aviso").length;
    const oks = resultados.filter((r) => r.status === "ok").length;

    resumo.replaceChildren();
    const h2 = document.createElement("h2");
    h2.textContent = nomeProjeto;
    const p = document.createElement("p");
    p.className = "verif-contagem";
    [["erro", erros, "para corrigir"], ["aviso", avisos, "de atenção"], ["ok", oks, "certos"]].forEach(function ([st, n, txt]) {
      const s = document.createElement("span");
      s.className = "verif-selo verif-" + st;
      s.textContent = n + " " + txt;
      p.appendChild(s);
    });
    const arqs = document.createElement("p");
    arqs.className = "verif-arquivos";
    arqs.textContent = arquivos.length + " arquivos lidos: " + arquivos.map((a) => a.caminho).filter((c) => !c.startsWith(".git/")).slice(0, 12).join(", ") + (arquivos.length > 12 ? "..." : "");
    const conclusao = document.createElement("p");
    conclusao.className = "verif-conclusao";
    conclusao.textContent = erros === 0 ? "Nenhum erro encontrado. Confira os itens de atenção e teste no navegador." : "Corrija os itens vermelhos de cima para baixo e verifique de novo.";
    resumo.append(h2, p, conclusao, arqs);
    desenharLista();
  }

  function desenharLista() {
    if (!ultimo) return;
    area.replaceChildren();
    const grupos = new Map();
    ultimo.resultados.forEach(function (r) {
      if (soProblemas.checked && (r.status === "ok")) return;
      if (!grupos.has(r.grupo)) grupos.set(r.grupo, []);
      grupos.get(r.grupo).push(r);
    });
    if (grupos.size === 0) {
      const vazio = document.createElement("p");
      vazio.className = "verif-vazio";
      vazio.textContent = "Nada para corrigir. Desmarque a opção acima para ver tudo o que foi conferido.";
      area.appendChild(vazio);
      return;
    }
    grupos.forEach(function (itens, grupo) {
      const sec = document.createElement("section");
      sec.className = "verif-grupo";
      const h3 = document.createElement("h3");
      h3.textContent = grupo;
      const ul = document.createElement("ul");
      ul.className = "verif-lista";
      const ordem = { erro: 0, aviso: 1, info: 2, ok: 3 };
      itens.sort((a, b) => ordem[a.status] - ordem[b.status]).forEach(function (r) {
        const li = document.createElement("li");
        li.className = "verif-item verif-" + r.status;
        const icone = document.createElement("span");
        icone.className = "verif-icone";
        icone.textContent = ICONES[r.status];
        icone.setAttribute("aria-label", NOMES[r.status]);
        const corpo = document.createElement("div");
        const t = document.createElement("p");
        t.className = "verif-titulo";
        t.textContent = r.titulo;
        corpo.appendChild(t);
        if (r.detalhe) {
          const d = document.createElement("p");
          d.textContent = r.detalhe;
          corpo.appendChild(d);
        }
        if (r.itens.length) {
          const lista = document.createElement("ul");
          lista.className = "verif-itens";
          r.itens.slice(0, 15).forEach(function (texto) {
            const i = document.createElement("li");
            i.textContent = texto;
            lista.appendChild(i);
          });
          if (r.itens.length > 15) {
            const mais = document.createElement("li");
            mais.textContent = "e mais " + (r.itens.length - 15);
            lista.appendChild(mais);
          }
          corpo.appendChild(lista);
        }
        if (r.corrigir && r.status !== "ok") {
          const c = document.createElement("p");
          c.className = "verif-corrigir";
          const b = document.createElement("strong");
          b.textContent = "Como corrigir: ";
          c.append(b, r.corrigir);
          if (r.link) {
            const a = document.createElement("a");
            a.href = r.link;
            a.textContent = "Ver o passo";
            c.append(" ", a);
          }
          corpo.appendChild(c);
        }
        li.append(icone, corpo);
        ul.appendChild(li);
      });
      sec.append(h3, ul);
      area.appendChild(sec);
    });
  }
  soProblemas.addEventListener("change", desenharLista);

  /* ---------- Ler a pasta escolhida ---------- */
  const entrada = document.getElementById("pasta-projeto");
  const estado = document.getElementById("estado-leitura");
  entrada.addEventListener("change", async function () {
    const lista = Array.from(entrada.files);
    if (!lista.length) return;
    estado.textContent = "Lendo " + lista.length + " arquivos...";
    const raiz = (lista[0].webkitRelativePath || lista[0].name).split("/")[0];
    const arquivos = [];
    for (const f of lista) {
      const rel = f.webkitRelativePath ? f.webkitRelativePath.split("/").slice(1).join("/") : f.name;
      if (/(^|\/)(\.git|node_modules)(\/|$)/.test(rel)) continue;
      const texto = EH_TEXTO.test(rel) && f.size < 2 * 1024 * 1024 ? await f.text() : null;
      arquivos.push({ caminho: rel, texto, tamanho: f.size });
    }
    estado.textContent = "";
    mostrar("Pasta: " + raiz, arquivos, verificarProjeto(arquivos));
    document.getElementById("resultado").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Exemplos ---------- */
  const EXEMPLO_COM_ERROS = [
    { caminho: "index.html", texto: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Praias do Brasil</title>
  <link rel="stylesheet" href="css/Estilo.css">
  <script src="js/script.js"></script>
</head>
<body>
  <header>
    <nav>
      <a href="#praias">Praias</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>
  <main>
    <section id="praias">
      <h1>Praias do Brasil</h1>
      <h1>As mais bonitas</h1>
      <img src="img/praia-linda.jpg">
      <img src="img/Praia Linda.JPG" alt="Praia de areia branca" id="foto">
      <p id="foto">Legenda</p>
      <a href="https://pt.wikipedia.org" target="_blank">Saiba mais</a>
    </section>
    <div class="caixa">
      <p>Uma caixa que abriu e não fechou.</p>
  </main>
  <footer><p>&copy; 2026</p></footer>
</body>
</html>`, tamanho: 900 },
    { caminho: "css/estilo.css", texto: `<style>
body {
  font-family: Arial, sans-serif;
}
.heroi {
  background-image: url("img/fundo.jpg");
}
.caixa {
  padding: 1rem;
`, tamanho: 200 },
    { caminho: "js/script.js", texto: `const botao = document.getElementById("btn-enviar");
botao.addEventListener("click", function () {
  console.log("clicou";
});
`, tamanho: 120 },
    { caminho: "img/Praia Linda.JPG", texto: null, tamanho: 3400000 },
    { caminho: "img/fundo.jpg", texto: null, tamanho: 180000 },
  ];

  document.getElementById("exemplo-erros").addEventListener("click", function () {
    mostrar("Exemplo: projeto com erros de propósito", EXEMPLO_COM_ERROS, verificarProjeto(EXEMPLO_COM_ERROS));
  });
  document.getElementById("exemplo-certo").addEventListener("click", function () {
    const t = window.CODIGOS && window.CODIGOS.trechos.estrutura;
    if (!t) return;
    const arquivos = [
      { caminho: "index.html", texto: t.html, tamanho: t.html.length },
      { caminho: "css/estilo.css", texto: t.css, tamanho: t.css.length },
      { caminho: "js/script.js", texto: t.js, tamanho: t.js.length },
    ];
    mostrar("Exemplo: o projeto da Estrutura, sem mudanças", arquivos, verificarProjeto(arquivos));
  });

  // Ao abrir a página, mostra o exemplo com erros, para ver como o resultado aparece
  mostrar("Exemplo: projeto com erros de propósito", EXEMPLO_COM_ERROS, verificarProjeto(EXEMPLO_COM_ERROS));
})();
