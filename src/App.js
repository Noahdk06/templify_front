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
import Template from './Template';
import Pdepagos from './pdepagos';
import FooterLayout from './FooterLayout'; // Importa el FooterLayout
import ProtectedRoute from './components/protectedRoute'; // Importa el ProtectedRoute
import Unauthorized from './unauthorized'; // Importa el componente de advertencia

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
      <div className="app-container"> {/* Cambié la clase a app-container */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content-container"> {/* Añadí este contenedor para el contenido */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/templates" element={<TemplatesHub />} />
            <Route path="/support" element={<Support />} />

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

            <Route path="/template/:id" element={<Template />} />

            {/* Ruta de advertencia por acceso no autorizado */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
        <FooterLayout /> {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
