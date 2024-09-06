import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './home';
import Login from './Login';
import Register from './Register';
import TemplatesHub from './TemplateHub';
import Support from './Support';
import plans from './Plans';
import BibliotecaDeArchivos from './bibliotecadearchivos';
import Navbar from './navbar';
import Profile from './Profile';
import Template from './Template';

const BACKEND_URL = 'http://localhost:3033';

function App() {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para gestionar la autenticación

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/data`)
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('Error al conectar con el backend', error);
      });
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Puedes limpiar el token o cualquier otro dato relacionado con la sesión aquí
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/templates" element={<TemplatesHub />} />
          <Route path="/support" element={<Support />} />
          <Route path="/plans" element={<plans />} />
          <Route path="/bibliotecadearchivos" element={<BibliotecaDeArchivos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/template/:id" element={<Template />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
