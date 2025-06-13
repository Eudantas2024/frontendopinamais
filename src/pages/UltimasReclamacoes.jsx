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
  const [loading, setLoading] = useState(true); // Estado para loading

  useEffect(() => {
    fetch('https://backendopinamais.onrender.com/api/reclamacoes/aprovadas')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar reclamações.');
        return res.json();
      })
      .then((dados) => {
        setReclamacoes(dados);
        setLoading(false);  // Finaliza loading quando dados chegam
      })
      .catch((err) => {
        setErro(err.message);
        setLoading(false);  // Finaliza loading mesmo se erro
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
              const mensagemFormatada =
                mensagemExpandida === rec._id
                  ? rec.mensagem
                  : rec.mensagem.length > 500
                    ? rec.mensagem.slice(0, 500) + '...'
                    : rec.mensagem;

              return (
                <div key={rec._id} className="card-reclamacao">

                  <div className="feedback-e-data">
                    <p className="feedback">
                      <FaBullhorn
                        className="icon-megafone"
                        color={coresPorTipo[rec.tipoFeedback] || 'gray'}
                      />
                      {' '}
                      <strong>{tiposFeedback[rec.tipoFeedback] || rec.tipoFeedback}</strong>
                    </p>

                    <div className="data-reclamacao">
                      <strong>Registrado em:</strong>{' '}
                      {rec.createdAt
                        ? new Date(rec.createdAt).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })
                        : 'Data não disponível'}
                    </div>
                  </div>

                  <p className="cliente">
                    <FaUser className="icone-user" /> <strong>Cliente:</strong> {rec.username}
                  </p>

                  <p className="assunto">
                    <FaEnvelope className="icone-envelope" /> ASSUNTO: {rec.titulo}
                  </p>

                  <p className="mensagem-texto">
                    <FaCommentDots className="icone-msg" /> <strong>Mensagem:</strong> <br />
                    {mensagemExpandida === rec._id
                      ? rec.mensagem
                      : rec.mensagem.length > 500
                        ? rec.mensagem.slice(0, 500) + '...'
                        : rec.mensagem}
                  </p>

                  {rec.mensagem.length > 500 && (
                    <button
                      onClick={() =>
                        setMensagemExpandida(mensagemExpandida === rec._id ? null : rec._id)
                      }
                      className="botao-ver-mais"
                    >
                      {mensagemExpandida === rec._id ? 'Ver menos' : 'Ver mais'}
                    </button>
                  )}

                  {rec.anexos && rec.anexos.length > 0 ? (
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {rec.anexos.map((arquivo, idx) => {
                        const mimetype = arquivo.mimetype || "";
                        const isImage = mimetype.startsWith("image/");
                        if (isImage) {
                          return (
                            <img
                              key={idx}
                              src={`data:${arquivo.mimetype};base64,${arquivo.content}`}
                              alt={arquivo.filename}
                              style={{
                                width: "100px",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          );
                        } else {
                          return (
                            <a
                              key={idx}
                              href={`data:${arquivo.mimetype};base64,${arquivo.content}`}
                              download={arquivo.filename}
                              style={{ alignSelf: "center" }}
                            >
                              📄 {arquivo.filename}
                            </a>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <p></p>
                  )}
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
