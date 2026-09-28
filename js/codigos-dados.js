/*
  codigos-dados.js — GERADO AUTOMATICAMENTE, não edite à mão.
  Os códigos vêm da pasta trechos/. Para mudar um código, edite o arquivo em trechos/
  e rode:  python ferramentas/gerar-codigos.py
*/
window.CODIGOS = {
 "ordem": [
  "estrutura",
  "head",
  "pular-conteudo",
  "cabecalho",
  "submenu",
  "heroi",
  "rodape",
  "layout-grid",
  "cards",
  "acordeao",
  "caixa-dica",
  "migalhas",
  "perfil",
  "impressao",
  "textos",
  "entidades",
  "listas",
  "links",
  "imagem-link",
  "imagem-legenda",
  "imagem-responsiva",
  "svg",
  "mapa-imagem",
  "galeria",
  "video-audio",
  "player",
  "iframe",
  "botoes",
  "campos-formulario",
  "formulario",
  "senha",
  "progresso-medidor",
  "tabela",
  "tema",
  "barra-progresso",
  "voltar-topo",
  "relogio",
  "revelar",
  "curtir",
  "contador",
  "leia-mais",
  "cor",
  "tamanho",
  "dica",
  "tecla",
  "filtro",
  "tarefas",
  "abas",
  "modal",
  "carrossel",
  "copiar",
  "canvas",
  "imc"
 ],
 "trechos": {
  "estrutura": {
   "id": "estrutura",
   "grupo": "Comece por aqui",
   "titulo": "Estrutura de um projeto novo",
   "nota": "O ponto de partida de todo site. Crie a pasta do projeto com as subpastas css, js e img. Estes são os três arquivos completos: comece com eles e vá acrescentando os outros códigos.",
   "onde": {
    "html": "Arquivo index.html inteiro (apague o que tiver e cole isto)",
    "css": "Arquivo css/estilo.css inteiro",
    "js": "Arquivo js/script.js inteiro"
   },
   "exemplo": "index.html#conexao",
   "html": "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Nome do meu site</title>\n  <meta name=\"description\" content=\"Uma frase dizendo do que o site trata.\">\n\n  <!-- Conexão com o CSS -->\n  <link rel=\"stylesheet\" href=\"css/estilo.css\">\n  <!-- Conexão com o JavaScript. defer = só roda depois que o HTML todo foi lido -->\n  <script src=\"js/script.js\" defer></script>\n</head>\n<body>\n  <header class=\"topo\">\n    <nav class=\"container\">\n      <a href=\"#sobre\">Sobre</a>\n      <a href=\"#contato\">Contato</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id=\"inicio\">\n      <div class=\"container\">\n        <h1>Nome do meu site</h1>\n        <p>Uma frase de apresentação.</p>\n      </div>\n    </section>\n\n    <section id=\"sobre\">\n      <div class=\"container\">\n        <h2>Sobre</h2>\n        <p>Texto da seção.</p>\n      </div>\n    </section>\n\n    <section id=\"contato\">\n      <div class=\"container\">\n        <h2>Contato</h2>\n        <p>Texto da seção.</p>\n      </div>\n    </section>\n  </main>\n\n  <footer class=\"rodape-simples\">\n    <div class=\"container\">\n      <p>&copy; 2026 Seu Nome</p>\n    </div>\n  </footer>\n</body>\n</html>\n",
   "css": "/* Cores do site: troque aqui e o site inteiro muda */\n:root {\n  --cor-principal: #12324a;\n  --cor-destaque: #ffb703;\n  --cor-fundo: #f4f7fa;\n  --cor-texto: #1b2a38;\n}\n\n/* A largura passa a incluir o padding e a borda */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nhtml {\n  scroll-behavior: smooth;   /* rolagem suave nos links com # */\n}\n\nbody {\n  margin: 0;\n  font-family: \"Segoe UI\", Arial, sans-serif;\n  line-height: 1.6;\n  color: var(--cor-texto);\n  background-color: var(--cor-fundo);\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n\na {\n  color: var(--cor-principal);\n}\n\n/* Centraliza o conteúdo e limita a largura */\n.container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n\nsection {\n  padding: 3rem 0;\n}\n\n.topo {\n  background-color: var(--cor-principal);\n  padding: 1rem 0;\n}\n.topo nav {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n}\n.topo a {\n  color: #ffffff;\n  text-decoration: none;\n}\n\n.rodape-simples {\n  background-color: var(--cor-principal);\n  color: #ffffff;\n  text-align: center;\n  padding: 1rem 0;\n}\n",
   "js": "// Se esta mensagem aparecer no Console (F12), o JavaScript está conectado.\nconsole.log(\"script.js conectado!\");\n"
  },
  "head": {
   "id": "head",
   "grupo": "Comece por aqui",
   "titulo": "Informações do <head>: ícone, resumo, WhatsApp e fonte",
   "nota": "Nada disto aparece dentro da página, mas muda o ícone da aba, o resumo no Google, o cartãozinho que aparece quando o link é compartilhado no WhatsApp e a fonte do site. Para trocar a fonte, escolha uma em fonts.google.com e troque Poppins pelo nome dela no link e no CSS.",
   "onde": {
    "html": "Cole dentro do <head>, logo depois do <title>"
   },
   "exemplo": "index.html#conexao",
   "local": "head",
   "html": "<!-- Resumo que aparece no Google, embaixo do título -->\n<meta name=\"description\" content=\"Uma frase dizendo do que o site trata.\">\n<meta name=\"author\" content=\"Seu Nome\">\n\n<!-- Cor da barra do navegador no celular -->\n<meta name=\"theme-color\" content=\"#12324a\">\n\n<!-- Ícone da aba (coloque o arquivo na pasta img) -->\n<link rel=\"icon\" type=\"image/png\" href=\"img/favicon.png\">\n\n<!-- Como o link aparece quando é compartilhado no WhatsApp e nas redes sociais -->\n<meta property=\"og:title\" content=\"Nome do meu site\">\n<meta property=\"og:description\" content=\"Uma frase dizendo do que o site trata.\">\n<meta property=\"og:image\" content=\"img/capa.jpg\">\n\n<!-- Fonte do Google Fonts -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap\">\n",
   "css": "/* Usa a fonte do Google; se ela não carregar, usa Arial */\nbody {\n  font-family: \"Poppins\", Arial, sans-serif;\n}\n",
   "js": null
  },
  "pular-conteudo": {
   "id": "pular-conteudo",
   "grupo": "Comece por aqui",
   "titulo": "Link \"pular para o conteúdo\" (acessibilidade)",
   "nota": "Um link escondido que aparece quando a pessoa aperta Tab. Leva quem navega pelo teclado direto ao conteúdo, sem passar pelo menu inteiro. Para testar, abra a página e aperte Tab uma vez.",
   "onde": {
    "html": "Cole o link logo depois de <body>; o id=\"conteudo\" vai no seu <main>"
   },
   "exemplo": "index.html#conexao",
   "html": "<!-- Primeira coisa dentro do <body> -->\n<a class=\"pular-para-conteudo\" href=\"#conteudo\">Pular para o conteúdo</a>\n\n<!-- ... aqui ficam o cabeçalho e o menu ... -->\n\n<!-- O destino do link: coloque id=\"conteudo\" no seu <main> -->\n<main id=\"conteudo\">\n  <h1>Conteúdo principal</h1>\n  <p>O link leva direto para cá.</p>\n</main>\n",
   "css": ".pular-para-conteudo {\n  position: absolute;\n  top: -100px;              /* fica fora da tela */\n  left: 1rem;\n  z-index: 1000;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  background-color: #ffb703;\n  color: #12324a;\n  font-weight: 700;\n  transition: top 0.2s;\n}\n.pular-para-conteudo:focus {\n  top: 1rem;                /* desce quando recebe o foco pelo Tab */\n}\n",
   "js": null
  },
  "cabecalho": {
   "id": "cabecalho",
   "grupo": "Partes da página",
   "titulo": "Cabeçalho fixo com menu (e menu de celular)",
   "nota": "Cabeçalho que gruda no topo, encolhe ao rolar, vira menu ≡ no celular e marca a seção que está na tela. Os links do menu levam a seções com o mesmo id (ex.: href=\"#sobre\" leva ao id=\"sobre\").",
   "onde": {
    "html": "Cole logo depois de <body>, no index.html"
   },
   "exemplo": "index.html#partes-da-pagina",
   "html": "<header class=\"cabecalho\" id=\"cabecalho\">\n  <div class=\"cabecalho-conteudo\">\n    <a href=\"#inicio\" class=\"logo\">Meu Site</a>\n\n    <!-- Botão ≡: só aparece no celular (o CSS esconde no computador) -->\n    <button class=\"btn-menu\" id=\"btn-menu\" type=\"button\" aria-expanded=\"false\" aria-controls=\"menu-principal\">\n      <span class=\"btn-menu-linhas\" aria-hidden=\"true\"></span>\n      <span class=\"visualmente-escondido\">Abrir menu</span>\n    </button>\n\n    <nav class=\"menu\" aria-label=\"Menu principal\">\n      <ul class=\"menu-lista\" id=\"menu-principal\">\n        <li><a href=\"#sobre\">Sobre</a></li>\n        <li><a href=\"#galeria\">Galeria</a></li>\n        <li><a href=\"#contato\">Contato</a></li>\n      </ul>\n    </nav>\n  </div>\n</header>\n",
   "css": "/* Deixa espaço para o cabeçalho fixo não cobrir o título ao clicar num link # */\nhtml {\n  scroll-behavior: smooth;\n  scroll-padding-top: 80px;\n}\n\n.cabecalho {\n  position: sticky;          /* gruda no topo ao rolar */\n  top: 0;\n  z-index: 100;\n  background-color: #12324a;\n  transition: box-shadow 0.2s;\n}\n.cabecalho.encolhido {       /* o JavaScript coloca esta classe ao rolar */\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n}\n\n.cabecalho-conteudo {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  max-width: 1100px;\n  min-height: 72px;\n  margin: 0 auto;\n  padding: 0 1rem;\n  transition: min-height 0.2s;\n}\n.cabecalho.encolhido .cabecalho-conteudo {\n  min-height: 56px;\n}\n\n.logo {\n  color: #ffffff;\n  font-size: 1.25rem;\n  font-weight: 700;\n  text-decoration: none;\n}\n\n.menu {\n  margin-left: auto;         /* empurra o menu para a direita */\n}\n.menu-lista {\n  display: flex;\n  gap: 0.25rem;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.menu-lista a {\n  display: block;\n  padding: 0.5rem 0.75rem;\n  border-radius: 6px;\n  color: #dbe7f0;\n  text-decoration: none;\n}\n.menu-lista a:hover,\n.menu-lista a.ativo {\n  background-color: rgba(255, 255, 255, 0.12);\n  color: #ffffff;\n}\n\n/* Esconde da tela, mas o leitor de tela continua lendo */\n.visualmente-escondido {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n\n/* Botão ≡ (três linhas: o span, o ::before e o ::after) */\n.btn-menu {\n  display: none;\n  width: 44px;\n  height: 44px;\n  margin-left: auto;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n}\n.btn-menu-linhas,\n.btn-menu-linhas::before,\n.btn-menu-linhas::after {\n  display: block;\n  width: 24px;\n  height: 3px;\n  margin: 0 auto;\n  border-radius: 2px;\n  background-color: #ffffff;\n  transition: transform 0.2s;\n}\n.btn-menu-linhas {\n  position: relative;\n}\n.btn-menu-linhas::before,\n.btn-menu-linhas::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n}\n.btn-menu-linhas::before { top: -7px; }\n.btn-menu-linhas::after { top: 7px; }\n/* Menu aberto: as linhas viram um X */\n.btn-menu[aria-expanded=\"true\"] .btn-menu-linhas { background-color: transparent; }\n.btn-menu[aria-expanded=\"true\"] .btn-menu-linhas::before { transform: translateY(7px) rotate(45deg); }\n.btn-menu[aria-expanded=\"true\"] .btn-menu-linhas::after { transform: translateY(-7px) rotate(-45deg); }\n\n/* Celular: o menu vira uma gaveta embaixo do cabeçalho */\n@media (max-width: 800px) {\n  .btn-menu {\n    display: grid;\n    place-items: center;\n  }\n  .menu {\n    position: absolute;\n    top: 100%;\n    left: 0;\n    right: 0;\n    margin: 0;\n  }\n  .menu-lista {\n    display: none;\n    flex-direction: column;\n    padding: 0.5rem 1rem 1rem;\n    background-color: #12324a;\n  }\n  .menu-lista.aberto {\n    display: flex;\n  }\n}\n",
   "js": "// ----- Cabeçalho: menu do celular, encolher ao rolar e link ativo -----\nconst btnMenu = document.getElementById(\"btn-menu\");\nconst menuLista = document.getElementById(\"menu-principal\");\nconst cabecalho = document.getElementById(\"cabecalho\");\n\nif (btnMenu && menuLista) {\n  // Abre e fecha o menu no celular\n  btnMenu.addEventListener(\"click\", function () {\n    const abriu = menuLista.classList.toggle(\"aberto\");\n    btnMenu.setAttribute(\"aria-expanded\", String(abriu));\n  });\n\n  // Fecha o menu ao clicar num link\n  menuLista.querySelectorAll(\"a\").forEach(function (link) {\n    link.addEventListener(\"click\", function () {\n      menuLista.classList.remove(\"aberto\");\n      btnMenu.setAttribute(\"aria-expanded\", \"false\");\n    });\n  });\n}\n\n// Encolhe o cabeçalho depois de rolar 60px\nif (cabecalho) {\n  window.addEventListener(\"scroll\", function () {\n    cabecalho.classList.toggle(\"encolhido\", window.scrollY > 60);\n  }, { passive: true });\n}\n\n// Marca no menu a seção que está na tela\nconst linksDoMenu = document.querySelectorAll('.menu-lista a[href^=\"#\"]');\nif (linksDoMenu.length > 0 && \"IntersectionObserver\" in window) {\n  const vigiaSecoes = new IntersectionObserver(function (entradas) {\n    entradas.forEach(function (entrada) {\n      if (!entrada.isIntersecting) return;\n      linksDoMenu.forEach(function (link) {\n        link.classList.toggle(\"ativo\", link.getAttribute(\"href\") === \"#\" + entrada.target.id);\n      });\n    });\n  }, { rootMargin: \"-45% 0px -50% 0px\" });\n\n  document.querySelectorAll(\"section[id]\").forEach(function (secao) {\n    vigiaSecoes.observe(secao);\n  });\n}\n"
  },
  "submenu": {
   "id": "submenu",
   "grupo": "Partes da página",
   "titulo": "Menu com submenu suspenso",
   "nota": "Completa o Cabeçalho fixo com menu: cole os dois. No computador, o submenu abre ao passar o mouse ou ao chegar nele pelo Tab; no celular, ele aparece sempre, com recuo. Não precisa de JavaScript.",
   "onde": {
    "html": "No HTML do Cabeçalho, troque um <li> do menu por este"
   },
   "exemplo": "index.html#partes-da-pagina",
   "requer": "cabecalho",
   "encaixe": "      </ul>\n    </nav>",
   "html": "<li class=\"tem-submenu\">\n  <a href=\"#servicos\">Serviços</a>\n  <ul class=\"submenu\">\n    <li><a href=\"#servico-1\">Serviço 1</a></li>\n    <li><a href=\"#servico-2\">Serviço 2</a></li>\n    <li><a href=\"#servico-3\">Serviço 3</a></li>\n  </ul>\n</li>\n",
   "css": ".tem-submenu {\n  position: relative;       /* o submenu se posiciona em relação a este item */\n}\n.tem-submenu > a::after {\n  content: \" ▾\";\n  font-size: 0.8em;\n}\n.submenu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 10;\n  min-width: 200px;\n  margin: 0;\n  padding: 0.5rem;\n  list-style: none;\n  border-radius: 8px;\n  background-color: #12324a;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n  /* começa escondido */\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-6px);\n  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;\n}\n/* Aparece com o mouse em cima ou quando algo dentro dele recebe o foco (Tab) */\n.tem-submenu:hover .submenu,\n.tem-submenu:focus-within .submenu {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n@media (max-width: 800px) {\n  .submenu {\n    position: static;\n    opacity: 1;\n    visibility: visible;\n    transform: none;\n    padding: 0 0 0 1rem;\n    box-shadow: none;\n    background: none;\n  }\n  .tem-submenu > a::after {\n    content: \"\";\n  }\n}\n",
   "js": null
  },
  "heroi": {
   "id": "heroi",
   "grupo": "Partes da página",
   "titulo": "Primeira área grande (herói) com foto de fundo",
   "nota": "A primeira coisa que o visitante vê. A foto de fundo fica no CSS: troque img/fundo.jpg pelo nome da sua foto. Sem a foto, aparece só a cor de fundo.",
   "onde": {
    "html": "Cole logo depois de <main>, no index.html"
   },
   "exemplo": "index.html#partes-da-pagina",
   "html": "<section class=\"heroi\" id=\"inicio\">\n  <div class=\"heroi-conteudo\">\n    <p class=\"heroi-antetitulo\">Bem-vindo</p>\n    <h1 class=\"heroi-titulo\">Título principal do site</h1>\n    <p class=\"heroi-texto\">Uma ou duas frases dizendo o que a pessoa vai encontrar aqui.</p>\n    <a class=\"heroi-botao\" href=\"#sobre\">Saiba mais</a>\n  </div>\n</section>\n",
   "css": ".heroi {\n  display: grid;\n  place-items: center;       /* centraliza o conteúdo na horizontal e na vertical */\n  min-height: 70vh;          /* 70% da altura da tela */\n  padding: 4rem 1rem;\n  text-align: center;\n  color: #ffffff;\n  background-color: #12324a;\n  /* Duas camadas: uma película escura por cima da foto, para o texto ficar legível.\n     O caminho começa com ../ porque parte da pasta css */\n  background-image:\n    linear-gradient(rgba(18, 50, 74, 0.75), rgba(18, 50, 74, 0.75)),\n    url(\"../img/fundo.jpg\");\n  background-size: cover;    /* a foto cobre a área toda */\n  background-position: center;\n}\n.heroi-conteudo {\n  max-width: 720px;\n}\n.heroi-antetitulo {\n  margin: 0 0 0.5rem;\n  color: #ffb703;\n  font-weight: 700;\n}\n.heroi-titulo {\n  margin: 0 0 1rem;\n  font-size: clamp(2rem, 6vw, 3.5rem);   /* cresce com a tela, entre 2rem e 3.5rem */\n  line-height: 1.1;\n}\n.heroi-texto {\n  margin: 0 0 1.5rem;\n  font-size: 1.15rem;\n}\n.heroi-botao {\n  display: inline-block;\n  padding: 0.8rem 1.6rem;\n  border-radius: 6px;\n  background-color: #ffb703;\n  color: #12324a;\n  font-weight: 700;\n  text-decoration: none;\n  transition: transform 0.2s;\n}\n.heroi-botao:hover {\n  transform: translateY(-2px);\n}\n",
   "js": null
  },
  "rodape": {
   "id": "rodape",
   "grupo": "Partes da página",
   "titulo": "Rodapé com colunas e ano automático",
   "nota": "Rodapé com três colunas que viram uma só no celular. O JavaScript coloca o ano atual sozinho.",
   "onde": {
    "html": "Cole depois de </main>, antes de </body>"
   },
   "exemplo": "index.html#partes-da-pagina",
   "html": "<footer class=\"rodape\">\n  <div class=\"rodape-grade\">\n    <div>\n      <p class=\"rodape-nome\">Meu Site</p>\n      <p>Uma frase sobre o site.</p>\n    </div>\n    <nav aria-label=\"Links do rodapé\">\n      <h2 class=\"rodape-titulo\">Seções</h2>\n      <ul>\n        <li><a href=\"#sobre\">Sobre</a></li>\n        <li><a href=\"#contato\">Contato</a></li>\n      </ul>\n    </nav>\n    <div>\n      <h2 class=\"rodape-titulo\">Contato</h2>\n      <ul>\n        <li><a href=\"mailto:seuemail@exemplo.com\">seuemail@exemplo.com</a></li>\n        <li><a href=\"https://github.com/\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub</a></li>\n      </ul>\n    </div>\n  </div>\n  <p class=\"rodape-direitos\">&copy; <span id=\"ano-atual\">2026</span> Seu Nome</p>\n</footer>\n",
   "css": ".rodape {\n  padding-top: 2.5rem;\n  background-color: #12324a;\n  color: #c5d4e0;\n}\n.rodape-grade {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr;   /* 1ª coluna com o dobro das outras */\n  gap: 2rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1rem 2rem;\n}\n.rodape-nome {\n  margin: 0 0 0.5rem;\n  color: #ffffff;\n  font-size: 1.3rem;\n  font-weight: 700;\n}\n.rodape-titulo {\n  margin: 0 0 0.5rem;\n  color: #ffb703;\n  font-size: 1rem;\n}\n.rodape ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.rodape a {\n  color: #ffffff;\n}\n.rodape-direitos {\n  margin: 0;\n  padding: 1rem;\n  text-align: center;\n  border-top: 1px solid rgba(255, 255, 255, 0.15);\n}\n@media (max-width: 700px) {\n  .rodape-grade {\n    grid-template-columns: 1fr;       /* uma coluna só no celular */\n  }\n}\n",
   "js": "// Ano atual no rodapé\nconst anoAtual = document.getElementById(\"ano-atual\");\nif (anoAtual) {\n  anoAtual.textContent = new Date().getFullYear();\n}\n"
  },
  "layout-grid": {
   "id": "layout-grid",
   "grupo": "Partes da página",
   "titulo": "Layout com barra lateral (grid-template-areas)",
   "nota": "Monta o layout desenhando as áreas com palavras. No celular, tudo vira uma coluna. Troque as palavras de lugar no grid-template-areas para mudar a posição das partes.",
   "onde": {
    "html": "Cole dentro de <main>, no lugar do conteúdo"
   },
   "exemplo": "index.html#layout",
   "html": "<div class=\"layout\">\n  <nav class=\"layout-nav\">Menu lateral</nav>\n  <article class=\"layout-principal\">\n    <h2>Conteúdo principal</h2>\n    <p>O texto mais importante da página fica aqui.</p>\n  </article>\n  <aside class=\"layout-lateral\">Dicas, links ou propaganda</aside>\n</div>\n",
   "css": ".layout {\n  display: grid;\n  grid-template-columns: 200px 1fr 220px;\n  grid-template-areas: \"nav principal lateral\";\n  gap: 1rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.layout-nav       { grid-area: nav; }\n.layout-principal { grid-area: principal; }\n.layout-lateral   { grid-area: lateral; }\n\n.layout > * {\n  padding: 1rem;\n  border-radius: 8px;\n  background-color: #ffffff;\n  border: 1px solid #cfd9e3;\n}\n\n@media (max-width: 800px) {\n  .layout {\n    grid-template-columns: 1fr;\n    grid-template-areas:\n      \"principal\"\n      \"nav\"\n      \"lateral\";\n  }\n}\n",
   "js": null
  },
  "cards": {
   "id": "cards",
   "grupo": "Partes da página",
   "titulo": "Cards lado a lado",
   "nota": "Cards que se reorganizam sozinhos: 3 por linha no computador, 1 no celular, sem media query. Repita o <article> quantas vezes quiser.",
   "onde": {},
   "exemplo": "index.html#layout",
   "html": "<div class=\"cards\">\n  <article class=\"card\">\n    <img class=\"card-img\" src=\"img/foto-1.jpg\" alt=\"\" width=\"600\" height=\"400\" loading=\"lazy\">\n    <div class=\"card-corpo\">\n      <h3 class=\"card-titulo\">Título do card</h3>\n      <p>Uma descrição curta do que o card apresenta.</p>\n      <a class=\"card-link\" href=\"#\">Ver mais</a>\n    </div>\n  </article>\n\n  <article class=\"card\">\n    <img class=\"card-img\" src=\"img/foto-2.jpg\" alt=\"\" width=\"600\" height=\"400\" loading=\"lazy\">\n    <div class=\"card-corpo\">\n      <h3 class=\"card-titulo\">Outro card</h3>\n      <p>Cada card é um article: faz sentido sozinho.</p>\n      <a class=\"card-link\" href=\"#\">Ver mais</a>\n    </div>\n  </article>\n\n  <article class=\"card\">\n    <img class=\"card-img\" src=\"img/foto-3.jpg\" alt=\"\" width=\"600\" height=\"400\" loading=\"lazy\">\n    <div class=\"card-corpo\">\n      <h3 class=\"card-titulo\">Terceiro card</h3>\n      <p>O CSS coloca todos com a mesma altura.</p>\n      <a class=\"card-link\" href=\"#\">Ver mais</a>\n    </div>\n  </article>\n</div>\n",
   "css": ".cards {\n  display: grid;\n  /* quantas colunas couberem, cada uma com no mínimo 260px */\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.5rem;\n}\n.card {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border-radius: 10px;\n  background-color: #ffffff;\n  box-shadow: 0 4px 16px rgba(18, 50, 74, 0.12);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(18, 50, 74, 0.2);\n}\n.card-img {\n  width: 100%;\n  height: auto;\n  aspect-ratio: 16 / 9;     /* todas as imagens com a mesma proporção */\n  object-fit: cover;        /* preenche sem esticar */\n}\n.card-corpo {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  padding: 1.25rem;\n}\n.card-titulo {\n  margin: 0 0 0.5rem;\n}\n.card-link {\n  margin-top: auto;         /* empurra o link para o fim do card */\n  font-weight: 700;\n}\n",
   "js": null
  },
  "acordeao": {
   "id": "acordeao",
   "grupo": "Partes da página",
   "titulo": "Perguntas que abrem e fecham (sem JavaScript)",
   "nota": "Usa as tags <details> e <summary>, que já abrem e fecham sozinhas. O CSS só troca o triângulo por um + que gira.",
   "onde": {},
   "exemplo": "index.html#layout",
   "html": "<div class=\"acordeao\">\n  <details open>\n    <summary>Primeira pergunta?</summary>\n    <p>Resposta da primeira pergunta. O atributo open faz esta começar aberta.</p>\n  </details>\n  <details>\n    <summary>Segunda pergunta?</summary>\n    <p>Resposta da segunda pergunta.</p>\n  </details>\n  <details>\n    <summary>Terceira pergunta?</summary>\n    <p>Resposta da terceira pergunta.</p>\n  </details>\n</div>\n",
   "css": ".acordeao {\n  display: grid;\n  gap: 0.5rem;\n  max-width: 760px;\n}\n.acordeao details {\n  border: 1px solid #cfd9e3;\n  border-radius: 6px;\n  background-color: #ffffff;\n}\n.acordeao summary {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  font-weight: 700;\n  cursor: pointer;\n  list-style: none;          /* tira o triângulo padrão */\n}\n.acordeao summary::-webkit-details-marker {\n  display: none;             /* tira o triângulo no Safari */\n}\n.acordeao summary::after {\n  content: \"+\";\n  font-size: 1.4rem;\n  color: #2a9d8f;\n  transition: transform 0.2s;\n}\n.acordeao details[open] summary::after {\n  transform: rotate(45deg);  /* aberto: o + vira × */\n}\n.acordeao details p {\n  margin: 0;\n  padding: 0 1rem 1rem;\n}\n",
   "js": null
  },
  "caixa-dica": {
   "id": "caixa-dica",
   "grupo": "Partes da página",
   "titulo": "Caixa de dica e de atenção (aside)",
   "nota": "<aside> é para conteúdo ao lado do assunto principal: dicas, avisos, curiosidades. As duas classes mudam só a cor; crie outras do mesmo jeito.",
   "onde": {},
   "exemplo": "index.html#layout",
   "html": "<aside class=\"caixa caixa-dica\">\n  <strong>Dica:</strong> um texto curto que ajuda o leitor.\n</aside>\n\n<aside class=\"caixa caixa-atencao\">\n  <strong>Atenção:</strong> um aviso importante.\n</aside>\n",
   "css": ".caixa {\n  max-width: 70ch;\n  margin: 1.5rem 0;\n  padding: 1rem 1.25rem;\n  border: 1px solid #cfd9e3;\n  border-left-width: 6px;   /* a borda da esquerda mais grossa chama atenção */\n  border-radius: 6px;\n  background-color: #ffffff;\n}\n.caixa-dica {\n  border-left-color: #ffb703;\n}\n.caixa-atencao {\n  border-left-color: #c62839;\n  background-color: #fdf0f1;\n}\n",
   "js": null
  },
  "migalhas": {
   "id": "migalhas",
   "grupo": "Partes da página",
   "titulo": "Caminho de navegação (migalhas de pão)",
   "nota": "Mostra onde a pessoa está no site. Útil quando o site tem várias páginas. A página atual, a última, não é link.",
   "onde": {},
   "exemplo": "sobre.html",
   "html": "<nav class=\"migalhas\" aria-label=\"Você está em\">\n  <ol>\n    <li><a href=\"index.html\">Início</a></li>\n    <li><a href=\"receitas.html\">Receitas</a></li>\n    <li aria-current=\"page\">Bolo de cenoura</li>\n  </ol>\n</nav>\n",
   "css": ".migalhas ol {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-size: 0.9rem;\n}\n/* li + li = cada item que vem depois de outro: ganha uma barra antes */\n.migalhas li + li::before {\n  content: \"/\";\n  margin: 0 0.5rem;\n  color: #4f5f6f;\n}\n.migalhas a {\n  color: #0d6a86;\n}\n.migalhas [aria-current=\"page\"] {\n  font-weight: 700;\n}\n",
   "js": null
  },
  "perfil": {
   "id": "perfil",
   "grupo": "Partes da página",
   "titulo": "Cartão de perfil (Sobre mim)",
   "nota": "Foto redonda ao lado do texto; no celular, a foto vai para cima. Troque a foto, o nome, o texto e o link.",
   "onde": {},
   "exemplo": "sobre.html#equipe",
   "html": "<article class=\"perfil\">\n  <img class=\"perfil-foto\" src=\"img/foto-perfil.jpg\" alt=\"Foto de Seu Nome\" width=\"240\" height=\"240\">\n  <div>\n    <h2 class=\"perfil-nome\">Seu Nome</h2>\n    <p class=\"perfil-funcao\">Estudante do curso técnico</p>\n    <p>Duas ou três frases sobre você: o que estuda, do que gosta, o que quer fazer.</p>\n    <a class=\"perfil-link\" href=\"https://github.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Meu GitHub</a>\n  </div>\n</article>\n",
   "css": ".perfil {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  max-width: 720px;\n  padding: 1.5rem;\n  border-radius: 10px;\n  background-color: #ffffff;\n  box-shadow: 0 4px 16px rgba(18, 50, 74, 0.12);\n}\n.perfil-foto {\n  flex-shrink: 0;           /* a foto nunca é espremida */\n  width: 120px;\n  height: 120px;\n  border: 4px solid #ffb703;\n  border-radius: 50%;       /* 50% = círculo */\n  object-fit: cover;\n}\n.perfil-nome {\n  margin: 0;\n}\n.perfil-funcao {\n  margin: 0 0 0.5rem;\n  color: #4f5f6f;\n}\n.perfil-link {\n  font-weight: 700;\n}\n@media (max-width: 600px) {\n  .perfil {\n    flex-direction: column;  /* foto em cima, texto embaixo */\n    text-align: center;\n  }\n}\n",
   "js": null
  },
  "impressao": {
   "id": "impressao",
   "grupo": "Partes da página",
   "titulo": "Versão para imprimir ou salvar em PDF",
   "nota": "Regras que só valem quando a página é impressa ou salva em PDF pelo Ctrl + P. Tiram o menu, os botões e os vídeos, deixam o fundo branco e escrevem o endereço dos links, já que no papel não dá para clicar.",
   "onde": {},
   "exemplo": "index.html#partes-da-pagina",
   "html": "<p class=\"so-na-tela\">Para imprimir ou salvar em PDF, aperte <kbd>Ctrl</kbd> + <kbd>P</kbd>.</p>\n<p class=\"so-no-papel\">Impresso do site: seu-usuario.github.io/seu-site</p>\n",
   "css": ".so-no-papel {\n  display: none;            /* na tela, este texto fica escondido */\n}\n\n@media print {\n  /* Tira do papel o que só serve na tela */\n  header,\n  nav,\n  footer,\n  button,\n  video,\n  iframe,\n  .so-na-tela {\n    display: none !important;\n  }\n  .so-no-papel {\n    display: block;\n  }\n  body {\n    background: #ffffff;\n    color: #000000;\n    font-size: 12pt;        /* pt é a unidade de impressão, como no Word */\n  }\n  /* Escreve o endereço depois de cada link externo */\n  a[href^=\"http\"]::after {\n    content: \" (\" attr(href) \")\";\n    font-size: 0.8em;\n  }\n  h2,\n  h3 {\n    break-after: avoid;     /* título não fica sozinho no fim da folha */\n  }\n  img {\n    break-inside: avoid;    /* imagem não é cortada entre duas folhas */\n  }\n}\n",
   "js": null
  },
  "textos": {
   "id": "textos",
   "grupo": "Textos e links",
   "titulo": "Textos: títulos, destaques e citação",
   "nota": "As tags de texto mais usadas. Cada tag diz o SIGNIFICADO do texto; a aparência vem do CSS.",
   "onde": {},
   "exemplo": "index.html#textos",
   "html": "<h2>Título da seção</h2>\n<p>\n  Um parágrafo com <strong>texto importante</strong>, <em>ênfase</em>,\n  <mark>um trecho marcado</mark> e <small>letras miúdas</small>.\n  A sigla <abbr title=\"HyperText Markup Language\">HTML</abbr> mostra o nome completo ao passar o mouse.\n</p>\n<p>\n  Para salvar, aperte <kbd>Ctrl</kbd> + <kbd>S</kbd>.\n  O comando <code>console.log()</code> mostra mensagens no console.\n</p>\n\n<hr>\n\n<figure class=\"citacao\">\n  <blockquote>\n    <p>Uma frase marcante sobre o assunto do seu site.</p>\n  </blockquote>\n  <figcaption>— Nome de quem disse</figcaption>\n</figure>\n",
   "css": "mark {\n  background-color: #ffb703;\n  color: #12324a;\n  padding: 0 0.2em;\n}\nabbr[title] {\n  text-decoration: underline dotted;\n  cursor: help;\n}\ncode,\nkbd {\n  font-family: Consolas, \"Courier New\", monospace;\n  font-size: 0.9em;\n}\ncode {\n  background-color: #eaf0f5;\n  padding: 0.1em 0.4em;\n  border-radius: 4px;\n}\nkbd {\n  padding: 0.05em 0.45em;\n  border: 1px solid #cfd9e3;\n  border-bottom-width: 3px;  /* imita o relevo de uma tecla */\n  border-radius: 5px;\n  background-color: #ffffff;\n}\nhr {\n  border: 0;\n  height: 2px;\n  margin: 2rem 0;\n  background: linear-gradient(to right, transparent, #cfd9e3, transparent);\n}\n.citacao {\n  margin: 2rem 0;\n  padding: 1.5rem;\n  border-left: 5px solid #ffb703;\n  border-radius: 6px;\n  background-color: #ffffff;\n}\n.citacao blockquote {\n  margin: 0;\n  font-size: 1.25rem;\n  font-style: italic;\n}\n.citacao blockquote p {\n  margin: 0;\n}\n.citacao figcaption {\n  margin-top: 0.75rem;\n  color: #4f5f6f;\n}\n",
   "js": null
  },
  "entidades": {
   "id": "entidades",
   "grupo": "Textos e links",
   "titulo": "Caracteres especiais (entidades)",
   "nota": "Alguns caracteres têm significado no HTML (< > &) e precisam ser escritos como entidades. Toda entidade começa com & e termina com ;.",
   "onde": {},
   "exemplo": "index.html#textos",
   "html": "<p>Para mostrar uma tag como texto: &lt;p&gt;</p>\n<p>O \"e comercial\": Arroz &amp; Feijão</p>\n<p>Direitos autorais: &copy; 2026 Seu Nome</p>\n<p>Marca registrada: Minha Marca&reg;</p>\n<p>Preço que não se separa na quebra de linha: R$&nbsp;10,00</p>\n<p>Setas e símbolos: &larr; &rarr; &hearts; &check;</p>\n",
   "css": null,
   "js": null
  },
  "listas": {
   "id": "listas",
   "grupo": "Textos e links",
   "titulo": "Listas: com marcador, numerada, de definição e de conferência",
   "nota": "ul quando a ordem não importa, ol quando importa, dl para termos e explicações. A lista de conferência (✓) é uma ul comum com um CSS diferente.",
   "onde": {},
   "exemplo": "index.html#textos",
   "html": "<ul>\n  <li>Item sem ordem</li>\n  <li>Outro item\n    <ul>\n      <li>Lista dentro da lista</li>\n    </ul>\n  </li>\n</ul>\n\n<ol>\n  <li>Primeiro passo</li>\n  <li>Segundo passo</li>\n  <li>Terceiro passo</li>\n</ol>\n\n<dl>\n  <dt>Termo</dt>\n  <dd>A explicação do termo.</dd>\n  <dt>Outro termo</dt>\n  <dd>Outra explicação.</dd>\n</dl>\n\n<ul class=\"lista-check\">\n  <li>Aprender HTML</li>\n  <li>Aprender CSS</li>\n  <li>Aprender JavaScript</li>\n</ul>\n",
   "css": "/* Cor da bolinha e do número das listas */\nli::marker {\n  color: #2a9d8f;\n  font-weight: 700;\n}\n\ndt {\n  font-weight: 700;\n}\ndd {\n  margin: 0 0 0.75rem 1rem;\n  color: #4f5f6f;\n}\n\n/* Lista de conferência: tira a bolinha e coloca um ✓ */\n.lista-check {\n  list-style: none;\n  padding: 0;\n}\n.lista-check li {\n  position: relative;\n  padding-left: 1.8rem;\n  margin-bottom: 0.4rem;\n}\n.lista-check li::before {\n  content: \"✓\";\n  position: absolute;\n  left: 0;\n  color: #2a9d8f;\n  font-weight: 700;\n}\n",
   "js": null
  },
  "links": {
   "id": "links",
   "grupo": "Textos e links",
   "titulo": "Todos os tipos de link",
   "nota": "O mesmo <a> serve para tudo: só muda o href. Troque o e-mail, o telefone e o WhatsApp pelos seus (só números, com país e DDD).",
   "onde": {},
   "exemplo": "index.html#links",
   "html": "<ul class=\"lista-links\">\n  <!-- Site externo em nova aba: sempre com rel=\"noopener\" -->\n  <li><a href=\"https://developer.mozilla.org/pt-BR/\" target=\"_blank\" rel=\"noopener noreferrer\">Site externo</a></li>\n\n  <!-- Outra página do seu site -->\n  <li><a href=\"sobre.html\">Outra página do meu site</a></li>\n\n  <!-- Seção da mesma página: # + id da seção -->\n  <li><a href=\"#contato\">Ir para Contato</a></li>\n\n  <li><a href=\"mailto:seuemail@exemplo.com?subject=Contato%20pelo%20site\">Mandar e-mail</a></li>\n  <li><a href=\"tel:+5532999999999\">Ligar</a></li>\n  <li><a href=\"https://wa.me/5532999999999?text=Ol%C3%A1\" target=\"_blank\" rel=\"noopener noreferrer\">WhatsApp</a></li>\n\n  <!-- Baixar um arquivo da pasta docs -->\n  <li><a href=\"docs/arquivo.pdf\" download>Baixar o PDF</a></li>\n</ul>\n\n<a class=\"botao-link\" href=\"#contato\">Link com cara de botão</a>\n",
   "css": "a {\n  color: #0d6a86;\n  text-underline-offset: 3px;\n}\na:hover {\n  text-decoration-thickness: 2px;\n}\n/* Contorno visível para quem navega pelo teclado (Tab) */\na:focus-visible {\n  outline: 3px solid #ffb703;\n  outline-offset: 3px;\n}\n\n/* Setinha automática depois de todo link externo */\n.lista-links a[href^=\"http\"]::after {\n  content: \" ↗\";\n}\n\n.botao-link {\n  display: inline-block;\n  padding: 0.7rem 1.4rem;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font-weight: 700;\n  text-decoration: none;\n  transition: transform 0.2s;\n}\n.botao-link:hover {\n  transform: translateY(-2px);\n}\n",
   "js": null
  },
  "imagem-link": {
   "id": "imagem-link",
   "grupo": "Textos e links",
   "titulo": "Imagem que é um link",
   "nota": "Qualquer coisa dentro de um <a> vira clicável. Aqui, a foto pequena abre a versão grande numa nova aba, com um zoom ao passar o mouse.",
   "onde": {},
   "exemplo": "index.html#links",
   "html": "<a class=\"imagem-link\" href=\"img/foto-grande.jpg\" target=\"_blank\" rel=\"noopener\">\n  <img src=\"img/foto-pequena.jpg\" alt=\"Descreva a foto. Clique para ver maior\" width=\"600\" height=\"400\" loading=\"lazy\">\n</a>\n",
   "css": ".imagem-link {\n  display: inline-block;\n  max-width: 100%;\n  overflow: hidden;         /* o zoom não vaza dos cantos arredondados */\n  border-radius: 10px;\n}\n.imagem-link img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  transition: transform 0.3s;\n}\n.imagem-link:hover img {\n  transform: scale(1.06);   /* 6% maior */\n}\n.imagem-link:focus-visible {\n  outline: 3px solid #ffb703;\n  outline-offset: 3px;\n}\n",
   "js": null
  },
  "imagem-legenda": {
   "id": "imagem-legenda",
   "grupo": "Imagens e mídia",
   "titulo": "Imagem simples e imagem com legenda",
   "nota": "Todo <img> precisa de src (o caminho) e alt (o que aparece na foto, em palavras). width e height são o tamanho original da foto: o CSS deixa ela menor na tela.",
   "onde": {},
   "exemplo": "index.html#imagens",
   "html": "<!-- Imagem simples -->\n<img class=\"img-responsiva\" src=\"img/minha-foto.jpg\" alt=\"Descreva o que aparece na foto\" width=\"1200\" height=\"800\" loading=\"lazy\">\n\n<!-- Imagem com legenda -->\n<figure class=\"figura\">\n  <img src=\"img/minha-foto.jpg\" alt=\"Descreva o que aparece na foto\" width=\"1200\" height=\"800\" loading=\"lazy\">\n  <figcaption>Legenda da foto.</figcaption>\n</figure>\n",
   "css": ".img-responsiva {\n  max-width: 100%;\n  height: auto;\n  border-radius: 10px;\n}\n\n.figura {\n  margin: 1.5rem 0;\n  overflow: hidden;\n  border-radius: 10px;\n  background-color: #ffffff;\n  box-shadow: 0 4px 16px rgba(18, 50, 74, 0.12);\n}\n.figura img {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.figura figcaption {\n  padding: 0.6rem 1rem;\n  color: #4f5f6f;\n  font-size: 0.92rem;\n}\n",
   "js": null
  },
  "imagem-responsiva": {
   "id": "imagem-responsiva",
   "grupo": "Imagens e mídia",
   "titulo": "Imagem diferente no celular (picture e srcset)",
   "nota": "<picture> troca de foto conforme a largura da tela. srcset oferece a mesma foto em tamanhos diferentes e o navegador escolhe a menor que serve.",
   "onde": {},
   "exemplo": "index.html#imagens",
   "html": "<!-- No celular (até 700px) mostra a foto quadrada; no resto, a larga -->\n<picture>\n  <source media=\"(max-width: 700px)\" srcset=\"img/banner-quadrado.jpg\">\n  <img class=\"img-responsiva\" src=\"img/banner-largo.jpg\" alt=\"Descreva a foto\" width=\"1600\" height=\"560\">\n</picture>\n\n<!-- Mesma foto em dois tamanhos: o navegador escolhe -->\n<img class=\"img-responsiva\"\n     src=\"img/foto-grande.jpg\"\n     srcset=\"img/foto-pequena.jpg 600w, img/foto-grande.jpg 1200w\"\n     sizes=\"(max-width: 700px) 100vw, 600px\"\n     alt=\"Descreva a foto\" width=\"1200\" height=\"800\" loading=\"lazy\">\n",
   "css": ".img-responsiva {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  border-radius: 10px;\n}\n",
   "js": null
  },
  "svg": {
   "id": "svg",
   "grupo": "Imagens e mídia",
   "titulo": "Desenho em SVG",
   "nota": "SVG é uma imagem feita de código: não perde qualidade no zoom e o CSS muda as cores. role=\"img\" e aria-label fazem o papel do alt.",
   "onde": {},
   "exemplo": "index.html#imagens",
   "html": "<svg class=\"desenho\" viewBox=\"0 0 300 120\" role=\"img\" aria-label=\"Um círculo, um quadrado e um triângulo\" xmlns:c2pa=\"http://c2pa.org/manifest\"><metadata><c2pa:manifest>AAAWgmp1bWIAAAAeanVtZGMycGEAEQAQgAAAqgA4m3EDYzJwYQAAABZcanVtYgAAAEdqdW1kYzJtYQARABCAAACqADibcQN1cm46YzJwYTpiNDY3NTU1Yy02ZDAxLTRmYzktOWIzMi1mYzg5YTcyMmY4YzUAAAADl2p1bWIAAAApanVtZGMyYXMAEQAQgAAAqgA4m3EDYzJwYS5hc3NlcnRpb25zAAAAALxqdW1iAAAARGp1bWRjYm9yABEAEIAAAKoAOJtxE2MycGEuaW5ncmVkaWVudC52MwAAAAAYYzJzaBLQGCRuMoa1dTpSRmIaO0sAAABwY2JvcqNpZGM6Zm9ybWF0bWltYWdlL3N2Zyt4bWxqaW5zdGFuY2VJRHgseG1wOmlpZDo3Yzc1MmFmZi05MjM2LTRhYTEtYWMzMS00NGVhMDJjMzk4OWRscmVsYXRpb25zaGlwaHBhcmVudE9mAAAB4mp1bWIAAABBanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5hY3Rpb25zLnYyAAAAABhjMnNoUz0U/Eug0MWgYHddXE3qxAAAAZljYm9yomdhY3Rpb25zgqJmYWN0aW9ua2MycGEub3BlbmVkanBhcmFtZXRlcnOha2luZ3JlZGllbnRzgaJjdXJseC1zZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmluZ3JlZGllbnQudjNkaGFzaFggbp91LOVav5FpVrbkO5DP2/sQ1TEBsufDPezKvfmDcvGkZmFjdGlvbngdY29tLmFudGhyb3BpYy5jbGF1ZGUucHJvdmlkZWRqcGFyYW1ldGVyc6F4H2NvbS5hbnRocm9waWMub3JpZ2luLWNvbmZpZGVuY2VndW5rbm93bmtkZXNjcmlwdGlvbnhmQ2xhdWRlIHByb3ZpZGVkIHRoaXMgZmlsZSBhdCB0aGUgcmVxdWVzdCBvZiBhIHVzZXIgYW5kIG1heSBoYXZlIGNyZWF0ZWQgb3IgbW9kaWZpZWQgdGhlIGZpbGUgY29udGVudHMubXNvZnR3YXJlQWdlbnShZG5hbWVmQ2xhdWRlcmFsbEFjdGlvbnNJbmNsdWRlZPUAAADIanVtYgAAAEBqdW1kY2JvcgARABCAAACqADibcRNjMnBhLmhhc2guZGF0YQAAAAAYYzJzaGY5XdFdJVefGQVXAVwaSWgAAACAY2JvcqVjYWxnZnNoYTI1NmNwYWRNAAAAAAAAAAAAAAAAAGRoYXNoWCB5qaudpcT+crWnc/CbcEC3Am9c3vHLDg1aRY05rFH5smRuYW1lbmp1bWJmIG1hbmlmZXN0amV4Y2x1c2lvbnOBomVzdGFydBirZmxlbmd0aBkeBAAAAj5qdW1iAAAAJ2p1bWRjMmNsABEAEIAAAKoAOJtxA2MycGEuY2xhaW0udjIAAAACD2Nib3KlY2FsZ2ZzaGEyNTZpc2lnbmF0dXJleE1zZWxmI2p1bWJmPS9jMnBhL3VybjpjMnBhOmI0Njc1NTVjLTZkMDEtNGZjOS05YjMyLWZjODlhNzIyZjhjNS9jMnBhLnNpZ25hdHVyZWppbnN0YW5jZUlEeCx4bXA6aWlkOmZkYTc3M2Q3LWJiYWYtNGRhNy04N2JiLTA2NTRhZGE0ZWQ5ZHJjcmVhdGVkX2Fzc2VydGlvbnODomN1cmx4LXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaW5ncmVkaWVudC52M2RoYXNoWCBun3Us5Vq/kWlWtuQ7kM/b+xDVMQGy58M97Mq9+YNy8aJjdXJseCpzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmFjdGlvbnMudjJkaGFzaFggin+/Loa0a3/NlJsVl8wvq7FbW73DTC0vS83cqmHZxS2iY3VybHgpc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5oYXNoLmRhdGFkaGFzaFggquse63g0SQ9aAbMQc9GIlNMLcAKf3VGvltu/2dOhXzB0Y2xhaW1fZ2VuZXJhdG9yX2luZm+jZG5hbWVvQW50aHJvcGljIEZpbGVzZ3ZlcnNpb25lMS4wLjBrc3BlY1ZlcnNpb25lMi40LjAAABA4anVtYgAAAChqdW1kYzJjcwARABCAAACqADibcQNjMnBhLnNpZ25hdHVyZQAAABAIY2JvctKEWQISogEmGCFZAgowggIGMIIBjaADAgECAhRA5aAK7sI50L64g/oGQgU9Z1UTADAKBggqhkjOPQQDAzBJMRcwFQYDVQQKEw5BbnRocm9waWMsIFBCQzEuMCwGA1UEAxMlQW50aHJvcGljIENvbnRlbnQgQ3JlZGVudGlhbHMgUm9vdCBDQTAeFw0yNjA4MDcxODQzNTZaFw0yODA4MDYxOTQzNTZaMEQxFzAVBgNVBAoTDkFudGhyb3BpYywgUEJDMSkwJwYDVQQDEyBBbnRocm9waWMgQ2xhdWRlIENvbnRlbnQgU2lnbmluZzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJh6CmvLUBgFFNU0vUKlOVtE6djd17L5SuwX0LemFisBM3dkd/3cyjxFA3Qo5S46fX0/ihY0VZ7mfb9KF703t5OjWDBWMA4GA1UdDwEB/wQEAwIHgDAVBgNVHSUEDjAMBgorBgEEAYPoXgIBMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUzlHiBIFOZFsj+OPEz5o+nMHXXMIwCgYIKoZIzj0EAwMDZwAwZAIwMXMdFJ4BetLLVY7ORuE9noqbbAZOZn/aArXyTwFAZfKrPzxF2vPoJNf1+UCdg1XGAjBwX1zd9WGqYkqmL5SFqw1QySjr1zJfpJM9+1rdDwSPLMOPOjKuiXjoU/pUUeG9RwmhY3BhZFkNngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPZYQFcpIoq2qNKIkchskK+C2RFHNDgrPBG0EPC2jFoh6/LllmedUIRyoE8ZioVKdvcwq5HOFCN4RR4ZDAEbJfmxWYk=</c2pa:manifest></metadata>\n  <circle cx=\"50\" cy=\"60\" r=\"40\" class=\"forma forma-1\" />\n  <rect x=\"110\" y=\"20\" width=\"80\" height=\"80\" rx=\"8\" class=\"forma forma-2\" />\n  <polygon points=\"220,100 260,20 300,100\" class=\"forma forma-3\" />\n</svg>\n",
   "css": ".desenho {\n  width: 100%;\n  max-width: 400px;\n  height: auto;\n}\n/* No SVG, a cor de preenchimento é \"fill\" */\n.forma-1 { fill: #2a9d8f; }\n.forma-2 { fill: #ffb703; }\n.forma-3 { fill: #c62839; }\n.forma {\n  transition: opacity 0.2s;\n}\n.forma:hover {\n  opacity: 0.6;\n}\n",
   "js": null
  },
  "mapa-imagem": {
   "id": "mapa-imagem",
   "grupo": "Imagens e mídia",
   "titulo": "Partes de uma imagem que são links (mapa de imagem)",
   "nota": "coords são posições em pixels na imagem original: retângulo (x1,y1,x2,y2), círculo (x,y,raio), polígono (x,y de cada ponta). Para descobrir as posições, abra a imagem no Paint: a posição do mouse aparece embaixo. A imagem não pode encolher, senão as áreas saem do lugar; por isso ela rola para o lado no celular.",
   "onde": {},
   "exemplo": "index.html#imagens",
   "html": "<div class=\"mapa-rolagem\">\n  <img src=\"img/minha-imagem.png\" usemap=\"#mapa-formas\" alt=\"Descreva a imagem inteira\" width=\"600\" height=\"300\">\n</div>\n<map name=\"mapa-formas\">\n  <area shape=\"rect\" coords=\"40,60,200,240\" href=\"#parte-1\" alt=\"Descrição da parte 1\">\n  <area shape=\"circle\" coords=\"320,150,90\" href=\"#parte-2\" alt=\"Descrição da parte 2\">\n  <area shape=\"poly\" coords=\"440,240,520,60,580,240\" href=\"#parte-3\" alt=\"Descrição da parte 3\">\n</map>\n",
   "css": ".mapa-rolagem {\n  overflow-x: auto;         /* no celular, rola para o lado em vez de encolher */\n}\n.mapa-rolagem img {\n  max-width: none;          /* a imagem mantém o tamanho original */\n}\n",
   "js": null
  },
  "galeria": {
   "id": "galeria",
   "grupo": "Imagens e mídia",
   "titulo": "Galeria de fotos que amplia ao clicar",
   "nota": "Fotos em grade; ao clicar, abrem grandes numa janela. Setas do teclado trocam a foto e Esc fecha. Troque os caminhos das fotos pelos seus (data-grande = foto que abre grande).",
   "onde": {
    "html": "Cole a galeria onde quiser; a janela (<dialog>) pode ficar logo antes de </body>"
   },
   "exemplo": "index.html#imagens",
   "html": "<ul class=\"galeria\">\n  <li>\n    <button type=\"button\" class=\"galeria-item\" data-grande=\"img/foto-1.jpg\" data-legenda=\"Legenda da foto 1\">\n      <img src=\"img/foto-1.jpg\" alt=\"Descreva a foto 1\" width=\"600\" height=\"400\" loading=\"lazy\">\n    </button>\n  </li>\n  <li>\n    <button type=\"button\" class=\"galeria-item\" data-grande=\"img/foto-2.jpg\" data-legenda=\"Legenda da foto 2\">\n      <img src=\"img/foto-2.jpg\" alt=\"Descreva a foto 2\" width=\"600\" height=\"400\" loading=\"lazy\">\n    </button>\n  </li>\n  <li>\n    <button type=\"button\" class=\"galeria-item\" data-grande=\"img/foto-3.jpg\" data-legenda=\"Legenda da foto 3\">\n      <img src=\"img/foto-3.jpg\" alt=\"Descreva a foto 3\" width=\"600\" height=\"400\" loading=\"lazy\">\n    </button>\n  </li>\n</ul>\n\n<!-- Janela da foto ampliada -->\n<dialog class=\"lightbox\" id=\"lightbox\" aria-label=\"Foto ampliada\">\n  <figure class=\"lightbox-figura\">\n    <img id=\"lightbox-img\" src=\"\" alt=\"\">\n    <figcaption id=\"lightbox-legenda\"></figcaption>\n  </figure>\n  <button type=\"button\" class=\"lightbox-btn lightbox-anterior\" id=\"lightbox-anterior\" aria-label=\"Foto anterior\">‹</button>\n  <button type=\"button\" class=\"lightbox-btn lightbox-proximo\" id=\"lightbox-proximo\" aria-label=\"Próxima foto\">›</button>\n  <button type=\"button\" class=\"lightbox-btn lightbox-fechar\" id=\"lightbox-fechar\" aria-label=\"Fechar\">✕</button>\n</dialog>\n",
   "css": "/* Grade automática: quantas colunas couberem, cada uma com no mínimo 220px */\n.galeria {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 1rem;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.galeria-item {\n  display: block;\n  width: 100%;\n  padding: 0;\n  border: 0;\n  border-radius: 10px;\n  overflow: hidden;\n  background: none;\n  cursor: zoom-in;\n}\n.galeria-item img {\n  display: block;\n  width: 100%;\n  height: auto;\n  aspect-ratio: 3 / 2;\n  object-fit: cover;\n  transition: transform 0.4s;\n}\n.galeria-item:hover img {\n  transform: scale(1.08);\n}\n\n/* Janela ampliada */\n.lightbox {\n  width: min(1000px, 94vw);\n  max-width: none;\n  padding: 0;\n  border: 0;\n  border-radius: 10px;\n  background-color: #000000;\n  overflow: visible;\n}\n.lightbox::backdrop {\n  background-color: rgba(8, 20, 30, 0.8);\n}\n.lightbox-figura {\n  margin: 0;\n}\n.lightbox-figura img {\n  display: block;\n  width: 100%;\n  max-height: 84vh;\n  object-fit: contain;\n}\n.lightbox-figura figcaption {\n  padding: 0.5rem 1rem;\n  color: #ffffff;\n  text-align: center;\n}\n.lightbox-btn {\n  position: absolute;\n  width: 48px;\n  height: 48px;\n  border: 0;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0.9);\n  color: #12324a;\n  font-size: 1.6rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.lightbox-anterior { top: 45%; left: 1rem; }\n.lightbox-proximo  { top: 45%; right: 1rem; }\n.lightbox-fechar   { top: 1rem; right: 1rem; font-size: 1.1rem; }\n",
   "js": "// ----- Galeria que amplia ao clicar -----\nconst itensGaleria = document.querySelectorAll(\".galeria-item\");\nconst lightbox = document.getElementById(\"lightbox\");\n\nif (lightbox && itensGaleria.length > 0) {\n  const lightboxImg = document.getElementById(\"lightbox-img\");\n  const lightboxLegenda = document.getElementById(\"lightbox-legenda\");\n  let fotoAtual = 0;\n\n  function mostrarFoto(posicao) {\n    // Dá a volta: antes da primeira vem a última, e vice-versa\n    fotoAtual = (posicao + itensGaleria.length) % itensGaleria.length;\n    const item = itensGaleria[fotoAtual];\n    lightboxImg.src = item.dataset.grande;\n    lightboxImg.alt = item.dataset.legenda;\n    lightboxLegenda.textContent = item.dataset.legenda + \" (\" + (fotoAtual + 1) + \" de \" + itensGaleria.length + \")\";\n  }\n\n  itensGaleria.forEach(function (item, posicao) {\n    item.addEventListener(\"click\", function () {\n      mostrarFoto(posicao);\n      lightbox.showModal();   // abre a janela por cima da página\n    });\n  });\n\n  document.getElementById(\"lightbox-anterior\").addEventListener(\"click\", function () {\n    mostrarFoto(fotoAtual - 1);\n  });\n  document.getElementById(\"lightbox-proximo\").addEventListener(\"click\", function () {\n    mostrarFoto(fotoAtual + 1);\n  });\n  document.getElementById(\"lightbox-fechar\").addEventListener(\"click\", function () {\n    lightbox.close();\n  });\n\n  // Setas do teclado trocam a foto (o Esc o <dialog> já fecha sozinho)\n  lightbox.addEventListener(\"keydown\", function (evento) {\n    if (evento.key === \"ArrowLeft\") mostrarFoto(fotoAtual - 1);\n    if (evento.key === \"ArrowRight\") mostrarFoto(fotoAtual + 1);\n  });\n\n  // Clicar no fundo escuro fecha\n  lightbox.addEventListener(\"click\", function (evento) {\n    if (evento.target === lightbox) lightbox.close();\n  });\n}\n"
  },
  "video-audio": {
   "id": "video-audio",
   "grupo": "Imagens e mídia",
   "titulo": "Vídeo e áudio do próprio site",
   "nota": "Coloque os arquivos numa pasta midia. MP4 funciona em quase todos os navegadores. A legenda (.vtt) é um arquivo de texto e só aparece abrindo pelo Live Server ou no site publicado.",
   "onde": {},
   "exemplo": "index.html#audio-video",
   "html": "<video class=\"video\" controls poster=\"img/capa-do-video.jpg\" preload=\"metadata\" width=\"1280\" height=\"720\">\n  <source src=\"midia/meu-video.mp4\" type=\"video/mp4\">\n  <track src=\"midia/legendas.vtt\" kind=\"subtitles\" srclang=\"pt-BR\" label=\"Português\" default>\n  Seu navegador não toca vídeo.\n</video>\n\n<audio class=\"audio\" controls preload=\"metadata\">\n  <source src=\"midia/minha-musica.mp3\" type=\"audio/mpeg\">\n  Seu navegador não toca áudio.\n</audio>\n",
   "css": ".video {\n  display: block;\n  width: 100%;\n  max-width: 800px;\n  height: auto;\n  border-radius: 10px;\n  background-color: #000000;\n}\n.audio {\n  display: block;\n  width: 100%;\n  max-width: 800px;\n  margin-top: 1rem;\n}\n",
   "js": null
  },
  "player": {
   "id": "player",
   "grupo": "Imagens e mídia",
   "titulo": "Vídeo com botões feitos por você",
   "nota": "O vídeo sem o atributo controls e com botões comuns do HTML. O JavaScript manda tocar, pausar e ligar o som, e mostra o tempo.",
   "onde": {},
   "exemplo": "index.html#audio-video",
   "html": "<div class=\"player\">\n  <video id=\"video-custom\" class=\"player-video\" poster=\"img/capa-do-video.jpg\" preload=\"metadata\" width=\"1280\" height=\"720\" muted playsinline>\n    <source src=\"midia/meu-video.mp4\" type=\"video/mp4\">\n  </video>\n  <div class=\"player-controles\">\n    <button type=\"button\" class=\"botao\" id=\"btn-play\">▶ Tocar</button>\n    <button type=\"button\" class=\"botao\" id=\"btn-mudo\">Ligar som</button>\n    <progress id=\"video-progresso\" max=\"100\" value=\"0\" aria-label=\"Progresso do vídeo\"></progress>\n    <span id=\"video-tempo\" class=\"player-tempo\">0:00</span>\n  </div>\n</div>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.player {\n  max-width: 800px;\n  padding: 0.5rem;\n  border-radius: 10px;\n  background-color: #ffffff;\n  box-shadow: 0 4px 16px rgba(18, 50, 74, 0.12);\n}\n.player-video {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  background-color: #000000;\n}\n.player-controles {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n  padding-top: 0.5rem;\n}\n.player-controles progress {\n  flex: 1;                 /* ocupa o espaço que sobrar */\n  min-width: 80px;\n  accent-color: #2a9d8f;\n}\n.player-tempo {\n  font-family: Consolas, monospace;\n  font-variant-numeric: tabular-nums;\n}\n",
   "js": "// ----- Vídeo com botões próprios -----\nconst videoCustom = document.getElementById(\"video-custom\");\n\nif (videoCustom) {\n  const btnPlay = document.getElementById(\"btn-play\");\n  const btnMudo = document.getElementById(\"btn-mudo\");\n  const videoProgresso = document.getElementById(\"video-progresso\");\n  const videoTempo = document.getElementById(\"video-tempo\");\n\n  // 75 segundos viram \"1:15\"\n  function formatarTempo(segundos) {\n    const min = Math.floor(segundos / 60);\n    const seg = Math.floor(segundos % 60);\n    return min + \":\" + String(seg).padStart(2, \"0\");\n  }\n\n  btnPlay.addEventListener(\"click\", function () {\n    if (videoCustom.paused) {\n      videoCustom.play();\n    } else {\n      videoCustom.pause();\n    }\n  });\n\n  videoCustom.addEventListener(\"play\", function () { btnPlay.textContent = \"❚❚ Pausar\"; });\n  videoCustom.addEventListener(\"pause\", function () { btnPlay.textContent = \"▶ Tocar\"; });\n\n  btnMudo.addEventListener(\"click\", function () {\n    videoCustom.muted = !videoCustom.muted;\n    btnMudo.textContent = videoCustom.muted ? \"Ligar som\" : \"Tirar som\";\n  });\n\n  videoCustom.addEventListener(\"timeupdate\", function () {\n    if (!videoCustom.duration) return;\n    videoProgresso.value = (videoCustom.currentTime / videoCustom.duration) * 100;\n    videoTempo.textContent = formatarTempo(videoCustom.currentTime) + \" / \" + formatarTempo(videoCustom.duration);\n  });\n}\n"
  },
  "iframe": {
   "id": "iframe",
   "grupo": "Imagens e mídia",
   "titulo": "Vídeo do YouTube, mapa do Google e PDF na página",
   "nota": "Pegue o código no próprio site: no YouTube, Compartilhar > Incorporar; no Google Maps, Compartilhar > Incorporar um mapa. Troque só o endereço do src. YouTube e mapa precisam de internet. O PDF precisa estar na pasta docs do seu site.",
   "onde": {},
   "exemplo": "index.html#incorporar",
   "html": "<!-- YouTube: /embed/ + o código do vídeo (o que vem depois de v= no link) -->\n<div class=\"incorporado\">\n  <iframe src=\"https://www.youtube.com/embed/CODIGO-DO-VIDEO\" title=\"Nome do vídeo\" loading=\"lazy\"\n          allow=\"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n</div>\n\n<!-- Google Maps: troque o nome do lugar depois de q= -->\n<div class=\"incorporado\">\n  <iframe src=\"https://maps.google.com/maps?q=Barbacena%2C%20MG&amp;z=14&amp;output=embed\" title=\"Mapa de Barbacena\" loading=\"lazy\"></iframe>\n</div>\n\n<!-- Um PDF do seu site, dentro da página (o arquivo fica na pasta docs) -->\n<iframe class=\"pdf\" src=\"docs/arquivo.pdf\" title=\"Nome do documento\" loading=\"lazy\"></iframe>\n",
   "css": ".incorporado {\n  max-width: 800px;\n  margin-bottom: 1.5rem;\n}\n.incorporado iframe {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16 / 9;    /* mantém o formato de vídeo em qualquer largura */\n  border: 0;\n  border-radius: 10px;\n}\n\n.pdf {\n  display: block;\n  width: 100%;\n  max-width: 800px;\n  height: 480px;\n  border: 1px solid #cfd9e3;\n  border-radius: 10px;\n}\n",
   "js": null
  },
  "botoes": {
   "id": "botoes",
   "grupo": "Formulários, tabelas e botões",
   "titulo": "Botões: variações e estados",
   "nota": "Uma classe base (.botao) e classes de variação que você soma no HTML: class=\"botao botao-contorno\". Use <button> quando o clique FAZ algo na página e <a> quando LEVA para outro lugar.",
   "onde": {},
   "exemplo": "index.html#formularios",
   "html": "<div class=\"linha-botoes\">\n  <button type=\"button\" class=\"botao\">Principal</button>\n  <button type=\"button\" class=\"botao botao-destaque\">Destaque</button>\n  <button type=\"button\" class=\"botao botao-contorno\">Contorno</button>\n  <button type=\"button\" class=\"botao botao-pequeno\">Pequeno</button>\n  <button type=\"button\" class=\"botao\" disabled>Desabilitado</button>\n  <a class=\"botao\" href=\"#contato\">Link com cara de botão</a>\n</div>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.botao:active {\n  transform: translateY(1px);   /* afunda no clique */\n}\n.botao:focus-visible {\n  outline: 3px solid #ffb703;   /* contorno para quem usa o teclado */\n  outline-offset: 3px;\n}\n\n/* Variações: sempre junto com .botao */\n.botao.botao-destaque {\n  background-color: #ffb703;\n  color: #12324a;\n}\n.botao.botao-destaque:hover {\n  background-color: #ffc933;\n}\n.botao.botao-contorno {\n  background-color: transparent;\n  color: #12324a;\n  box-shadow: inset 0 0 0 2px #12324a;   /* borda que não muda o tamanho do botão */\n}\n.botao.botao-contorno:hover {\n  background-color: #eaf0f5;\n}\n.botao.botao-pequeno {\n  padding: 0.35rem 0.8rem;\n  font-size: 0.9rem;\n}\n.botao:disabled,\n.botao:disabled:hover {\n  background-color: #cfd9e3;\n  color: #4f5f6f;\n  cursor: not-allowed;\n}\n\n.linha-botoes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n",
   "js": null
  },
  "campos-formulario": {
   "id": "campos-formulario",
   "grupo": "Formulários, tabelas e botões",
   "titulo": "Formulário com todos os tipos de campo",
   "nota": "Todos os tipos de campo num formulário só: texto, número, data, telefone, site, lista de opções, sugestões, cor, controle deslizante, horário, radio, checkbox, arquivo e texto longo. Apague os que não usar. O atributo name é o nome do dado: campo sem name não é enviado. O JavaScript mostra os dados coletados, para você conferir.",
   "onde": {},
   "exemplo": "index.html#formularios",
   "html": "<form class=\"form-completo\" id=\"form-completo\">\n  <fieldset>\n    <legend>Dados</legend>\n    <label for=\"fc-nome\">Nome</label>\n    <input type=\"text\" id=\"fc-nome\" name=\"nome\" placeholder=\"Seu nome\" required>\n\n    <label for=\"fc-idade\">Idade</label>\n    <input type=\"number\" id=\"fc-idade\" name=\"idade\" min=\"10\" max=\"99\">\n\n    <label for=\"fc-nascimento\">Data de nascimento</label>\n    <input type=\"date\" id=\"fc-nascimento\" name=\"nascimento\">\n\n    <label for=\"fc-telefone\">Celular</label>\n    <input type=\"tel\" id=\"fc-telefone\" name=\"telefone\" placeholder=\"32 99999-9999\">\n\n    <label for=\"fc-site\">Site</label>\n    <input type=\"url\" id=\"fc-site\" name=\"site\" placeholder=\"https://...\">\n  </fieldset>\n\n  <fieldset>\n    <legend>Escolhas</legend>\n    <label for=\"fc-curso\">Curso</label>\n    <select id=\"fc-curso\" name=\"curso\">\n      <option value=\"\">Selecione...</option>\n      <optgroup label=\"Técnico\">\n        <option value=\"Informática\">Informática</option>\n        <option value=\"Desenvolvimento de Sistemas\">Desenvolvimento de Sistemas</option>\n      </optgroup>\n    </select>\n\n    <label for=\"fc-linguagem\">Linguagem favorita (com sugestões)</label>\n    <input type=\"text\" id=\"fc-linguagem\" name=\"linguagem\" list=\"fc-sugestoes\">\n    <datalist id=\"fc-sugestoes\">\n      <option value=\"JavaScript\"></option>\n      <option value=\"Python\"></option>\n      <option value=\"Java\"></option>\n    </datalist>\n\n    <label for=\"fc-cor\">Cor favorita</label>\n    <input type=\"color\" id=\"fc-cor\" name=\"cor\" value=\"#2a9d8f\">\n\n    <label for=\"fc-nivel\">Nível: <output id=\"fc-nivel-valor\">5</output> de 10</label>\n    <input type=\"range\" id=\"fc-nivel\" name=\"nivel\" min=\"0\" max=\"10\" value=\"5\">\n\n    <label for=\"fc-horario\">Melhor horário</label>\n    <input type=\"time\" id=\"fc-horario\" name=\"horario\">\n  </fieldset>\n\n  <fieldset>\n    <legend>Turno (escolha um)</legend>\n    <label class=\"fc-opcao\"><input type=\"radio\" name=\"turno\" value=\"Manhã\" checked> Manhã</label>\n    <label class=\"fc-opcao\"><input type=\"radio\" name=\"turno\" value=\"Tarde\"> Tarde</label>\n    <label class=\"fc-opcao\"><input type=\"radio\" name=\"turno\" value=\"Noite\"> Noite</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>Interesses (escolha vários)</legend>\n    <label class=\"fc-opcao\"><input type=\"checkbox\" name=\"interesses\" value=\"Front-end\"> Front-end</label>\n    <label class=\"fc-opcao\"><input type=\"checkbox\" name=\"interesses\" value=\"Back-end\"> Back-end</label>\n    <label class=\"fc-opcao\"><input type=\"checkbox\" name=\"interesses\" value=\"Jogos\"> Jogos</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>Mais</legend>\n    <label for=\"fc-foto\">Foto</label>\n    <input type=\"file\" id=\"fc-foto\" name=\"foto\" accept=\"image/*\">\n\n    <label for=\"fc-sobre\">Sobre você</label>\n    <textarea id=\"fc-sobre\" name=\"sobre\" rows=\"4\"></textarea>\n  </fieldset>\n\n  <div class=\"fc-acoes\">\n    <button type=\"submit\" class=\"botao\">Enviar</button>\n    <button type=\"reset\" class=\"botao\">Limpar</button>\n  </div>\n</form>\n\n<pre class=\"fc-resultado\" id=\"fc-resultado\" hidden></pre>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n/* Garante que o atributo hidden sempre esconda (igual em vários exemplos) */\n[hidden] {\n  display: none !important;\n}\n\n.form-completo {\n  display: grid;\n  gap: 1rem;\n  max-width: 640px;\n}\n.form-completo fieldset {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0;\n  padding: 1rem;\n  border: 1px solid #cfd9e3;\n  border-radius: 8px;\n}\n.form-completo legend {\n  padding: 0 0.4rem;\n  font-weight: 700;\n}\n.form-completo label {\n  margin-top: 0.4rem;\n  font-weight: 700;\n}\n/* Campos de texto: todos com a mesma cara */\n.form-completo input:not([type=\"radio\"]):not([type=\"checkbox\"]):not([type=\"range\"]):not([type=\"color\"]):not([type=\"file\"]),\n.form-completo select,\n.form-completo textarea {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0.55rem 0.75rem;\n  border: 2px solid #cfd9e3;\n  border-radius: 6px;\n  font: inherit;\n}\n.form-completo input:focus,\n.form-completo select:focus,\n.form-completo textarea:focus {\n  outline: none;\n  border-color: #2a9d8f;\n}\n/* Pinta radio, checkbox e o controle deslizante com a cor do site */\n.form-completo input {\n  accent-color: #2a9d8f;\n}\n.form-completo .fc-opcao {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0;\n  font-weight: 400;\n}\n.fc-acoes {\n  display: flex;\n  gap: 0.75rem;\n}\n.fc-resultado {\n  max-width: 640px;\n  padding: 1rem;\n  border-radius: 8px;\n  background-color: #0f2233;\n  color: #e6f1f8;\n  white-space: pre-wrap;\n}\n",
   "js": "// ----- Formulário com todos os tipos de campo -----\nconst formCompleto = document.getElementById(\"form-completo\");\n\nif (formCompleto) {\n  const fcNivel = document.getElementById(\"fc-nivel\");\n  const fcNivelValor = document.getElementById(\"fc-nivel-valor\");\n  const fcResultado = document.getElementById(\"fc-resultado\");\n\n  // Mostra o número do controle deslizante enquanto arrasta\n  fcNivel.addEventListener(\"input\", function () {\n    fcNivelValor.textContent = fcNivel.value;\n  });\n\n  formCompleto.addEventListener(\"submit\", function (evento) {\n    evento.preventDefault();\n\n    // Junta os dados pelo name; checkbox com o mesmo name pode ter vários valores\n    const dados = new FormData(formCompleto);\n    const linhas = [];\n    for (const [nome, valor] of dados) {\n      const texto = valor instanceof File ? valor.name : valor;   // arquivo: só o nome\n      if (texto !== \"\") linhas.push(nome + \": \" + texto);\n    }\n\n    fcResultado.textContent = \"Dados que seriam enviados:\\n\" + linhas.join(\"\\n\");\n    fcResultado.hidden = false;\n  });\n\n  formCompleto.addEventListener(\"reset\", function () {\n    fcResultado.hidden = true;\n    fcNivelValor.textContent = \"5\";\n  });\n}\n"
  },
  "formulario": {
   "id": "formulario",
   "grupo": "Formulários, tabelas e botões",
   "titulo": "Formulário de contato",
   "nota": "O HTML confere os campos sozinho (required, type=\"email\"). O JavaScript conta os caracteres e mostra uma mensagem de agradecimento. Atenção: sozinho, ele não manda e-mail de verdade. Para isso é preciso um servidor ou um serviço como o Formspree.",
   "onde": {},
   "exemplo": "index.html#formularios",
   "html": "<form class=\"form-contato\" id=\"form-contato\">\n  <div class=\"campo\">\n    <label for=\"contato-nome\">Nome *</label>\n    <input type=\"text\" id=\"contato-nome\" name=\"nome\" required minlength=\"2\" autocomplete=\"name\">\n  </div>\n\n  <div class=\"campo\">\n    <label for=\"contato-email\">E-mail *</label>\n    <input type=\"email\" id=\"contato-email\" name=\"email\" required autocomplete=\"email\" placeholder=\"voce@exemplo.com\">\n  </div>\n\n  <div class=\"campo\">\n    <label for=\"contato-assunto\">Assunto</label>\n    <select id=\"contato-assunto\" name=\"assunto\">\n      <option value=\"duvida\">Dúvida</option>\n      <option value=\"sugestao\">Sugestão</option>\n      <option value=\"outro\">Outro</option>\n    </select>\n  </div>\n\n  <div class=\"campo\">\n    <label for=\"contato-mensagem\">Mensagem *</label>\n    <textarea id=\"contato-mensagem\" name=\"mensagem\" rows=\"5\" maxlength=\"300\" required></textarea>\n    <small id=\"contato-contador\">0 de 300 caracteres</small>\n  </div>\n\n  <label class=\"campo-opcao\">\n    <input type=\"checkbox\" name=\"novidades\" value=\"sim\">\n    Quero receber novidades\n  </label>\n\n  <button type=\"submit\" class=\"botao\">Enviar</button>\n</form>\n\n<p class=\"form-resposta\" id=\"contato-resposta\" role=\"status\" hidden></p>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n/* Garante que o atributo hidden sempre esconda (igual em vários exemplos) */\n[hidden] {\n  display: none !important;\n}\n\n.form-contato {\n  display: grid;\n  gap: 1rem;\n  max-width: 560px;\n}\n.campo {\n  display: flex;\n  flex-direction: column;   /* label em cima, campo embaixo */\n  gap: 0.3rem;\n}\n.campo label {\n  font-weight: 700;\n}\n.campo input,\n.campo select,\n.campo textarea {\n  width: 100%;\n  box-sizing: border-box;   /* a largura inclui padding e borda */\n  padding: 0.6rem 0.8rem;\n  border: 2px solid #cfd9e3;\n  border-radius: 6px;\n  font: inherit;\n}\n.campo textarea {\n  resize: vertical;\n}\n.campo input:focus,\n.campo select:focus,\n.campo textarea:focus {\n  outline: none;\n  border-color: #2a9d8f;\n  box-shadow: 0 0 0 4px rgba(42, 157, 143, 0.25);\n}\n/* Vermelho só depois que a pessoa mexeu no campo */\n.campo input:user-invalid,\n.campo textarea:user-invalid {\n  border-color: #c62839;\n}\n.campo small {\n  color: #4f5f6f;\n}\n.campo-opcao {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.form-resposta {\n  max-width: 560px;\n  padding: 1rem;\n  border-left: 5px solid #2a9d8f;\n  border-radius: 6px;\n  background-color: #d5f2ea;\n  color: #0d5c50;\n  font-weight: 700;\n}\n",
   "js": "// ----- Formulário de contato -----\nconst formContato = document.getElementById(\"form-contato\");\n\nif (formContato) {\n  const campoMensagemContato = document.getElementById(\"contato-mensagem\");\n  const contadorContato = document.getElementById(\"contato-contador\");\n  const respostaContato = document.getElementById(\"contato-resposta\");\n  const limiteContato = campoMensagemContato.maxLength;\n\n  // Conta os caracteres enquanto a pessoa digita\n  campoMensagemContato.addEventListener(\"input\", function () {\n    contadorContato.textContent = campoMensagemContato.value.length + \" de \" + limiteContato + \" caracteres\";\n  });\n\n  // Só dispara se todos os campos estiverem válidos\n  formContato.addEventListener(\"submit\", function (evento) {\n    evento.preventDefault();   // não recarrega a página\n\n    const dados = new FormData(formContato);   // lê os campos pelo atributo name\n    respostaContato.textContent = \"Obrigado, \" + dados.get(\"nome\") + \"! Recebemos a sua mensagem.\";\n    respostaContato.hidden = false;\n\n    formContato.reset();       // limpa os campos\n    contadorContato.textContent = \"0 de \" + limiteContato + \" caracteres\";\n  });\n}\n"
  },
  "senha": {
   "id": "senha",
   "grupo": "Formulários, tabelas e botões",
   "titulo": "Senha com mostrar/esconder e confirmação",
   "nota": "O botão troca o tipo do campo entre password e text. O JavaScript também confere se a confirmação é igual à senha e bloqueia o envio se não for.",
   "onde": {},
   "exemplo": "index.html#formularios",
   "html": "<form class=\"form-senha\" id=\"form-senha\">\n  <div class=\"campo\">\n    <label for=\"senha-nova\">Senha *</label>\n    <div class=\"campo-com-botao\">\n      <input type=\"password\" id=\"senha-nova\" name=\"senha\" required minlength=\"6\" autocomplete=\"new-password\">\n      <button type=\"button\" class=\"botao\" id=\"btn-mostrar-senha\" aria-pressed=\"false\">Mostrar</button>\n    </div>\n    <small>Mínimo de 6 caracteres.</small>\n  </div>\n\n  <div class=\"campo\">\n    <label for=\"senha-confirma\">Confirme a senha *</label>\n    <input type=\"password\" id=\"senha-confirma\" name=\"confirma\" required autocomplete=\"new-password\">\n  </div>\n\n  <button type=\"submit\" class=\"botao\">Cadastrar</button>\n  <p id=\"senha-resposta\" role=\"status\" hidden>Senha cadastrada!</p>\n</form>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n/* Garante que o atributo hidden sempre esconda (igual em vários exemplos) */\n[hidden] {\n  display: none !important;\n}\n\n.form-senha {\n  display: grid;\n  gap: 1rem;\n  max-width: 420px;\n}\n.form-senha .campo {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.form-senha label {\n  font-weight: 700;\n}\n.form-senha input {\n  width: 100%;\n  box-sizing: border-box;   /* a largura inclui padding e borda */\n  padding: 0.6rem 0.8rem;\n  border: 2px solid #cfd9e3;\n  border-radius: 6px;\n  font: inherit;\n}\n.form-senha input:user-invalid {\n  border-color: #c62839;\n}\n.campo-com-botao {\n  display: flex;\n  gap: 0.5rem;\n}\n.campo-com-botao input {\n  flex: 1;\n}\n",
   "js": "// ----- Senha: mostrar/esconder e confirmação -----\nconst formSenha = document.getElementById(\"form-senha\");\n\nif (formSenha) {\n  const senhaNova = document.getElementById(\"senha-nova\");\n  const senhaConfirma = document.getElementById(\"senha-confirma\");\n  const btnMostrarSenha = document.getElementById(\"btn-mostrar-senha\");\n  const senhaResposta = document.getElementById(\"senha-resposta\");\n\n  btnMostrarSenha.addEventListener(\"click\", function () {\n    const escondida = senhaNova.type === \"password\";\n    senhaNova.type = escondida ? \"text\" : \"password\";\n    btnMostrarSenha.textContent = escondida ? \"Esconder\" : \"Mostrar\";\n    btnMostrarSenha.setAttribute(\"aria-pressed\", String(escondida));\n  });\n\n  // Marca a confirmação como inválida enquanto for diferente da senha\n  function conferirSenhas() {\n    if (senhaConfirma.value !== senhaNova.value) {\n      senhaConfirma.setCustomValidity(\"As senhas não são iguais.\");\n    } else {\n      senhaConfirma.setCustomValidity(\"\");\n    }\n  }\n  senhaNova.addEventListener(\"input\", conferirSenhas);\n  senhaConfirma.addEventListener(\"input\", conferirSenhas);\n\n  formSenha.addEventListener(\"submit\", function (evento) {\n    evento.preventDefault();\n    senhaResposta.hidden = false;\n  });\n}\n"
  },
  "progresso-medidor": {
   "id": "progresso-medidor",
   "grupo": "Formulários, tabelas e botões",
   "titulo": "Barra de andamento e medidor (progress e meter)",
   "nota": "progress mostra o andamento de uma tarefa. meter mostra uma medida dentro de uma faixa: com low, high e optimum, o navegador pinta de verde, amarelo ou vermelho sozinho. Para mudar o valor pelo JavaScript: elemento.value = 50.",
   "onde": {},
   "exemplo": "index.html#formularios",
   "html": "<div class=\"indicadores\">\n  <label for=\"progresso-download\">Download: 70%</label>\n  <progress id=\"progresso-download\" value=\"70\" max=\"100\">70%</progress>\n\n  <label for=\"medidor-disco\">Espaço usado: 9 de 10 GB</label>\n  <meter id=\"medidor-disco\" value=\"9\" min=\"0\" max=\"10\" low=\"4\" high=\"8\" optimum=\"2\">9 de 10</meter>\n</div>\n",
   "css": ".indicadores {\n  display: grid;\n  gap: 0.3rem;\n  max-width: 360px;\n}\n.indicadores label {\n  margin-top: 0.6rem;\n  font-weight: 700;\n}\n.indicadores progress,\n.indicadores meter {\n  width: 100%;\n  height: 1.2rem;\n}\n.indicadores progress {\n  accent-color: #2a9d8f;\n}\n",
   "js": null
  },
  "tabela": {
   "id": "tabela",
   "grupo": "Formulários, tabelas e botões",
   "titulo": "Tabela com título, cabeçalho e rodapé",
   "nota": "Para dados em linhas e colunas. A div em volta faz a tabela rolar para o lado no celular em vez de quebrar a página. colspan junta colunas; rowspan junta linhas.",
   "onde": {},
   "exemplo": "index.html#tabelas",
   "html": "<div class=\"tabela-rolagem\">\n  <table class=\"tabela\">\n    <caption>Título da tabela</caption>\n    <thead>\n      <tr>\n        <th scope=\"col\">Nome</th>\n        <th scope=\"col\">Categoria</th>\n        <th scope=\"col\">Preço</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th scope=\"row\">Item 1</th>\n        <td>Categoria A</td>\n        <td>R$ 10,00</td>\n      </tr>\n      <tr>\n        <th scope=\"row\">Item 2</th>\n        <td>Categoria B</td>\n        <td>R$ 25,00</td>\n      </tr>\n      <tr>\n        <th scope=\"row\">Item 3</th>\n        <td>Categoria A</td>\n        <td>R$ 7,50</td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <th scope=\"row\" colspan=\"2\">Total</th>\n        <td>R$ 42,50</td>\n      </tr>\n    </tfoot>\n  </table>\n</div>\n",
   "css": ".tabela-rolagem {\n  overflow-x: auto;          /* rola para o lado no celular */\n  border-radius: 10px;\n  box-shadow: 0 4px 16px rgba(18, 50, 74, 0.12);\n}\n.tabela {\n  width: 100%;\n  border-collapse: collapse; /* bordas das células viram uma linha só */\n  background-color: #ffffff;\n}\n.tabela caption {\n  padding: 1rem;\n  font-weight: 700;\n  text-align: left;\n}\n.tabela th,\n.tabela td {\n  padding: 0.6rem 1rem;\n  border-bottom: 1px solid #cfd9e3;\n  text-align: left;\n}\n.tabela thead th {\n  background-color: #12324a;\n  color: #ffffff;\n}\n/* Linhas zebradas: as pares ficam com fundo diferente */\n.tabela tbody tr:nth-child(even) {\n  background-color: #eaf0f5;\n}\n.tabela tbody tr:hover {\n  background-color: #fff3cc;\n}\n.tabela tfoot {\n  font-weight: 700;\n}\n",
   "js": null
  },
  "tema": {
   "id": "tema",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Tema escuro (fica salvo)",
   "nota": "As cores ficam em variáveis do CSS. O JavaScript só coloca data-tema=\"escuro\" na tag <html>, e o CSS troca as variáveis. A escolha fica salva no navegador. Para o tema valer no site todo, use var(--cor-fundo), var(--cor-texto) etc. nas suas outras regras.",
   "onde": {
    "html": "Cole dentro do <header> (ou onde quiser o botão)"
   },
   "exemplo": "index.html#funcoes-da-pagina",
   "html": "<button class=\"btn-tema\" id=\"btn-tema\" type=\"button\" aria-pressed=\"false\">\n  <span aria-hidden=\"true\">◐</span> <span id=\"btn-tema-texto\">Tema escuro</span>\n</button>\n",
   "css": "/* 1. As cores ficam em variáveis */\n:root {\n  --cor-fundo: #f4f7fa;\n  --cor-superficie: #ffffff;\n  --cor-texto: #1b2a38;\n  --cor-borda: #cfd9e3;\n}\n\n/* 2. No tema escuro, só as variáveis mudam */\n[data-tema=\"escuro\"] {\n  --cor-fundo: #0c1720;\n  --cor-superficie: #13222f;\n  --cor-texto: #e4ecf2;\n  --cor-borda: #2a4056;\n  color-scheme: dark;       /* barras de rolagem e campos escuros também */\n}\n\n/* 3. As regras usam as variáveis */\nbody {\n  background-color: var(--cor-fundo);\n  color: var(--cor-texto);\n  transition: background-color 0.2s, color 0.2s;\n}\n\n.btn-tema {\n  padding: 0.5rem 1rem;\n  border: 1px solid var(--cor-borda);\n  border-radius: 999px;\n  background-color: var(--cor-superficie);\n  color: var(--cor-texto);\n  font: inherit;\n  cursor: pointer;\n}\n",
   "js": "// ----- Tema escuro -----\nconst btnTema = document.getElementById(\"btn-tema\");\n\nfunction aplicarTema(tema) {\n  if (tema === \"escuro\") {\n    document.documentElement.setAttribute(\"data-tema\", \"escuro\");\n  } else {\n    document.documentElement.removeAttribute(\"data-tema\");\n  }\n  if (btnTema) {\n    btnTema.setAttribute(\"aria-pressed\", String(tema === \"escuro\"));\n    document.getElementById(\"btn-tema-texto\").textContent = tema === \"escuro\" ? \"Tema claro\" : \"Tema escuro\";\n  }\n}\n\n// Ao abrir a página, usa o tema que ficou salvo\nlet temaSalvo = null;\ntry {\n  temaSalvo = localStorage.getItem(\"tema\");\n} catch (erro) {}\nif (temaSalvo) {\n  aplicarTema(temaSalvo);\n}\n\nif (btnTema) {\n  btnTema.addEventListener(\"click\", function () {\n    const estaEscuro = document.documentElement.getAttribute(\"data-tema\") === \"escuro\";\n    const novoTema = estaEscuro ? \"claro\" : \"escuro\";\n    aplicarTema(novoTema);\n    try {\n      localStorage.setItem(\"tema\", novoTema);   // guarda para a próxima visita\n    } catch (erro) {}\n  });\n}\n"
  },
  "barra-progresso": {
   "id": "barra-progresso",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Barra de progresso da leitura",
   "nota": "Uma barra fininha no topo que enche conforme a pessoa rola a página.",
   "onde": {
    "html": "Cole logo depois de <body>"
   },
   "exemplo": "index.html#funcoes-da-pagina",
   "html": "<div class=\"barra-progresso\" id=\"barra-progresso\" aria-hidden=\"true\"></div>\n",
   "css": ".barra-progresso {\n  position: fixed;          /* presa na tela, não sai do lugar ao rolar */\n  top: 0;\n  left: 0;\n  z-index: 200;\n  width: 0%;                /* o JavaScript muda de 0% a 100% */\n  height: 4px;\n  background: linear-gradient(to right, #2a9d8f, #ffb703);\n}\n",
   "js": "// ----- Barra de progresso da leitura -----\nconst barraProgresso = document.getElementById(\"barra-progresso\");\n\nif (barraProgresso) {\n  window.addEventListener(\"scroll\", function () {\n    const totalRolavel = document.documentElement.scrollHeight - window.innerHeight;\n    const porcentagem = totalRolavel > 0 ? (window.scrollY / totalRolavel) * 100 : 0;\n    barraProgresso.style.width = porcentagem + \"%\";\n  }, { passive: true });\n}\n"
  },
  "voltar-topo": {
   "id": "voltar-topo",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Botão de voltar ao topo",
   "nota": "Aparece depois que a pessoa rola uma tela inteira e sobe a página suavemente ao ser clicado.",
   "onde": {
    "html": "Cole logo antes de </body>"
   },
   "exemplo": "index.html#funcoes-da-pagina",
   "html": "<button type=\"button\" class=\"voltar-topo\" id=\"voltar-topo\" aria-label=\"Voltar ao topo\">↑</button>\n",
   "css": ".voltar-topo {\n  position: fixed;\n  right: 1.5rem;\n  bottom: 1.5rem;\n  z-index: 90;\n  width: 48px;\n  height: 48px;\n  border: 0;\n  border-radius: 50%;\n  background-color: #ffb703;\n  color: #12324a;\n  font-size: 1.4rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n  /* começa escondido */\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(0.6);\n  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;\n}\n.voltar-topo.visivel {      /* o JavaScript coloca esta classe */\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n}\n",
   "js": "// ----- Botão de voltar ao topo -----\nconst btnVoltarTopo = document.getElementById(\"voltar-topo\");\n\nif (btnVoltarTopo) {\n  window.addEventListener(\"scroll\", function () {\n    btnVoltarTopo.classList.toggle(\"visivel\", window.scrollY > window.innerHeight);\n  }, { passive: true });\n\n  btnVoltarTopo.addEventListener(\"click\", function () {\n    window.scrollTo({ top: 0, behavior: \"smooth\" });\n  });\n}\n"
  },
  "relogio": {
   "id": "relogio",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Relógio e data",
   "nota": "Mostra a hora e a data atuais e atualiza a cada segundo com setInterval.",
   "onde": {},
   "exemplo": "index.html#funcoes-da-pagina",
   "html": "<p class=\"relogio\">\n  Hoje é <time id=\"data-hoje\">--/--/----</time>, agora são <time id=\"relogio\">--:--:--</time>\n</p>\n",
   "css": ".relogio time {\n  font-family: Consolas, \"Courier New\", monospace;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;   /* números com a mesma largura: não \"treme\" */\n}\n",
   "js": "// ----- Relógio e data -----\nconst relogio = document.getElementById(\"relogio\");\nconst dataHoje = document.getElementById(\"data-hoje\");\n\nif (relogio) {\n  function atualizarRelogio() {\n    const agora = new Date();\n    relogio.textContent = agora.toLocaleTimeString(\"pt-BR\");   // 14:05:09\n    if (dataHoje) {\n      dataHoje.textContent = agora.toLocaleDateString(\"pt-BR\"); // 28/09/2026\n    }\n  }\n  atualizarRelogio();                    // mostra já\n  setInterval(atualizarRelogio, 1000);   // e repete a cada 1000 ms (1 segundo)\n}\n"
  },
  "revelar": {
   "id": "revelar",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Elementos que aparecem ao rolar",
   "nota": "Qualquer elemento com class=\"revelar\" aparece suavemente quando entra na tela. Se o JavaScript falhar, tudo continua visível.",
   "onde": {},
   "exemplo": "index.html#funcoes-da-pagina",
   "html": "<div class=\"revelar\">\n  <h2>Eu apareço quando você rola até aqui</h2>\n  <p>Coloque class=\"revelar\" em títulos, imagens, cards...</p>\n</div>\n",
   "css": "/* Só esconde quando o JavaScript avisa que está funcionando (classe js no <html>) */\n.js .revelar {\n  opacity: 0;\n  transform: translateY(24px);\n  transition: opacity 0.6s ease, transform 0.6s ease;\n}\n.js .revelar.visivel {\n  opacity: 1;\n  transform: translateY(0);\n}\n/* Quem pediu \"menos movimento\" no sistema vê tudo sem animação */\n@media (prefers-reduced-motion: reduce) {\n  .js .revelar {\n    opacity: 1;\n    transform: none;\n    transition: none;\n  }\n}\n",
   "js": "// ----- Elementos que aparecem ao rolar -----\ndocument.documentElement.classList.add(\"js\");\nconst elementosRevelar = document.querySelectorAll(\".revelar\");\n\nif (\"IntersectionObserver\" in window) {\n  // O \"vigia\" avisa quando um elemento entra na tela\n  const vigiaRevelar = new IntersectionObserver(function (entradas) {\n    entradas.forEach(function (entrada) {\n      if (entrada.isIntersecting) {\n        entrada.target.classList.add(\"visivel\");\n        vigiaRevelar.unobserve(entrada.target);   // já apareceu, pode parar de vigiar\n      }\n    });\n  }, { threshold: 0.15 });\n\n  elementosRevelar.forEach(function (elemento) {\n    vigiaRevelar.observe(elemento);\n  });\n} else {\n  elementosRevelar.forEach(function (elemento) {\n    elemento.classList.add(\"visivel\");\n  });\n}\n"
  },
  "curtir": {
   "id": "curtir",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Botão curtir (trocar classe)",
   "nota": "O exemplo mais simples: o JavaScript coloca e tira a classe curtido, e o CSS decide como ela fica.",
   "onde": {},
   "exemplo": "index.html#exemplo-6",
   "html": "<button type=\"button\" class=\"btn-curtir\" id=\"btn-curtir\" aria-pressed=\"false\">\n  <span class=\"coracao\" aria-hidden=\"true\">♥</span> <span id=\"curtir-texto\">Curtir</span>\n</button>\n",
   "css": ".btn-curtir {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.2rem;\n  border: 2px solid #cfd9e3;\n  border-radius: 999px;\n  background-color: #ffffff;\n  color: #1b2a38;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s;\n}\n.coracao {\n  font-size: 1.3rem;\n  color: #4f5f6f;\n}\n/* Estado \"curtido\": colocado pelo JavaScript */\n.btn-curtir.curtido {\n  border-color: #c62839;\n  color: #c62839;\n}\n.btn-curtir.curtido .coracao {\n  color: #c62839;\n  animation: pulsar 0.4s ease;\n}\n@keyframes pulsar {\n  0%   { transform: scale(1); }\n  40%  { transform: scale(1.5); }\n  100% { transform: scale(1); }\n}\n",
   "js": "// ----- Botão curtir -----\nconst btnCurtir = document.getElementById(\"btn-curtir\");\n\nif (btnCurtir) {\n  btnCurtir.addEventListener(\"click\", function () {\n    // toggle devolve true se colocou a classe, false se tirou\n    const curtido = btnCurtir.classList.toggle(\"curtido\");\n    document.getElementById(\"curtir-texto\").textContent = curtido ? \"Curtido!\" : \"Curtir\";\n    btnCurtir.setAttribute(\"aria-pressed\", String(curtido));\n  });\n}\n"
  },
  "contador": {
   "id": "contador",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Contador com botões",
   "nota": "Uma variável guarda o número; cada botão muda a variável e redesenha a tela.",
   "onde": {},
   "exemplo": "index.html#exemplo-7",
   "html": "<div class=\"contador\">\n  <button type=\"button\" class=\"botao\" id=\"btn-menos\" aria-label=\"Diminuir\">−</button>\n  <output class=\"contador-valor\" id=\"contador-valor\">0</output>\n  <button type=\"button\" class=\"botao\" id=\"btn-mais\" aria-label=\"Aumentar\">+</button>\n  <button type=\"button\" class=\"botao\" id=\"btn-zerar\">Zerar</button>\n</div>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.contador {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.contador-valor {\n  min-width: 3ch;\n  text-align: center;\n  font-size: 2rem;\n  font-weight: 700;\n}\n.contador-valor.negativo {\n  color: #c62839;\n}\n",
   "js": "// ----- Contador -----\nconst contadorValor = document.getElementById(\"contador-valor\");\n\nif (contadorValor) {\n  let contagem = 0;\n\n  function atualizarContador() {\n    contadorValor.textContent = contagem;\n    contadorValor.classList.toggle(\"negativo\", contagem < 0);\n  }\n\n  document.getElementById(\"btn-mais\").addEventListener(\"click\", function () {\n    contagem++;\n    atualizarContador();\n  });\n  document.getElementById(\"btn-menos\").addEventListener(\"click\", function () {\n    contagem--;\n    atualizarContador();\n  });\n  document.getElementById(\"btn-zerar\").addEventListener(\"click\", function () {\n    contagem = 0;\n    atualizarContador();\n  });\n}\n"
  },
  "leia-mais": {
   "id": "leia-mais",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Leia mais (mostrar e esconder texto)",
   "nota": "O atributo hidden esconde o parágrafo. O JavaScript liga e desliga o hidden e troca o texto do botão.",
   "onde": {},
   "exemplo": "index.html#exemplo-8",
   "html": "<p>Começo do texto, sempre visível.</p>\n<p id=\"texto-extra\" hidden>Continuação do texto, que só aparece depois do clique.</p>\n<button type=\"button\" class=\"botao\" id=\"btn-leia-mais\" aria-expanded=\"false\" aria-controls=\"texto-extra\">Leia mais</button>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n/* Garante que o atributo hidden sempre esconda (igual em vários exemplos) */\n[hidden] {\n  display: none !important;\n}\n",
   "js": "// ----- Leia mais -----\nconst btnLeiaMais = document.getElementById(\"btn-leia-mais\");\nconst textoExtra = document.getElementById(\"texto-extra\");\n\nif (btnLeiaMais && textoExtra) {\n  btnLeiaMais.addEventListener(\"click\", function () {\n    textoExtra.hidden = !textoExtra.hidden;   // inverte: escondido vira visível e vice-versa\n    const aberto = !textoExtra.hidden;\n    btnLeiaMais.textContent = aberto ? \"Mostrar menos\" : \"Leia mais\";\n    btnLeiaMais.setAttribute(\"aria-expanded\", String(aberto));\n  });\n}\n"
  },
  "cor": {
   "id": "cor",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Escolher cor em tempo real",
   "nota": "O evento input dispara a cada mudança, sem precisar de botão. O JavaScript muda o CSS pelo style.",
   "onde": {},
   "exemplo": "index.html#exemplo-9",
   "html": "<div class=\"escolher-cor\">\n  <label for=\"escolher-cor\">Escolha uma cor:</label>\n  <input type=\"color\" id=\"escolher-cor\" value=\"#ffb703\">\n  <div class=\"amostra-cor\" id=\"amostra-cor\"><code id=\"codigo-cor\">#ffb703</code></div>\n</div>\n",
   "css": ".escolher-cor {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  max-width: 480px;\n}\n.escolher-cor input[type=\"color\"] {\n  width: 64px;\n  height: 40px;\n  cursor: pointer;\n}\n.amostra-cor {\n  flex: 1;\n  display: grid;\n  place-items: center;\n  height: 64px;\n  border-radius: 6px;\n  background-color: #ffb703;\n}\n.amostra-cor code {\n  padding: 0.2rem 0.5rem;\n  border-radius: 4px;\n  background-color: rgba(255, 255, 255, 0.85);\n}\n",
   "js": "// ----- Escolher cor -----\nconst escolherCor = document.getElementById(\"escolher-cor\");\n\nif (escolherCor) {\n  const amostraCor = document.getElementById(\"amostra-cor\");\n  const codigoCor = document.getElementById(\"codigo-cor\");\n\n  escolherCor.addEventListener(\"input\", function () {\n    amostraCor.style.backgroundColor = escolherCor.value;   // no CSS é background-color\n    codigoCor.textContent = escolherCor.value;\n  });\n}\n"
  },
  "tamanho": {
   "id": "tamanho",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Tamanho da letra com controle deslizante",
   "nota": "Enquanto a pessoa arrasta, o JavaScript muda o font-size do texto e mostra o número.",
   "onde": {},
   "exemplo": "index.html#exemplo-10",
   "html": "<label for=\"tamanho-texto\">Tamanho: <output id=\"saida-tamanho\">18</output>px</label>\n<input type=\"range\" id=\"tamanho-texto\" min=\"12\" max=\"48\" value=\"18\">\n<p id=\"texto-tamanho\" class=\"texto-tamanho\">Aa Bb Cc</p>\n",
   "css": "#tamanho-texto {\n  width: 100%;\n  max-width: 320px;\n  accent-color: #2a9d8f;\n}\n.texto-tamanho {\n  font-size: 18px;\n  line-height: 1.2;\n}\n",
   "js": "// ----- Tamanho da letra -----\nconst tamanhoTexto = document.getElementById(\"tamanho-texto\");\n\nif (tamanhoTexto) {\n  const saidaTamanho = document.getElementById(\"saida-tamanho\");\n  const textoTamanho = document.getElementById(\"texto-tamanho\");\n\n  tamanhoTexto.addEventListener(\"input\", function () {\n    saidaTamanho.textContent = tamanhoTexto.value;\n    textoTamanho.style.fontSize = tamanhoTexto.value + \"px\";   // precisa da unidade\n  });\n}\n"
  },
  "dica": {
   "id": "dica",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Frase aleatória",
   "nota": "Um array guarda as frases e Math.random() sorteia uma. Troque as frases pelas do seu tema: curiosidades, receitas do dia, citações.",
   "onde": {},
   "exemplo": "index.html#exemplo-11",
   "html": "<blockquote class=\"frase\" id=\"frase\" aria-live=\"polite\">Clique no botão para sortear uma frase.</blockquote>\n<button type=\"button\" class=\"botao\" id=\"btn-frase\">Sortear</button>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.frase {\n  margin: 0 0 1rem;\n  padding: 1rem;\n  border-left: 4px solid #2a9d8f;\n  border-radius: 6px;\n  background-color: #eaf0f5;\n  font-style: italic;\n}\n",
   "js": "// ----- Frase aleatória -----\nconst btnFrase = document.getElementById(\"btn-frase\");\n\nif (btnFrase) {\n  const frase = document.getElementById(\"frase\");\n\n  // Troque pelas suas frases (quantas quiser)\n  const frases = [\n    \"Primeira frase.\",\n    \"Segunda frase.\",\n    \"Terceira frase.\",\n    \"Quarta frase.\",\n  ];\n  let ultimaFrase = -1;\n\n  btnFrase.addEventListener(\"click\", function () {\n    let sorteio;\n    do {\n      sorteio = Math.floor(Math.random() * frases.length);   // 0 até frases.length - 1\n    } while (sorteio === ultimaFrase && frases.length > 1);  // não repete a anterior\n    ultimaFrase = sorteio;\n    frase.textContent = frases[sorteio];\n  });\n}\n"
  },
  "tecla": {
   "id": "tecla",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Descobrir qual tecla foi apertada",
   "nota": "O evento keydown traz os detalhes da tecla no objeto evento. Base para atalhos de teclado e jogos.",
   "onde": {},
   "exemplo": "index.html#exemplo-12",
   "html": "<label for=\"campo-tecla\">Clique no campo e aperte uma tecla:</label>\n<input type=\"text\" id=\"campo-tecla\" autocomplete=\"off\">\n<p class=\"tecla-info\" id=\"tecla-info\">Nenhuma tecla ainda.</p>\n",
   "css": "#campo-tecla {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;   /* a largura inclui padding e borda */\n  max-width: 320px;\n  padding: 0.5rem;\n  font: inherit;\n}\n.tecla-info {\n  font-family: Consolas, \"Courier New\", monospace;\n}\n",
   "js": "// ----- Qual tecla? -----\nconst campoTecla = document.getElementById(\"campo-tecla\");\n\nif (campoTecla) {\n  const teclaInfo = document.getElementById(\"tecla-info\");\n\n  campoTecla.addEventListener(\"keydown\", function (evento) {\n    let texto = \"Tecla: \" + evento.key + \" | Código: \" + evento.code;\n    if (evento.ctrlKey) texto += \" | com Ctrl\";\n    if (evento.shiftKey) texto += \" | com Shift\";\n    teclaInfo.textContent = texto;\n  });\n}\n"
  },
  "filtro": {
   "id": "filtro",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Busca que filtra uma lista",
   "nota": "A cada letra digitada, os itens que não combinam são escondidos. Troque os itens da lista pelos seus (receitas, lugares, produtos...).",
   "onde": {},
   "exemplo": "index.html#exemplo-13",
   "html": "<label for=\"filtro-busca\">Buscar:</label>\n<input type=\"search\" id=\"filtro-busca\" placeholder=\"Digite para filtrar\">\n\n<ul class=\"lista-filtro\" id=\"lista-filtro\">\n  <li>Item um</li>\n  <li>Item dois</li>\n  <li>Outro item</li>\n  <li>Mais um</li>\n</ul>\n<p id=\"filtro-contagem\">4 itens</p>\n",
   "css": "/* Garante que o atributo hidden sempre esconda (igual em vários exemplos) */\n[hidden] {\n  display: none !important;\n}\n\n#filtro-busca {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;   /* a largura inclui padding e borda */\n  max-width: 320px;\n  padding: 0.5rem;\n  font: inherit;\n}\n.lista-filtro {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  list-style: none;\n  padding: 0;\n}\n.lista-filtro li {\n  padding: 0.3rem 0.8rem;\n  border: 1px solid #cfd9e3;\n  border-radius: 999px;\n  background-color: #ffffff;\n}\n",
   "js": "// ----- Busca que filtra uma lista -----\nconst filtroBusca = document.getElementById(\"filtro-busca\");\n\nif (filtroBusca) {\n  const itensFiltro = document.querySelectorAll(\"#lista-filtro li\");\n  const filtroContagem = document.getElementById(\"filtro-contagem\");\n\n  filtroBusca.addEventListener(\"input\", function () {\n    const termo = filtroBusca.value.toLowerCase().trim();\n    let visiveis = 0;\n\n    itensFiltro.forEach(function (item) {\n      const combina = item.textContent.toLowerCase().includes(termo);\n      item.hidden = !combina;\n      if (combina) visiveis++;\n    });\n\n    filtroContagem.textContent = visiveis === 0\n      ? \"Nada encontrado.\"\n      : visiveis + (visiveis === 1 ? \" item\" : \" itens\");\n  });\n}\n"
  },
  "tarefas": {
   "id": "tarefas",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Lista de tarefas que fica salva",
   "nota": "Adiciona, marca e remove tarefas. Tudo fica guardado no navegador (localStorage): recarregue a página e as tarefas continuam lá.",
   "onde": {},
   "exemplo": "index.html#exemplo-14",
   "html": "<form class=\"form-tarefa\" id=\"form-tarefa\">\n  <label for=\"nova-tarefa\">Nova tarefa</label>\n  <input type=\"text\" id=\"nova-tarefa\" required maxlength=\"60\" autocomplete=\"off\">\n  <button type=\"submit\" class=\"botao\">Adicionar</button>\n</form>\n\n<ul class=\"lista-tarefas\" id=\"lista-tarefas\"></ul>\n<p id=\"tarefas-restantes\">Nenhuma tarefa.</p>\n\n<!-- Modelo de cada tarefa: não aparece na tela, o JavaScript copia -->\n<template id=\"modelo-tarefa\">\n  <li class=\"tarefa\">\n    <label>\n      <input type=\"checkbox\" class=\"tarefa-check\">\n      <span class=\"tarefa-texto\"></span>\n    </label>\n    <button type=\"button\" class=\"tarefa-remover\" aria-label=\"Remover tarefa\">✕</button>\n  </li>\n</template>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.form-tarefa {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n  max-width: 560px;\n}\n.form-tarefa input {\n  flex: 1;\n  padding: 0.5rem;\n  font: inherit;\n}\n.lista-tarefas {\n  max-width: 560px;\n  list-style: none;\n  padding: 0;\n}\n.tarefa {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.5rem;\n  border-bottom: 1px solid #cfd9e3;\n}\n/* Tarefa marcada fica riscada (sem JavaScript: o :has confere o checkbox) */\n.tarefa:has(.tarefa-check:checked) .tarefa-texto {\n  text-decoration: line-through;\n  color: #4f5f6f;\n}\n.tarefa-remover {\n  width: 32px;\n  height: 32px;\n  border: 0;\n  border-radius: 50%;\n  background: none;\n  cursor: pointer;\n}\n.tarefa-remover:hover {\n  background-color: #c62839;\n  color: #ffffff;\n}\n",
   "js": "// ----- Lista de tarefas -----\nconst formTarefa = document.getElementById(\"form-tarefa\");\n\nif (formTarefa) {\n  const campoTarefa = document.getElementById(\"nova-tarefa\");\n  const listaTarefas = document.getElementById(\"lista-tarefas\");\n  const modeloTarefa = document.getElementById(\"modelo-tarefa\");\n  const tarefasRestantes = document.getElementById(\"tarefas-restantes\");\n\n  // Carrega as tarefas salvas (o localStorage guarda texto; JSON transforma em lista)\n  let tarefas = [];\n  try {\n    tarefas = JSON.parse(localStorage.getItem(\"tarefas\")) || [];\n  } catch (erro) {\n    tarefas = [];\n  }\n\n  function salvarTarefas() {\n    try {\n      localStorage.setItem(\"tarefas\", JSON.stringify(tarefas));\n    } catch (erro) {}\n  }\n\n  function desenharTarefas() {\n    listaTarefas.innerHTML = \"\";\n\n    tarefas.forEach(function (tarefa, indice) {\n      const item = modeloTarefa.content.firstElementChild.cloneNode(true);\n      const check = item.querySelector(\".tarefa-check\");\n\n      item.querySelector(\".tarefa-texto\").textContent = tarefa.texto;   // textContent: seguro\n      check.checked = tarefa.feita;\n\n      check.addEventListener(\"change\", function () {\n        tarefas[indice].feita = check.checked;\n        salvarTarefas();\n        contarPendentes();\n      });\n\n      item.querySelector(\".tarefa-remover\").addEventListener(\"click\", function () {\n        tarefas.splice(indice, 1);   // remove 1 item na posição indice\n        salvarTarefas();\n        desenharTarefas();\n      });\n\n      listaTarefas.appendChild(item);\n    });\n\n    contarPendentes();\n  }\n\n  function contarPendentes() {\n    const pendentes = tarefas.filter(function (t) { return !t.feita; }).length;\n    if (tarefas.length === 0) {\n      tarefasRestantes.textContent = \"Nenhuma tarefa.\";\n    } else if (pendentes === 0) {\n      tarefasRestantes.textContent = \"Tudo feito!\";\n    } else {\n      tarefasRestantes.textContent = pendentes + (pendentes === 1 ? \" tarefa pendente\" : \" tarefas pendentes\");\n    }\n  }\n\n  formTarefa.addEventListener(\"submit\", function (evento) {\n    evento.preventDefault();\n    const texto = campoTarefa.value.trim();\n    if (texto === \"\") return;\n\n    tarefas.push({ texto: texto, feita: false });\n    salvarTarefas();\n    desenharTarefas();\n    campoTarefa.value = \"\";\n    campoTarefa.focus();\n  });\n\n  desenharTarefas();\n}\n"
  },
  "abas": {
   "id": "abas",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Abas",
   "nota": "Só um painel aparece por vez. data-aba liga cada botão ao id do seu painel. As setas do teclado também trocam de aba.",
   "onde": {},
   "exemplo": "index.html#exemplo-15",
   "html": "<div class=\"abas\" role=\"tablist\" aria-label=\"Informações\">\n  <button type=\"button\" class=\"aba\" role=\"tab\" id=\"aba-1\" aria-selected=\"true\" aria-controls=\"painel-1\" data-aba=\"painel-1\">Primeira</button>\n  <button type=\"button\" class=\"aba\" role=\"tab\" id=\"aba-2\" aria-selected=\"false\" aria-controls=\"painel-2\" data-aba=\"painel-2\" tabindex=\"-1\">Segunda</button>\n  <button type=\"button\" class=\"aba\" role=\"tab\" id=\"aba-3\" aria-selected=\"false\" aria-controls=\"painel-3\" data-aba=\"painel-3\" tabindex=\"-1\">Terceira</button>\n</div>\n<div class=\"painel-aba\" role=\"tabpanel\" id=\"painel-1\" aria-labelledby=\"aba-1\">\n  <p>Conteúdo da primeira aba.</p>\n</div>\n<div class=\"painel-aba\" role=\"tabpanel\" id=\"painel-2\" aria-labelledby=\"aba-2\" hidden>\n  <p>Conteúdo da segunda aba.</p>\n</div>\n<div class=\"painel-aba\" role=\"tabpanel\" id=\"painel-3\" aria-labelledby=\"aba-3\" hidden>\n  <p>Conteúdo da terceira aba.</p>\n</div>\n",
   "css": "/* Garante que o atributo hidden sempre esconda (igual em vários exemplos) */\n[hidden] {\n  display: none !important;\n}\n\n.abas {\n  display: flex;\n  gap: 0.25rem;\n  border-bottom: 2px solid #cfd9e3;\n}\n.aba {\n  margin-bottom: -2px;\n  padding: 0.5rem 1.25rem;\n  border: 0;\n  border-bottom: 3px solid transparent;\n  background: none;\n  color: #4f5f6f;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.aba[aria-selected=\"true\"] {   /* a aba ativa */\n  color: #12324a;\n  border-bottom-color: #ffb703;\n}\n.painel-aba {\n  padding: 1rem 0;\n}\n",
   "js": "// ----- Abas -----\nconst abas = document.querySelectorAll(\".aba\");\n\nif (abas.length > 0) {\n  function ativarAba(abaEscolhida) {\n    // Desativa todas...\n    abas.forEach(function (aba) {\n      aba.setAttribute(\"aria-selected\", \"false\");\n      aba.setAttribute(\"tabindex\", \"-1\");\n      document.getElementById(aba.dataset.aba).hidden = true;\n    });\n    // ...e ativa só a escolhida\n    abaEscolhida.setAttribute(\"aria-selected\", \"true\");\n    abaEscolhida.removeAttribute(\"tabindex\");\n    document.getElementById(abaEscolhida.dataset.aba).hidden = false;\n  }\n\n  abas.forEach(function (aba, posicao) {\n    aba.addEventListener(\"click\", function () {\n      ativarAba(aba);\n    });\n\n    aba.addEventListener(\"keydown\", function (evento) {\n      let nova;\n      if (evento.key === \"ArrowRight\") nova = abas[(posicao + 1) % abas.length];\n      if (evento.key === \"ArrowLeft\") nova = abas[(posicao - 1 + abas.length) % abas.length];\n      if (nova) {\n        ativarAba(nova);\n        nova.focus();\n      }\n    });\n  });\n}\n"
  },
  "modal": {
   "id": "modal",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Janela modal (pop-up)",
   "nota": "Usa a tag <dialog> do HTML: showModal() abre por cima da página. O botão de dentro fecha sozinho (method=\"dialog\"), e clicar fora também fecha.",
   "onde": {
    "html": "Cole o botão onde quiser; o <dialog> pode ficar logo antes de </body>"
   },
   "exemplo": "index.html#exemplo-17",
   "html": "<button type=\"button\" class=\"botao\" id=\"btn-abrir-modal\">Abrir janela</button>\n\n<dialog class=\"modal\" id=\"modal\" aria-labelledby=\"modal-titulo\">\n  <h2 id=\"modal-titulo\">Título da janela</h2>\n  <p>Conteúdo da janela. Aperte Esc, clique fora ou use o botão para fechar.</p>\n  <form method=\"dialog\">\n    <button type=\"submit\" class=\"botao\">Fechar</button>\n  </form>\n</dialog>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.modal {\n  width: calc(100% - 2rem);\n  max-width: 480px;\n  padding: 2rem;\n  border: 0;\n  border-radius: 10px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);\n}\n.modal h2 {\n  margin-top: 0;\n}\n/* O fundo escuro atrás da janela */\n.modal::backdrop {\n  background-color: rgba(8, 20, 30, 0.7);\n}\n",
   "js": "// ----- Janela modal -----\nconst modal = document.getElementById(\"modal\");\nconst btnAbrirModal = document.getElementById(\"btn-abrir-modal\");\n\nif (modal && btnAbrirModal) {\n  btnAbrirModal.addEventListener(\"click\", function () {\n    modal.showModal();\n  });\n\n  // Fecha ao clicar fora da caixa\n  modal.addEventListener(\"click\", function (evento) {\n    const caixa = modal.getBoundingClientRect();\n    const clicouFora =\n      evento.clientX < caixa.left || evento.clientX > caixa.right ||\n      evento.clientY < caixa.top || evento.clientY > caixa.bottom;\n    if (clicouFora) modal.close();\n  });\n}\n"
  },
  "carrossel": {
   "id": "carrossel",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Carrossel de imagens",
   "nota": "As fotos ficam lado a lado numa faixa e o JavaScript desliza a faixa. Passa sozinho a cada 5 segundos e para quando o mouse está em cima. Repita o <figure> para mais fotos.",
   "onde": {},
   "exemplo": "index.html#exemplo-19",
   "html": "<div class=\"carrossel\" id=\"carrossel\" aria-roledescription=\"carrossel\" aria-label=\"Fotos\">\n  <div class=\"carrossel-trilho\" id=\"carrossel-trilho\">\n    <figure class=\"slide\">\n      <img src=\"img/foto-1.jpg\" alt=\"Descreva a foto 1\" width=\"1200\" height=\"800\">\n      <figcaption>Legenda da foto 1</figcaption>\n    </figure>\n    <figure class=\"slide\">\n      <img src=\"img/foto-2.jpg\" alt=\"Descreva a foto 2\" width=\"1200\" height=\"800\">\n      <figcaption>Legenda da foto 2</figcaption>\n    </figure>\n    <figure class=\"slide\">\n      <img src=\"img/foto-3.jpg\" alt=\"Descreva a foto 3\" width=\"1200\" height=\"800\">\n      <figcaption>Legenda da foto 3</figcaption>\n    </figure>\n  </div>\n  <button type=\"button\" class=\"carrossel-seta carrossel-anterior\" id=\"carrossel-anterior\" aria-label=\"Foto anterior\">‹</button>\n  <button type=\"button\" class=\"carrossel-seta carrossel-proximo\" id=\"carrossel-proximo\" aria-label=\"Próxima foto\">›</button>\n  <div class=\"carrossel-pontos\" id=\"carrossel-pontos\"></div>\n</div>\n",
   "css": ".carrossel {\n  position: relative;\n  max-width: 800px;\n  overflow: hidden;          /* esconde as fotos que estão fora da área */\n  border-radius: 10px;\n  background-color: #000000;\n}\n.carrossel-trilho {\n  display: flex;             /* fotos lado a lado */\n  transition: transform 0.5s ease;\n}\n.slide {\n  position: relative;\n  flex: 0 0 100%;            /* cada foto ocupa a largura toda */\n  margin: 0;\n}\n.slide img {\n  display: block;\n  width: 100%;\n  height: auto;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n.slide figcaption {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 2.5rem 1.5rem 2.5rem;\n  color: #ffffff;\n  font-weight: 700;\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);\n}\n.carrossel-seta {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 44px;\n  height: 44px;\n  border: 0;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0.85);\n  color: #12324a;\n  font-size: 1.8rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.carrossel-anterior { left: 1rem; }\n.carrossel-proximo  { right: 1rem; }\n.carrossel-pontos {\n  position: absolute;\n  right: 1.5rem;\n  bottom: 1rem;\n  display: flex;\n  gap: 0.5rem;\n}\n.carrossel-ponto {\n  width: 12px;\n  height: 12px;\n  padding: 0;\n  border: 2px solid #ffffff;\n  border-radius: 50%;\n  background: transparent;\n  cursor: pointer;\n}\n.carrossel-ponto[aria-current=\"true\"] {\n  background-color: #ffffff;\n}\n",
   "js": "// ----- Carrossel -----\nconst carrossel = document.getElementById(\"carrossel\");\n\nif (carrossel) {\n  const trilho = document.getElementById(\"carrossel-trilho\");\n  const slides = trilho.querySelectorAll(\".slide\");\n  const areaPontos = document.getElementById(\"carrossel-pontos\");\n  let slideAtual = 0;\n  let passarSozinho;\n\n  // Cria uma bolinha para cada foto\n  slides.forEach(function (slide, posicao) {\n    const ponto = document.createElement(\"button\");\n    ponto.type = \"button\";\n    ponto.className = \"carrossel-ponto\";\n    ponto.setAttribute(\"aria-label\", \"Ir para a foto \" + (posicao + 1));\n    ponto.addEventListener(\"click\", function () {\n      irParaSlide(posicao);\n    });\n    areaPontos.appendChild(ponto);\n  });\n  const pontos = areaPontos.querySelectorAll(\".carrossel-ponto\");\n\n  function irParaSlide(posicao) {\n    slideAtual = (posicao + slides.length) % slides.length;   // dá a volta nas pontas\n    trilho.style.transform = \"translateX(-\" + (slideAtual * 100) + \"%)\";\n    pontos.forEach(function (ponto, i) {\n      ponto.setAttribute(\"aria-current\", String(i === slideAtual));\n    });\n  }\n\n  document.getElementById(\"carrossel-anterior\").addEventListener(\"click\", function () {\n    irParaSlide(slideAtual - 1);\n  });\n  document.getElementById(\"carrossel-proximo\").addEventListener(\"click\", function () {\n    irParaSlide(slideAtual + 1);\n  });\n\n  // Passa sozinho a cada 5 segundos; para com o mouse em cima\n  function iniciarCarrossel() {\n    clearInterval(passarSozinho);\n    passarSozinho = setInterval(function () {\n      irParaSlide(slideAtual + 1);\n    }, 5000);\n  }\n  carrossel.addEventListener(\"mouseenter\", function () { clearInterval(passarSozinho); });\n  carrossel.addEventListener(\"mouseleave\", iniciarCarrossel);\n\n  irParaSlide(0);\n  iniciarCarrossel();\n}\n"
  },
  "copiar": {
   "id": "copiar",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Botão de copiar com aviso",
   "nota": "Copia um texto para a área de transferência e mostra um aviso rápido embaixo da tela (toast). Serve para copiar um cupom, um e-mail, um código.",
   "onde": {
    "html": "Cole o texto e o botão onde quiser; o aviso (toast) pode ficar logo antes de </body>"
   },
   "exemplo": "index.html#exemplo-20",
   "html": "<div class=\"linha-copiar\">\n  <code id=\"texto-copiar\">texto que será copiado</code>\n  <button type=\"button\" class=\"botao\" id=\"btn-copiar\">Copiar</button>\n</div>\n\n<!-- Aviso rápido: fica escondido até o JavaScript mostrar -->\n<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.linha-copiar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.linha-copiar code {\n  padding: 0.5rem;\n  border-radius: 4px;\n  background-color: #eaf0f5;\n}\n\n.toast {\n  position: fixed;\n  left: 50%;\n  bottom: 1.5rem;\n  z-index: 300;\n  padding: 1rem 1.5rem;\n  border-radius: 10px;\n  background-color: #12324a;\n  color: #ffffff;\n  opacity: 0;\n  pointer-events: none;\n  transform: translate(-50%, 20px);\n  transition: opacity 0.3s, transform 0.3s;\n}\n.toast.visivel {\n  opacity: 1;\n  transform: translate(-50%, 0);\n}\n",
   "js": "// ----- Aviso rápido (toast): use mostrarAviso(\"texto\") em qualquer lugar -----\nlet temporizadorAviso;\nfunction mostrarAviso(mensagem) {\n  const toast = document.getElementById(\"toast\");\n  if (!toast) return;\n  toast.textContent = mensagem;\n  toast.classList.add(\"visivel\");\n  clearTimeout(temporizadorAviso);\n  temporizadorAviso = setTimeout(function () {\n    toast.classList.remove(\"visivel\");\n  }, 2500);   // some depois de 2,5 segundos\n}\n\n// ----- Botão de copiar -----\nconst btnCopiar = document.getElementById(\"btn-copiar\");\n\nif (btnCopiar) {\n  btnCopiar.addEventListener(\"click\", function () {\n    const texto = document.getElementById(\"texto-copiar\").textContent;\n\n    navigator.clipboard.writeText(texto)\n      .then(function () {\n        mostrarAviso(\"Copiado! Cole com Ctrl + V.\");\n      })\n      .catch(function () {\n        mostrarAviso(\"Não deu para copiar. Selecione o texto e use Ctrl + C.\");\n      });\n  });\n}\n"
  },
  "canvas": {
   "id": "canvas",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Quadro para desenhar (canvas)",
   "nota": "Desenha com o mouse, o dedo ou a caneta. Escolha a cor e a espessura do pincel.",
   "onde": {},
   "exemplo": "index.html#exemplo-21",
   "html": "<canvas id=\"quadro\" class=\"quadro\" width=\"800\" height=\"300\">Seu navegador não suporta canvas.</canvas>\n<div class=\"quadro-controles\">\n  <label for=\"cor-pincel\">Cor</label>\n  <input type=\"color\" id=\"cor-pincel\" value=\"#12324a\">\n  <label for=\"espessura-pincel\">Espessura</label>\n  <input type=\"range\" id=\"espessura-pincel\" min=\"2\" max=\"30\" value=\"6\">\n  <button type=\"button\" class=\"botao\" id=\"limpar-quadro\">Limpar</button>\n</div>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.quadro {\n  display: block;\n  width: 100%;\n  max-width: 800px;\n  height: auto;\n  aspect-ratio: 8 / 3;\n  border: 2px dashed #cfd9e3;\n  border-radius: 10px;\n  background-color: #ffffff;\n  cursor: crosshair;\n  touch-action: none;       /* no celular, arrastar desenha em vez de rolar */\n}\n.quadro-controles {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem 1rem;\n  margin-top: 0.5rem;\n}\n",
   "js": "// ----- Quadro para desenhar -----\nconst quadro = document.getElementById(\"quadro\");\n\nif (quadro) {\n  const pincel = quadro.getContext(\"2d\");\n  const corPincel = document.getElementById(\"cor-pincel\");\n  const espessuraPincel = document.getElementById(\"espessura-pincel\");\n  let desenhando = false;\n\n  pincel.lineCap = \"round\";\n  pincel.lineJoin = \"round\";\n\n  // Converte a posição do mouse na tela para a posição dentro do desenho\n  function posicaoNoQuadro(evento) {\n    const caixa = quadro.getBoundingClientRect();\n    return {\n      x: (evento.clientX - caixa.left) * (quadro.width / caixa.width),\n      y: (evento.clientY - caixa.top) * (quadro.height / caixa.height),\n    };\n  }\n\n  quadro.addEventListener(\"pointerdown\", function (evento) {\n    desenhando = true;\n    const p = posicaoNoQuadro(evento);\n    pincel.beginPath();\n    pincel.moveTo(p.x, p.y);\n    quadro.setPointerCapture(evento.pointerId);\n  });\n\n  quadro.addEventListener(\"pointermove\", function (evento) {\n    if (!desenhando) return;\n    const p = posicaoNoQuadro(evento);\n    pincel.strokeStyle = corPincel.value;\n    pincel.lineWidth = espessuraPincel.value;\n    pincel.lineTo(p.x, p.y);\n    pincel.stroke();\n  });\n\n  quadro.addEventListener(\"pointerup\", function () { desenhando = false; });\n  quadro.addEventListener(\"pointercancel\", function () { desenhando = false; });\n\n  document.getElementById(\"limpar-quadro\").addEventListener(\"click\", function () {\n    pincel.clearRect(0, 0, quadro.width, quadro.height);\n  });\n}\n"
  },
  "imc": {
   "id": "imc",
   "grupo": "Interatividade com JavaScript",
   "titulo": "Calculadora (exemplo: IMC)",
   "nota": "Modelo de qualquer calculadora: lê os campos, converte texto em número, calcula e decide com if. Troque a fórmula para fazer a sua (média, desconto, conversão...).",
   "onde": {},
   "exemplo": "index.html#exemplo-22",
   "html": "<form class=\"form-calculo\" id=\"form-imc\">\n  <div class=\"campo-calculo\">\n    <label for=\"peso\">Peso (kg)</label>\n    <input type=\"number\" id=\"peso\" min=\"20\" max=\"300\" step=\"0.1\" required>\n  </div>\n  <div class=\"campo-calculo\">\n    <label for=\"altura\">Altura (m)</label>\n    <input type=\"number\" id=\"altura\" min=\"1\" max=\"2.5\" step=\"0.01\" required>\n  </div>\n  <button type=\"submit\" class=\"botao\">Calcular</button>\n</form>\n<p class=\"resultado-calculo\" id=\"resultado-imc\" role=\"status\"></p>\n",
   "css": "/* Botão padrão (é igual em todos os exemplos: se já colou uma vez, não precisa repetir) */\n.botao {\n  display: inline-block;\n  padding: 0.6rem 1.2rem;\n  border: 0;\n  border-radius: 6px;\n  background-color: #12324a;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.botao:hover {\n  background-color: #1d4a6b;\n}\n\n.form-calculo {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: 1rem;\n}\n.campo-calculo {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n  width: 160px;\n}\n.campo-calculo input {\n  padding: 0.5rem;\n  font: inherit;\n}\n.resultado-calculo {\n  font-weight: 700;\n}\n.resultado-calculo.ok { color: #1e7a4c; }\n.resultado-calculo.atencao { color: #b86e00; }\n",
   "js": "// ----- Calculadora de IMC -----\nconst formImc = document.getElementById(\"form-imc\");\n\nif (formImc) {\n  const resultadoImc = document.getElementById(\"resultado-imc\");\n\n  formImc.addEventListener(\"submit\", function (evento) {\n    evento.preventDefault();\n\n    // .value é sempre TEXTO: Number() transforma em número\n    const peso = Number(document.getElementById(\"peso\").value);\n    const altura = Number(document.getElementById(\"altura\").value);\n    const imc = peso / (altura * altura);\n\n    let classificacao;\n    if (imc < 18.5) {\n      classificacao = \"abaixo do peso\";\n    } else if (imc < 25) {\n      classificacao = \"peso normal\";\n    } else if (imc < 30) {\n      classificacao = \"sobrepeso\";\n    } else {\n      classificacao = \"obesidade\";\n    }\n\n    // toFixed(1) = uma casa decimal; replace troca o ponto pela vírgula\n    resultadoImc.textContent = \"IMC \" + imc.toFixed(1).replace(\".\", \",\") + \": \" + classificacao + \".\";\n    resultadoImc.className = \"resultado-calculo \" + (classificacao === \"peso normal\" ? \"ok\" : \"atencao\");\n  });\n}\n"
  }
 }
};
