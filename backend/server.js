const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

// banco fake
let tarefas = [];

// criar tarefa
app.post("/tarefas", (req, res) => {
  const { tarefa } = req.body;

  const nova = {
    id: Date.now(),
    tarefa,
    status: "pendente"
  };

  tarefas.push(nova);

  res.json(nova);
});

// listar tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// deletar tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  tarefas = tarefas.filter(t => t.id !== id);

  res.json({ mensagem: "Deletado" });
});

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});