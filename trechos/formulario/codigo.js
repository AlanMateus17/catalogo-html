// ----- Formulário de contato -----
const formContato = document.getElementById("form-contato");

if (formContato) {
  const campoMensagemContato = document.getElementById("contato-mensagem");
  const contadorContato = document.getElementById("contato-contador");
  const respostaContato = document.getElementById("contato-resposta");
  const limiteContato = campoMensagemContato.maxLength;

  // Conta os caracteres enquanto a pessoa digita
  campoMensagemContato.addEventListener("input", function () {
    contadorContato.textContent = campoMensagemContato.value.length + " de " + limiteContato + " caracteres";
  });

  // Só dispara se todos os campos estiverem válidos
  formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();   // não recarrega a página

    const dados = new FormData(formContato);   // lê os campos pelo atributo name
    respostaContato.textContent = "Obrigado, " + dados.get("nome") + "! Recebemos a sua mensagem.";
    respostaContato.hidden = false;

    formContato.reset();       // limpa os campos
    contadorContato.textContent = "0 de " + limiteContato + " caracteres";
  });
}
