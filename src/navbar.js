import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      
      <Link to="/" className="logo">
        <img alt="Logo" src='../src/img/logo.png' />
      </Link>
      <div className="nav-links">
        <Link to="/">Qué hacemos</Link>
        <Link to="/templates">Templates Hub</Link>
        <Link to="/support">Soporte Técnico</Link>
        <Link to="/plans">Nuestros Planes</Link>
        <Link to="/bibliotecadearchivos">Biblioteca de Archivos</Link>
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="profile-btn">Mi Perfil</Link>
            <button onClick={() => setIsLoggedIn(false)} className="logout-btn">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Iniciar Sesión</Link>
            <Link to="/register" className="register-btn">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

//aa