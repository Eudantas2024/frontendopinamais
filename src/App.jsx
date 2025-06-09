import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Importações dos seus componentes de página
import Login from './pages/Login';
import PainelCliente from './pages/ClientePainel';
import DashboardEmpresa from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Cadastro from './pages/Cadastro'; // Cadastro de Cliente
import FormularioFeedback from './pages/FormularioFeedback';
import CadastroEmpresa from './pages/CadastroEmpresa'; // Cadastro de Empresa
import AdminLogin from './pages/AdminLogin'; // Login do Administrador
import PainelAdmin from './pages/PainelAdmin'; // Painel do Administrador
import Home from './pages/Home'; // Página inicial
import UltimasReclamacoes from './pages/UltimasReclamacoes'; // Página para listar reclamações aprovadas
import Blog from './pages/Blog'; // Página "Quem Somos"
import Contato from './pages/Contato'; // ✅ Página de Contato

// Componente para proteger rotas de cliente
const VerificarCliente = ({ userType, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userType || userType !== 'cliente') {
      navigate('/login'); // Redireciona se não for cliente
    }
  }, [userType, navigate]);

  return userType === 'cliente' ? children : null;
};

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  const handleLoginSuccess = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    setUserType(null);
  };

  return (
    <Router>
      <Header userType={userType} onLogout={handleLogout} />

      <Routes>
        {/* Página Inicial */}
        <Route path="/" element={<Home />} />

        {/* Autenticação */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />

        {/* Login do Administrador */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Painel do Administrador */}
        <Route path="/paineladmin" element={<PainelAdmin />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />

        {/* ✅ Página de Contato */}
        <Route path="/contato" element={<Contato />} />

        {/* Página pública: últimas reclamações aprovadas */}
        <Route path="/reclamacoes" element={<UltimasReclamacoes />} />

        {/* Rotas protegidas para clientes */}
        <Route
          path="/novo-feedback"
          element={
            <VerificarCliente userType={userType}>
              <FormularioFeedback />
            </VerificarCliente>
          }
        />
        <Route
          path="/meus-feedbacks"
          element={
            <VerificarCliente userType={userType}>
              <PainelCliente />
            </VerificarCliente>
          }
        />

        {/* Painel da empresa - apenas se logado como empresa */}
        {userType === 'empresa' && (
          <Route path="/painel-empresa" element={<DashboardEmpresa />} />
        )}

        {/* Página 404 - rota não encontrada */}
        <Route
          path="*"
          element={
            <div style={{ padding: '50px', textAlign: 'center', fontSize: '1.5em', color: '#dc3545' }}>
              <h2>404 - Página Não Encontrada</h2>
              <p>A URL que você tentou acessar não existe.</p>
            </div>
          }
        />
      </Routes>

      <Footer userType={userType} onLogout={handleLogout} />
    </Router>
  );
}

export default App;
