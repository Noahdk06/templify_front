import React from 'react';
import './Templatehub.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta
import Navbar from './navbar.js'; // Verifica el nombre del archivo y la ruta

const TemplatesHub = () => {
  return (
    <div className="templates-hub">
      <Navbar />
      <Header />
      <Main />
    </div>
  );
};

const Header = () => {
  return (
    <header className="templates-header">
      <h1>Explora Nuestros Templates</h1>
      <p>Encuentra el template perfecto para tu proyecto de cartelería digital. Personaliza y utiliza nuestras plantillas de manera intuitiva y eficiente.</p>
    </header>
  );
};

const Main = () => {
  const sections = [
    { title: 'Publicidad', images: [...Array(4)].map((_, i) => `image${i+1}.jpg`) },
    { title: 'Productos', images: [...Array(4)].map((_, i) => `image${i+1}.jpg`) }
  ];

  return (
    <main className="templates-main">
      <div className="templates-content">
        {sections.map((section, index) => (
          <Section key={index} title={section.title} images={section.images} />
        ))}
      </div>
    </main>
  );
};

const Section = ({ title, images }) => {
  return (
    <section className="templates-section">
      <h2 className="section-title">{title}</h2>
      <div className="images">
        {images.map((src, index) => (
          <img key={index} src={src} alt={title} className="template-image" />
        ))}
      </div>
    </section>
  );
};

export default TemplatesHub;
