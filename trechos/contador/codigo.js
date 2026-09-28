// ----- Contador -----
const contadorValor = document.getElementById("contador-valor");

if (contadorValor) {
  let contagem = 0;

  function atualizarContador() {
    contadorValor.textContent = contagem;
    contadorValor.classList.toggle("negativo", contagem < 0);
  }

  document.getElementById("btn-mais").addEventListener("click", function () {
    contagem++;
    atualizarContador();
  });
  document.getElementById("btn-menos").addEventListener("click", function () {
    contagem--;
    atualizarContador();
  });
  document.getElementById("btn-zerar").addEventListener("click", function () {
    contagem = 0;
    atualizarContador();
  });
}
