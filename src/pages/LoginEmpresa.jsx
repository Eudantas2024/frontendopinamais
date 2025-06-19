// src/pages/Login.jsx
import { useState } from 'react';
import './LoginEmpresa.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding } from 'react-icons/fa';
import API_URL from '../services/api';


function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [tipoLogin, setTipoLogin] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.email.includes('@')) return 'E-mail inválido.';
    if (!form.senha.trim()) return 'Senha obrigatória.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroValidacao = validar();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    try {
      const rota = tipoLogin === 'cliente'
      ? `${API_URL}/api/consumidor/login`
      : `${API_URL}/api/empresa/login`;
    
    

      const resposta = await fetch(rota, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.error || 'Erro ao fazer login.');
      }

      // Se login for bem-sucedido
      setSucesso(true);
      setErro('');

      // Armazena token e tipo de usuário
      localStorage.setItem('token', resultado.token); // JWT
      localStorage.setItem('userType', tipoLogin);

      if (onLoginSuccess) {
        onLoginSuccess(tipoLogin);
      }

      // Redireciona após pequeno atraso
      setTimeout(() => {
        if (tipoLogin === 'cliente') {
          navigate('/novo-feedback');
        } else {
          navigate('/painel-empresa');
        }
      }, 1500);

    } catch (err) {
      setErro(err.message || 'Erro inesperado.');
      setSucesso(false);
    }
  };

  if (!tipoLogin) {
    return (
      <div className="login-container tipo-selecao">
        <h2>Seja bem-vindo(a) ao Opina+!</h2>
        <p>Escolha como deseja fazer login:</p>
        <div className="opcoes-login">
          <button className="opcao-btn cliente" onClick={() => setTipoLogin('cliente')}>
            <FaUser className="opcao-icon" />
            Entrar como Cliente
          </button>
          <button className="opcao-btn empresa" onClick={() => setTipoLogin('empresa')}>
            <FaBuilding className="opcao-icon" />
            Entrar como Empresa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>🔐 Login como {tipoLogin === 'cliente' ? 'Cliente' : 'Empresa'}</h2>
      <button className="voltar-btn" onClick={() => setTipoLogin(null)}>
        &larr; Voltar
      </button>

      {sucesso && <p className="sucesso">Login realizado com sucesso! Redirecionando... ✅</p>}
      {erro && <p className="erro">{erro}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digite seu e-mail"
          required
        />

        <label htmlFor="senha">Senha:</label>
        <div className="senha-container">
          <input
            id="senha"
            type={mostrarSenha ? 'text' : 'password'}
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
          <button
            type="button"
            className="mostrar-senha-btn"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" className="btn-entrar">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
