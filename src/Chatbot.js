import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const questions = [
    '¿Como inicio sesion?',
    '¿Como funciona el editor?',
    '¿Como elijo un metodo de pago?',
    '¿Como cargo mis propios archivos?',
    '¿Como entrar al chatbot?',
    '¿Que cambia entre cada plan?',
    '¿Como veo el easter egg?',
    '¿Quien explota laboralmente al los miebros de este proyecto y no hace nada?',
  ];

  const answers = {
    '¿Como inicio sesion?': 'Te registras creando un usuario donde dice "Registrar" arriba en la navbar y después, donde dice "Iniciar sesión", pones los datos que pusiste previamente y listo.',
    '¿Como funciona el editor?':'Esta respuesta aun no esta disponible ni lo va a estar',
    '¿Como elijo un metodo de pago?': 'Una vez iniciada la sesion, entras a la seccion de "Nuestros planes" ahi ves los distintos planes que hay seleccionas el que te venga mas acorde a tus necesidades, una ves seleccionado te aparece el metodo de pago con el cual pagar y ahi pones el metodo que utilices :v.',
    '¿Como cargo mis propios archivos?': 'Una vez iniciada la sesion, entras en la seccion de "Bilblioteca de Archivos" y presionas el boton que dice seleccionar archivo, una vez hecho eso se va a abrir un formulario para llenar siendo el primer capo un boton donde se abren tus archivos ahi seleccionas el que queres subir, luego decis en que formato esta (png, gif, etc) y le pones un nombre, le das a subir y listo',
    '¿Como entrar al chatbot?': 'Ya estas adentro, creo que el bot sos vos.',
    '¿Que cambia entre cada plan?': 'Los cambios que hay entre los planes son a que publicos van dirigidos el primero va para una persona sola que quiere usar nuestros servicios, el segundo va para un start up sin mucho personal o empresa chica y el tercero va dirigido a una empresa grande con una amplia cantidad de personal y no claro ',
    '¿Como veo el easter egg?': 'Eso mi joven padawan tendras que descubrirlo con tus propios medios, es un secreto shhhh🤫🤫🤫.',
    '¿Quien explota laboralmente al los miebros de este proyecto y no hace nada?': 'Uriel Segaloff',
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-header">FAQ</h1>
      <p>Selecciona una pregunta:</p>
      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} onClick={() => handleQuestionClick(question)} className="question-item">
            {question}
          </li>
        ))}
      </ul>
      {selectedQuestion && (
        <div className="response-section">
          <h2>Has seleccionado: {selectedQuestion}</h2>
          <p>{answers[selectedQuestion]}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
