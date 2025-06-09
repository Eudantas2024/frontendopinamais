import React from 'react';
import './Contato.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contato = () => {
  return (
    <div className="contato-container">
      <h1>Fale Conosco</h1>
      <p>Estamos à disposição para ouvir você. Entre em contato conosco pelos canais abaixo:</p>

      <div className="contato-info">
        <div className="contato-item">
          <FaEnvelope className="contato-icon" />
          <span>Email: </span>
          <a href="mailto:opinamais@email.com">opinamais@email.com</a>
        </div>

        <div className="contato-item">
          <FaPhoneAlt className="contato-icon" />
          <span>Telefone: </span>
          <span>(19) 99999-9999</span> {/* Telefone fictício */}
        </div>

        <div className="contato-item">
          <FaMapMarkerAlt className="contato-icon" />
          <span>Endereço: </span>
          <span>Rua Fictícia, 123 - Campinas/SP</span>
        </div>
      </div>
    </div>
  );
};

export default Contato;
