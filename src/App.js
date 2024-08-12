// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import Home from './home';
import Login from './Login';
import Register from './Register';
import TemplatesHub from './TemplateHub';
import Support from './Support';
import Plans from './Plans';
import BibliotecaDeArchivos from './bibliotecadearchivos';
import Navbar from './navbar';
import Profile from './Profile';
import Template from './Template'; // Componente para mostrar un template individual

const BACKEND_URL = 'http://localhost:3033'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/data`)
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('Error al conectar con el back', error);
      });
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/templates" element={<TemplatesHub />} />
          <Route path="/support" element={<Support />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/bibliotecadearchivos" element={<BibliotecaDeArchivos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/template/:id" element={<Template />} /> {/* Ruta dinámica para templates */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
