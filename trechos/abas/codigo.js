// ----- Abas -----
const abas = document.querySelectorAll(".aba");

if (abas.length > 0) {
  function ativarAba(abaEscolhida) {
    // Desativa todas...
    abas.forEach(function (aba) {
      aba.setAttribute("aria-selected", "false");
      aba.setAttribute("tabindex", "-1");
      document.getElementById(aba.dataset.aba).hidden = true;
    });
    // ...e ativa só a escolhida
    abaEscolhida.setAttribute("aria-selected", "true");
    abaEscolhida.removeAttribute("tabindex");
    document.getElementById(abaEscolhida.dataset.aba).hidden = false;
  }

  abas.forEach(function (aba, posicao) {
    aba.addEventListener("click", function () {
      ativarAba(aba);
    });

    aba.addEventListener("keydown", function (evento) {
      let nova;
      if (evento.key === "ArrowRight") nova = abas[(posicao + 1) % abas.length];
      if (evento.key === "ArrowLeft") nova = abas[(posicao - 1 + abas.length) % abas.length];
      if (nova) {
        ativarAba(nova);
        nova.focus();
      }
    });
  });
}
