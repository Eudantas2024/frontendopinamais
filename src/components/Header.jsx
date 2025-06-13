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
    <nav className="main-header" aria-label="Main navigation">
      <div className="header-left">
        <Link to="/" className="logo-link" aria-label="Página inicial">
          <img className="logoopina" src="./logo6.svg" alt="Opina+ Logo" />
        </Link>
      </div>

      {/* Descomente para ativar a busca */}
      {/* <div className="header-center">
        <BuscaEmpresa />
      </div> */}

      <div className="header-right">
        <Link to="/" className="nav-link"><FaHome aria-hidden="true" /> Início</Link>
        <Link to="/blog" className="nav-link"><FaBook aria-hidden="true" /> Quem Somos</Link>
        <Link to="/reclamacoes" className="nav-link"><FaBullhorn aria-hidden="true" /> Feedbacks</Link>

        {!userType ? (
          <>
            <Link to="/login" className="nav-link"><FaSignInAlt aria-hidden="true" /> Login</Link>
            <Link to="/cadastro" className="nav-link"><FaUserPlus aria-hidden="true" /> Cadastro</Link>
          </>
        ) : (
          <>
            {userType === 'cliente' && (
              <>
                <Link to="/novo-feedback" className="nav-link"><FaPlusCircle aria-hidden="true" /> Criar novo</Link>
                <Link to="/meus-feedbacks" className="nav-link"><FaCommentDots aria-hidden="true" /> Minha Área</Link>
              </>
            )}
            {userType === 'empresa' && (
              <Link to="/painel-empresa" className="nav-link"><FaChartBar aria-hidden="true" /> Painel da Empresa</Link>
            )}
            <button type="button" onClick={handleLogoutClick} className="nav-button" aria-label="Sair da aplicação">
              <FaSignOutAlt aria-hidden="true" /> Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
