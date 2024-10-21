import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import './Templatehub.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const TemplatesHub = () => {
  return (
    <div className="templates-hub">
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
    { title: 'Publicidad', images: [...Array(4)].map((_, i) => ({ src: `image${i+1}.jpg`, id: i + 1 })) },
    { title: 'Productos', images: [...Array(4)].map((_, i) => ({ src: `image${i+1}.jpg`, id: i + 5 })) }
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
        {images.map((image, index) => (
          <Link to={`/template/${image.id}`} key={index}> {/* Link que dirige a la página del editor */}
            <img src={image.src} alt={title} className="template-image" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TemplatesHub;
