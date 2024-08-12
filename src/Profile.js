// src/Profile.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-picture">
          <img src="/images/default-profile.png" alt="Profile" />
        </div>
        <h2 className="username">gigatemplate</h2>
        <div className="subscription-status">
          <p>Plan de suscripción</p>
          <span>Prueba gratuita (7 días restantes)</span>
        </div>
        <p className="company">Empresa</p>
        <Link to="#" className="delete-user">Eliminar usuario</Link>
      </aside>

      <main className="profile-details">
        <section className="user-info">
          <h3>Información del usuario</h3>
          <div className="info-row">
            <p><strong>Nombre:</strong> Gigatemplates Droblas</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="info-row">
            <p><strong>Correo:</strong> Gigatemplates@gmail.com</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="info-row">
            <p><strong>Número:</strong> +1 615 1234-5456</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="info-row">
            <p><strong>Localidad:</strong> Tenesse</p>
            <button className="edit-button">Editar</button>
          </div>
        </section>
        <section className="templates-section">
          <h3>Mis templates</h3>
          <div className="templates-gallery">
            <Link to="/template/1">
              <img src="/images/template1.png" alt="Template 1" />
            </Link>
            <Link to="/template/2">
              <img src="/images/template2.png" alt="Template 2" />
            </Link>
            <Link to="/template/3">
              <img src="/images/template3.png" alt="Template 3" />
            </Link>
            <Link to="/template/4">
              <img src="/images/template4.png" alt="Template 4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
