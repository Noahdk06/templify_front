import React from 'react';
import './App.css';
import renderNavbar from './navbar'

function App() {
  return (
    <div className="container">
      <renderNavbar/>
      <div className="form-container">
        <form className="registration-form">
          <div className="form-group">
            <input type="text" id="nombre" name="nombre" placeholder="Nombre" />
          </div>
          <div className="form-group">
            <input type="text" id="apellido" name="apellido" placeholder="Apellido" />
          </div>
          <div className="form-group">
            <input type="text" id="usuario" name="usuario" placeholder="Usuario" />
          </div>
          <div className="form-group">
            <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" />
          </div>
          <div className="button-group">
            <button type="submit" className="btn register-btn">Registrarse</button>
            <button type="button" className="btn login-btn">Iniciar sesión</button>
          </div>
        </form>
        <div className="social-login">
          <button className="btn social-button google">Usar Google</button>
          <button className="btn social-button apple">Usar Apple</button>
          <button className="btn social-button facebook">Usar Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default App;
