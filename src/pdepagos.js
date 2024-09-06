import React, { useState } from 'react';
import './pdepagos.css';

const pdepagos = () => {
  const [selectedDuration, setSelectedDuration] = useState('3 Meses');

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="pdepagos-container">
      <header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">¿Qué Hacemos?</a></li>
            <li><a href="#">Template Hub</a></li>
            <li><a href="#">Soporte Técnico</a></li>
            <li><a href="#">Nuestros Planes</a></li>
          </ul>
        </nav>
      </header>

      <section className="pricing-section">
        <h1>ELIJE TU PLAN PERFECTO PARA <span>INTERACTUAR CON EL FUTURO</span></h1>
        <div className="duration-selector">
          {['3 Meses', '6 Meses', '9 Meses', 'Anual'].map((duration) => (
            <button
              key={duration}
              className={selectedDuration === duration ? 'duration-btn active' : 'duration-btn'}
              onClick={() => handleDurationChange(duration)}
            >
              {duration}
            </button>
          ))}
        </div>

        <div className="pdepagos">
          <div className="plan">
            <h2>PLAN Personal</h2>
            <ul>
              <li>Acceso a creación y edición de templates</li>
              <li>Acceso a biblioteca de archivos</li>
              <li>Acceso a funciones DEX HTML</li>
              <li>Subir templates al HUB</li>
              <li>Usar templates predeterminados</li>
              <li>Exportación de templates a tótem</li>
              <li>Manejo del archivo en el tótem de manera remota</li>
            </ul>
            <p><strong>$10USD</strong></p>
            <button>Probar gratis</button>
            <button>Proceder al pago</button>
          </div>

          <div className="plan">
            <h2>PLAN Start-Up</h2>
            <ul>
              <li>Acceso a creación y edición de templates</li>
              <li>Acceso a biblioteca de archivos empresarial</li>
              <li>Acceso a funciones DEX HTML y SQL</li>
              <li>Subir templates al HUB</li>
              <li>Usar templates predeterminados y subidos</li>
              <li>Exportación de templates a tótem</li>
              <li>Manejo del archivo en el tótem de manera remota</li>
              <li>Colaboradores (Hasta 3 personas)</li>
            </ul>
            <p><strong>$22USD</strong></p>
            <button>Proceder al pago</button>
          </div>

          <div className="plan">
            <h2>PLAN Empresa</h2>
            <ul>
              <li>Acceso a creación y edición de templates</li>
              <li>Acceso a biblioteca de archivos empresarial</li>
              <li>Acceso a funciones DEX HTML y SQL</li>
              <li>Subir templates al HUB</li>
              <li>Usar templates predeterminados y subidos</li>
              <li>Exportación de templates a tótem</li>
              <li>Manejo del archivo en el tótem de manera remota</li>
              <li>Colaboradores (Hasta 5 personas)</li>
            </ul>
            <p><strong>$165USD</strong></p>
            <button>Proceder al pago</button>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-links">
            <h3>INICIATE</h3>
            <h3>EDUCACION</h3>
          </div>
          <div className="trusted-companies">
            <h3>EMPRESAS QUE CONFIARON EN NOSOTROS</h3>
            {/* Añade los logos aquí */}
          </div>
          <div className="contact-info">
            <p>CONTACTO: +54 (911) 2682 9703</p>
            <p>santholia252@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default pdepagos;
