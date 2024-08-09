import React from 'react';
import './App.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta
import Navbar from './navbar.js'; // Verifica el nombre del archivo y la ruta

const Support = () => {
  return (
    <div className="support">
      <Navbar />
      <Header />
      <Main />
    </div>
  );
};

const Header = () => {
  return (
    <header className="support-header">
      <h1>Soporte Técnico</h1>
      <p>Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o contacta a nuestro equipo de soporte técnico.</p>
    </header>
  );
};

const Main = () => {
  return (
    <main className="support-main">
      <Section title="Preguntas Frecuentes">
        <p>Aquí puedes encontrar respuestas a las preguntas más comunes que recibimos de nuestros usuarios.</p>
        {/* Aquí podrías agregar una lista de preguntas frecuentes */}
      </Section>
      <Section title="Contacta con Nosotros">
        <p>Si necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte técnico.</p>
        {/* Aquí podrías agregar un formulario de contacto o información de contacto */}
      </Section>
    </main>
  );
};

const Section = ({ title, children }) => {
  return (
    <section className="support-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Support;
