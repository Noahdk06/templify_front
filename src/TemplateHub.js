import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Templatehub.css';

const BACKEND_URL = 'http://localhost:3033'; // Cambiar si es necesario.

const TemplateHub = () => {
  const [personalTemplates, setPersonalTemplates] = useState([]);
  const [publicTemplates, setPublicTemplates] = useState([]);
  const [loadingPersonal, setLoadingPersonal] = useState(false);
  const [loadingPublic, setLoadingPublic] = useState(false);
  const [errorPersonal, setErrorPersonal] = useState(null);
  const [errorPublic, setErrorPublic] = useState(null);
  const navigate = useNavigate();

  // Crear un nuevo template personal
  const createTemplate = async () => {
    const nombre = prompt('Ingrese el nombre del nuevo template:');
    if (!nombre) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/api/user/crearTemplate`,
        { nombre },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { templateId } = response.data;
      console.log('Template creado con éxito. ID:', templateId);

      // Redirigir al editor del nuevo template
      navigate(`/template/${templateId}`);
    } catch (err) {
      console.error('Error al crear el template:', err);
      alert('Ocurrió un error al crear el template.');
    }
  };

  // Cargar templates personales
  useEffect(() => {
    const fetchPersonalTemplates = async () => {
      setLoadingPersonal(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_URL}/api/user/obtenerTemplates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPersonalTemplates(response.data.archivos);
        setErrorPersonal(null);
      } catch (err) {
        setErrorPersonal('Error al cargar los templates personales.');
        console.error('Error al obtener los templates personales:', err);
      } finally {
        setLoadingPersonal(false);
      }
    };

    fetchPersonalTemplates();
  }, []);

  // Cargar templates públicos
  useEffect(() => {
    const fetchPublicTemplates = async () => {
      setLoadingPublic(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user/obtenerTemplatesPublicos`);
        setPublicTemplates(response.data.templates);
        setErrorPublic(null);
      } catch (err) {
        setErrorPublic('Error al cargar los templates públicos.');
        console.error('Error al obtener los templates públicos:', err);
      } finally {
        setLoadingPublic(false);
      }
    };

    fetchPublicTemplates();
  }, []);

  return (
    <div className="templates-hub">
      <Header />
      <Main
        personalTemplates={personalTemplates}
        publicTemplates={publicTemplates}
        loadingPersonal={loadingPersonal}
        loadingPublic={loadingPublic}
        errorPersonal={errorPersonal}
        errorPublic={errorPublic}
        createTemplate={createTemplate}
      />
    </div>
  );
};

const Header = () => (
  <header className="templates-header">
    <h1>Explora Nuestros Templates</h1>
    <p>Encuentra el template perfecto para tu proyecto de cartelería digital. Personaliza y utiliza nuestras plantillas de manera intuitiva y eficiente.</p>
  </header>
);

const Main = ({ personalTemplates, publicTemplates, loadingPersonal, loadingPublic, errorPersonal, errorPublic, createTemplate }) => (
  <main className="templates-main">
    <div className="templates-content">
      <Section title="Públicos" templates={publicTemplates} loading={loadingPublic} error={errorPublic} />
      <Section
        title="Personales"
        templates={personalTemplates}
        loading={loadingPersonal}
        error={errorPersonal}
        createTemplate={createTemplate}
      />
    </div>
  </main>
);

const Section = ({ title, templates, loading, error, createTemplate }) => (
  <section className="templates-section">
    <h2 className="section-title">{title}</h2>
    {title === 'Personales' && (
      <button className="create-template-button" onClick={createTemplate}>
        Crear Nuevo Template
      </button>
    )}
    <div className="images">
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading &&
        !error &&
        templates.map((template) => (
          <Link to={`/template/${template.id}`} key={template.id} className="template-card">
            <img src={template.linktemplate} alt={template.nombre} />
            <p>{template.nombre}</p>
          </Link>
        ))}
    </div>
  </section>
);

export default TemplateHub;
