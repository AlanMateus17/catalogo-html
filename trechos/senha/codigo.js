// ----- Senha: mostrar/esconder e confirmação -----
const formSenha = document.getElementById("form-senha");

if (formSenha) {
  const senhaNova = document.getElementById("senha-nova");
  const senhaConfirma = document.getElementById("senha-confirma");
  const btnMostrarSenha = document.getElementById("btn-mostrar-senha");
  const senhaResposta = document.getElementById("senha-resposta");

  btnMostrarSenha.addEventListener("click", function () {
    const escondida = senhaNova.type === "password";
    senhaNova.type = escondida ? "text" : "password";
    btnMostrarSenha.textContent = escondida ? "Esconder" : "Mostrar";
    btnMostrarSenha.setAttribute("aria-pressed", String(escondida));
  });

  // Marca a confirmação como inválida enquanto for diferente da senha
  function conferirSenhas() {
    if (senhaConfirma.value !== senhaNova.value) {
      senhaConfirma.setCustomValidity("As senhas não são iguais.");
    } else {
      senhaConfirma.setCustomValidity("");
    }
  }
  senhaNova.addEventListener("input", conferirSenhas);
  senhaConfirma.addEventListener("input", conferirSenhas);

  formSenha.addEventListener("submit", function (evento) {
    evento.preventDefault();
    senhaResposta.hidden = false;
  });
}
