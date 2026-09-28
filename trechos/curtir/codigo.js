// ----- Botão curtir -----
const btnCurtir = document.getElementById("btn-curtir");

if (btnCurtir) {
  btnCurtir.addEventListener("click", function () {
    // toggle devolve true se colocou a classe, false se tirou
    const curtido = btnCurtir.classList.toggle("curtido");
    document.getElementById("curtir-texto").textContent = curtido ? "Curtido!" : "Curtir";
    btnCurtir.setAttribute("aria-pressed", String(curtido));
  });
}
