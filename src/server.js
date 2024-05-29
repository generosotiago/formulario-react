const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors'); // Importe o middleware CORS

app.use(cors());

// Conexão com o MongoDB
const dbURI = "mongodb+srv://tiagogeneroso47:VTwZjvGgcTrQ7dl7@formulario.98dkg0j.mongodb.net/formulario?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o esquema e o modelo do Mongoose
const formDataSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  cpf: { type: String, required: true }
});

const FormData = mongoose.model('FormData', formDataSchema);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo à nossa aplicação!');
});

// Endpoint para receber os dados do formulário e salvar no MongoDB
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
