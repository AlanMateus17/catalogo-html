// ----- Galeria que amplia ao clicar -----
const itensGaleria = document.querySelectorAll(".galeria-item");
const lightbox = document.getElementById("lightbox");

if (lightbox && itensGaleria.length > 0) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxLegenda = document.getElementById("lightbox-legenda");
  let fotoAtual = 0;

  function mostrarFoto(posicao) {
    // Dá a volta: antes da primeira vem a última, e vice-versa
    fotoAtual = (posicao + itensGaleria.length) % itensGaleria.length;
    const item = itensGaleria[fotoAtual];
    lightboxImg.src = item.dataset.grande;
    lightboxImg.alt = item.dataset.legenda;
    lightboxLegenda.textContent = item.dataset.legenda + " (" + (fotoAtual + 1) + " de " + itensGaleria.length + ")";
  }

  itensGaleria.forEach(function (item, posicao) {
    item.addEventListener("click", function () {
      mostrarFoto(posicao);
      lightbox.showModal();   // abre a janela por cima da página
    });
  });

  document.getElementById("lightbox-anterior").addEventListener("click", function () {
    mostrarFoto(fotoAtual - 1);
  });
  document.getElementById("lightbox-proximo").addEventListener("click", function () {
    mostrarFoto(fotoAtual + 1);
  });
  document.getElementById("lightbox-fechar").addEventListener("click", function () {
    lightbox.close();
  });

  // Setas do teclado trocam a foto (o Esc o <dialog> já fecha sozinho)
  lightbox.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
    if (evento.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
  });

  // Clicar no fundo escuro fecha
  lightbox.addEventListener("click", function (evento) {
    if (evento.target === lightbox) lightbox.close();
  });
}
