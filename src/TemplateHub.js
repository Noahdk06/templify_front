import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Templatehub.css';

const BACKEND_URL = 'http://localhost:3033';

const TemplatesHub = () => {
  const [personalTemplates, setPersonalTemplates] = useState([]);
  const navigate = useNavigate();

  const fetchPersonalTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/user/obtenerTemplates`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setPersonalTemplates(response.data.templates);
    } catch (error) {
      console.error('Error al obtener templates personales:', error);
    }
  };

  const createNewTemplate = () => {
    navigate('/Editor?temp=true'); // Redirige al editor con un template temporal
  };

  useEffect(() => {
    fetchPersonalTemplates();
  }, []);

  return (
    <div className="templates-hub">
      <header className="templates-header">
        <h1>Template Hub</h1>
        <p>Administra y edita tus templates personales o explora los públicos.</p>
      </header>
      <main className="templates-main">
        <section className="templates-section">
          <h2>Personales</h2>
          <button className="create-template-button" onClick={createNewTemplate}>
            Crear Nuevo Template
          </button>
          <div className="templates-list">
            {personalTemplates.map((template) => (
              <Link key={template.id} to={`/editor?id=${template.id}`}>
                <div className="template-card">
                  <p>{template.nombre}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="templates-section">
          <h2>Públicos</h2>
          <p>Próximamente...</p>
        </section>
      </main>
    </div>
  );
};

export default TemplatesHub;
