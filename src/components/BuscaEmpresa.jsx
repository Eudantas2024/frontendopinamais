import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuscaEmpresa = () => {
  const [buscaEmpresa, setBuscaEmpresa] = useState('');
  const navigate = useNavigate();

  const handleBuscaEmpresa = (e) => {
    e.preventDefault();
    const termo = buscaEmpresa.trim();
    if (termo) {
      navigate(`/reclamacoes?busca=${encodeURIComponent(termo)}`);
      setBuscaEmpresa(''); // Limpa o campo após redirecionar
    }
  };

  return (
    <form onSubmit={handleBuscaEmpresa} className="form-busca-empresa">
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
  );
};

export default BuscaEmpresa;
