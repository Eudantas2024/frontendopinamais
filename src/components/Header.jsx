import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser, FaBuilding, FaPlusCircle, FaBook, FaCog, FaHome,
  FaSignInAlt, FaUserPlus, FaLock, FaSignOutAlt, FaCommentDots, FaChartBar, FaBullhorn
} from 'react-icons/fa';

const Header = ({ userType, onLogout }) => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    setMenuAberto(false); // Fecha o menu após logout
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const closeMenu = () => setMenuAberto(false); // Fecha o menu após clicar em um link

  return (
    <nav className="main-header" aria-label="Main navigation">
      <div className="header-bar">
        <Link to="/" className="logo-link" onClick={closeMenu} aria-label="Página inicial">
          <img className="logoopina" src="./logo6.svg" alt="Opina+ Logo" />
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menu">
          ☰
        </button>
      </div>

      <div className={`header-right nav-links ${menuAberto ? 'ativo' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}><FaHome /> Início</Link>
        <Link to="/blog" className="nav-link" onClick={closeMenu}><FaBook /> Quem Somos</Link>
        <Link to="/reclamacoes" className="nav-link" onClick={closeMenu}><FaBullhorn /> Feedbacks</Link>

        {!userType ? (
          <>
            <Link to="/login" className="nav-link" onClick={closeMenu}><FaSignInAlt /> Login</Link>
            <Link to="/cadastro" className="nav-link" onClick={closeMenu}><FaUserPlus /> Cadastro</Link>
          </>
        ) : (
          <>
            {userType === 'cliente' && (
              <>
                <Link to="/novo-feedback" className="nav-link" onClick={closeMenu}><FaPlusCircle /> Criar novo</Link>
                <Link to="/meus-feedbacks" className="nav-link" onClick={closeMenu}><FaCommentDots /> Minha Área</Link>
              </>
            )}
            {userType === 'empresa' && (
              <Link to="/painel-empresa" className="nav-link" onClick={closeMenu}><FaChartBar /> Painel da Empresa</Link>
            )}
            <button type="button" onClick={handleLogoutClick} className="nav-button">
              <FaSignOutAlt /> Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
