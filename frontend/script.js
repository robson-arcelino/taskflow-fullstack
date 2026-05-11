console.log("script carregado");
async function adicionar() {
  const input = document.getElementById("tarefa");
 const tarefa = input.value;

 if (!tarefa.trim()) return;

   await fetch("https://taskflow-fullstack-821i.onrender.com/tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tarefa })
  });

  input.value = "";
  carregarTarefas();
}

async function carregarTarefas() {
const res = await fetch("https://taskflow-fullstack-821i.onrender.com/tarefas");
const dados = await res.json();
const tarefas = Array.isArray(dados) ? dados : (dados.tarefas || []);


const vazio = document.getElementById("vazio");

if (tarefas.length === 0) {
  vazio.style.display = "block";
} else {
  vazio.style.display = "none";
}
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach(tarefa => {
  const li = document.createElement("li");
 li.style.display = "flex";
 li.style.alignItems = "center";
 li.style.justifyContent = "space-between";
 li.style.padding = "10px";
 li.style.borderRadius = "8px";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarefa.concluida || false;

  checkbox.onchange = async () => {
    await fetch(`https://taskflow-fullstack-821i.onrender.com/tarefas/${tarefa.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tarefa: tarefa.tarefa,
        concluida: checkbox.checked
      })
    });

    carregarTarefas();
  };

  const texto = document.createElement("span");
  texto.innerText = tarefa.tarefa;//

  texto.onclick = () => {
    const novoTexto = prompt("Editar tarefa:", tarefa.tarefa);
    if (novoTexto) atualizarTarefa(tarefa.id, novoTexto);
  };

  const botao = document.createElement("button");
  botao.innerText = "X";

  botao.onclick = async () => {
    await fetch(`https://taskflow-fullstack-821i.onrender.com/tarefas/${tarefa.id}`, {
      method: "DELETE"
    });

    carregarTarefas();
  };

  // 
  li.style.display = "flex";
li.style.alignItems = "center";
li.style.justifyContent = "space-between";

const esquerda = document.createElement("div");
esquerda.style.display = "flex";
esquerda.style.alignItems = "center";
esquerda.style.gap = "10px";

esquerda.appendChild(checkbox);
esquerda.appendChild(texto);

li.appendChild(esquerda);
li.appendChild(botao);

  lista.appendChild(li);
});
} // 