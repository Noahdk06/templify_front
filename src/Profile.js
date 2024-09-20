import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    empresa: '',
    plan: '',
    telefono: '',
  });
  const [editMode, setEditMode] = useState({
    nombre: false,
    correo: false,
    empresa: false,
    plan: false,
    telefono: false,
  });

  useEffect(() => {
    // Obtener datos del perfil del usuario desde el backend
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile'); // Ajusta la ruta de tu API
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (field) => {
    try {
      await axios.put(`/api/profile/${field}`, { [field]: userData[field] });
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div className="profile-container">
      {/* Sección lateral izquierda */}
      <div className="profile-sidebar">
        <img src="/path-to-avatar.png" alt="Profile Avatar" className="profile-avatar" />
        <h3>{userData.nombre || 'Usuario'}</h3>
        <p>{userData.plan ? userData.plan : 'Sin plan activo'}</p>
        <p>{userData.empresa ? userData.empresa : 'Sin empresa'}</p>
        <button className="delete-user-button">Eliminar usuario</button>
      </div>

      {/* Sección derecha: Información del perfil */}
      <div className="profile-details">
        <h3>Información del usuario</h3>

        {/* Fila para Nombre */}
        <div className="info-row">
          <div className="info-text">
            <p><strong>Nombre:</strong> {userData.nombre || 'No disponible'}</p>
          </div>
          <button className="edit-button" onClick={() => handleEditClick('nombre')}>
            {editMode.nombre ? 'Guardar' : 'Editar'}
          </button>
        </div>

        {/* Fila para Correo */}
        <div className="info-row">
          <div className="info-text">
            <p><strong>Correo:</strong> {userData.correo || 'No disponible'}</p>
          </div>
          <button className="edit-button" onClick={() => handleEditClick('correo')}>
            {editMode.correo ? 'Guardar' : 'Editar'}
          </button>
        </div>

        {/* Fila para Empresa */}
        <div className="info-row">
          <div className="info-text">
            <p><strong>Empresa:</strong> {userData.empresa || 'Sin empresa'}</p>
          </div>
          <button className="edit-button" onClick={() => handleEditClick('empresa')}>
            {editMode.empresa ? 'Guardar' : 'Editar'}
          </button>
        </div>

        {/* Fila para Plan */}
        <div className="info-row">
          <div className="info-text">
            <p><strong>Plan de pago:</strong> {userData.plan || 'Sin plan activo'}</p>
          </div>
          <button className="edit-button" onClick={() => handleEditClick('plan')}>
            {editMode.plan ? 'Guardar' : 'Editar'}
          </button>
        </div>

        {/* Fila para Número telefónico */}
        <div className="info-row">
          <div className="info-text">
            <p><strong>Número telefónico:</strong> {userData.telefono || 'No disponible'}</p>
          </div>
          <button className="edit-button" onClick={() => handleEditClick('telefono')}>
            {editMode.telefono ? 'Guardar' : 'Agregar número telefónico'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
