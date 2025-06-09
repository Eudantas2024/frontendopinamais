// src/pages/Blog.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaHandshake, FaChartLine, FaUserPlus, FaBuilding } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  // Faz scroll para o topo ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <section className="blog">
        <img src="https://espacocerto.net.br/wp-content/uploads/2021/05/iStock-1206820346.jpg" alt="Descrição da imagem" /><br />
        <img src={'/public/logo2.svg'} alt="Logo Opina+" className="logo2" />

        <h2>Quem Somos</h2>

        <p>
          Na era da informação, onde a opinião do consumidor é mais valiosa do que nunca, nasceu o Opina Mais, o "mais" vem do simbolo de soma, porque queremos adicionar algo a mais aos nossos usuários, sejam clientes, sejam empresas. <br />
          Somos uma plataforma inovadora que conecta clientes e empresas, proporcionando uma comunicação eficiente e transparente para que marcas possam ouvir e evoluir a partir do feedback real de seus consumidores. <br /><br />

          <strong>Nossa Missão</strong><br />
          No Opina+, acreditamos que cada voz tem poder. <br />
          Nossa missão é amplificar a opinião dos clientes, garantindo que sejam ouvidos e que suas sugestões impactem diretamente a qualidade dos serviços e produtos das empresas. <br />
          Acreditamos que a melhoria contínua é o que impulsiona o mercado e fortalece a relação entre consumidores e marcas. Por isso, incentivamos cada pessoa a se expressar e compartilhar suas experiências de maneira clara e objetiva. <br /><br />

          <strong>O Que Fazemos?</strong><br />
          Somos intermediários entre você e as empresas que você ama (ou que gostaria de amar ainda mais). <br />
          Com o Opina+, consumidores podem compartilhar suas experiências, apontar falhas, sugerir melhorias e reconhecer empresas que fazem um bom trabalho. <br />
          Além disso, fornecemos ferramentas para que as marcas acompanhem as tendências e expectativas de seus clientes, ajudando-as a aprimorar seus produtos e serviços de forma estratégica. <br /><br />

          <strong>Por Que Escolher o Opina+?</strong><br /><br />
          ✅ <strong>Sua Voz Amplificada:</strong> Cada feedback conta! No Opina+, suas sugestões são enviadas diretamente às empresas, garantindo que sua opinião tenha o impacto que merece. <br /><br />
          ✅ <strong>Conecte-se com Marcas:</strong> Empresas dispostas a ouvir e melhorar fazem parte do nosso ecossistema. Acreditamos que ouvir os clientes é o primeiro passo para oferecer experiências inesquecíveis. <br /><br />
          ✅ <strong>Melhoria Contínua:</strong> Com um fluxo constante de opiniões e sugestões, ajudamos as marcas a crescerem e se tornarem cada vez melhores. E, claro, os clientes se beneficiam com serviços mais eficientes e produtos de maior qualidade. <br /><br />

          <strong>Nosso Compromisso</strong><br />
          No Opina+, valorizamos a honestidade, a transparência e o respeito. Nossa plataforma foi criada para facilitar a comunicação, mas também para assegurar que todas as avaliações sejam construtivas e baseadas em experiências reais. <br />
          Estamos comprometidos em oferecer um espaço confiável e eficaz para que os consumidores possam se expressar sem barreiras, e para que as empresas tenham acesso a informações valiosas sobre seus clientes. <br />
          Ao fortalecer essa conexão, criamos um ambiente de confiança e evolução constante. <br /><br />

          <strong>O Futuro do Feedback</strong><br />
          Acreditamos que a interação entre clientes e empresas é essencial para um mercado mais dinâmico e eficiente. <br />
          Com o avanço da tecnologia e das redes sociais, a comunicação direta nunca foi tão importante. Nossa missão é garantir que essa comunicação aconteça da forma mais ágil e produtiva possível. <br />
          Cada comentário, sugestão ou crítica é uma oportunidade de inovação. Queremos que você faça parte desse movimento, contribuindo para um mundo onde sua voz tem um papel essencial na construção de serviços e produtos melhores. <br /><br />

          <strong>Opina+<br />A ponte entre você e as marcas!</strong>
        </p>

        <img src={'/public/logo4.svg'} alt="Logo Opina+" className="logo11" /><br />
      </section>
    </div>
  );
};

export default Blog;
