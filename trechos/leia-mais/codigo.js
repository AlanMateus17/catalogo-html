// ----- Leia mais -----
const btnLeiaMais = document.getElementById("btn-leia-mais");
const textoExtra = document.getElementById("texto-extra");

if (btnLeiaMais && textoExtra) {
  btnLeiaMais.addEventListener("click", function () {
    textoExtra.hidden = !textoExtra.hidden;   // inverte: escondido vira visível e vice-versa
    const aberto = !textoExtra.hidden;
    btnLeiaMais.textContent = aberto ? "Mostrar menos" : "Leia mais";
    btnLeiaMais.setAttribute("aria-expanded", String(aberto));
  });
}
