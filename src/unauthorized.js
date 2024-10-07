import React from 'react';
import { Link } from 'react-router-dom';
import './unauthorized.css'; // Opcional: puedes añadir un archivo CSS para estilos personalizados.

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>Debes iniciar sesion para visualizar esta pagina</h1>
      <p>Inicia sesión o regístrate para continuar.</p>
      <div className="button-group">
        <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-secondary">Registrarse</Link>
      </div>
    </div>
  );
};

export default Unauthorized;
