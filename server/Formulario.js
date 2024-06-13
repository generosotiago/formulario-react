import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormularioEnviado from './FormularioEnviado';

function FormularioRota() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/formulario-enviado" element={<FormularioEnviado />} />
      </Routes>
    </Router>
  );
}

export default FormularioRota;