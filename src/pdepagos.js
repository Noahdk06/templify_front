import React, { useState } from 'react';
import './pdepagos.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la redirección

const Pdepagos = () => {
  const [selectedDuration, setSelectedDuration] = useState('3 Meses');
  const [showModal, setShowModal] = useState(false); // Nuevo estado para controlar el modal
  const navigate = useNavigate(); // Hook para la navegación

  const prices = {
    '3 Meses': { personal: 10, startup: 22, empresa: 165, plazo: 90 },
    '6 Meses': { personal: 18, startup: 40, empresa: 300, plazo: 180 },
    '9 Meses': { personal: 25, startup: 54, empresa: 420, plazo: 270 },
    'Anual': { personal: 32, startup: 62, empresa: 530, plazo: 365 },
  };

  const planKeys = {
    Personal: 'personal',
    'Start-Up': 'startup',
    Empresa: 'empresa'
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handlePaymentSelection = async (plan) => {
    setShowModal(true);  // Mostrar el modal al hacer clic en el botón

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert("No hay una sesión iniciada.");
      return;
    }

    const { plazo } = prices[selectedDuration];
    const planKey = planKeys[plan];
    const precio = prices[selectedDuration][planKey];

    if (precio === undefined) {
      console.error(`Precio no encontrado para el plan: ${plan} con duración: ${selectedDuration}`);
      alert("Error: Precio no encontrado para el plan seleccionado.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3033/api/user/seleccionarPdP', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombrePdP: plan, precio, plazo, userId: user.id })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Plan de Pago aplicado correctamente");
     
      }
    } catch (error) {
      alert("Error en la solicitud");
    }
  };

  const proceedToPayment = () => {
    setShowModal(false);
    navigate('/metodoDePago'); // Redirigir a la página de método de pago
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
          {['Personal', 'Start-Up', 'Empresa'].map((plan) => (
            <div className="plan" key={plan}>
              <h2>PLAN {plan}</h2>
              <ul>
                <li>Acceso a creación y edición de templates</li>
                <li>Acceso a biblioteca de archivos</li>
                <li>Acceso a funciones DEX HTML</li>
                <li>Subir templates al HUB</li>
                <li>Usar templates predeterminados</li>
                <li>Exportación de templates a tótem</li>
                <li>Manejo del archivo en el tótem de manera remota</li>
                {plan === 'Start-Up' && <li>Colaboradores (Hasta 3 personas)</li>}
                {plan === 'Empresa' && <li>Colaboradores (Hasta 5 personas)</li>}
              </ul>
              <p><strong>${prices[selectedDuration][planKeys[plan]]} USD</strong></p>
              <button onClick={() => handlePaymentSelection(plan)}>Proceder al pago</button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal emergente */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Proceder a pagar</h3>
            <p>Al proceder se acepta una suscripción al plan seleccionado (Personal, Start-Up o Empresa)</p>
            <p>Para más información leer políticas de servicio.</p>
            <div>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">He leído y aceptado los términos y condiciones</label>
            </div>
            <button onClick={proceedToPayment}>Continuar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pdepagos;
