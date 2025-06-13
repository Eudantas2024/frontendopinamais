import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaSearch,
  FaBullhorn,
  FaUserPlus,
} from 'react-icons/fa';
import './UltimasReclamacoes.css';

function UltimasReclamacoes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const buscaInicial = queryParams.get('busca') || '';

  const [reclamacoes, setReclamacoes] = useState([]);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState(buscaInicial);
  const [mensagemExpandida, setMensagemExpandida] = useState(null);
  const [loading, setLoading] = useState(true);  // <-- Estado loading adicionado

  useEffect(() => {
    fetch('https://backendopinamais.onrender.com/api/reclamacoes/aprovadas')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar reclamações.');
        return res.json();
      })
      .then((dados) => {
        setReclamacoes(dados);
        setLoading(false);  // <-- Carregamento concluído
      })
      .catch((err) => {
        setErro(err.message);
        setLoading(false);  // <-- Também para loading em caso de erro
      });
  }, []);

  const reclamacoesFiltradas = reclamacoes.filter((rec) => {
    const buscaLower = busca.toLowerCase();
    return (
      (rec.titulo && rec.titulo.toLowerCase().includes(buscaLower)) ||
      (rec.mensagem && rec.mensagem.toLowerCase().includes(buscaLower))
    );
  });

  const tiposFeedback = {
    problema: 'Crítica',
    sugestao: 'Sugestão',
    elogio: 'Elogio',
    duvida: 'Dúvida',
    outros: 'Outros',
  };

  const coresPorTipo = {
    problema: '#DC143C',   // vermelho
    sugestao: '#FFD700',   // amarelo
    elogio: '#7CFC00',     // verde
    duvida: '#FF00FF',     // rosa
    outros: '#BDB76B',     // marrom
  };

  if (loading) {
    return (
      <div className="container">
        <div className="ultimas-reclamacoes">
          <h2>Feedbacks Publicados</h2>
          <p style={{ fontSize: '1.2em', color: '#333', marginTop: '20px' }}>
            Por favor aguarde, estamos buscando as informações ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="ultimas-reclamacoes">
        <h2>Feedbacks Publicados</h2>

        {/* restante do seu código continua igual */}

        <div className="barra-busca">
          <input
            type="text"
            placeholder="Buscar por empresa, assunto ou mensagem..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
          />
          <FaSearch className="icone-busca" />
        </div>

        {erro && <p className="erro">{erro}</p>}

        <div className="lista-reclamacoes">
          {reclamacoesFiltradas.length === 0 ? (
            <div className="cadastreseaqui">
              <p>
                Em nosso arquivo ainda não consta nenhum Feedback para a empresa citada. Gostaria de incluir?
                Por favor faça um novo registro e ajude outras pessoas com essa avaliação.
              </p>
              <br />
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
          ) : (
            reclamacoesFiltradas.map((rec) => {
              // ... seu código de renderização dos cards aqui
              // Não precisa modificar nada nessa parte para o loading
              return (
                <div key={rec._id} className="card-reclamacao">
                  {/* resto do conteúdo */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default UltimasReclamacoes;
