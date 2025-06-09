import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaLock,
  FaHome,
  FaBook,
  FaBullhorn
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
      {/* Bloco Esquerdo - Logo */}
      <div className="footer-left">
        <Link to="/" className="logo-link">
          <img className="logoopina" src="./public/logo6.svg" alt="Opina+ Logo" />
        </Link>
        <p>© {new Date().getFullYear()} Opina+ <br /> Todos os direitos reservados.</p>
      </div>

      {/* Bloco Central - Links úteis */}
      <div className="footer-center">
        <Link to="/" className="footer-link"><FaHome /> Início</Link>
        <Link to="/blog" className="footer-link"><FaBook /> Quem Somos</Link>
        <Link to="/reclamacoes" className="footer-link"><FaBullhorn /> Feedbacks</Link>
        <Link to="/contato" className="footer-link"><FaEnvelope /> Contato</Link>
        
      </div>

      {/* Bloco Direito - Redes Sociais em linha */}
      {/* Bloco Direito - Redes Sociais em linha */}
      <div className="footer-right">
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="social-icon"><FaWhatsapp /></a>
        </div><br />
        <Link to="/admin" className="nav-link"><FaLock />  Acesso Administrativo </Link>
      </div>

    </footer>
  );
};

export default Footer;
