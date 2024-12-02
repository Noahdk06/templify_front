import React from 'react';
import './support.css';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  return (
    <div className="support-container">
      <section className="support-options">
        <div className="option-cards">
          {/* Chatbot Section */}
          <div className="option-card">
            <h3>FAQ</h3>
            <p>
              Respuestas a una serie de preguntas predeterminadas que te guiaran por el camino para resolver tus problemas.
            </p>
            <button onClick={() => navigate('/chatbot')}>VER{'>'}</button> {/* Navega a la página del chatbot */}
          </div>

          {/* Soporte Humano Section */}
          <div className="option-card">
            <h3>Contacta con cañete</h3>
            <p>
              Contáctanos con cualquier duda que tengas a nuestro soporte técnico que te responderá en la brevedad.
            </p>
            <button onClick={() => navigate('/contact')}>Contactar {'>'}</button> {/* Navega al formulario de contacto */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
