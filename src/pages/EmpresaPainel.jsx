import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import API_URL from '../services/api'; // ajuste o caminho conforme necessário


const Painel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT armazenado localmente

        const response = await fetch(`${API_URL}/api/reclamacoes/minhas`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar reclamações.");
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Erro:", error);
        setErro("Erro ao carregar feedbacks.");
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div
      className="painel-admin"
      style={{
        padding: '30px',
        backgroundColor: '#f4f6f8',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '30px auto',
      }}
    >
      <h2
        style={{
          color: '#333',
          marginBottom: '20px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        Olá, {feedbacks[0]?.username || 'usuário'}! Seja bem-vindo à sua área exclusiva
      </h2>

      <h4
        style={{
          color: '#333',
          marginBottom: '20px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        Painel do Cliente
      </h4>

      <p
        style={{
          color: '#555',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaCommentDots style={{ marginRight: '8px', color: '#007bff', fontSize: '20px' }} /> Seus Feedbacks enviados:
      </p>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {feedbacks.map((fb) => (
          <li
            key={fb._id}
            style={{
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#fff',
              borderRadius: '6px',
              border: '1px solid #eee',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <FaUser style={{ marginRight: '8px', color: '#28a745', fontSize: '18px' }} /> Nome:
              </strong>{' '}
              <span style={{ color: '#666', marginLeft: '5px' }}>{fb.username}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <FaEnvelope style={{ marginRight: '8px', color: '#dc3545', fontSize: '18px' }} /> Email:
              </strong>{' '}
              <span style={{ color: '#666', marginLeft: '5px' }}>{fb.email}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <FaCommentDots style={{ marginRight: '8px', color: '#17a2b8', fontSize: '18px' }} /> Tipo de Feedback:
              </strong>{' '}
              <span style={{ color: '#666', marginLeft: '5px' }}>
                {fb.tipoFeedback || 'Não informado'}
              </span>
            </div>

            <div style={{ marginTop: '10px' }}>
              <strong style={{ color: '#333' }}>Assunto:</strong>{' '}
              <span style={{ color: '#666', fontStyle: 'italic' }}>{fb.titulo || 'Sem assunto'}</span>
            </div>

            <div style={{ marginTop: '10px' }}>
              <strong style={{ color: '#333' }}>Mensagem:</strong>{' '}
              <span style={{ color: '#666', fontStyle: 'italic' }}>{fb.mensagem}</span>
            </div>

            <div style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
              <strong>Registrado em:</strong>{' '}
              {fb.createdAt
                ? new Date(fb.createdAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
                : 'Data não disponível'}
            </div>

            {fb.anexos && fb.anexos.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <strong style={{ color: '#333' }}>Anexos:</strong>
                <ul>
                  {fb.anexos.map((anexo, index) => (
                    <li key={index}>
                      <a
                        href={`${API_URL}/uploads/${anexo.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {anexo.originalname}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Painel;
