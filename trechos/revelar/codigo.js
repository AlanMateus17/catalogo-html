// ----- Elementos que aparecem ao rolar -----
document.documentElement.classList.add("js");
const elementosRevelar = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
  // O "vigia" avisa quando um elemento entra na tela
  const vigiaRevelar = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        vigiaRevelar.unobserve(entrada.target);   // já apareceu, pode parar de vigiar
      }
    });
  }, { threshold: 0.15 });

  elementosRevelar.forEach(function (elemento) {
    vigiaRevelar.observe(elemento);
  });
} else {
  elementosRevelar.forEach(function (elemento) {
    elemento.classList.add("visivel");
  });
}
