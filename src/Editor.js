import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './Editor.css';

const BACKEND_URL = 'http://localhost:3033';

const Editor = () => {
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
  
  const canvasRef = useRef(null);

  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
       const token = localStorage.getItem('token'); console.log(token)
      const response = await axios.get(`${BACKEND_URL}/api/user/obtenerArchivos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setFileList(response.data.archivos);
      setFileError(null);
    } catch (error) {
      setFileError('Error loading files');
      console.error('Error fetching files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
  }, []);

  useEffect(() => {
    setUndoStack((prev) => [...prev, elements]);
    setRedoStack([]);
  }, [elements]);

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

  const handleFileSelect = (fileUrl) => {
    setShowFileLibrary(false);
    addElement('image', fileUrl);
  };

  
  
  const removeElement = () => {
    if (selectedElement) {
      setElements(elements.filter(el => el.id !== selectedElement.id));
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

  const handleElementClick = (el) => {
    setSelectedElement(el);
    if (el.type === 'text') {
      setTextContent(el.content);
      setFontSize(el.fontSize);
    }
  };

  const handleTextChange = debounce((e) => {
    setTextContent(e.target.value);
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, content: e.target.value } : el))
      );
    }
  }, 300);

  const changeZoom = (delta) => {
    setZoom(prevZoom => Math.max(10, Math.min(200, prevZoom + delta)));
  };

  const changeFontSize = (delta) => {
    setFontSize(prevSize => Math.max(8, Math.min(72, prevSize + delta)));
    if (selectedElement && selectedElement.type === 'text') {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, fontSize: fontSize + delta } : el))
      );
    }
  };

  const toggleTextStyle = (style) => {
    if (selectedElement && selectedElement.type === 'text') {
      setElements(
        elements.map((el) => {
          if (el.id === selectedElement.id) {
            switch (style) {
              case 'bold':
                return { ...el, fontWeight: el.fontWeight === 'bold' ? 'normal' : 'bold' };
              case 'italic':
                return { ...el, fontStyle: el.fontStyle === 'italic' ? 'normal' : 'italic' };
              case 'underline':
                return { ...el, textDecoration: el.textDecoration === 'underline' ? 'none' : 'underline' };
              case 'line-through':
                return { ...el, textDecoration: el.textDecoration === 'line-through' ? 'none' : 'line-through' };
              default:
                return el;
            }
          }
          return el;
        })
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z' && !e.altKey) {
        e.preventDefault();
        handleUndo();
      } else if (e.ctrlKey && e.altKey && e.key === 'z') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack]);

  // Nueva función para exportar el diseño como HTML
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
        ${elements.map(el => {
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

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button className="toolbar-button" onClick={() => changeFontSize(-1)}>-</button>
          <span>{fontSize}px</span>
          <button className="toolbar-button" onClick={() => changeFontSize(1)}>+</button>
        </div>
        <div className="toolbar-group">
          <button className="toolbar-button" onClick={() => toggleTextStyle('bold')} style={{ fontWeight: 'bold' }}>B</button>
          <button className="toolbar-button" onClick={() => toggleTextStyle('italic')} style={{ fontStyle: 'italic' }}>I</button>
          <button className="toolbar-button" onClick={() => toggleTextStyle('underline')} style={{ textDecoration: 'underline' }}>U</button>
          <button className="toolbar-button" onClick={() => toggleTextStyle('line-through')} style={{ textDecoration: 'line-through' }}>S</button>
        </div>

        <div className="toolbar-group">
          <div className="zoom-control">
            <button className="toolbar-button" onClick={() => changeZoom(-10)}>-</button>
            <span>{zoom}%</span>
            <button className="toolbar-button" onClick={() => changeZoom(10)}>+</button>
          </div>
        </div>
      </div>

      <div className="editor-main">
        <div className="editor-sidebar">
          <button onClick={() => addElement('rect')}>Agregar rectangulo</button>
          <button onClick={() => addElement('circle')}>Agregar circulo</button>
          <button onClick={() => addElement('text')}>Agregar texto</button>
          <button onClick={removeElement}>Remover elemento</button>
          <button onClick={() => { setShowFileLibrary(true); fetchFiles(); }}>
  {loadingFiles ? 'Loading...' : 'Seleccionar imagen'}
</button>

          <button onClick={exportAsHTML}>Exportar como HTML</button>
          <div>
            <label>Color de elemento:</label>
            <input 
              type="color" 
              value={selectedElement ? selectedElement.color : '#000000'} 
              onChange={(e) => changeElementColor(e.target.value)} 
            />
          </div>
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
          <canvas ref={canvasRef}></canvas>
          {elements.map((el) => (
            <Rnd
              key={el.id}
              size={{ width: el.width, height: el.height }}
              position={{ x: el.x, y: el.y }}
              onDragStop={(e, d) => {
                setElements(
                  elements.map(item => item.id === el.id ? { ...item, x: d.x, y: d.y } : item)
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setElements(
                  elements.map(item => 
                    item.id === el.id
                      ? { ...item, width: ref.offsetWidth, height: ref.offsetHeight, ...position }
                      : item
                  )
                );
              }}
              onClick={() => handleElementClick(el)}
            >
              {el.type === 'text' ? (
                <div
                  contentEditable
                  style={{
                    fontSize: el.fontSize,
                    fontStyle: el.fontStyle,
                    fontWeight: el.fontWeight,
                    textDecoration: el.textDecoration,
                    color: el.color,
                  }}
                >
                  {el.content}
                </div>
              ) : el.type === 'rect' ? (
                <div
                  style={{ 
                    backgroundColor: el.color, 
                    width: '100%', 
                    height: '100%' 
                  }}
                ></div>
              ) : el.type === 'circle' ? (
                <div
                  style={{ 
                    backgroundColor: el.color, 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%' 
                  }}
                ></div>
              ) : el.type === 'image' ? (
                <img src={el.url} alt="imagen" style={{ width: '100%', height: '100%' }} />
              ) : null}
            </Rnd>
          ))}
        </div>
      </div>

      {showFileLibrary && (
        <div className="file-library">
          <h3>File Library</h3>
          <button className="close-button" onClick={() => setShowFileLibrary(false)}>Close</button>
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
