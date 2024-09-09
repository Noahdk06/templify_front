import React from 'react';
import './support.css';

const Support = () => {
  return (
    <div className="support-container">


      <section className="support-options">
        <div className="option-cards">
          {/* Chatbot Section */}
          <div className="option-card">
            <h3>Habla con nuestro chatbot</h3>
            <p>
              Nuestro chatbot responderá a una serie de preguntas predeterminadas y te guiará por el camino para resolver tus problemas.
            </p>
            <button>Chatear {'>'}</button>
          </div>

          {/* Soporte Humano Section */}
          <div className="option-card">
            <h3>Contacta al soporte humano</h3>
            <p>
              Contáctanos con cualquier duda que tengas a nuestro soporte técnico que te responderá en la brevedad.
            </p>
            <button>Contactar {'>'}</button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Support;
