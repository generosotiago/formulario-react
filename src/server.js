const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Conexão com o MongoDB
const dbURI = 'mongodb+srv://tiagogeneroso47:VTwZjvGgcTrQ7dl7@formulario.98dkg0j.mongodb.net/?retryWrites=true&w=majority&appName=Formulario';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Definir o esquema e o modelo do Mongoose
const formDataSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  cpf: { type: String, required: true }
});

const FormData = mongoose.model('FormData', formDataSchema);

app.use(express.json());

// Endpoint para receber os dados do formulário
app.post('/api/formulario', async (req, res) => {
  const formData = new FormData(req.body);
  try {
    await formData.save();
    res.status(200).send({ message: 'Dados recebidos com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send({ message: 'Erro ao salvar os dados' });
  }
});

// Endpoint para buscar todos os dados
app.get('/api/dados', async (req, res) => {
  try {
    const dados = await FormData.find();
    res.status(200).json(dados);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    res.status(500).send({ message: 'Erro ao buscar os dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
