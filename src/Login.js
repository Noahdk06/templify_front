import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica de autenticación

    // Cambia el estado de autenticación y redirige al usuario a la página de inicio
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="submit-button">Iniciar Sesión</button>
      </form>
      <div className="social-buttons">
        <button className="social-button google">Iniciar sesión con Google</button>
        <button className="social-button facebook">Iniciar sesión con Facebook</button>
        <button className="social-button apple">Iniciar sesión con Apple</button>
      </div>
      <div className="register-link">
        <span>¿No tienes cuenta?</span>
        <Link to="/register">Regístrate aquí</Link>
      </div>
    </div>
  );
};

export default Login;
