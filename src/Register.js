// src/Register.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Asegúrate de tener un archivo CSS para estilizar el componente

const Register = () => {
  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="company">Empresa (opcional)</label>
          <input type="text" id="company" name="company" />
        </div>
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
      <div className="social-buttons">
        <button className="social-button google">Registrarse con Google</button>
        <button className="social-button facebook">Registrarse con Facebook</button>
        <button className="social-button apple">Registrarse con Apple</button>
      </div>
      <div className="login-link">
        <span>¿Ya tienes cuenta?</span>
        <Link to="/login">Inicia sesión aquí</Link>
      </div>
    </div>
  );
};

export default Register;
