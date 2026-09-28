// ----- Janela modal -----
const modal = document.getElementById("modal");
const btnAbrirModal = document.getElementById("btn-abrir-modal");

if (modal && btnAbrirModal) {
  btnAbrirModal.addEventListener("click", function () {
    modal.showModal();
  });

  // Fecha ao clicar fora da caixa
  modal.addEventListener("click", function (evento) {
    const caixa = modal.getBoundingClientRect();
    const clicouFora =
      evento.clientX < caixa.left || evento.clientX > caixa.right ||
      evento.clientY < caixa.top || evento.clientY > caixa.bottom;
    if (clicouFora) modal.close();
  });
}
