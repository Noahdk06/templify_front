import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import './Editor.css';

const Editor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [bgColor, setBgColor] = useState('#e0f7fa');
  const [drawColor, setDrawColor] = useState('#000000');
  const [drawing, setDrawing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [textContent, setTextContent] = useState('Texto');
  const [zoom, setZoom] = useState(100);
  const [fontSize, setFontSize] = useState(16);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = drawColor;
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      color: '#000000',
      content: type === 'text' ? textContent : '',
      url: type === 'image' ? imageUrl : '',
      fontSize: fontSize,
      fontStyle: 'normal',
      textDecoration: 'none',
      fontWeight: 'normal',
    };
    setElements([...elements, newElement]);
    if (type === 'image') setImageUrl('');
  };

  const changeElementColor = (color) => {
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, color } : el))
      );
    }
  };

  const togglePainting = () => setDrawing((prev) => !prev);

  const startPainting = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const paint = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const endPainting = () => {
    if (drawing) contextRef.current.closePath();
  };

  const handleSave = () => {
    console.log('Guardar template:', elements);
  };

  const handleElementClick = (el) => {
    setSelectedElement(el);
    if (el.type === 'text') {
      setTextContent(el.content);
      setFontSize(el.fontSize);
    }
  };

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, content: e.target.value } : el))
      );
    }
  };

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
              default:
                return el;
            }
          }
          return el;
        })
      );
    }
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
          <button className="toolbar-button" onClick={() => toggleTextStyle('bold')}>B</button>
          <button className="toolbar-button" onClick={() => toggleTextStyle('italic')}>I</button>
          <button className="toolbar-button" onClick={() => toggleTextStyle('underline')}>U</button>
          <button className="toolbar-button">S</button>
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
          <button onClick={() => addElement('rect')}>Agregar Rectángulo</button>
          <button onClick={() => addElement('circle')}>Agregar Círculo</button>
          <button onClick={() => addElement('text')}>Agregar Texto</button>
          <button onClick={() => addElement('image')}>Agregar Imagen</button>
          <div>
            <label>Color Elemento:</label>
            <input 
              type="color" 
              value={selectedElement ? selectedElement.color : '#000000'} 
              onChange={(e) => changeElementColor(e.target.value)} 
            />
          </div>
          <div>
            <label>Color de Fondo:</label>
            <input 
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)} 
            />
          </div>
          <div>
            <label>Color de Pintura:</label>
            <input 
              type="color" 
              value={drawColor} 
              onChange={(e) => setDrawColor(e.target.value)} 
            />
          </div>
          <button onClick={togglePainting}>
            {drawing ? 'Detener Pintar' : 'Iniciar Pintar'}
          </button>
          <div>
            <label>URL de la Imagen:</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="Ingrese URL de imagen"
            />
          </div>
        </div>

        <div 
          className="editor-canvas" 
          style={{ backgroundColor: bgColor, transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          onMouseDown={startPainting}
          onMouseMove={paint}
          onMouseUp={endPainting}
          onMouseLeave={endPainting}
        >
          <canvas ref={canvasRef} />
          {elements.map((el) => (
            <Rnd
              key={el.id}
              position={{ x: el.x, y: el.y }}
              size={{ width: el.width, height: el.height }}
              onDragStop={(e, d) => {
                setElements(prevElements =>
                  prevElements.map(element =>
                    element.id === el.id ? { ...element, x: d.x, y: d.y } : element
                  )
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setElements(prevElements =>
                  prevElements.map(element =>
                    element.id === el.id ? { ...element, width: ref.offsetWidth, height: ref.offsetHeight, ...position } : element
                  )
                );
              }}
              onClick={() => handleElementClick(el)}
              style={{ 
                border: selectedElement?.id === el.id ? '2px solid #007bb2' : 'none',
                backgroundColor: el.type !== 'image' ? el.color : 'transparent',
                borderRadius: el.type === 'circle' ? '50%' : '0',
              }}
            >
              {el.type === 'text' && (
                <input
                  type="text"
                  value={el.content}
                  onChange={handleTextChange}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none', 
                    outline: 'none', 
                    color: el.color,
                    fontSize: `${el.fontSize}px`,
                    fontStyle: el.fontStyle,
                    textDecoration: el.textDecoration,
                    fontWeight: el.fontWeight,
                  }}
                />
              )}
              {el.type === 'image' && (
                <img src={el.url} alt="Elemento" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </Rnd>
          ))}
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        Guardar Template
      </button>
    </div>
  );
};

export default Editor;