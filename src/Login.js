import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const BACKEND_URL = 'http://localhost:3033';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/login`, { username, password });
  
      if (response.data.success) {
        // Guardar el token y el objeto `user` en el localStorage
        localStorage.setItem('token', response.data.token); // El token debe contener el id y el username
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Aquí almacenamos tanto `id` como `username`
  
        setIsLoggedIn(true); // Actualiza el estado de autenticación
        navigate('/'); // Redirige a la página de inicio
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error interno del servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
