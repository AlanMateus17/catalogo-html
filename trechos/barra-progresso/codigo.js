// ----- Barra de progresso da leitura -----
const barraProgresso = document.getElementById("barra-progresso");

if (barraProgresso) {
  window.addEventListener("scroll", function () {
    const totalRolavel = document.documentElement.scrollHeight - window.innerHeight;
    const porcentagem = totalRolavel > 0 ? (window.scrollY / totalRolavel) * 100 : 0;
    barraProgresso.style.width = porcentagem + "%";
  }, { passive: true });
}
