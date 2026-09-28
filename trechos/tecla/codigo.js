// ----- Qual tecla? -----
const campoTecla = document.getElementById("campo-tecla");

if (campoTecla) {
  const teclaInfo = document.getElementById("tecla-info");

  campoTecla.addEventListener("keydown", function (evento) {
    let texto = "Tecla: " + evento.key + " | Código: " + evento.code;
    if (evento.ctrlKey) texto += " | com Ctrl";
    if (evento.shiftKey) texto += " | com Shift";
    teclaInfo.textContent = texto;
  });
}
