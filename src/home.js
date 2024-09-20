// src/home.js
import React from 'react';
import './Home.css';




const Home = () => {
  return (
    <div className="inicioB">
      <div className="container">

        <Header />
        <Main />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <h1>CON TEMPLIFY, TU PUBLICIDAD INTERACTÚA CON EL FUTURO</h1>
      <p>Bienvenido a Templify, el servicio de cartelería digital más user friendly en el mercado.</p>
    </header>
  );
};

const Main = () => {
  return (
    <main>
      <Intro />
      <Services />
    </main>
  );
};

const Intro = () => {
  return (
    <section id="intro">
      <div className="intro-text">
        <h2>LA PRODUCCIÓN DE PROYECTOS EN CARTELERÍA DIGITAL NUNCA FUE TAN FÁCIL</h2>
        <p>
          En Templify, hemos desarrollado una plataforma innovadora que facilita la creación y gestión de contenidos para cartelería digital. 
          Nuestro servicio está diseñado tanto para programadores experimentados como para usuarios sin conocimientos técnicos, permitiéndoles 
          diseñar y personalizar sus propios templates de manera intuitiva y eficiente. Gracias a nuestra integración con diversas bases de datos, 
          puedes gestionar y actualizar tu contenido en tiempo real, asegurando que siempre dispongas de la información más relevante y actualizada.
        </p>
        <a href="/templates" className="btn">Ir a TemplateHUB &gt;</a>
      </div>
      <img src='/img/logo.png' alt="Logo" />
    </section>
  );
};

const Services = () => {
  return (
    <section id="services">
      <div className="services-text">
        <h2>¿QUÉ SERVICIOS OFRECEMOS A NUESTROS CLIENTES?</h2>
        <p>
          En Templify, nos enorgullecemos de ofrecer una amplia gama de servicios diseñados para optimizar tus operaciones de marketing digital. 
          Utilizando nuestra avanzada tecnología DEX, proporcionamos a nuestros clientes una plataforma segura y robusta para la edición y 
          personalización de plantillas predefinidas. Ya sea que necesites crear un nuevo sitio web desde cero o simplemente modificar un 
          template existente, nuestra herramienta te permite hacerlo con facilidad y seguridad. Además, nuestra solución en la nube garantiza 
          que tus datos y templates estén siempre accesibles y protegidos. Una vez que hayas finalizado tu diseño, podrás descargar la aplicación 
          y utilizarla en dispositivos físicos, como tótems interactivos, para una experiencia de usuario completa y dinámica.
        </p>
        <a href="/pdepago" className="btn">Empieza hoy!!!</a>

        
      </div>
    </section>
  );
};

export default Home;
