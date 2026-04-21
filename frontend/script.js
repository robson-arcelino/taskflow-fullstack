async function adicionar() {
  const input = document.getElementById("tarefa");
  const tarefa = input.value;

  await fetch("http://localhost:3000/tarefas", {
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
  const res = await fetch("http://localhost:3000/tarefas");
  const tarefas = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach(t => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.innerText = t.tarefa;

    const botao = document.createElement("button");
    botao.innerText = "❌";

    botao.onclick = async () => {
      await fetch(`http://localhost:3000/tarefas/${t.id}`, {
        method: "DELETE"
      });

      carregarTarefas();
    };

    li.appendChild(texto);
    li.appendChild(botao);

    lista.appendChild(li);
  });
}

// carregar ao abrir
carregarTarefas();

