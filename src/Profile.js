import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const BACKEND_URL = 'http://localhost:3033';

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    empresa: '',
    plan: '',
    telefono: '',
  });

  const [profileImageUrl, setProfileImageUrl] = useState(null);
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

  // Obtener los datos del perfil y cargar la imagen de perfil al recargar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user?.id) {
          console.error('No se ha iniciado sesión o falta el ID de usuario.');
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData({
            nombre: response.data.nombre,
            correo: response.data.correo,
            empresa: response.data.empresa,
            plan: response.data.plan,
            telefono: response.data.telefono,
          });

          // Asegurarse de que el URL de la imagen esté correctamente cargado
          setProfileImageUrl(response.data.fotoperfil || null);
        } else {
          console.error('Error al obtener los datos del perfil:', response.data.message);
        }
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error.message || error.response.data);
      }
    };

    fetchData();
  }, []);

  // Función para subir la imagen de perfil
  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
      console.error('Solo se permiten archivos JPG o PNG.');
      return;
    }
  
    const data = new FormData();
    data.append('file', file);
    data.append('key', 'profile'); // Aseguramos que el key sea 'profile'
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BACKEND_URL}/api/user/cargarArchivos`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileImageUrl(response.data.fileUrl);
    } catch (error) {
      console.error('Error al subir la imagen de perfil:', error);
    }
  };
  

  // Función para eliminar la imagen de perfil
  const handleProfileImageDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/api/user/eliminarArchivos`, {
        nombreArchivo: 'profile',
        linkArchivo: profileImageUrl,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileImageUrl(null);
      document.getElementById('profile-image-input').value = ""; // Limpiar el input de archivo
    } catch (error) {
      console.error('Error al eliminar la imagen de perfil:', error);
    }
  };

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
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
        `${BACKEND_URL}/api/user/updateProfile`,
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
      console.error(`Error updating ${field}:`, error.response ? error.response.data : error.message);
    }
  };

  const handleCancelClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: false,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: { value: '', password: '' },
    }));
  };

  // Formulario de edición
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
      <button className="cancel-button" onClick={() => handleCancelClick(field)}>
        Cancelar
      </button>
    </div>
  );

  // Contar el número de formularios en modo edición para ajustar el estilo
  const editCount = Object.values(editMode).filter(Boolean).length;

  return (
    <div className="profile-container" style={{ height: `${500 + editCount * 120}px` }}>
      <div className="profile-sidebar">
        <div className="profile-image-container">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="Foto de perfil" className="profile-avatar" />
          ) : (
            <div className="placeholder-avatar">Sin foto</div>
          )}
        </div>

        <h3>{userData.nombre || 'Usuario'}</h3>
        <p>{userData.plan || 'Sin plan activo'}</p>
        <p>{userData.empresa || 'Sin empresa'}</p>

        {profileImageUrl ? (
          <>
            <button className="update-profile-image-button" onClick={() => document.getElementById('profile-image-input').click()}>Actualizar</button>
            <button className="delete-profile-image-button" onClick={handleProfileImageDelete}>Eliminar</button>
          </>
        ) : (
          <button className="upload-profile-image-button" onClick={() => document.getElementById('profile-image-input').click()}>Subir Foto de Perfil</button>
        )}

        <input
          type="file"
          id="profile-image-input"
          style={{ display: 'none' }}
          accept="image/jpeg,image/png"
          onChange={handleProfileImageUpload}
        />
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
