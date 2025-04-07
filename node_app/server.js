const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bem-vindo à página principal!');
});

app.get('/demorado', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 70000));
  res.send('Tarefa demorada finalizada!');
});

app.get('/excecao', (req, res) => {
  throw new Error('Exceção gerada intencionalmente!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno: ' + err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
