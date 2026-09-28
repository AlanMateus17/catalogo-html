// ----- Busca que filtra uma lista -----
const filtroBusca = document.getElementById("filtro-busca");

if (filtroBusca) {
  const itensFiltro = document.querySelectorAll("#lista-filtro li");
  const filtroContagem = document.getElementById("filtro-contagem");

  filtroBusca.addEventListener("input", function () {
    const termo = filtroBusca.value.toLowerCase().trim();
    let visiveis = 0;

    itensFiltro.forEach(function (item) {
      const combina = item.textContent.toLowerCase().includes(termo);
      item.hidden = !combina;
      if (combina) visiveis++;
    });

    filtroContagem.textContent = visiveis === 0
      ? "Nada encontrado."
      : visiveis + (visiveis === 1 ? " item" : " itens");
  });
}
