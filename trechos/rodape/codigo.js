// Ano atual no rodapé
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}
