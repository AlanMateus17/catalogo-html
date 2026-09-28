// ----- Frase aleatória -----
const btnFrase = document.getElementById("btn-frase");

if (btnFrase) {
  const frase = document.getElementById("frase");

  // Troque pelas suas frases (quantas quiser)
  const frases = [
    "Primeira frase.",
    "Segunda frase.",
    "Terceira frase.",
    "Quarta frase.",
  ];
  let ultimaFrase = -1;

  btnFrase.addEventListener("click", function () {
    let sorteio;
    do {
      sorteio = Math.floor(Math.random() * frases.length);   // 0 até frases.length - 1
    } while (sorteio === ultimaFrase && frases.length > 1);  // não repete a anterior
    ultimaFrase = sorteio;
    frase.textContent = frases[sorteio];
  });
}
