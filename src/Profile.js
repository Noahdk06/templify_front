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

  const [formData, setFormData] = useState({
    nombre: { value: '', password: '' },
    correo: { value: '', password: '' },
    empresa: { value: '', password: '' },
    plan: { value: '', password: '' },
    telefono: { value: '', password: '' },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No se ha iniciado sesión.');
          return;
        }
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [field]: { ...formData[field], [name]: value },
    });
  };

  const handleSaveClick = async (field) => {
    try {
      const token = localStorage.getItem('token');
      const { value, password } = formData[field];
      const response = await axios.patch(
        `/api/user/updateProfile`,
        { field, value, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEditMode({ ...editMode, [field]: false });
        setUserData({ ...userData, [field]: value });
      } else {
        console.error(`Error updating ${field}:`, response.data.message);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const renderEditForm = (field, placeholder) => (
    <div className="inline-form">
      <input
        type="text"
        name="value"
        value={formData[field].value}
        onChange={(e) => handleInputChange(e, field)}
        placeholder={placeholder}
        className="input-field"
      />
      <input
        type="password"
        name="password"
        value={formData[field].password}
        onChange={(e) => handleInputChange(e, field)}
        placeholder="Contraseña"
        className="input-field"
      />
      <button className="save-button" onClick={() => handleSaveClick(field)}>
        Guardar
      </button>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img
          src="/path-to-avatar.png"
          alt="Profile Avatar"
          className="profile-avatar"
        />
        <h3>{userData.nombre || 'Usuario'}</h3>
        <p>{userData.plan || 'Sin plan activo'}</p>
        <p>{userData.empresa || 'Sin empresa'}</p>
        <button className="delete-user-button">Eliminar usuario</button>
      </div>

      <div className="profile-details">
        <h3>Información del usuario</h3>

        <div className="info-row">
          <strong>Nombre:</strong>
          <span>{userData.nombre || 'No disponible'}</span>
          {editMode.nombre ? (
            renderEditForm('nombre', 'Nuevo nombre')
          ) : (
            <button className="edit-button" onClick={() => handleEditClick('nombre')}>Editar</button>
          )}
        </div>

        <div className="info-row">
          <strong>Correo:</strong>
          <span>{userData.correo || 'No disponible'}</span>
          {editMode.correo ? (
            renderEditForm('correo', 'Nuevo correo')
          ) : (
            <button className="edit-button" onClick={() => handleEditClick('correo')}>Editar</button>
          )}
        </div>

        <div className="info-row">
          <strong>Empresa:</strong>
          <span>{userData.empresa || 'No disponible'}</span>
          {editMode.empresa ? (
            renderEditForm('empresa', 'Nueva empresa')
          ) : (
            <button className="edit-button" onClick={() => handleEditClick('empresa')}>Editar</button>
          )}
        </div>

        <div className="info-row">
          <strong>Teléfono:</strong>
          <span>{userData.telefono || 'No disponible'}</span>
          {editMode.telefono ? (
            renderEditForm('telefono', 'Nuevo teléfono')
          ) : (
            <button className="edit-button" onClick={() => handleEditClick('telefono')}>Editar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;