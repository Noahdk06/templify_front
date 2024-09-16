import React, { useState } from 'react';
import './pdepagos.css';

const Pdepagos = () => {
  const [selectedDuration, setSelectedDuration] = useState('3 Meses');

  // Definimos los precios para cada plan según la duración seleccionada
  const prices = {
    '3 Meses': {
      personal: 10,
      startup: 22,
      empresa: 165,
      plazo: 90
    },
    '6 Meses': {
      personal: 18,
      startup: 40,
      empresa: 300,
      plazo: 180
    },
    '9 Meses': {
      personal: 25,
      startup: 54,
      empresa: 420,
      plazo: 270
    },
    'Anual': {
      personal: 32,
      startup: 62,
      empresa: 530,
      plazo: 365
    }
  };

  // Función que maneja el cambio de duración
  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);  // Aquí usamos setSelectedDuration
  };

  const handlePaymentSelection = async (plan) => {
    const token = localStorage.getItem('token'); // Obtener el token
    const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario

    // Validar si existe una sesión
    if (!token || !user) {
      alert("No hay una sesión iniciada. Por favor, inicia sesión para continuar.");
      return;  // Salir de la función si no hay sesión
    }

    const plazo = prices[selectedDuration].plazo;
    const precio = prices[selectedDuration][plan.toLowerCase()];

    try {
      const response = await fetch('http://localhost:3000/seleccionarPdP', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Usar el token en el encabezado
        },
        body: JSON.stringify({
          PdP: plan,
          nombrePdP: plan,
          precio: precio,
          plazo: plazo,
          userId: user.id // Enviar el ID del usuario al backend
        })
      });

      if (response.ok) {
        const data = await response.json();  // Opcional, puedes eliminar esta línea si no la necesitas
        console.log(data);  // Opcional, puedes eliminar esta línea si no la necesitas
        alert("Plan de Pago aplicado correctamente");
      } else {
        console.error("Error al aplicar el plan de pago");
        alert("Error al aplicar el plan de pago");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud");
    }
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
              onClick={() => handleDurationChange(duration)}  // Aquí usamos setSelectedDuration
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
            <p><strong>${prices[selectedDuration].personal} USD</strong></p>
            <button onClick={() => handlePaymentSelection('Personal')}>Proceder al pago</button>
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
            <p><strong>${prices[selectedDuration].startup} USD</strong></p>
            <button onClick={() => handlePaymentSelection('Start-Up')}>Proceder al pago</button>
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
            <p><strong>${prices[selectedDuration].empresa} USD</strong></p>
            <button onClick={() => handlePaymentSelection('Empresa')}>Proceder al pago</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pdepagos;