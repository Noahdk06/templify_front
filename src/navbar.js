import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src='/images/Captura_de_pantalla_2024-06-24_082542-removebg-preview.png' alt="Logo" />
      </Link>
      <div className="nav-links">
        <Link to="/">Qué hacemos</Link>
        <Link to="/templates">Templates Hub</Link>
        <Link to="/support">Soporte Técnico</Link>
        <Link to="/plans">Nuestros Planes</Link>
        <Link to="/bibliotecadearchivos">Biblioteca de Archivos</Link>
      </div>
      <div className="auth-buttons">
        <Link to="/login" className="login-btn">Iniciar Sesión</Link>
        <Link to="/register" className="register-btn">Registrarse</Link>
      </div>
    </nav>
  );
};

export default Navbar;
