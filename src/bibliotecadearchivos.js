import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bibliotecadearchivos.css';

const BACKEND_URL = 'http://localhost:3033';

const BibliotecaDeArchivos = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [fileList, setFileList] = useState([]);

  // Función para obtener los archivos del usuario desde el backend
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token almacenado
      const response = await axios.post(`${BACKEND_URL}/api/user/obtenerArchivos`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Enviar el token en los headers
        }
      });
      
      // Actualizar la lista de archivos con la respuesta del servidor
      setFileList(response.data.archivos);
    } catch (error) {
      console.error('Error al cargar archivos:', error);
    }
  };

  useEffect(() => {
    // Llamamos a fetchFiles cuando el componente se monta para cargar archivos existentes
    fetchFiles();
  }, []);

  const handleFileUploadClick = () => {
    setShowUploadForm(true);
  };

  const handleCancel = () => {
    setShowUploadForm(false);
    setFileName('');
    setFileType('');
    setFileFormat('');
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar el archivo y sus detalles
    const formData = new FormData();
    const fileInput = e.target.elements.file.files[0];
    
    if (!fileInput) {
      console.error('No se seleccionó ningún archivo.');
      return;
    }

    formData.append('file', fileInput);
    formData.append('key', fileName); // Nombre del archivo
    formData.append('contentType', fileType); // Tipo de contenido del archivo

    try {
      const token = localStorage.getItem('token'); // Obtener el token almacenado
      const response = await axios.post(`${BACKEND_URL}/api/user/cargarArchivos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Enviar el token en los headers
        },
      });

      console.log('Archivo subido:', response.data);
      
      // Actualizar la lista de archivos agregando el nuevo archivo subido
      setFileList([...fileList, { name: fileName, type: fileType, format: fileFormat }]);
      setShowUploadForm(false);
      setFileName('');
      setFileType('');
      setFileFormat('');
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };

  const handleDelete = async (fileToDelete) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token almacenado
      await axios.post(`${BACKEND_URL}/api/user/eliminarArchivos`, {
        key: fileToDelete.name, // Nombre del archivo a eliminar
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Enviar el token en los headers
        }
      });

      // Eliminar el archivo de la lista local después de eliminarlo del backend
      setFileList(fileList.filter(file => file !== fileToDelete));
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  return (
    <div className="biblioteca-de-archivos">
      <button className="upload-button" onClick={handleFileUploadClick}>
        + Subir archivos
      </button>

      <div className="file-list">
        {fileList.length === 0 ? (
          <p>No hay archivos subidos.</p>
        ) : (
          fileList.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name} ({file.format})</span>
              <button className="delete-button" onClick={() => handleDelete(file)}>✖</button>
            </div>
          ))
        )}
      </div>

      {showUploadForm && (
        <div className="upload-form-overlay">
          <form className="upload-form" onSubmit={handleFileSubmit}>
            <div className="file-icon">
              {/* Icono de archivo, puede usar FontAwesome o una imagen */}
            </div>
            <label>
              Nombre:
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </label>
            <label>
              Tipo de archivo:
              <select
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
                required
              >
                <option value="">Seleccionar</option>
                <option value="GIF">GIF</option>
                <option value="PNG">PNG</option>
                <option value="MP4">MP4</option>
                <option value="JPG">JPG</option>
              </select>
            </label>
            <label>
              Archivo:
              <input
                type="file"
                name="file"
                onChange={(e) => setFileType(e.target.files[0]?.type)}
                required
              />
            </label>
            <div className="form-buttons">
              <button type="submit" className="submit-button">Cargar</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BibliotecaDeArchivos;
