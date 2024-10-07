import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  // Verificar si hay un token en localStorage para mantener la sesión activa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Mantiene la sesión activa si hay un token
    }
  }, [setIsLoggedIn]); // Se ejecuta solo cuando el componente se monta

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/img/logo.png" alt="Logo" />
      </Link>
      <div className="nav-links">
        <Link to="/">Qué hacemos</Link>
        <Link to="/templates">Templates Hub</Link>
        <Link to="/support">Soporte Técnico</Link>
        <Link to="/pdepago">Nuestros Planes</Link>
        <Link to="/bibliotecadearchivos">Biblioteca de Archivos</Link>
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="profile-btn">Mi Perfil</Link>
            <button 
              onClick={() => { 
                localStorage.removeItem('token'); 
                localStorage.removeItem('user'); 
                setIsLoggedIn(false); // Cierra sesión y actualiza el estado
              }} 
              className="logout-btn"
            >
              Cerrar Sesión
            </button>
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
