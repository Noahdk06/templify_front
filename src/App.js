import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home';
import Login from './Login';
import Register from './Register';
import TemplatesHub from './TemplateHub';
import Support from './Support';
import BibliotecaDeArchivos from './bibliotecadearchivos';
import Navbar from './navbar';
import Profile from './Profile';
import MetodoDePago from './metodoDePago'; 
import Editor from './Editor'; // Importamos el nuevo archivo Editor
import Pdepagos from './pdepagos';

import FooterLayout from './FooterLayout'; 
import ProtectedRoute from './components/protectedRoute';
import Unauthorized from './unauthorized';
import Chatbot from './Chatbot'; 
import ContactForm from './ContactForm'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si hay un token en el localStorage para mantener la sesión
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/templates" element={<TemplatesHub />} />
            <Route path="/support" element={<Support />} />
            <Route path="/MetodoDePago" element={<MetodoDePago />} />

            {/* Nuevas rutas */}
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/contact" element={<ContactForm />} />

            {/* Rutas protegidas */}
            <Route path="/bibliotecadearchivos" element={
              <ProtectedRoute>
                <BibliotecaDeArchivos />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/pdepago" element={ 
              <ProtectedRoute>
                <Pdepagos />
              </ProtectedRoute>
            } />

            {/* Cambiamos Template por Editor */}
            <Route path="/template/:id" element={<Editor />} />

            {/* Ruta de advertencia por acceso no autorizado */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
        <FooterLayout />
      </div>
    </Router>
  );
}

export default App;
