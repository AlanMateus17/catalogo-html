// ----- Carrossel -----
const carrossel = document.getElementById("carrossel");

if (carrossel) {
  const trilho = document.getElementById("carrossel-trilho");
  const slides = trilho.querySelectorAll(".slide");
  const areaPontos = document.getElementById("carrossel-pontos");
  let slideAtual = 0;
  let passarSozinho;

  // Cria uma bolinha para cada foto
  slides.forEach(function (slide, posicao) {
    const ponto = document.createElement("button");
    ponto.type = "button";
    ponto.className = "carrossel-ponto";
    ponto.setAttribute("aria-label", "Ir para a foto " + (posicao + 1));
    ponto.addEventListener("click", function () {
      irParaSlide(posicao);
    });
    areaPontos.appendChild(ponto);
  });
  const pontos = areaPontos.querySelectorAll(".carrossel-ponto");

  function irParaSlide(posicao) {
    slideAtual = (posicao + slides.length) % slides.length;   // dá a volta nas pontas
    trilho.style.transform = "translateX(-" + (slideAtual * 100) + "%)";
    pontos.forEach(function (ponto, i) {
      ponto.setAttribute("aria-current", String(i === slideAtual));
    });
  }

  document.getElementById("carrossel-anterior").addEventListener("click", function () {
    irParaSlide(slideAtual - 1);
  });
  document.getElementById("carrossel-proximo").addEventListener("click", function () {
    irParaSlide(slideAtual + 1);
  });

  // Passa sozinho a cada 5 segundos; para com o mouse em cima
  function iniciarCarrossel() {
    clearInterval(passarSozinho);
    passarSozinho = setInterval(function () {
      irParaSlide(slideAtual + 1);
    }, 5000);
  }
  carrossel.addEventListener("mouseenter", function () { clearInterval(passarSozinho); });
  carrossel.addEventListener("mouseleave", iniciarCarrossel);

  irParaSlide(0);
  iniciarCarrossel();
}
