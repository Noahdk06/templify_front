import React from 'react';
import './App.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta
  // Verifica el nombre del archivo y la ruta

const plans = () => {
  return (
    <div className="plans">

      <Header />
      <Main />
    </div>
  );
};

const Header = () => {
  return (
    <header className="plans-header">
      <h1>Nuestros Planes</h1>
      <p>Elige el plan que mejor se adapte a tus necesidades y comienza a disfrutar de todos los beneficios de Templify.</p>
    </header>
  );
};

const Main = () => {
  return (
    <main className="plans-main">
      <Section title="Planes Básico">
        <p>Descripción del Plan Básico: Ideal para usuarios individuales o pequeños proyectos.</p>
        {/* Aquí puedes agregar detalles específicos del plan básico */}
      </Section>
      <Section title="Planes Profesional">
        <p>Descripción del Plan Profesional: Perfecto para empresas y proyectos de mayor envergadura.</p>
        {/* Aquí puedes agregar detalles específicos del plan profesional */}
      </Section>
      <Section title="Planes Premium">
        <p>Descripción del Plan Premium: Ofrece la máxima flexibilidad y soporte personalizado.</p>
        {/* Aquí puedes agregar detalles específicos del plan premium */}
      </Section>
    </main>
  );
};

const Section = ({ title, children }) => {
  return (
    <section className="plans-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default plans;
