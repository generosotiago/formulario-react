import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './FormularioEnviado.js';
import FormularioEnviado from './FormularioEnviado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/formulario-enviado" element={<FormularioEnviado />} />
      </Routes>
    </Router>
  );
}

export default App;