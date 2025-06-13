import React, { useEffect } from 'react';
import './Equipedev.css';
import { FaUsers } from 'react-icons/fa';

const Equipedev = () => {
  // Garante que a página role para o topo ao montar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container2">
      <div>
        <h1>Projeto Integrador Opina +</h1>
        <p>O Projeto Integrador Opina + , lê-se "opina mais" é o projeto de encerramento do curso Técnico de Informática do Senac Campinas em junho de 2025.</p>
        <div className='equipe-info'>
          <FaUsers className="equipe-icon" />
          <h3>Equipe</h3>
        </div>
        <p>Eudantas, Douglas, Simone e Felipe.</p>
      </div>
    </div>
  );
};

export default Equipedev;
