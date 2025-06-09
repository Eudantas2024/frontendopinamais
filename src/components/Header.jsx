import React from 'react';
import './Header.css';
import BuscaEmpresa from '../components/BuscaEmpresa';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser, FaBuilding, FaPlusCircle, FaBook, FaCog, FaHome,
  FaSignInAlt, FaUserPlus, FaLock, FaSignOutAlt, FaCommentDots, FaChartBar, FaBullhorn
} from 'react-icons/fa';

const Header = ({ userType, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="main-header">
  {/* Bloco da Esquerda - Logo */}
  <div className="header-left">
    <Link to="/" className="logo-link">
      <img className="logoopina" src="./public/logo6.svg" alt="Opina+ Logo" />
    </Link>
  </div>

  {/* Bloco Central - Busca */}
  {/* <div className="header-center">
    <BuscaEmpresa />
  </div> */}

  {/* Bloco da Direita - Navegação */}
  <div className="header-right">
    <Link to="/" className="nav-link"><FaHome /> Início</Link>
    <Link to="/blog" className="nav-link"><FaBook /> Quem Somos</Link>
    <Link to="/reclamacoes" className="nav-link"><FaBullhorn /> Feedbacks</Link>

    {!userType ? (
      <>
        <Link to="/login" className="nav-link"><FaSignInAlt /> Login</Link>
        <Link to="/cadastro" className="nav-link"><FaUserPlus /> Cadastro</Link>
        
      </>
    ) : (
      <>
        {userType === 'cliente' && (
          <>
            <Link to="/novo-feedback" className="nav-link"><FaPlusCircle /> Criar novo</Link>
            <Link to="/meus-feedbacks" className="nav-link"><FaCommentDots /> Minha Área</Link>
          </>
        )}
        {userType === 'empresa' && (
          <Link to="/painel-empresa" className="nav-link"><FaChartBar /> Painel da Empresa</Link>
        )}
        <button onClick={handleLogoutClick} className="nav-button"><FaSignOutAlt /> Sair</button>
      </>
    )}
  </div>
</nav>

  );
};

export default Header;
