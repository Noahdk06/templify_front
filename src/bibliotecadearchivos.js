import React, { useState } from 'react';
import './bibliotecadearchivos.css';

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

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (fileName && fileType && fileFormat) {
      setFileList([...fileList, { name: fileName, type: fileType, format: fileFormat }]);
      setShowUploadForm(false);
      setFileName('');
      setFileType('');
      setFileFormat('');
    }
  };

  const handleDelete = (fileToDelete) => {
    setFileList(fileList.filter(file => file !== fileToDelete));
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
