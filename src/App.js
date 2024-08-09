import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import TemplatesHub from './TemplateHub';
import Support from './Support'; // Importa el nuevo componente de soporte
import Plans from './Plans'; // Importa el nuevo componente de planes

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/templates" element={<TemplatesHub />} />
          <Route path="/support" element={<Support />} /> {/* Ruta para la página de soporte técnico */}
          <Route path="/plans" element={<Plans />} /> {/* Ruta para la página de nuestros planes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
