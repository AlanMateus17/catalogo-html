// ----- Quadro para desenhar -----
const quadro = document.getElementById("quadro");

if (quadro) {
  const pincel = quadro.getContext("2d");
  const corPincel = document.getElementById("cor-pincel");
  const espessuraPincel = document.getElementById("espessura-pincel");
  let desenhando = false;

  pincel.lineCap = "round";
  pincel.lineJoin = "round";

  // Converte a posição do mouse na tela para a posição dentro do desenho
  function posicaoNoQuadro(evento) {
    const caixa = quadro.getBoundingClientRect();
    return {
      x: (evento.clientX - caixa.left) * (quadro.width / caixa.width),
      y: (evento.clientY - caixa.top) * (quadro.height / caixa.height),
    };
  }

  quadro.addEventListener("pointerdown", function (evento) {
    desenhando = true;
    const p = posicaoNoQuadro(evento);
    pincel.beginPath();
    pincel.moveTo(p.x, p.y);
    quadro.setPointerCapture(evento.pointerId);
  });

  quadro.addEventListener("pointermove", function (evento) {
    if (!desenhando) return;
    const p = posicaoNoQuadro(evento);
    pincel.strokeStyle = corPincel.value;
    pincel.lineWidth = espessuraPincel.value;
    pincel.lineTo(p.x, p.y);
    pincel.stroke();
  });

  quadro.addEventListener("pointerup", function () { desenhando = false; });
  quadro.addEventListener("pointercancel", function () { desenhando = false; });

  document.getElementById("limpar-quadro").addEventListener("click", function () {
    pincel.clearRect(0, 0, quadro.width, quadro.height);
  });
}
