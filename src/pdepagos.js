// pdepagos.js
import React, { useState } from 'react';
import './pdepagos.css';
import { useNavigate } from 'react-router-dom';

const Pdepagos = () => {
  const [selectedDuration, setSelectedDuration] = useState('3 Meses');
  const [showModal, setShowModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activePlan, setActivePlan] = useState(null); 
  const navigate = useNavigate();

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

  const handlePaymentSelection = (plan) => {
    const planDetails = {
      nombrePdP: plan,
      precio: prices[selectedDuration][planKeys[plan]],
      plazo: prices[selectedDuration].plazo,
    };
    localStorage.setItem('selectedPlan', JSON.stringify(planDetails));
    setShowModal(true);
    setActivePlan(plan);
  };

  const proceedToPayment = () => {
    if (!termsAccepted) {
      alert("Por favor, acepta los términos y condiciones para continuar.");
      return;
    }
    setShowModal(false);
    navigate('/metodoDePago');
  };

  const closeModal = () => {
    setShowModal(false);
    setTermsAccepted(false);
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
            <div className={`plan ${activePlan === plan ? 'active-plan' : ''}`} key={plan}>
              <h2>PLAN {plan} {activePlan === plan && <span className="active-badge">Activo</span>}</h2>
              <div className="plan-details">
                <p>Acceso a creación y edición de templates</p>
                <p>Acceso a biblioteca de archivos</p>
                <p>Acceso a funciones DEX HTML</p>
                <p>Subir templates al HUB</p>
                <p>Usar templates predeterminados</p>
                <p>Exportación de templates a tótem</p>
                <p>Manejo del archivo en el tótem de manera remota</p>
                {plan === 'Start-Up' && <p>Colaboradores (Hasta 3 personas)</p>}
                {plan === 'Empresa' && <p>Colaboradores (Hasta 5 personas)</p>}
              </div>
              <p className="plan-price"><strong>${prices[selectedDuration][planKeys[plan]]} USD</strong></p>
              <button onClick={() => handlePaymentSelection(plan)}>
                {activePlan === plan ? 'Plan Activo' : 'Proceder al pago'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3>Proceder a pagar</h3>
              <p>Al proceder se acepta una suscripción al plan seleccionado (Personal, Start-Up o Empresa)</p>
              <p>Para más información leer políticas de servicio.</p>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="terms">He leído y aceptado los términos y condiciones</label>
              </div>
              <div className="modal-buttons">
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={proceedToPayment} disabled={!termsAccepted}>Continuar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pdepagos;
