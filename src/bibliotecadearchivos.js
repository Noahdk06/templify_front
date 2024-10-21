import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bibliotecadearchivos.css';

const BACKEND_URL = 'http://localhost:3033';

const BibliotecaDeArchivos = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [fileName, setFileName] = useState('');  // Nombre del archivo
  const [fileType, setFileType] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [fileList, setFileList] = useState([]);
  const [uploadError, setUploadError] = useState(null);

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
      setFileList(response.data.archivos); // Incluye 'linkarchivo' y 'nombrearchivo'
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

      // Actualizar la lista de archivos agregando el nuevo archivo subido con la URL recibida
      setFileList([...fileList, { 
        id: response.data.archivoId,  // Guardar el ID del archivo
        nombrearchivo: fileName, 
        linkarchivo: response.data.fileUrl, 
        format: fileFormat 
      }]);

      // Cerrar el pop-up al completar la subida exitosa
      handleCancel(); // Llama a la función para cerrar y reiniciar el formulario
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      setUploadError('Error al cargar el archivo. Intenta de nuevo.');
    }
  };

  const handleDelete = async (fileToDelete) => {
    try {
      const token = localStorage.getItem('token');  // Obtener el token almacenado
      console.log('Eliminando archivo con ID y Link:', fileToDelete.id, fileToDelete.linkarchivo);
  
      // Verifica que el linkarchivo es una URL válida
      if (!fileToDelete.linkarchivo || !fileToDelete.linkarchivo.startsWith('https://')) {
        console.error('El link del archivo no es válido:', fileToDelete.linkarchivo);
        return;
      }
  
      // Llamada al backend para eliminar el archivo usando el ID y el link
      await axios.post(`${BACKEND_URL}/api/user/eliminarArchivos`, {
        idArchivo: fileToDelete.id,      // Enviamos el ID del archivo a eliminar
        linkArchivo: fileToDelete.linkarchivo  // Enviamos el link del archivo para eliminarlo de S3
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Enviar el token en los headers
        }
      });
  
      // Eliminar el archivo de la lista local después de eliminarlo del backend
      setFileList(fileList.filter(file => file.id !== fileToDelete.id));
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
              {/* Verifica si el archivo es una imagen y la muestra directamente, o si es un enlace */}
              {file.linkarchivo && (file.linkarchivo.endsWith('.png') || file.linkarchivo.endsWith('.jpg') || file.linkarchivo.endsWith('.gif')) ? (
                <img src={file.linkarchivo} alt={file.nombrearchivo} className="file-image" />
              ) : (
                // Agrega el `target="_blank"` y `rel="noopener noreferrer"` para mayor seguridad
                <a 
                  href={file.linkarchivo} 
                  target="_blank" 
                  rel="noopener noreferrer"  // Previene problemas de seguridad
                >
                  {file.nombrearchivo || "Archivo sin nombre"}
                </a>
              )}
              <button className="delete-button" onClick={() => handleDelete(file)}>✖</button>
            </div>
          ))
        )}
      </div>

      {showUploadForm && (
        <div className="upload-form-overlay">
          <form className="upload-form" onSubmit={handleFileSubmit}>
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
          {uploadError && <p className="error-message">{uploadError}</p>}
        </div>
      )}
    </div>
  );
};

export default BibliotecaDeArchivos;
