import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PainelAdmin.css";
import API_URL from '../services/api';


const PainelAdmin = () => {
  const [reclamacoesPendentes, setReclamacoesPendentes] = useState([]);
  const [reclamacoesAprovadas, setReclamacoesAprovadas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [mensagemCor, setMensagemCor] = useState("red");
  const [idsAprovados, setIdsAprovados] = useState([]);
  const [idsExcluidos, setIdsExcluidos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Scroll para o topo ao entrar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Verifica login e carrega dados
  useEffect(() => {
    if (!token) {
      setMensagem("Acesso negado. Faça login como administrador.");
      setTimeout(() => navigate("/admin"), 1500);
    } else {
      carregarReclamacoesPendentes();
      carregarReclamacoesAprovadas();

      const intervalo = setInterval(() => {
        carregarReclamacoesPendentes();
        carregarReclamacoesAprovadas();
      }, 10000);

      return () => clearInterval(intervalo);
    }
  }, [navigate, token]);

  const carregarReclamacoesPendentes = async () => {
    try {
      const res = await fetch( `${API_URL}/api/reclamacoes/pendentes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setReclamacoesPendentes(data);
      } else {
        console.error("Erro na resposta:", data);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const carregarReclamacoesAprovadas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reclamacoes/aprovadas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReclamacoesAprovadas(data);
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const aprovarReclamacao = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/reclamacoes/aprovar/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMensagemCor("green");
        setMensagem("✅ Feedback Aprovado!");
        setIdsAprovados((prev) => [...prev, id]);
        setTimeout(() => {
          setMensagem("");
          setIdsAprovados((prev) => prev.filter(item => item !== id));
        }, 1000);
      }
    } catch {
      setMensagemCor("red");
      setMensagem("Erro ao aprovar feedback.");
    }
  };

  const excluirReclamacao = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/reclamacoes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMensagemCor("green");
        setMensagem("🗑️ Feedback excluído com sucesso!");
        setIdsExcluidos((prev) => [...prev, id]);
        setTimeout(() => {
          setMensagem("");
          setIdsExcluidos((prev) => prev.filter(item => item !== id));
        }, 1000);
      }
    } catch {
      setMensagemCor("red");
      setMensagem("Erro ao excluir feedback.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="administrativa">
      <button onClick={handleLogout} className="botao-logout">
        Clique aqui para Fazer Logout
      </button>

      <h2>Área Administrativa</h2>
      {mensagem && <p style={{ color: mensagemCor }}>{mensagem}</p>}

      <div className="principal">
        <h3>Reclamações Pendentes:</h3>
        {reclamacoesPendentes.map((r) => (
          <section key={r._id} className="card-reclamacao">
            <p><strong>Consumidor:</strong> {r.username}</p>
            <p><strong>Email:</strong> {r.email}</p>
            <p><strong>Tipo:</strong> {r.tipoFeedback}</p>
            <p><strong>Assunto:</strong> {r.titulo}</p>
            <p><strong>Mensagem:</strong><br />{r.mensagem}</p>

            <div className="data-reclamacao">
              <strong>Registrado em:</strong>{" "}
              {r.createdAt
                ? new Date(r.createdAt).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Data não disponível"}
            </div>

            <p><strong>Anexos:</strong></p>
            {r.anexos?.length > 0 ? (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {r.anexos.map((arquivo, idx) => {
                  const mimetype = arquivo.mimetype || "";
                  const isImage = mimetype.startsWith("image/");
                  return isImage ? (
                    <img
                      key={idx}
                      src={`data:${arquivo.mimetype};base64,${arquivo.content}`}
                      alt={arquivo.filename}
                      style={{ width: "100px", borderRadius: "4px" }}
                    />
                  ) : (
                    <a
                      key={idx}
                      href={`data:${arquivo.mimetype};base64,${arquivo.content}`}
                      download={arquivo.filename}
                    >
                      📄 {arquivo.filename}
                    </a>
                  );
                })}
              </div>
            ) : (
              <p>Sem anexos</p>
            )}

            <button className="aprovar" onClick={() => aprovarReclamacao(r._id)}>Aprovar</button>
            {idsAprovados.includes(r._id) && (
              <p style={{ color: "green", marginTop: "5px" }}>Feedback Aprovado!</p>
            )}

            <button className="excluir" onClick={() => excluirReclamacao(r._id)}>Excluir</button>
            {idsExcluidos.includes(r._id) && (
              <p style={{ color: "green", marginTop: "5px" }}>Feedback excluído com sucesso!</p>
            )}
          </section>
        ))}

        <h3>Reclamações Aprovadas:</h3>
        {reclamacoesAprovadas.map((r) => (
          <section key={r._id} className="card-reclamacao">
            <p><strong>Consumidor:</strong> {r.username}</p>
            <p><strong>Email:</strong> {r.email}</p>
            <p><strong>Tipo:</strong> {r.tipoFeedback}</p>
            <p><strong>Assunto:</strong> {r.titulo}</p>
            <p><strong>Mensagem:</strong><br />{r.mensagem}</p>

            <div className="data-reclamacao">
              <strong>Registrado em:</strong>{" "}
              {r.createdAt
                ? new Date(r.createdAt).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Data não disponível"}
            </div>

            <p><strong>Anexos:</strong></p>
            {r.anexos?.length > 0 ? (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {r.anexos.map((arquivo, idx) => {
                  const mimetype = arquivo.mimetype || "";
                  const isImage = mimetype.startsWith("image/");
                  return isImage ? (
                    <img
                      key={idx}
                      src={`data:${arquivo.mimetype};base64,${arquivo.content}`}
                      alt={arquivo.filename}
                      style={{ width: "100px", borderRadius: "4px" }}
                    />
                  ) : (
                    <a
                      key={idx}
                      href={`data:${arquivo.mimetype};base64,${arquivo.content}`}
                      download={arquivo.filename}
                    >
                      📄 {arquivo.filename}
                    </a>
                  );
                })}
              </div>
            ) : (
              <p>Sem anexos</p>
            )}

            <button className="excluir" onClick={() => excluirReclamacao(r._id)}>Excluir</button>
            {idsExcluidos.includes(r._id) && (
              <p style={{ color: "green", marginTop: "5px" }}>Feedback excluído com sucesso!</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default PainelAdmin;
