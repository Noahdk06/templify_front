import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './Editor.css';

const BACKEND_URL = 'http://localhost:3033';

const Editor = () => {
  const { id } = useParams(); // Obtener el ID del template desde la URL
  const [htmlContent, setHtmlContent] = useState('<!DOCTYPE html><html><body></body></html>'); // Base inicial
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [bgColor, setBgColor] = useState('#e0f7fa');
  const [textContent, setTextContent] = useState('Agregar texto');
  const [zoom, setZoom] = useState(100);
  const [fontSize, setFontSize] = useState(16);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [showFileLibrary, setShowFileLibrary] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);

  // Cargar contenido HTML desde el backend
  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_URL}/api/user/obtenerContenidoTemplate/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHtmlContent(response.data.content); // Establecer el contenido obtenido
        setError(null);
      } catch (err) {
        console.error('Error al obtener el contenido HTML del template:', err);
        setError('Error al cargar el contenido del template.');
      } finally {
        setLoading(false);
      }
    };

    fetchHtmlContent();
  }, [id]);

  // Configurar canvas (esto se usa para dibujar gráficos si fuera necesario)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext('2d');
      context.scale(1, 1);
      context.lineCap = 'round';
      context.strokeStyle = '#000000';
      context.lineWidth = 2;
    }
  }, []);

  // Manejo de la pila de deshacer/rehacer
  useEffect(() => {
    setUndoStack((prev) => [...prev, elements]);
    setRedoStack([]);
  }, [elements]);

  // Función para añadir elementos
  const addElement = (type, fileUrl = '') => {
    const newElement = {
      id: Date.now(),
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      color: '#000000',
      content: type === 'text' ? textContent : '',
      url: type === 'image' ? fileUrl : '',
      fontSize: fontSize,
      fontStyle: 'normal',
      textDecoration: 'none',
      fontWeight: 'normal',
    };
    setElements((prevElements) => [...prevElements, newElement]);
  };

  // Eliminar un elemento seleccionado
  const removeElement = () => {
    if (selectedElement) {
      setElements(elements.filter((el) => el.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };

  // Cambiar el color de un elemento seleccionado
  const changeElementColor = (color) => {
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, color } : el))
      );
    }
  };

  // Manejo de deshacer/rehacer
  const handleUndo = () => {
    if (undoStack.length > 1) {
      setRedoStack([undoStack[undoStack.length - 1], ...redoStack]);
      setUndoStack(undoStack.slice(0, -1));
      setElements(undoStack[undoStack.length - 2]);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      setUndoStack([...undoStack, redoStack[0]]);
      setElements(redoStack[0]);
      setRedoStack(redoStack.slice(1));
    }
  };

  // Agregar imágenes desde la biblioteca de archivos
  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/user/obtenerArchivos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFileList(response.data.archivos);
      setFileError(null);
    } catch (error) {
      setFileError('Error al cargar los archivos.');
      console.error('Error al obtener archivos:', error);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileSelect = (fileUrl) => {
    setShowFileLibrary(false);
    addElement('image', fileUrl);
  };

  // Exportar como archivo HTML
  const exportAsHTML = () => {
    const htmlContent = `
      <html>
      <head>
        <style>
          body { background-color: ${bgColor}; }
          .element { position: absolute; }
        </style>
      </head>
      <body>
        ${elements.map((el) => {
          if (el.type === 'text') {
            return `<div class="element" style="left:${el.x}px; top:${el.y}px; font-size:${el.fontSize}px; color:${el.color}; font-weight:${el.fontWeight}; font-style:${el.fontStyle}; text-decoration:${el.textDecoration};">${el.content}</div>`;
          } else if (el.type === 'rect') {
            return `<div class="element" style="left:${el.x}px; top:${el.y}px; width:${el.width}px; height:${el.height}px; background-color:${el.color};"></div>`;
          } else if (el.type === 'circle') {
            return `<div class="element" style="left:${el.x}px; top:${el.y}px; width:${el.width}px; height:${el.height}px; background-color:${el.color}; border-radius:50%;"></div>`;
          } else if (el.type === 'image') {
            return `<img src="${el.url}" class="element" style="left:${el.x}px; top:${el.y}px; width:${el.width}px; height:${el.height}px;" alt="image"/>`;
          }
          return '';
        }).join('')}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template.html';
    link.click();
  };

  if (loading) return <p>Cargando contenido del template...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button onClick={() => addElement('rect')}>Agregar Rectángulo</button>
        <button onClick={() => addElement('circle')}>Agregar Círculo</button>
        <button onClick={() => addElement('text')}>Agregar Texto</button>
        <button onClick={removeElement}>Remover Elemento</button>
        <button onClick={() => setShowFileLibrary(true)}>Seleccionar Imagen</button>
        <button onClick={exportAsHTML}>Exportar como HTML</button>
      </div>

      <div className="editor-main">
        <iframe
          title="Editor de Template"
          srcDoc={htmlContent} // Inyectar el contenido HTML cargado
          style={{ width: '100%', height: '100vh', border: 'none' }}
        ></iframe>
      </div>

      {showFileLibrary && (
        <div className="file-library">
          <h3>Biblioteca de Archivos</h3>
          <button onClick={() => setShowFileLibrary(false)}>Cerrar</button>
          {fileError ? (
            <p>{fileError}</p>
          ) : (
            <ul>
              {fileList.map((file, index) => (
                <li key={index}>
                  <button onClick={() => handleFileSelect(file.linkarchivo)}>
                    {file.nombrearchivo}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;
