import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const handleRegister = () => {
    window.location.href = 'registro.html';
  };

  return (
    <div className="registration-form">
      <div className="left-half">
        <form id="loginForm">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Iniciar sesión</button>
          <button type="button" onClick={handleRegister} className="toggle-button">Registrarse</button>
        </form>
      </div>
      <div className="right-half">
        <a href="#" className="social-button google"><i className="fa fa-google"></i> Usar Google</a>
        <a href="#" className="social-button apple"><i className="fa fa-apple"></i> Usar Apple</a>
        <a href="#" className="social-button facebook"><i className="fa fa-facebook"></i> Usar Facebook</a>
      </div>
    </div>
  );
}

export default App;
