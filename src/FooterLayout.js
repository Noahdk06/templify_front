import React from 'react';
import './FooterLayout.css';

function FooterLayout() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h3>INICIATE</h3>
        <div className="footer-content">
          <div>SUBSCRIBITE A NUESTRO SERVICIO</div>
          <div>Tutoriales de uso de nuestro servicio</div>
        </div>
      </div>

      <div className="footer-section">
        <h3>EDUCACION</h3>
        <div className="footer-content">
          <div>¿Qué es DEX MANAGER?</div>
          <div>¿Cómo funciona la cartelería digital?</div>
        </div>
      </div>

      <div className="footer-section">
        <h3>EMPRESAS QUE CONFIARON EN NOSOTROS</h3>
        <div className="footer-logos">
          <img src="public/img/BK.png" alt="Burger King" />
          <img src="public/img/pepsi.png" alt="Pepsi" />
          <img src="public/img/SIA.png" alt="SIA" />
          <img src="public/img/cocacola.png" alt="Coca-Cola" /> {/* Reemplazado */}
        </div>
      </div>

      <div className="footer-section">
        <h3>CONTACTO</h3>
        <div className="footer-contact">
          <p>+54 (911) 4187 3255</p>
          <p>UrielCwriembaum@gmail.com</p>
          <div className="footer-icons">
            <img src="/path-to-whatsapp-icon.png" alt="WhatsApp" />
            <img src="/path-to-instagram-icon.png" alt="Instagram" />
            <img src="/path-to-telegram-icon.png" alt="Telegram" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLayout;
