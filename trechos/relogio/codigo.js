// ----- Relógio e data -----
const relogio = document.getElementById("relogio");
const dataHoje = document.getElementById("data-hoje");

if (relogio) {
  function atualizarRelogio() {
    const agora = new Date();
    relogio.textContent = agora.toLocaleTimeString("pt-BR");   // 14:05:09
    if (dataHoje) {
      dataHoje.textContent = agora.toLocaleDateString("pt-BR"); // 28/09/2026
    }
  }
  atualizarRelogio();                    // mostra já
  setInterval(atualizarRelogio, 1000);   // e repete a cada 1000 ms (1 segundo)
}
