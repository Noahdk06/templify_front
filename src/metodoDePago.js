// metodoDePago.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './metodoDePago.css';

const MetodoDePago = () => {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiration: '',
    cvv: '',
    saveCard: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePayment = async () => {
    // Procesa el pago (simulación)
    alert('Pago procesado con la tarjeta registrada.');

    // Obtener detalles del plan desde localStorage
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    const token = localStorage.getItem('token');

    if (!selectedPlan || !token) {
      alert("Error: no se pudo encontrar la información del plan o el token.");
      return;
    }

    try {
      // Enviar solicitud al backend para activar el plan de pago
      const response = await fetch('http://localhost:3033/api/user/seleccionarPdP', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedPlan)
      });

      if (response.ok) {
        alert("Plan de Pago activado exitosamente.");
        navigate('/profile');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Error en la solicitud de activación del plan de pago.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Registro de Tarjeta</h2>
      <div className="payment-form">
        <div>
          <label>Número de Tarjeta</label>
          <input
            type="text"
            name="number"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardDetails.number}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Expiración</label>
          <input
            type="text"
            name="expiration"
            placeholder="MM/YY"
            value={cardDetails.expiration}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="XXX"
            value={cardDetails.cvv}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="saveCard"
            checked={cardDetails.saveCard}
            onChange={handleInputChange}
          />
          <label>Guardar método de pago</label>
        </div>
        <button onClick={handlePayment}>Continuar</button>
      </div>
      <p>Todas las transacciones son seguras y autorizadas por entidades de terceros</p>
    </div>
  );
};

export default MetodoDePago;
