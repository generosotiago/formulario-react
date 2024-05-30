
import React from 'react';
import './App.css';

function FormularioEnviado() {
  return (
    <div className="formularioenviado">
      <div className="check-animation">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <div className="textformularioenviado">
        <h1>Formulário Enviado com Sucesso!</h1>
        <p>Obrigado por enviar seus dados.</p>
      </div>
    </div>
  );
}

export default FormularioEnviado;
