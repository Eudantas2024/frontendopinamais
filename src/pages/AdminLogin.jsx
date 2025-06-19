import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Reutilizando o CSS do Cadastro
import API_URL from '../services/api'; // ajuste o caminho se necessário


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [mensagemCor, setMensagemCor] = useState('');
  const navigate = useNavigate();

  // Faz a página iniciar no topo ao montar o componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        setMensagem("Login realizado com sucesso! Redirecionando...");
        setMensagemCor("green");

        setTimeout(() => {
          navigate("/paineladmin");
        }, 1500);
      } else {
        setMensagem(data.error || "Erro no login.");
        setMensagemCor("red");
      }
    } catch (error) {
      setMensagem("Erro na conexão com o servidor.");
      setMensagemCor("red");
    }
  };

  return (
    <div className="cadastro-container2">
      <h2>🔐 Login do Administrador</h2>

      {mensagem && (
        <p className={`mensagem ${mensagemCor === 'green' ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@email.com"
          required
        />

        <label htmlFor="senha">Senha:</label>
        <div className="senha-container2">
          <input
            id="senha"
            type={mostrarSenha ? 'text' : 'password'}
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
          <button
            type="button"
            className="mostrar-senha-btn"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {mostrarSenha ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" className="btn-entrar">Entrar</button>
      </form>
      <button
        type="button"
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Clique aqui para voltar para a página inicial
      </button>


    </div>
  );
};

export default AdminLogin;
