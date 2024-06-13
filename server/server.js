// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Configuração do CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/myLocalDb";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definição do Schema e Model
const formDataSchema = new mongoose.Schema({
  nome: { type: String, required: false },
  email: { type: String, required: false },
  dataNascimento: { type: Date, required: false },
  cpf: { type: String, required: false }
});
const FormData = mongoose.model('FormData', formDataSchema);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo à nossa aplicação!');
});

// Rota para salvar dados do formulário
app.post('/api/formulario', async (req, res) => {
  const formData = new FormData(req.body);
  try {
    await formData.save();
    res.status(200).send({ message: 'Dados recebidos com sucesso e salvos no MongoDB Atlas!' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send({ message: 'Erro ao salvar os dados no MongoDB Atlas' });
  }
});

// Servir arquivos estáticos da aplicação React em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
