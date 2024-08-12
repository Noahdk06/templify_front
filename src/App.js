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
import Navbar from './navbar'; // Importa la Navbar

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* La Navbar se renderiza aquí, fuera del componente Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/templates" element={<TemplatesHub />} />
          <Route path="/support" element={<Support />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/bibliotecadearchivos" element={<BibliotecaDeArchivos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
