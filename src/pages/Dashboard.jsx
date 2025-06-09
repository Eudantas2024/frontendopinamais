import './Dashboard.css'
import { useEffect, useState } from 'react'
import { FaBell, FaCheck, FaClock } from 'react-icons/fa'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const dadosExemplo = [
  { id: 1, titulo: 'Erro na fatura', status: 'Resolvido', cliente: 'João', data: '2025-05-15' },
  { id: 2, titulo: 'Atendimento demorado', status: 'Pendente', cliente: 'Maria', data: '2025-05-14' },
  { id: 3, titulo: 'Produto com defeito', status: 'Pendente', cliente: 'Carlos', data: '2025-05-13' },
  { id: 4, titulo: 'Dúvida sobre o uso', status: 'Resolvido', cliente: 'Fernanda', data: '2025-05-12' },
  { id: 5, titulo: 'Problema de login', status: 'Pendente', cliente: 'Rafael', data: '2025-05-11' }
]

const cores = {
  Resolvido: '#4caf50', // Verde
  Pendente: '#ff9800'  // Laranja (mantido para o gráfico, mas o CSS usa um tom mais suave para o card)
}

function Dashboard() {
  const [reclamacoes, setReclamacoes] = useState([])

  useEffect(() => {
    setReclamacoes(dadosExemplo)
  }, [])

  const dadosGrafico = [
    { name: 'Resolvido', value: reclamacoes.filter(r => r.status === 'Resolvido').length },
    { name: 'Pendente', value: reclamacoes.filter(r => r.status === 'Pendente').length }
  ]

  return (
    <div className="dashboard-container">
      <h2>📊 Painel Administrativo</h2>

      <div className="grafico-container">
        <PieChart width={300} height={250}>
          <Pie
            data={dadosGrafico}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {dadosGrafico.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="lista-reclamacoes">
        {reclamacoes.map((rec) => (
          <div 
            key={rec.id} 
            className={`card status-${rec.status.toLowerCase()}`} /* Adiciona a classe de status aqui */
          >
            <div className="card-header">
              <FaBell className="icon" />
              <h3>{rec.titulo}</h3>
              <span className={`status ${rec.status.toLowerCase()}`}>
                {rec.status === 'Resolvido' ? <FaCheck /> : <FaClock />} {rec.status}
              </span>
            </div>
            <p><strong>Cliente:</strong> {rec.cliente}</p>
            <p><small>Data: {rec.data}</small></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard