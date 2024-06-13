// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FormularioEnviado from './FormularioEnviado';
import './App.css'; // Certifique-se de ter o arquivo de estilo

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/formulario-enviado" element={<FormularioEnviado />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
