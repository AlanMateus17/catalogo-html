// ----- Lista de tarefas -----
const formTarefa = document.getElementById("form-tarefa");

if (formTarefa) {
  const campoTarefa = document.getElementById("nova-tarefa");
  const listaTarefas = document.getElementById("lista-tarefas");
  const modeloTarefa = document.getElementById("modelo-tarefa");
  const tarefasRestantes = document.getElementById("tarefas-restantes");

  // Carrega as tarefas salvas (o localStorage guarda texto; JSON transforma em lista)
  let tarefas = [];
  try {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  } catch (erro) {
    tarefas = [];
  }

  function salvarTarefas() {
    try {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    } catch (erro) {}
  }

  function desenharTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {
      const item = modeloTarefa.content.firstElementChild.cloneNode(true);
      const check = item.querySelector(".tarefa-check");

      item.querySelector(".tarefa-texto").textContent = tarefa.texto;   // textContent: seguro
      check.checked = tarefa.feita;

      check.addEventListener("change", function () {
        tarefas[indice].feita = check.checked;
        salvarTarefas();
        contarPendentes();
      });

      item.querySelector(".tarefa-remover").addEventListener("click", function () {
        tarefas.splice(indice, 1);   // remove 1 item na posição indice
        salvarTarefas();
        desenharTarefas();
      });

      listaTarefas.appendChild(item);
    });

    contarPendentes();
  }

  function contarPendentes() {
    const pendentes = tarefas.filter(function (t) { return !t.feita; }).length;
    if (tarefas.length === 0) {
      tarefasRestantes.textContent = "Nenhuma tarefa.";
    } else if (pendentes === 0) {
      tarefasRestantes.textContent = "Tudo feito!";
    } else {
      tarefasRestantes.textContent = pendentes + (pendentes === 1 ? " tarefa pendente" : " tarefas pendentes");
    }
  }

  formTarefa.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const texto = campoTarefa.value.trim();
    if (texto === "") return;

    tarefas.push({ texto: texto, feita: false });
    salvarTarefas();
    desenharTarefas();
    campoTarefa.value = "";
    campoTarefa.focus();
  });

  desenharTarefas();
}
