import React, { useState } from 'react';
import './App.css'; // Arquivo de estilo CSS

function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [opcao, setOpcao] = useState(''); // Estado para armazenar a opção selecionada
  const [cpfValido, setCpfValido] = useState(true); // Estado para controlar a validade do CPF
  const [modoEscuro, setModoEscuro] = useState(false); // Estado para controlar o modo escuro
  const [erroEnvio, setErroEnvio] = useState(null); // Estado para armazenar mensagens de erro de envio

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validarCPF(cpf)) {
      setCpfValido(false);
      return;
    }
    setCpfValido(true);

    // Dados do formulário
    const formData = {
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      cpf: cpf,
      opcao: opcao // Adicionando a opção selecionada ao objeto formData
    };

    try {
      // Enviar os dados para a API no Heroku
      const response = await fetch('http://localhost:3001/api/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        alert('Dados enviados com sucesso!');
        // Limpar campos do formulário após envio bem-sucedido
        setNome('');
        setEmail('');
        setDataNascimento('');
        setCpf('');
        setOpcao('');
      } else {
        const errorData = await response.json();
        setErroEnvio(errorData.message || 'Ocorreu um erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setErroEnvio('Ocorreu um erro ao enviar os dados.');
    }
  };

  // Função para validar CPF
  const validarCPF = (strCPF) => {
    // Implemente a função de validação do CPF aqui
    return true; // Retorno temporário
  };

  return (
    <div className={`container ${modoEscuro ? 'modo-escuro' : ''}`}>
      <div className="formulario-container">
        <h2>Formulário ADS SENAI - primeiro semestre - churrasco SEM DROGA</h2>
        {erroEnvio && <p className="mensagem-erro">{erroEnvio}</p>}
        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="input"
              required
            />
          </div>
          <div className="campo">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input"
              required
            />
          </div>
          <div className="campo">
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={dataNascimento}
              onChange={(event) => setDataNascimento(event.target.value)}
              className="input"
              required
            />
          </div>
          <div className="campo">
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              className={`input ${!cpfValido ? 'input-invalido' : ''}`}
              required
            />
            {!cpfValido && <p className="mensagem-erro">CPF inválido</p>}
          </div>
          <div className="campo">
            <select
              value={opcao}
              onChange={(event) => setOpcao(event.target.value)}
              className="input"
              required
            >
              <option value="">Escolha uma opção</option>
              <option value="Churrasco">Churrasco</option>
              <option value="Pedir comida">Pedir comida</option>
              <option value="Casa da cerveja">Casa da cerveja</option>
            </select>
          </div>
          <button type="submit" className="botao">
            Enviar
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={modoEscuro} onChange={() => setModoEscuro(!modoEscuro)} />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">{modoEscuro ? 'Modo Claro' : 'Modo Escuro'}</span>
      </div>
    </div>
  );
}

export default Formulario;
