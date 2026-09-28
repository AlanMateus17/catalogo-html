/*
  =====================================================================
  script.js — O COMPORTAMENTO DO CATÁLOGO DO HTML
  =====================================================================

  COMO ESTE ARQUIVO CHEGA NA PÁGINA
  O index.html tem, dentro do <head>:
      <script src="js/script.js" defer></script>
  O "defer" faz este arquivo rodar só DEPOIS que todo o HTML foi lido.
  Por isso aqui já podemos procurar qualquer elemento da página sem erro.
  Não precisa escrever <script> aqui dentro: o arquivo inteiro já é JavaScript.

  A RECEITA QUE SE REPETE EM QUASE TODO EXEMPLO
    1. PEGAR o elemento do HTML        -> document.getElementById("id")
    2. ESCUTAR um evento nele          -> elemento.addEventListener("click", funcao)
    3. MUDAR alguma coisa na página    -> textContent, classList, style, atributos...

  OS COMANDOS MAIS USADOS AQUI
    document.getElementById("x")       pega UM elemento pelo id
    document.querySelector(".x")       pega o PRIMEIRO que combina com um seletor do CSS
    document.querySelectorAll(".x")    pega TODOS (uma lista, que percorremos com forEach)
    elemento.textContent = "..."       troca o texto
    elemento.classList.add("x")        coloca uma classe (e o CSS decide como fica)
    elemento.classList.remove("x")     tira uma classe
    elemento.classList.toggle("x")     coloca se não tiver, tira se tiver
    elemento.setAttribute("a", "v")    muda um atributo do HTML
    elemento.hidden = true / false     esconde ou mostra

  POR QUÊ QUASE TODA PARTE COMEÇA COM "if (elemento)"
    Este mesmo arquivo é usado pelo index.html E pelo sobre.html.
    A página Sobre não tem contador, galeria, carrossel...
    Se o JavaScript tentar usar um elemento que não existe, ele recebe null
    e dá erro — e um erro PARA o arquivo inteiro dali para baixo.
    O "if" confere: "esse elemento existe nesta página? Então continue."

  COMO ACHAR ERROS
    Aperte F12 > aba Console. Todo erro aparece em vermelho, com o nome do arquivo
    e o NÚMERO DA LINHA. Clique nele e o navegador mostra a linha exata.
    Use console.log(algumaCoisa) para ver o valor de uma variável naquele momento.

  ÍNDICE (Ctrl + F e procure "PARTE 14", por exemplo)
    Ajudantes .................... funções usadas em vários exemplos
    PARTE 1  Tema escuro          PARTE 16 Galeria ampliada
    PARTE 2  Menu do celular      PARTE 17 Janela modal
    PARTE 3  Cabeçalho encolhe    PARTE 18 Player de vídeo
    PARTE 4  Barra de progresso   PARTE 19 Carrossel
    PARTE 5  Voltar ao topo       PARTE 20 Copiar e avisar
    PARTE 6  Curtir               PARTE 21 Desenhar no canvas
    PARTE 7  Contador             PARTE 22 Calculadora de IMC
    PARTE 8  Leia mais            PARTE 23 Relógio
    PARTE 9  Escolher cor         PARTE 24 Contador de caracteres
    PARTE 10 Tamanho da letra     PARTE 25 Mostrar senha
    PARTE 11 Dica aleatória       PARTE 26 Controle deslizante do formulário
    PARTE 12 Qual tecla?          PARTE 27 Validação do formulário
    PARTE 13 Busca em tempo real  PARTE 28 Revelar ao rolar
    PARTE 14 Lista de tarefas     PARTE 29 Menu marca a seção atual
    PARTE 15 Abas                 PARTE 30 Ano atual no rodapé
*/

/*
  "use strict" liga o modo rigoroso: o JavaScript passa a acusar erros
  que antes ignorava em silêncio (como usar uma variável sem criar).
*/
"use strict";

/*
  Primeira coisa: avisamos ao CSS que o JavaScript está funcionando.
  document.documentElement é a tag <html>.
  O CSS só esconde os elementos ".revelar" quando <html> tem a classe "js" (veja estilo.css, seção 21).
*/
document.documentElement.classList.add("js");


/* =====================================================================
   AJUDANTES
   Funções pequenas que vários exemplos usam. Ficam no começo para
   serem fáceis de achar.
   ===================================================================== */

/*
  Mostra um aviso rápido (toast) embaixo da tela por alguns segundos.
  Uso: mostrarToast("Copiado!");
*/
let temporizadorToast;   // guarda o "relógio" do aviso para poder cancelar

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  if (!toast) return;    // "!" = NÃO. Se não existir toast nesta página, sai da função.

  toast.textContent = mensagem;
  toast.classList.add("visivel");

  /*
    setTimeout(funcao, milissegundos) roda a função UMA vez, depois do tempo.
    1000 milissegundos = 1 segundo.
    clearTimeout cancela o anterior: se você clicar várias vezes seguidas,
    o aviso não some no meio.
  */
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(function () {
    toast.classList.remove("visivel");
  }, 2500);
}

/*
  Lê do localStorage sem quebrar a página.
  localStorage é uma "gaveta" do navegador que guarda textos mesmo depois de fechar a aba.
  Em alguns casos (modo anônimo, arquivo aberto de certos jeitos) ele pode falhar.
  try { ... } catch { ... } = "TENTE isto; se der erro, faça aquilo em vez de travar tudo".
*/
function lerSalvo(chave) {
  try {
    return localStorage.getItem(chave);
  } catch (erro) {
    return null;
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, valor);
  } catch (erro) {
    console.warn("Não foi possível salvar no localStorage:", erro);
  }
}


/* =====================================================================
   PARTE 1 — TEMA ESCURO
   Clique no botão do cabeçalho. A escolha fica salva e vale nas duas páginas.
   ===================================================================== */
const btnTema = document.getElementById("btn-tema");

/*
  Função que APLICA um tema. Recebe "escuro" ou "claro".
  Separamos em função porque ela é usada em dois momentos:
  quando a página abre e quando o botão é clicado.
*/
function aplicarTema(tema) {
  const html = document.documentElement;

  if (tema === "escuro") {
    html.setAttribute("data-tema", "escuro");   // o CSS troca as variáveis de cor
  } else {
    html.removeAttribute("data-tema");
  }

  if (btnTema) {
    const escuro = tema === "escuro";           // true ou false
    btnTema.setAttribute("aria-pressed", String(escuro));
    btnTema.querySelector(".btn-tema-texto").textContent = escuro ? "Tema claro" : "Tema escuro";
    /*
      condicao ? valorSeVerdadeiro : valorSeFalso  -> "operador ternário", um if/else numa linha só.
    */
  }
}

/*
  Quando a página abre: usa o tema salvo. Se nunca salvou nada, segue o tema do sistema
  (o celular ou o Windows no modo escuro). matchMedia faz uma "media query" pelo JavaScript.
*/
const temaSalvo = lerSalvo("tema");
const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (temaSalvo) {
  aplicarTema(temaSalvo);
} else if (sistemaEscuro) {
  aplicarTema("escuro");
}

if (btnTema) {
  btnTema.addEventListener("click", function () {
    // Se agora está escuro, o novo tema é claro, e vice-versa
    const estaEscuro = document.documentElement.getAttribute("data-tema") === "escuro";
    const novoTema = estaEscuro ? "claro" : "escuro";

    aplicarTema(novoTema);
    salvar("tema", novoTema);   // guarda para a próxima visita
  });
}


/* =====================================================================
   PARTE 2 — MENU DO CELULAR (HAMBÚRGUER)
   Diminua a janela para ver o botão ≡.
   ===================================================================== */
const btnMenu = document.getElementById("btn-menu");
const menuLista = document.getElementById("menu-principal");

function fecharMenu() {
  menuLista.classList.remove("aberto");
  btnMenu.setAttribute("aria-expanded", "false");
}

if (btnMenu && menuLista) {       // && = E: os dois precisam existir
  btnMenu.addEventListener("click", function () {
    /*
      classList.toggle devolve true se COLOCOU a classe, false se TIROU.
      Aproveitamos esse resultado para atualizar o aria-expanded.
    */
    const abriu = menuLista.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", String(abriu));
  });

  // Ao clicar num link do menu, ele fecha (no celular, senão o menu cobre a seção)
  menuLista.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });

  // A tecla Esc também fecha o menu
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menuLista.classList.contains("aberto")) {
      fecharMenu();
      btnMenu.focus();            // devolve o foco ao botão, para quem usa teclado
    }
  });
}


/* =====================================================================
   PARTES 3, 4 e 5 — COISAS QUE ACONTECEM AO ROLAR A PÁGINA
   O evento "scroll" dispara MUITAS vezes enquanto você rola.
   Juntamos as três num evento só, para o navegador trabalhar menos.
   ===================================================================== */
const cabecalho = document.getElementById("cabecalho");
const barraProgresso = document.getElementById("barra-progresso");
const btnVoltarTopo = document.getElementById("voltar-topo");

function aoRolar() {
  /*
    window.scrollY = quantos pixels a página já rolou a partir do topo.
  */
  const rolado = window.scrollY;

  // PARTE 3 — Cabeçalho encolhe depois de rolar 60px
  if (cabecalho) {
    cabecalho.classList.toggle("encolhido", rolado > 60);
    /*
      toggle com um segundo valor: coloca a classe se for true, tira se for false.
      É o mesmo que um if/else com add e remove, numa linha.
    */
  }

  // PARTE 4 — Barra de progresso: quanto (em %) da página já foi lida
  if (barraProgresso) {
    /*
      Altura total que DÁ para rolar = altura da página inteira - altura da janela.
    */
    const totalRolavel = document.documentElement.scrollHeight - window.innerHeight;
    const porcentagem = totalRolavel > 0 ? (rolado / totalRolavel) * 100 : 0;
    barraProgresso.style.width = porcentagem + "%";
  }

  // PARTE 5 — Botão de voltar ao topo aparece depois de rolar uma tela inteira
  if (btnVoltarTopo) {
    btnVoltarTopo.classList.toggle("visivel", rolado > window.innerHeight);
  }
}

/*
  { passive: true } avisa: "esta função não vai impedir a rolagem".
  Assim o navegador rola sem esperar o JavaScript, e a página fica mais fluida.
*/
window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();   // roda uma vez ao abrir, caso a página já abra rolada (ex.: link com #)


/* =====================================================================
   PARTE 6 — CURTIR: TROCAR CLASSE E TEXTO
   O exemplo mais simples e mais usado: um clique liga e desliga um estado.
   ===================================================================== */
const btnCurtir = document.getElementById("btn-curtir");

if (btnCurtir) {
  btnCurtir.addEventListener("click", function () {
    const curtido = btnCurtir.classList.toggle("curtido");
    document.getElementById("curtir-texto").textContent = curtido ? "Curtido!" : "Curtir";
    btnCurtir.setAttribute("aria-pressed", String(curtido));
  });
}
/*
  REPARE: o JavaScript NÃO mudou nenhuma cor. Ele só colocou a classe "curtido".
  Quem diz que "curtido" é vermelho e tem animação é o CSS (seção 16).
  Essa é a forma recomendada: JS controla o ESTADO, CSS controla a APARÊNCIA.
*/


/* =====================================================================
   PARTE 7 — CONTADOR
   Variável na memória + função que atualiza a tela.
   ===================================================================== */
const contadorValor = document.getElementById("contador-valor");

if (contadorValor) {
  /*
    let (e não const) porque o valor vai MUDAR.
  */
  let contagem = 0;

  // Uma função só para desenhar o número na tela. Os três botões usam ela.
  function atualizarContador() {
    contadorValor.textContent = contagem;
    contadorValor.classList.toggle("negativo", contagem < 0);
  }

  document.getElementById("btn-mais").addEventListener("click", function () {
    contagem++;              // soma 1
    atualizarContador();
  });

  document.getElementById("btn-menos").addEventListener("click", function () {
    contagem--;              // tira 1
    atualizarContador();
  });

  document.getElementById("btn-zerar").addEventListener("click", function () {
    contagem = 0;
    atualizarContador();
  });
}


/* =====================================================================
   PARTE 8 — LEIA MAIS: MOSTRAR E ESCONDER
   ===================================================================== */
const btnLeiaMais = document.getElementById("btn-leia-mais");
const textoExtra = document.getElementById("texto-extra");

if (btnLeiaMais && textoExtra) {
  btnLeiaMais.addEventListener("click", function () {
    /*
      textoExtra.hidden é true (escondido) ou false (visível).
      "= !textoExtra.hidden" inverte: o que era true vira false e vice-versa.
    */
    textoExtra.hidden = !textoExtra.hidden;

    const aberto = !textoExtra.hidden;
    btnLeiaMais.textContent = aberto ? "Mostrar menos" : "Leia mais";
    btnLeiaMais.setAttribute("aria-expanded", String(aberto));
  });
}


/* =====================================================================
   PARTE 9 — ESCOLHER COR EM TEMPO REAL
   Evento "input": dispara a CADA mudança, enquanto a pessoa mexe.
   (O evento "change" só dispararia no fim, quando ela soltasse.)
   ===================================================================== */
const escolherCor = document.getElementById("escolher-cor");

if (escolherCor) {
  const amostra = document.getElementById("amostra-cor");
  const codigoCor = document.getElementById("codigo-cor");

  escolherCor.addEventListener("input", function () {
    const cor = escolherCor.value;          // .value = o valor atual do campo, ex.: "#ff0000"
    amostra.style.backgroundColor = cor;    // style.propriedade muda o CSS direto no elemento
    codigoCor.textContent = cor;
  });
}
/*
  ATENÇÃO À ESCRITA: no CSS é "background-color"; no JavaScript é "backgroundColor".
  Tira o hífen e a palavra seguinte começa com maiúscula (camelCase).
*/


/* =====================================================================
   PARTE 10 — TAMANHO DA LETRA COM CONTROLE DESLIZANTE
   ===================================================================== */
const tamanhoTexto = document.getElementById("tamanho-texto");

if (tamanhoTexto) {
  const saidaTamanho = document.getElementById("saida-tamanho");
  const textoTamanho = document.getElementById("texto-tamanho");

  tamanhoTexto.addEventListener("input", function () {
    const tamanho = tamanhoTexto.value;
    saidaTamanho.textContent = tamanho;
    textoTamanho.style.fontSize = tamanho + "px";   // precisa da unidade! "24" sozinho não funciona
  });
}


/* =====================================================================
   PARTE 11 — DICA ALEATÓRIA
   Array (lista) + sorteio com Math.random().
   ===================================================================== */
const btnFrase = document.getElementById("btn-frase");

if (btnFrase) {
  const frase = document.getElementById("frase");

  /*
    Um ARRAY guarda vários valores numa variável só, entre colchetes.
    Cada item tem uma posição (índice) que COMEÇA EM ZERO: dicas[0] é a primeira.
  */
  const dicas = [
    "Salve o arquivo antes de recarregar o navegador. Parece óbvio, mas é o erro mais comum.",
    "Leia a mensagem de erro do console. Ela diz o arquivo e a linha do problema.",
    "Indente o código: cada tag de dentro, dois espaços para a direita.",
    "Nomes de arquivos: minúsculas, sem espaço e sem acento. Ex.: minha-pagina.html",
    "Toda imagem precisa de alt. Pense em quem não pode ver a imagem.",
    "Mudou o CSS e nada aconteceu? Ctrl + F5 recarrega sem cache.",
    "Um id só pode aparecer UMA vez por página. Para repetir, use class.",
    "Comente o código pensando em você daqui a seis meses.",
  ];

  let ultimoSorteio = -1;   // para não repetir a mesma dica duas vezes seguidas

  btnFrase.addEventListener("click", function () {
    let indice;
    /*
      Math.random() gera um número entre 0 e 0,999...
      Vezes o tamanho da lista (8) = entre 0 e 7,999...
      Math.floor() arredonda para baixo = 0, 1, 2... até 7. Um índice válido!
      do { } while (condição) repete ENQUANTO sortear o mesmo de antes.
    */
    do {
      indice = Math.floor(Math.random() * dicas.length);
    } while (indice === ultimoSorteio);
    ultimoSorteio = indice;

    frase.textContent = dicas[indice];

    // Reinicia a animação do CSS: tira a classe, força o navegador a "perceber", e coloca de novo
    frase.classList.remove("trocando");
    void frase.offsetWidth;
    frase.classList.add("trocando");
  });
}


/* =====================================================================
   PARTE 12 — QUAL TECLA?
   O objeto "evento" traz informações sobre o que aconteceu.
   ===================================================================== */
const campoTecla = document.getElementById("campo-tecla");

if (campoTecla) {
  const teclaInfo = document.getElementById("tecla-info");

  /*
    A função recebe um parâmetro (chamamos de "evento", mas pode ser qualquer nome).
    O navegador preenche esse parâmetro sozinho com os detalhes do evento.
    TESTE: coloque console.log(evento) aqui dentro e veja tudo que ele tem no F12.
  */
  campoTecla.addEventListener("keydown", function (evento) {
    let texto = `Tecla: "${evento.key}"  |  Código: ${evento.code}`;

    if (evento.ctrlKey) texto += "  |  com Ctrl";
    if (evento.shiftKey) texto += "  |  com Shift";
    if (evento.altKey) texto += "  |  com Alt";

    teclaInfo.textContent = texto;
  });
}


/* =====================================================================
   PARTE 13 — BUSCA EM TEMPO REAL
   Percorrer uma lista de elementos com forEach e decidir quem aparece.
   ===================================================================== */
const filtroBusca = document.getElementById("filtro-busca");

if (filtroBusca) {
  const itens = document.querySelectorAll("#lista-linguagens li");
  const contagemFiltro = document.getElementById("filtro-contagem");

  filtroBusca.addEventListener("input", function () {
    /*
      toLowerCase() deixa tudo minúsculo e trim() tira espaços das pontas.
      Assim "JAVA", "java" e " Java " dão o mesmo resultado.
    */
    const termo = filtroBusca.value.toLowerCase().trim();
    let visiveis = 0;

    // forEach roda a função UMA VEZ PARA CADA item da lista
    itens.forEach(function (item) {
      const nome = item.textContent.toLowerCase();
      const combina = nome.includes(termo);   // includes: o texto CONTÉM o termo?

      item.hidden = !combina;
      if (combina) visiveis++;
    });

    // Plural certinho: "1 linguagem", "2 linguagens"
    if (visiveis === 0) {
      contagemFiltro.textContent = "Nenhuma linguagem encontrada.";
    } else {
      contagemFiltro.textContent = visiveis + (visiveis === 1 ? " linguagem" : " linguagens");
    }
  });
}


/* =====================================================================
   PARTE 14 — LISTA DE TAREFAS (SALVA NO NAVEGADOR)
   O exemplo mais completo: criar elementos, remover, e guardar os dados.
   ===================================================================== */
const formTarefa = document.getElementById("form-tarefa");

if (formTarefa) {
  const campoTarefa = document.getElementById("nova-tarefa");
  const listaTarefas = document.getElementById("lista-tarefas");
  const modelo = document.getElementById("modelo-tarefa");
  const textoRestantes = document.getElementById("tarefas-restantes");

  /*
    OS DADOS ficam num array de OBJETOS. Um objeto agrupa informações com nome:
      { texto: "estudar flexbox", feita: false }
    A TELA é desenhada a partir desses dados. Nunca o contrário.

    O localStorage só guarda TEXTO. Então:
      JSON.stringify(array) transforma o array em texto para salvar;
      JSON.parse(texto) transforma o texto de volta em array ao carregar.
    O "|| []" quer dizer: se não tiver nada salvo, comece com uma lista vazia.
  */
  let tarefas = [];
  try {
    tarefas = JSON.parse(lerSalvo("tarefas")) || [];
  } catch (erro) {
    tarefas = [];
  }

  function salvarTarefas() {
    salvar("tarefas", JSON.stringify(tarefas));
  }

  // Desenha a lista inteira de novo a partir do array
  function desenharTarefas() {
    listaTarefas.innerHTML = "";   // apaga tudo que estava na lista

    tarefas.forEach(function (tarefa, indice) {
      /*
        Copiamos o <template> do HTML. cloneNode(true) copia com tudo que tem dentro.
        .content é o conteúdo do template, e firstElementChild é o <li>.
      */
      const item = modelo.content.firstElementChild.cloneNode(true);
      const check = item.querySelector(".tarefa-check");
      const texto = item.querySelector(".tarefa-texto");
      const remover = item.querySelector(".tarefa-remover");

      /*
        IMPORTANTE: textContent, e NÃO innerHTML, para o que o usuário digitou.
        POR QUÊ: se alguém digitar <img src=x onerror=...>, o innerHTML executaria
        esse código. O textContent mostra como texto puro. Isso é segurança básica.
      */
      texto.textContent = tarefa.texto;
      check.checked = tarefa.feita;
      remover.setAttribute("aria-label", "Remover: " + tarefa.texto);

      check.addEventListener("change", function () {
        tarefas[indice].feita = check.checked;
        salvarTarefas();
        atualizarRestantes();
        // O risco no texto é feito pelo CSS com :has(), sem JavaScript.
      });

      remover.addEventListener("click", function () {
        /*
          splice(posição, quantidade) REMOVE itens do array.
          Aqui: na posição "indice", remove 1 item.
        */
        tarefas.splice(indice, 1);
        salvarTarefas();
        desenharTarefas();
        mostrarToast("Tarefa removida.");
      });

      listaTarefas.appendChild(item);   // appendChild coloca o item no FIM da lista
    });

    atualizarRestantes();
  }

  function atualizarRestantes() {
    /*
      filter cria uma lista NOVA só com os itens que passam no teste.
      Aqui: as tarefas que NÃO estão feitas. .length = quantidade.
    */
    const pendentes = tarefas.filter(function (t) { return !t.feita; }).length;

    if (tarefas.length === 0) {
      textoRestantes.textContent = "Nenhuma tarefa.";
    } else if (pendentes === 0) {
      textoRestantes.textContent = "Tudo feito!";
    } else {
      textoRestantes.textContent = pendentes + (pendentes === 1 ? " tarefa pendente" : " tarefas pendentes");
    }
  }

  /*
    Usamos o evento "submit" do FORMULÁRIO, e não o "click" do botão.
    POR QUÊ: assim funciona tanto clicando em Adicionar quanto apertando Enter.
  */
  formTarefa.addEventListener("submit", function (evento) {
    /*
      preventDefault() CANCELA o comportamento padrão do evento.
      O padrão de um submit é recarregar a página (enviar para o servidor).
      Sem esta linha, a página piscaria e tudo sumiria.
    */
    evento.preventDefault();

    const texto = campoTarefa.value.trim();
    if (texto === "") return;

    tarefas.push({ texto: texto, feita: false });   // push adiciona no FIM do array
    salvarTarefas();
    desenharTarefas();

    campoTarefa.value = "";   // limpa o campo
    campoTarefa.focus();      // e deixa o cursor lá, pronto para a próxima
  });

  desenharTarefas();   // desenha as tarefas salvas assim que a página abre
}


/* =====================================================================
   PARTE 15 — ABAS
   Um grupo de botões em que só UM fica ativo por vez.
   ===================================================================== */
const abas = document.querySelectorAll(".aba");

/*
  querySelectorAll nunca devolve null: se não achar nada, devolve uma lista VAZIA.
  Por isso aqui conferimos o tamanho (length) em vez de "if (abas)".
*/
if (abas.length > 0) {

  function ativarAba(abaEscolhida) {
    // 1. Desativa TODAS as abas e esconde TODOS os painéis...
    abas.forEach(function (aba) {
      aba.setAttribute("aria-selected", "false");
      aba.setAttribute("tabindex", "-1");      // tabindex -1 = o Tab pula este botão
      document.getElementById(aba.dataset.aba).hidden = true;
    });

    // 2. ...e depois ativa só a escolhida. É mais simples do que descobrir qual estava ativa antes.
    abaEscolhida.setAttribute("aria-selected", "true");
    abaEscolhida.removeAttribute("tabindex");
    /*
      dataset lê os atributos "data-". O data-aba="painel-css" do HTML vira aba.dataset.aba.
    */
    document.getElementById(abaEscolhida.dataset.aba).hidden = false;
  }

  abas.forEach(function (aba, posicao) {
    aba.addEventListener("click", function () {
      ativarAba(aba);
    });

    // Setas do teclado trocam de aba: é o comportamento que o leitor de tela espera
    aba.addEventListener("keydown", function (evento) {
      let nova;
      if (evento.key === "ArrowRight") nova = abas[(posicao + 1) % abas.length];
      if (evento.key === "ArrowLeft") nova = abas[(posicao - 1 + abas.length) % abas.length];
      /*
        O % (resto da divisão) faz a lista "dar a volta":
        da última aba, a seta para a direita volta para a primeira.
      */
      if (nova) {
        ativarAba(nova);
        nova.focus();
      }
    });
  });
}


/* =====================================================================
   PARTE 16 — GALERIA AMPLIADA (LIGHTBOX)
   Clique numa foto da galeria. Setas trocam, Esc fecha.
   ===================================================================== */
const lightbox = document.getElementById("lightbox");
const itensGaleria = document.querySelectorAll(".galeria-item");

if (lightbox && itensGaleria.length > 0) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxLegenda = document.getElementById("lightbox-legenda");
  let fotoAtual = 0;

  function mostrarFoto(posicao) {
    // Dá a volta nas pontas: antes da primeira vem a última, e depois da última, a primeira
    fotoAtual = (posicao + itensGaleria.length) % itensGaleria.length;

    const item = itensGaleria[fotoAtual];
    lightboxImg.src = item.dataset.grande;       // lê o data-grande do HTML
    lightboxImg.alt = item.dataset.legenda;
    lightboxLegenda.textContent = `${item.dataset.legenda} (${fotoAtual + 1} de ${itensGaleria.length})`;
  }

  itensGaleria.forEach(function (item, posicao) {
    item.addEventListener("click", function () {
      mostrarFoto(posicao);
      lightbox.showModal();      // showModal() abre o <dialog> por cima da página
    });
  });

  document.getElementById("lightbox-anterior").addEventListener("click", function () {
    mostrarFoto(fotoAtual - 1);
  });
  document.getElementById("lightbox-proximo").addEventListener("click", function () {
    mostrarFoto(fotoAtual + 1);
  });
  document.getElementById("lightbox-fechar").addEventListener("click", function () {
    lightbox.close();
  });

  lightbox.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
    if (evento.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
    // O Esc o próprio <dialog> já trata sozinho
  });

  // Clicar no fundo escuro (fora da foto) fecha
  lightbox.addEventListener("click", function (evento) {
    /*
      evento.target = o elemento EXATO que recebeu o clique.
      Se foi o próprio dialog (e não a foto ou um botão dentro dele), foi no fundo.
    */
    if (evento.target === lightbox) lightbox.close();
  });
}


/* =====================================================================
   PARTE 17 — JANELA MODAL
   ===================================================================== */
const modal = document.getElementById("modal");
const btnAbrirModal = document.getElementById("btn-abrir-modal");

if (modal && btnAbrirModal) {
  btnAbrirModal.addEventListener("click", function () {
    modal.showModal();
  });

  /*
    Fechar ao clicar fora. O dialog ocupa só a caixinha branca, mas o clique no fundo
    também "cai" nele. Conferimos se a posição do clique está FORA do retângulo da caixa.
    getBoundingClientRect() devolve a posição e o tamanho do elemento na tela.
  */
  modal.addEventListener("click", function (evento) {
    const caixa = modal.getBoundingClientRect();
    const clicouFora =
      evento.clientX < caixa.left || evento.clientX > caixa.right ||
      evento.clientY < caixa.top || evento.clientY > caixa.bottom;

    if (clicouFora) modal.close();
  });

  // O evento "close" dispara sempre que o dialog fecha, seja qual for o jeito
  modal.addEventListener("close", function () {
    mostrarToast("Janela fechada.");
  });
}


/* =====================================================================
   PARTE 18 — PLAYER DE VÍDEO COM CONTROLES PRÓPRIOS
   O elemento <video> tem métodos (play, pause) e propriedades (muted, currentTime...).
   ===================================================================== */
const video = document.getElementById("video-custom");

if (video) {
  const btnPlay = document.getElementById("btn-play");
  const btnMudo = document.getElementById("btn-mudo");
  const progresso = document.getElementById("video-progresso");
  const tempo = document.getElementById("video-tempo");

  // Transforma segundos (ex.: 75) em "1:15"
  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    /*
      padStart(2, "0") completa com zero à esquerda até ter 2 caracteres: 5 vira "05".
    */
    return min + ":" + String(seg).padStart(2, "0");
  }

  btnPlay.addEventListener("click", function () {
    // video.paused é true quando o vídeo está parado
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  /*
    Atualizamos o texto do botão nos eventos "play" e "pause" do VÍDEO, e não no clique.
    POR QUÊ: o vídeo também para sozinho quando acaba. Assim o botão sempre fica certo.
  */
  video.addEventListener("play", function () { btnPlay.textContent = "❚❚ Pausar"; });
  video.addEventListener("pause", function () { btnPlay.textContent = "▶ Tocar"; });
  video.addEventListener("ended", function () { btnPlay.textContent = "↺ De novo"; });

  btnMudo.addEventListener("click", function () {
    video.muted = !video.muted;
    btnMudo.textContent = video.muted ? "Ligar som" : "Tirar som";
  });

  // "timeupdate" dispara várias vezes por segundo enquanto o vídeo toca
  video.addEventListener("timeupdate", function () {
    if (!video.duration) return;
    progresso.value = (video.currentTime / video.duration) * 100;
    tempo.textContent = formatarTempo(video.currentTime) + " / " + formatarTempo(video.duration);
  });
}


/* =====================================================================
   PARTE 19 — CARROSSEL
   Um índice diz qual slide está na tela. As setas mudam o índice.
   Ele também passa sozinho a cada 5 segundos (setInterval).
   ===================================================================== */
const carrossel = document.getElementById("carrossel");

if (carrossel) {
  const trilho = document.getElementById("carrossel-trilho");
  const slides = trilho.querySelectorAll(".slide");
  const areaPontos = document.getElementById("carrossel-pontos");
  let slideAtual = 0;
  let passarSozinho;   // guarda o intervalo, para poder parar

  /*
    Criando elementos pelo JavaScript: uma bolinha para cada slide.
    document.createElement("button") cria um <button> que ainda NÃO está na página.
    Só aparece depois do appendChild.
  */
  slides.forEach(function (slide, posicao) {
    const ponto = document.createElement("button");
    ponto.type = "button";
    ponto.className = "carrossel-ponto";
    ponto.setAttribute("aria-label", "Ir para a imagem " + (posicao + 1));
    ponto.addEventListener("click", function () {
      irPara(posicao);
    });
    areaPontos.appendChild(ponto);
  });
  const pontos = areaPontos.querySelectorAll(".carrossel-ponto");

  function irPara(posicao) {
    slideAtual = (posicao + slides.length) % slides.length;

    /*
      Move o trilho para a esquerda. Slide 0 = 0%, slide 1 = -100%, slide 2 = -200%...
      A animação suave vem da "transition" do CSS.
    */
    trilho.style.transform = `translateX(-${slideAtual * 100}%)`;

    pontos.forEach(function (ponto, i) {
      ponto.setAttribute("aria-current", String(i === slideAtual));
    });
  }

  document.getElementById("carrossel-anterior").addEventListener("click", function () {
    irPara(slideAtual - 1);
  });
  document.getElementById("carrossel-proximo").addEventListener("click", function () {
    irPara(slideAtual + 1);
  });

  /*
    setInterval(funcao, ms) repete a função PARA SEMPRE, a cada intervalo.
    clearInterval para. Paramos quando o mouse está em cima ou quando algo dentro
    recebe foco, para a imagem não fugir enquanto a pessoa olha.
  */
  function iniciarAutomatico() {
    clearInterval(passarSozinho);
    passarSozinho = setInterval(function () {
      irPara(slideAtual + 1);
    }, 5000);
  }
  function pararAutomatico() {
    clearInterval(passarSozinho);
  }

  carrossel.addEventListener("mouseenter", pararAutomatico);
  carrossel.addEventListener("mouseleave", iniciarAutomatico);
  carrossel.addEventListener("focusin", pararAutomatico);
  carrossel.addEventListener("focusout", iniciarAutomatico);

  irPara(0);
  // Quem pediu "menos movimento" no sistema não recebe o carrossel automático
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    iniciarAutomatico();
  }
}


/* =====================================================================
   PARTE 20 — COPIAR PARA A ÁREA DE TRANSFERÊNCIA
   ===================================================================== */
const btnCopiar = document.getElementById("btn-copiar");

if (btnCopiar) {
  btnCopiar.addEventListener("click", function () {
    const texto = document.getElementById("texto-copiar").textContent;

    /*
      navigator.clipboard.writeText() copia o texto. Ele é ASSÍNCRONO:
      demora um instante e só depois avisa se deu certo.
      .then(funcao)  -> roda quando der certo
      .catch(funcao) -> roda se der errado (ex.: navegador bloqueou)
    */
    navigator.clipboard.writeText(texto)
      .then(function () {
        mostrarToast("Copiado! Cole com Ctrl + V.");
        btnCopiar.textContent = "Copiado ✓";
        setTimeout(function () { btnCopiar.textContent = "Copiar"; }, 2000);
      })
      .catch(function () {
        mostrarToast("O navegador bloqueou a cópia. Selecione e use Ctrl + C.");
      });
  });
}


/* =====================================================================
   PARTE 21 — DESENHAR NO CANVAS
   Pointer events funcionam com mouse, dedo e caneta ao mesmo tempo.
   ===================================================================== */
const quadro = document.getElementById("quadro");

if (quadro) {
  /*
    O "contexto 2d" é o pincel. Todo desenho no canvas passa por ele.
  */
  const pincel = quadro.getContext("2d");
  const corPincel = document.getElementById("cor-pincel");
  const espessura = document.getElementById("espessura-pincel");
  let desenhando = false;

  // Pontas e junções redondas deixam o traço suave
  pincel.lineCap = "round";
  pincel.lineJoin = "round";

  /*
    O canvas tem 800px de largura REAL, mas o CSS pode mostrá-lo menor (no celular, por exemplo).
    Esta função converte a posição do mouse na tela para a posição DENTRO do desenho.
  */
  function posicao(evento) {
    const caixa = quadro.getBoundingClientRect();
    return {
      x: (evento.clientX - caixa.left) * (quadro.width / caixa.width),
      y: (evento.clientY - caixa.top) * (quadro.height / caixa.height),
    };
  }

  quadro.addEventListener("pointerdown", function (evento) {
    desenhando = true;
    const p = posicao(evento);
    pincel.beginPath();         // começa um traço novo
    pincel.moveTo(p.x, p.y);    // leva o pincel até o ponto, SEM desenhar
    quadro.setPointerCapture(evento.pointerId);   // continua desenhando mesmo se sair da borda
  });

  quadro.addEventListener("pointermove", function (evento) {
    if (!desenhando) return;    // só desenha com o botão apertado
    const p = posicao(evento);
    pincel.strokeStyle = corPincel.value;
    pincel.lineWidth = espessura.value;
    pincel.lineTo(p.x, p.y);    // linha até o novo ponto...
    pincel.stroke();            // ...e pinta
  });

  function pararDeDesenhar() { desenhando = false; }
  quadro.addEventListener("pointerup", pararDeDesenhar);
  quadro.addEventListener("pointercancel", pararDeDesenhar);

  document.getElementById("limpar-quadro").addEventListener("click", function () {
    // clearRect apaga um retângulo. Do (0,0) até largura x altura = tudo
    pincel.clearRect(0, 0, quadro.width, quadro.height);
  });
}


/* =====================================================================
   PARTE 22 — CALCULADORA DE IMC
   Ler campos, converter texto em número, calcular, decidir.
   ===================================================================== */
const formImc = document.getElementById("form-imc");

if (formImc) {
  const resultadoImc = document.getElementById("resultado-imc");

  formImc.addEventListener("submit", function (evento) {
    evento.preventDefault();

    /*
      TUDO que vem de um campo (.value) é TEXTO, mesmo digitando números.
      Number() converte. Sem isso, "60" + "10" daria "6010".
      replace(",", ".") aceita vírgula, que é como escrevemos no Brasil.
    */
    const peso = Number(document.getElementById("peso").value.replace(",", "."));
    const altura = Number(document.getElementById("altura").value.replace(",", "."));

    const imc = peso / (altura * altura);

    let classificacao;
    if (imc < 18.5) {
      classificacao = "abaixo do peso";
    } else if (imc < 25) {
      classificacao = "peso normal";
    } else if (imc < 30) {
      classificacao = "sobrepeso";
    } else {
      classificacao = "obesidade";
    }

    /*
      toFixed(1) = uma casa decimal, e devolve TEXTO.
      replace(".", ",") troca o ponto pela vírgula brasileira: 22.5 vira "22,5".
    */
    resultadoImc.textContent = `IMC ${imc.toFixed(1).replace(".", ",")}: ${classificacao}. (Exemplo de programação, não é avaliação de saúde.)`;
    resultadoImc.className = "resultado-imc " + (classificacao === "peso normal" ? "ok" : "atencao");
  });
}


/* =====================================================================
   PARTE 23 — RELÓGIO
   ===================================================================== */
const relogio = document.getElementById("relogio");

if (relogio) {
  function atualizarRelogio() {
    const agora = new Date();   // new Date() = a data e hora deste instante
    /*
      toLocaleTimeString("pt-BR") formata no padrão brasileiro: 14:05:09
    */
    relogio.textContent = agora.toLocaleTimeString("pt-BR");
    // O atributo datetime guarda a hora num formato que máquinas entendem
    relogio.setAttribute("datetime", agora.toISOString());
  }

  atualizarRelogio();                  // mostra já, sem esperar 1 segundo
  setInterval(atualizarRelogio, 1000); // e atualiza a cada segundo
  /*
    REPARE: passamos "atualizarRelogio" SEM parênteses.
    Com parênteses, a função rodaria agora e o setInterval receberia o resultado (nada).
    Sem parênteses, entregamos a própria função para o setInterval chamar depois.
  */
}


/* =====================================================================
   PARTE 24 — CONTADOR DE CARACTERES DO TEXTAREA
   ===================================================================== */
const campoMensagem = document.getElementById("mensagem");

if (campoMensagem) {
  const contadorCaracteres = document.getElementById("contador-caracteres");
  const limite = campoMensagem.maxLength;   // lê o maxlength="200" do HTML

  function contarCaracteres() {
    const total = campoMensagem.value.length;
    contadorCaracteres.textContent = `${total} de ${limite} caracteres`;
    // Fica vermelho quando faltam 20 ou menos
    contadorCaracteres.style.color = total >= limite - 20 ? "var(--cor-erro)" : "";
  }

  campoMensagem.addEventListener("input", contarCaracteres);
}


/* =====================================================================
   PARTE 25 — MOSTRAR E ESCONDER A SENHA
   Trocar o type do input de "password" para "text" e de volta.
   ===================================================================== */
const btnVerSenha = document.getElementById("btn-ver-senha");

if (btnVerSenha) {
  const campoSenha = document.getElementById("senha");

  btnVerSenha.addEventListener("click", function () {
    const escondida = campoSenha.type === "password";
    campoSenha.type = escondida ? "text" : "password";
    btnVerSenha.textContent = escondida ? "Esconder" : "Mostrar";
    btnVerSenha.setAttribute("aria-pressed", String(escondida));
  });
}


/* =====================================================================
   PARTE 26 — CONTROLE DESLIZANTE DO FORMULÁRIO
   ===================================================================== */
const campoNivel = document.getElementById("nivel");

if (campoNivel) {
  const saidaNivel = document.getElementById("nivel-valor");
  campoNivel.addEventListener("input", function () {
    saidaNivel.textContent = campoNivel.value;
  });
}


/* =====================================================================
   PARTE 27 — VALIDAÇÃO DO FORMULÁRIO
   O HTML já confere sozinho: required, type="email", minlength, pattern...
   O JavaScript entra só no que o HTML NÃO sabe conferir: "as duas senhas são iguais?".
   ===================================================================== */
const formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
  const senha = document.getElementById("senha");
  const confirma = document.getElementById("confirma-senha");
  const resultadoForm = document.getElementById("resultado-form");

  function conferirSenhas() {
    /*
      setCustomValidity("mensagem") marca o campo como INVÁLIDO, com a nossa mensagem.
      setCustomValidity("") (vazio) marca como válido de novo.
      A partir daí, o navegador trata o erro igual aos do HTML: bloqueia o envio e mostra o balão.
    */
    if (confirma.value !== "" && confirma.value !== senha.value) {
      confirma.setCustomValidity("As senhas não são iguais.");
    } else {
      confirma.setCustomValidity("");
    }
  }

  senha.addEventListener("input", conferirSenhas);
  confirma.addEventListener("input", conferirSenhas);

  /*
    O evento "submit" SÓ dispara se o formulário passou em todas as validações.
    Se algum campo estiver errado, o navegador para antes e mostra o problema.
  */
  formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();   // não envia para servidor nenhum; é só um exemplo

    /*
      FormData lê TODOS os campos do formulário de uma vez, usando o atributo "name".
      Campo sem name não aparece aqui. É por isso que o name é importante!
    */
    const dados = new FormData(formCadastro);

    // Nomes mais amigáveis para mostrar na tela
    const rotulos = {
      nome: "Nome", email: "E-mail", telefone: "Celular", nascimento: "Nascimento",
      idade: "Idade", site: "Site", curso: "Curso", linguagem: "Linguagem favorita",
      "cor-favorita": "Cor favorita", nivel: "Nível", horario: "Horário",
      "mes-inicio": "Mês de início", semana: "Semana", "data-hora": "Entrega",
      turno: "Turno", interesses: "Interesses", mensagem: "Sobre você",
      arquivo: "Foto", busca: "Busca", origem: "Origem (campo oculto)", termos: "Termos",
    };

    /*
      Juntamos os valores por nome. O checkbox "interesses" pode ter VÁRIOS valores
      com o mesmo nome, então acumulamos numa lista.
      "for...of" percorre cada par [nome, valor] do FormData.
    */
    const juntos = {};
    for (const [nome, valor] of dados) {
      if (nome === "senha" || nome === "confirma-senha") continue;   // nunca mostre senhas na tela!
      const texto = valor instanceof File ? valor.name : valor;      // arquivo: mostra só o nome
      if (texto === "") continue;                                    // pula campos vazios
      juntos[nome] = juntos[nome] ? juntos[nome] + ", " + texto : texto;
    }

    /*
      O FormData guarda o VALUE da opção escolhida ("ds"), e não o texto que aparece.
      Para mostrar o nome bonito, pegamos o texto da opção selecionada no <select>.
    */
    const selectCurso = document.getElementById("curso");
    juntos.curso = selectCurso.options[selectCurso.selectedIndex].text;

    // Monta uma lista de definição <dl> com os dados, criando os elementos um a um
    const titulo = document.createElement("h3");
    titulo.textContent = "Dados coletados pelo JavaScript";
    titulo.style.marginTop = "0";

    const lista = document.createElement("dl");
    for (const nome in juntos) {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = rotulos[nome] || nome;
      dd.textContent = juntos[nome];   // textContent de novo: dado do usuário nunca vai em innerHTML
      lista.append(dt, dd);
    }

    resultadoForm.replaceChildren(titulo, lista);   // troca o conteúdo antigo pelo novo
    resultadoForm.hidden = false;
    resultadoForm.scrollIntoView({ behavior: "smooth", block: "center" });
    mostrarToast("Cadastro validado!");
  });

  // O botão Limpar (type="reset") também esconde o resultado
  formCadastro.addEventListener("reset", function () {
    resultadoForm.hidden = true;
    confirma.setCustomValidity("");
    /*
      O reset acontece DEPOIS deste evento. setTimeout com 0 espera ele terminar
      para então atualizar os textos que dependem dos campos.
    */
    setTimeout(function () {
      if (campoNivel) document.getElementById("nivel-valor").textContent = campoNivel.value;
      if (campoMensagem) campoMensagem.dispatchEvent(new Event("input"));
    }, 0);
  });
}


/* =====================================================================
   PARTE 28 — REVELAR AO ROLAR
   Os elementos com class="revelar" aparecem suavemente quando entram na tela.
   ===================================================================== */
const paraRevelar = document.querySelectorAll(".revelar");

/*
  IntersectionObserver é um "vigia": avisa quando um elemento ENTRA ou SAI da tela.
  POR QUÊ não usar o evento scroll: o vigia é feito pelo navegador e gasta muito menos
  processamento do que conferir a posição de cada elemento a cada pixel rolado.
*/
if (paraRevelar.length > 0 && "IntersectionObserver" in window) {
  const vigiaRevelar = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {                 // entrou na tela?
        entrada.target.classList.add("visivel");
        vigiaRevelar.unobserve(entrada.target);     // já apareceu, não precisa mais vigiar
      }
    });
  }, { threshold: 0.15 });   // dispara quando 15% do elemento estiver visível

  paraRevelar.forEach(function (elemento) {
    vigiaRevelar.observe(elemento);
  });
} else {
  // Navegador muito antigo: mostra tudo de uma vez
  paraRevelar.forEach(function (elemento) { elemento.classList.add("visivel"); });
}


/* =====================================================================
   PARTE 29 — O MENU MARCA A SEÇÃO QUE ESTÁ NA TELA
   ===================================================================== */
const linksMenu = document.querySelectorAll('.menu-lista a[href^="#"]');
/*
  a[href^="#"] = links cujo href COMEÇA com "#" (os links internos desta página).
  É o mesmo seletor de atributo que usamos no CSS.
*/

if (linksMenu.length > 0 && "IntersectionObserver" in window) {
  const vigiaSecoes = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;

      const id = entrada.target.id;
      linksMenu.forEach(function (link) {
        link.classList.toggle("ativo", link.getAttribute("href") === "#" + id);
      });
    });
  }, {
    /*
      rootMargin encolhe a "área de vigia": só conta a faixa do meio da tela.
      Assim a seção só vira "ativa" quando está de fato sendo lida.
    */
    rootMargin: "-45% 0px -50% 0px",
  });

  document.querySelectorAll("main section[id]").forEach(function (secao) {
    vigiaSecoes.observe(secao);
  });
}


/* =====================================================================
   PARTE 30 — ANO ATUAL NO RODAPÉ
   Nunca mais esquecer de trocar o "© 2026" em janeiro.
   ===================================================================== */
const anoAtual = document.getElementById("ano-atual");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}


/*
  Uma mensagem no console para quem abrir o F12. Os programadores fazem isso de brincadeira,
  e também serve para conferir que o arquivo carregou até o fim, sem erros no meio.
*/
console.log("%cscript.js carregado até o fim, sem erros. 🎉", "color: #2a9d8f; font-weight: bold;");
