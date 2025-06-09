// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaComments, FaHandshake, FaChartLine, FaBullhorn, FaUserPlus, FaBuilding } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [buscaEmpresa, setBuscaEmpresa] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuscaEmpresa = (e) => {
    e.preventDefault();
    if (buscaEmpresa.trim()) {
      navigate(`/reclamacoes?busca=${encodeURIComponent(buscaEmpresa.trim())}`);
    }
  };

  return (
    <div className="home-container">
      <div className="busca-empresa-flutuante">
        <form onSubmit={handleBuscaEmpresa}>
          <input
            type="text"
            placeholder="Pesquise uma Empresa aqui..."
            value={buscaEmpresa}
            onChange={(e) => setBuscaEmpresa(e.target.value)}
            className="input-busca-empresa"
          />
          <button type="submit" className="botao-ir" disabled={!buscaEmpresa.trim()}>
            Ir
          </button>
        </form>
      </div>
      {/* Seção 1: Banner de Boas-Vindas */}
      <section className="hero-section">
        <div className="hero-content">
          <img src={'/public/logo6.svg'} alt="Logo Opina+" className="logo11" />
          <p className="slogan">Sua voz importa. Conectando clientes e empresas para um futuro melhor.</p>
          <div className="cta-buttons">
            <Link to="/cadastro" className="btn-cta primary">
              <FaUserPlus /> Cadastre-se como Cliente
            </Link>
            <Link to="/cadastro-empresa" className="btn-cta secondary">
              <FaBuilding /> Cadastre minha Empresa
            </Link>
          </div>
        </div>
      </section>

      {/* Seção 2: Como Funciona / Nossos Benefícios */}
      <section className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-card">
            <FaComments className="benefit-icon" />
            <h3>Veja o que os consumidores tem registrado por aqui</h3><br /><br />
            <Link to="/reclamacoes" className="btn-cta primary">
              <FaBullhorn /> Clique aqui para ir para Últimas Publicações
            </Link>
          </div>
        </div>
      </section>

      {/* Seção 2: Como Funciona / Nossos Benefícios */}
      <section className="benefits-section">
        <h2>Por que usar o Opina+?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <FaComments className="benefit-icon" />
            <h3>Sua Voz Amplificada</h3>
            <p>Envie seus feedbacks diretamente às empresas e seja ouvido.</p>
          </div>
          <div className="benefit-card">
            <FaHandshake className="benefit-icon" />
            <h3>Conecte-se com Marcas</h3>
            <p>Empresas dispostas a ouvir e melhorar seus serviços e produtos.</p>
          </div>
          <div className="benefit-card">
            <FaChartLine className="benefit-icon" />
            <h3>Melhoria Contínua</h3>
            <p>Ajude empresas a crescer e desfrute de experiências cada vez melhores.</p>
          </div>
        </div>
      </section>

      {/* Seção 3: Chamada para Ação OTIMIZADA */}
      <section className="cta-bottom-section">
        <div className="cta-card">
          <h3>É Cliente? Sua Opinião Vale muito!</h3>
          <p>Faça login para compartilhar suas experiências ou crie sua conta agora.</p>
          <div className="cta-card-buttons">
            <Link to="/login" className="btn-cta primary">
              <FaUserPlus /> Fazer Login
            </Link>
            <Link to="/cadastro" className="btn-cta tertiary">
              <FaUserPlus /> Criar Conta Cliente
            </Link>
          </div>
        </div>
        <div className="cta-card">
          <h3>É Empresa? Conecte-se com Seus Clientes!</h3>
          <p>Cadastre sua empresa para receber e gerenciar feedbacks de forma eficiente.</p>
          <Link to="/cadastro-empresa" className="btn-cta primary">
            <FaBuilding /> Cadastrar Minha Empresa
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
