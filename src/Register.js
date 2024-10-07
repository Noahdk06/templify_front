import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const BACKEND_URL = 'http://localhost:3033';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    mail: '',
    empresa: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');  // Limpiar cualquier error previo
    setSuccessMessage('');  // Limpiar mensaje de éxito previo
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/register`, formData);
      if (response.status === 201) {
        setSuccessMessage('Registro exitoso. Puedes iniciar sesión ahora.');
        // Redirigir al usuario a la página de inicio de sesión
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Opcional: tiempo para mostrar el mensaje de éxito antes de redirigir
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Si el código de estado es 409, el nombre de usuario ya existe
        setError('El nombre de usuario ya está en uso, elige otro.');
      } else {
        // Otros posibles errores
        setError('Error al registrar el usuario. Intenta de nuevo.');
      }
      console.error('Error durante el registro:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Correo Electrónico</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="empresa">Empresa (opcional)</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
          />
        </div>
        {/* Mostrar el error en rojo si existe */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Mostrar el mensaje de éxito en verde si existe */}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
