// ----- Tema escuro -----
const btnTema = document.getElementById("btn-tema");

function aplicarTema(tema) {
  if (tema === "escuro") {
    document.documentElement.setAttribute("data-tema", "escuro");
  } else {
    document.documentElement.removeAttribute("data-tema");
  }
  if (btnTema) {
    btnTema.setAttribute("aria-pressed", String(tema === "escuro"));
    document.getElementById("btn-tema-texto").textContent = tema === "escuro" ? "Tema claro" : "Tema escuro";
  }
}

// Ao abrir a página, usa o tema que ficou salvo
let temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (erro) {}
if (temaSalvo) {
  aplicarTema(temaSalvo);
}

if (btnTema) {
  btnTema.addEventListener("click", function () {
    const estaEscuro = document.documentElement.getAttribute("data-tema") === "escuro";
    const novoTema = estaEscuro ? "claro" : "escuro";
    aplicarTema(novoTema);
    try {
      localStorage.setItem("tema", novoTema);   // guarda para a próxima visita
    } catch (erro) {}
  });
}
