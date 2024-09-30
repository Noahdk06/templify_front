import React, { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Route path="/bibliotecadearchivos" element={<BibliotecaDeArchivos />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/template/:id" element={<Template />} />
            <Route path="/pdepago" element={<Pdepagos />} />
          </Routes>
        </div>
        <FooterLayout /> {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
