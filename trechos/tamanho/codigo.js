// ----- Tamanho da letra -----
const tamanhoTexto = document.getElementById("tamanho-texto");

if (tamanhoTexto) {
  const saidaTamanho = document.getElementById("saida-tamanho");
  const textoTamanho = document.getElementById("texto-tamanho");

  tamanhoTexto.addEventListener("input", function () {
    saidaTamanho.textContent = tamanhoTexto.value;
    textoTamanho.style.fontSize = tamanhoTexto.value + "px";   // precisa da unidade
  });
}
