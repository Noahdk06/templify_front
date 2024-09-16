import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Template from './Template';
import Pdepagos from './pdepagos';
import FooterLayout from './FooterLayout'; // Importa el FooterLayout

function App() {
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
          <Route path="/template/:id" element={<Template />} />
          <Route path="/pdepago" element={<Pdepagos />} />
        </Routes>
        <FooterLayout /> {/* Agrega el Footer */}
      </div>
    </Router>
  );
}

export default App;
