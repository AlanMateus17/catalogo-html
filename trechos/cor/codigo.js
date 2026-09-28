// ----- Escolher cor -----
const escolherCor = document.getElementById("escolher-cor");

if (escolherCor) {
  const amostraCor = document.getElementById("amostra-cor");
  const codigoCor = document.getElementById("codigo-cor");

  escolherCor.addEventListener("input", function () {
    amostraCor.style.backgroundColor = escolherCor.value;   // no CSS é background-color
    codigoCor.textContent = escolherCor.value;
  });
}
