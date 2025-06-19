import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioFeedback.css";
import API_URL from "../services/api"; // ← usamos o caminho relativo correto

export default function FormReclamacao() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // ← adicionado aqui
  const [mensagem, setMensagem] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("problema");
  const [anexo, setAnexo] = useState(null);
  const [status, setStatus] = useState({ texto: "", tipo: "" });
  const [showSuccessRepeat, setShowSuccessRepeat] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mensagem.trim().length < 10) {
      setStatus({ texto: "Mensagem muito curta.", tipo: "erro" });
      return;
    }

    const formData = new FormData();
    formData.append("mensagem", mensagem);
    formData.append("titulo", titulo);
    formData.append("tipoFeedback", tipoFeedback);

    if (anexo) {
      formData.append("anexos", anexo);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/reclamacoes/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ texto: "Reclamação enviada com sucesso!", tipo: "sucesso" });
        setMensagem("");
        setTitulo("");
        setAnexo(null);
        if (fileInputRef.current) fileInputRef.current.value = null;

        // Redirecionar para /meus-feedbacks após 1 segundo (opcional)
        setTimeout(() => {
          navigate("/meus-feedbacks");
        }, 1000);

      } else {
        setStatus({ texto: data.error || "Erro ao enviar reclamação", tipo: "erro" });
      }
    } catch (error) {
      setStatus({ texto: "Erro de rede", tipo: "erro" });
    }
  };

  const handleFileChange = (e) => {
    setAnexo(e.target.files[0] || null);
  };

  return (
    <div className="formulario-feedback-container">
      <h2>Deixe seu Feedback aqui</h2>

      {status.texto && (
        <div className={`mensagem ${status.tipo}`}>
          {status.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="titulo">Assunto</label>
          <input
            id="titulo"
            type="text"
            placeholder="Digite o Assunto ou nome da Empresa aqui"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoFeedback">Tipo de Feedback</label>
          <select
            id="tipoFeedback"
            value={tipoFeedback}
            onChange={(e) => setTipoFeedback(e.target.value)}
          >
            <option value="sugestao">Sugestão</option>
            <option value="problema">Crítica</option>
            <option value="elogio">Elogio</option>
            <option value="duvida">Dúvida</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            placeholder="Escreva sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            maxLength={1500}
          />
          <p className="length">{mensagem.length} / 1500 caracteres</p>
        </div>

        <div className="form-group">
          <label htmlFor="anexos">Anexar arquivo</label>
          <input
            id="anexos"
            className="input-file"
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {anexo && (
            <div className="lista-anexos">
              <h4>Anexo selecionado:</h4>
              <div className="anexo-item">
                <span className="file-icon">📎</span>
                <span>{anexo.name}</span>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="btn-enviar">
          Enviar
        </button>
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
          marginTop: '3px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Clique aqui para voltar para a página inicial
      </button>


        {showSuccessRepeat && (
          <div className="mensagem sucesso repeat">
            Reclamação enviada com sucesso!
          </div>
        )}
      </form>
    </div>
  );
}
