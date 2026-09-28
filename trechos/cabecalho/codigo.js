// ----- Cabeçalho: menu do celular, encolher ao rolar e link ativo -----
const btnMenu = document.getElementById("btn-menu");
const menuLista = document.getElementById("menu-principal");
const cabecalho = document.getElementById("cabecalho");

if (btnMenu && menuLista) {
  // Abre e fecha o menu no celular
  btnMenu.addEventListener("click", function () {
    const abriu = menuLista.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", String(abriu));
  });

  // Fecha o menu ao clicar num link
  menuLista.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menuLista.classList.remove("aberto");
      btnMenu.setAttribute("aria-expanded", "false");
    });
  });
}

// Encolhe o cabeçalho depois de rolar 60px
if (cabecalho) {
  window.addEventListener("scroll", function () {
    cabecalho.classList.toggle("encolhido", window.scrollY > 60);
  }, { passive: true });
}

// Marca no menu a seção que está na tela
const linksDoMenu = document.querySelectorAll('.menu-lista a[href^="#"]');
if (linksDoMenu.length > 0 && "IntersectionObserver" in window) {
  const vigiaSecoes = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      linksDoMenu.forEach(function (link) {
        link.classList.toggle("ativo", link.getAttribute("href") === "#" + entrada.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("section[id]").forEach(function (secao) {
    vigiaSecoes.observe(secao);
  });
}
