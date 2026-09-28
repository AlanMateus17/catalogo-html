// ----- Botão de voltar ao topo -----
const btnVoltarTopo = document.getElementById("voltar-topo");

if (btnVoltarTopo) {
  window.addEventListener("scroll", function () {
    btnVoltarTopo.classList.toggle("visivel", window.scrollY > window.innerHeight);
  }, { passive: true });

  btnVoltarTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
