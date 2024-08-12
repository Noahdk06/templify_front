import React, { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
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
