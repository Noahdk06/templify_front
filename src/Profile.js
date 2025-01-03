import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const BACKEND_URL = 'http://localhost:3033';

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    mail: '',
    empresa: '',
    plan: '',
    telefono: '',
  });

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [imageUpdateCounter, setImageUpdateCounter] = useState(0); // Contador para forzar actualización de imagen
  const [editMode, setEditMode] = useState({
    nombre: false,
    mail: false,
    empresa: false,
    plan: false,
    telefono: false,
  });

  const [formData, setFormData] = useState({
    nombre: '',
    mail: '',
    empresa: '',
    plan: '',
    telefono: '',
  });

  // Obtener los datos del perfil y cargar la imagen de perfil al recargar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Obtener los datos del perfil
        const profileResponse = await axios.get(`${BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileResponse.status === 200) {
          setUserData({
            nombre: profileResponse.data.nombre,
            mail: profileResponse.data.mail,
            empresa: profileResponse.data.empresa,
            plan: profileResponse.data.plan,
            telefono: profileResponse.data.telefono,
          });
        } else {
          console.error('Error al obtener los datos del perfil:', profileResponse.data.message);
        }

        // Obtener la foto de perfil con un parámetro único para evitar caché
        const fotoPerfilResponse = await axios.get(`${BACKEND_URL}/api/user/obtenerFotoPerfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (fotoPerfilResponse.status === 200 && fotoPerfilResponse.data.fotoperfil) {
          // Añadir el contador como parámetro para evitar la caché
          setProfileImageUrl(`${fotoPerfilResponse.data.fotoperfil}?t=${imageUpdateCounter}`);
        } else {
          setProfileImageUrl(null); // Asegurarse de que no hay URL si no existe la foto de perfil
          console.error('Error al obtener la foto de perfil:', fotoPerfilResponse.data.message);
        }
        
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error.message || error.response.data);
      }
    };

    fetchData();
  }, [imageUpdateCounter]); // Ejecutar cada vez que el contador cambia

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

      // Limpia temporalmente el estado antes de actualizar para forzar el re-renderizado
      setProfileImageUrl(null);
      setTimeout(() => {
        setProfileImageUrl(`${response.data.fileUrl}?t=${new Date().getTime()}`);
      }, 100);

      // Incrementa el contador para asegurar un cambio en `useEffect`
      setImageUpdateCounter((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error al subir la imagen de perfil:', error);
    }
  };
  
  // Función para eliminar la imagen de perfil
  const handleProfileImageDelete = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Extraer el `key` del archivo
      const key = profileImageUrl.split('.amazonaws.com/')[1];
      if (!key) {
        console.error("Error: No se pudo obtener el key del archivo para eliminarlo.");
        return;
      }
  
      await axios.post(`${BACKEND_URL}/api/user/eliminarFotoPerfil`, {
        linkArchivo: key,  // Enviar solo el `key` al backend
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Actualizar el estado para reflejar que no hay foto de perfil
      setProfileImageUrl(null);
      document.getElementById('profile-image-input').value = ""; // Limpiar el input de archivo
  
    } catch (error) {
      console.error('Error al eliminar la imagen de perfil:', error);
    }
  };

  const handleEditClick = (field) => {
    setEditMode({
      nombre: false,
      mail: false,
      empresa: false,
      plan: false,
      telefono: false,
      [field]: true
    });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveClick = async (field) => {
    try {
      const token = localStorage.getItem('token');
      const value = formData[field];
      const response = await axios.patch(
        `${BACKEND_URL}/api/user/updateProfile`,
        { field, value },
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
        console.error(`Error al actualizar ${field}:`, response.data.message);
      }
    } catch (error) {
      console.error(`Error al actualizar ${field}:`, error.response ? error.response.data : error.message);
    }
  };

  const handleCancelClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: false,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: '',
    }));
  };

  // Formulario de edición
  const renderEditForm = (field, placeholder) => (
    <div className="inline-form">
      <input
        type="text"
        name="value"
        value={formData[field]}
        onChange={(e) => handleInputChange(e, field)}
        placeholder={placeholder}
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
          <strong>Mail:</strong>
          <span>{userData.mail || 'No disponible'}</span>
          {editMode.mail ? (
            renderEditForm('mail', 'Nuevo mail')
          ) : (
            <button className="edit-button" onClick={() => handleEditClick('mail')}>Editar</button>
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
