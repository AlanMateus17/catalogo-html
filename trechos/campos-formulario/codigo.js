// ----- Formulário com todos os tipos de campo -----
const formCompleto = document.getElementById("form-completo");

if (formCompleto) {
  const fcNivel = document.getElementById("fc-nivel");
  const fcNivelValor = document.getElementById("fc-nivel-valor");
  const fcResultado = document.getElementById("fc-resultado");

  // Mostra o número do controle deslizante enquanto arrasta
  fcNivel.addEventListener("input", function () {
    fcNivelValor.textContent = fcNivel.value;
  });

  formCompleto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Junta os dados pelo name; checkbox com o mesmo name pode ter vários valores
    const dados = new FormData(formCompleto);
    const linhas = [];
    for (const [nome, valor] of dados) {
      const texto = valor instanceof File ? valor.name : valor;   // arquivo: só o nome
      if (texto !== "") linhas.push(nome + ": " + texto);
    }

    fcResultado.textContent = "Dados que seriam enviados:\n" + linhas.join("\n");
    fcResultado.hidden = false;
  });

  formCompleto.addEventListener("reset", function () {
    fcResultado.hidden = true;
    fcNivelValor.textContent = "5";
  });
}
