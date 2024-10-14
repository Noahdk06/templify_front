import React, { useState } from 'react';
import './metodoDePago.css'; 

const MetodoDePago = () => {
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

  const handlePayment = () => {
    // Aquí puedes agregar la lógica para enviar los datos al backend
    alert('Pago procesado con la tarjeta registrada.');
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
