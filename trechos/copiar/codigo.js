// ----- Aviso rápido (toast): use mostrarAviso("texto") em qualquer lugar -----
let temporizadorAviso;
function mostrarAviso(mensagem) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(function () {
    toast.classList.remove("visivel");
  }, 2500);   // some depois de 2,5 segundos
}

// ----- Botão de copiar -----
const btnCopiar = document.getElementById("btn-copiar");

if (btnCopiar) {
  btnCopiar.addEventListener("click", function () {
    const texto = document.getElementById("texto-copiar").textContent;

    navigator.clipboard.writeText(texto)
      .then(function () {
        mostrarAviso("Copiado! Cole com Ctrl + V.");
      })
      .catch(function () {
        mostrarAviso("Não deu para copiar. Selecione o texto e use Ctrl + C.");
      });
  });
}
