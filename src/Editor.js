import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useParams } from 'react-router-dom';
import './Editor.css';

const BACKEND_URL = 'http://localhost:3033'; // Cambiar si es necesario.

const Editor = () => {
  const { templateId } = useParams(); // Obtenemos el ID del template desde la URL
  const [elements, setElements] = useState([]); // Elementos del canvas
  const [selectedElement, setSelectedElement] = useState(null); // Elemento seleccionado
  const [bgColor, setBgColor] = useState('#e0f7fa'); // Color de fondo
  const [zoom, setZoom] = useState(100); // Zoom inicial
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente
  const canvasRef = useRef(null);

  // Cargar el contenido del template si existe
  useEffect(() => {
    const fetchTemplateContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_URL}/api/user/obtenerContenidoTemplate/${templateId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const content = response.data.content || {};
        setElements(content.elements || []); // Cargar los elementos si existen
        setBgColor(content.bgColor || '#e0f7fa'); // Cargar el color de fondo si existe
      } catch (err) {
        console.error('Error al cargar el contenido del template:', err);
        // Si ocurre un error, el editor comienza vacío
        setElements([]);
        setBgColor('#e0f7fa');
      }
    };

    if (templateId) {
      fetchTemplateContent();
    }
  }, [templateId]);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      color: '#000000',
      content: type === 'text' ? 'Agregar texto' : '',
      fontSize,
      fontStyle: 'normal',
      textDecoration: 'none',
      fontWeight: 'normal',
    };
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const removeElement = () => {
    if (selectedElement) {
      setElements(elements.filter((el) => el.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };

  const changeElementColor = (color) => {
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, color } : el))
      );
    }
  };

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

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button onClick={() => addElement('rect')}>Agregar Rectángulo</button>
        <button onClick={() => addElement('circle')}>Agregar Círculo</button>
        <button onClick={() => addElement('text')}>Agregar Texto</button>
        <button onClick={removeElement}>Eliminar Elemento</button>
        <button onClick={exportAsHTML}>Exportar como HTML</button>
        <div>
          <label>Color de fondo:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>

      <div className="editor-canvas" style={{ backgroundColor: bgColor }}>
        {elements.map((el) => (
          <Rnd
            key={el.id}
            size={{ width: el.width, height: el.height }}
            position={{ x: el.x, y: el.y }}
            onDragStop={(e, d) => {
              setElements(
                elements.map((item) =>
                  item.id === el.id ? { ...item, x: d.x, y: d.y } : item
                )
              );
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setElements(
                elements.map((item) =>
                  item.id === el.id
                    ? {
                        ...item,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        ...position,
                      }
                    : item
                )
              );
            }}
            onClick={() => setSelectedElement(el)}
          >
            {el.type === 'text' ? (
              <div
                style={{
                  fontSize: el.fontSize,
                  fontStyle: el.fontStyle,
                  fontWeight: el.fontWeight,
                  textDecoration: el.textDecoration,
                  color: el.color,
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {el.content}
              </div>
            ) : el.type === 'rect' ? (
              <div
                style={{
                  backgroundColor: el.color,
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : el.type === 'circle' ? (
              <div
                style={{
                  backgroundColor: el.color,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                }}
              />
            ) : null}
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default Editor;
