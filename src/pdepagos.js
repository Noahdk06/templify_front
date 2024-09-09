import React, { useState } from 'react';
import './pdepagos.css';

const Pdepagos = () => {
  const [selectedDuration, setSelectedDuration] = useState('3 Meses');

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="pdepagos-container">


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

     
    </div>
  );
};

export default Pdepagos;
