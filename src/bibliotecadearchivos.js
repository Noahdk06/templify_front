import React, { useState } from 'react';
import './bibliotecadearchivos.css'; // Estilos específicos para la biblioteca de archivos


const BibliotecaDeArchivos = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleFileRemove = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  return (
    <div className="bibliotecadearchivos-container">
      <h2>Biblioteca de Archivos</h2>
      <div className="upload-section">
        <input type="file" id="fileInput" multiple onChange={handleFileUpload} />
      </div>
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index}>
            {file.name}
            <button onClick={() => handleFileRemove(file.name)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BibliotecaDeArchivos;
