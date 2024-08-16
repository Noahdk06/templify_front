import React, { useState } from 'react';
import axios from 'axios';
import './bibliotecadearchivos.css';

const BACKEND_URL = 'http://localhost:3033';

const BibliotecaDeArchivos = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [fileList, setFileList] = useState([]);

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
    formData.append('file', e.target.elements.file.files[0]);  // Asumiendo que el input file tiene el nombre 'file'
    formData.append('bucketName', 'tu-bucket');  // Cambia 'tu-bucket' por el nombre real del bucket
    formData.append('key', fileName);  // Nombre del archivo
    formData.append('contentType', fileType);  // Tipo de contenido del archivo

    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/cargarArchivos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
      await axios.post(`${BACKEND_URL}/api/user/eliminarArchivos`, {
        bucketName: 'tu-bucket',  // Cambia 'tu-bucket' por el nombre real del bucket
        key: fileToDelete.name,  // Nombre del archivo a eliminar
      });

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
                onChange={(e) => setFileType(e.target.files[0].type)}
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
