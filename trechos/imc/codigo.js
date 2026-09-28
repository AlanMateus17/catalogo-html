// ----- Calculadora de IMC -----
const formImc = document.getElementById("form-imc");

if (formImc) {
  const resultadoImc = document.getElementById("resultado-imc");

  formImc.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // .value é sempre TEXTO: Number() transforma em número
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);
    const imc = peso / (altura * altura);

    let classificacao;
    if (imc < 18.5) {
      classificacao = "abaixo do peso";
    } else if (imc < 25) {
      classificacao = "peso normal";
    } else if (imc < 30) {
      classificacao = "sobrepeso";
    } else {
      classificacao = "obesidade";
    }

    // toFixed(1) = uma casa decimal; replace troca o ponto pela vírgula
    resultadoImc.textContent = "IMC " + imc.toFixed(1).replace(".", ",") + ": " + classificacao + ".";
    resultadoImc.className = "resultado-calculo " + (classificacao === "peso normal" ? "ok" : "atencao");
  });
}
