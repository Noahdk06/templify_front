import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import './Editor.css';

const Editor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [bgColor, setBgColor] = useState('#e0f7fa');
  const [drawColor, setDrawColor] = useState('#000000'); // Color para pintar
  const [drawing, setDrawing] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // URL de la imagen a agregar
  const [textContent, setTextContent] = useState('Texto'); // Contenido del texto
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const addElement = (type) => {
    if (type === 'image' && imageUrl) {
      const newElement = {
        id: Date.now(),
        type,
        url: imageUrl,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
      };
      setElements([...elements, newElement]);
      setImageUrl(''); // Limpiar URL de imagen después de agregar
    } else if (type === 'circle') {
      const newElement = {
        id: Date.now(),
        type,
        x: 50,
        y: 50,
        radius: 50,
        color: '#000000',
      };
      setElements([...elements, newElement]);
    } else if (type === 'text') {
      const newElement = {
        id: Date.now(),
        type,
        x: 50,
        y: 50,
        content: textContent,
        color: '#000000', // Color de texto por defecto
      };
      setElements([...elements, newElement]);
    } else { // Para rectángulos
      const newElement = {
        id: Date.now(),
        type: 'rect',
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        color: '#000000',
      };
      setElements([...elements, newElement]);
    }
  };

  const changeElementColor = (color) => {
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, color } : el))
      );
    }
  };

  const togglePainting = () => {
    setDrawing((prev) => !prev); // Alternar el estado de dibujo
  };

  const startPainting = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = drawColor; // Establecer el color de dibujo
    ctx.lineWidth = 2; // Establecer el grosor de la línea
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', endPainting);
  };

  const paint = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endPainting = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener('mousemove', paint);
    drawing && contextRef.current.closePath();
  };

  const handleSave = () => {
    // Lógica para guardar el template
    console.log('Guardar template:', elements);
  };

  const handleElementClick = (el) => {
    setSelectedElement(el);
    if (el.type === 'text') {
      setTextContent(el.content); // Cargar contenido del texto seleccionado
    }
  };

  const handleTextChange = (e) => {
    setTextContent(e.target.value); // Actualizar el contenido del texto
    if (selectedElement) {
      setElements(
        elements.map((el) => (el.id === selectedElement.id ? { ...el, content: e.target.value } : el))
      );
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-sidebar">
        <h3>Herramientas</h3>
        <button onClick={() => addElement('rect')}>Agregar Rectángulo</button>
        <button onClick={() => addElement('circle')}>Agregar Círculo</button>
        <button onClick={() => addElement('text')}>Agregar Texto</button>
        <button onClick={() => addElement('image')}>Agregar Imagen</button>
        
        <div>
          <label>Cambiar Color Elemento:</label>
          <input 
            type="color" 
            value={selectedElement ? selectedElement.color : '#000000'} 
            onChange={(e) => changeElementColor(e.target.value)} 
          />
        </div>

        <div>
          <label>Cambiar Color de Fondo:</label>
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
        style={{ backgroundColor: bgColor }}
        onMouseDown={startPainting}
        onMouseUp={endPainting}
      >
        <canvas ref={canvasRef} width={800} height={600} style={{ position: 'absolute', top: 0, left: 0 }} />
        {elements.map((el) => (
          <Rnd
            key={el.id}
            position={{ x: el.x, y: el.y }}
            size={el.type === 'circle' ? { width: el.radius * 2, height: el.radius * 2 } : { width: el.width, height: el.height }}
            onDragStop={(e, d) => {
              setElements((prevElements) =>
                prevElements.map((element) =>
                  element.id === el.id ? { ...element, x: d.x, y: d.y } : element
                )
              );
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              if (el.type === 'circle') {
                const newRadius = Math.max(ref.offsetWidth / 2, 20); // Asegurarse de que el círculo no sea demasiado pequeño
                setElements((prevElements) =>
                  prevElements.map((element) =>
                    element.id === el.id ? { ...element, radius: newRadius, ...position } : element
                  )
                );
              } else {
                setElements((prevElements) =>
                  prevElements.map((element) =>
                    element.id === el.id ? { ...element, width: ref.offsetWidth, height: ref.offsetHeight, ...position } : element
                  )
                );
              }
            }}
            onClick={() => handleElementClick(el)}
            style={{ border: selectedElement?.id === el.id ? '2px solid #007bb2' : 'none', backgroundColor: el.color }}
          >
            {el.type === 'text' && (
              <input
                type="text"
                value={el.content}
                onChange={handleTextChange}
                style={{ width: '100%', height: '100%', border: 'none', outline: 'none', color: el.color }}
              />
            )}
            {el.type === 'image' && (
              <img src={el.url} alt="Elemento" style={{ width: '100%', height: '100%' }} />
            )}
            {el.type === 'circle' && (
              <div 
                style={{
                  borderRadius: '50%',
                  width: el.radius * 2,
                  height: el.radius * 2,
                  backgroundColor: el.color,
                }}
              />
            )}
          </Rnd>
        ))}
      </div>

      <button className="save-button" onClick={handleSave}>
        Guardar Template
      </button>
    </div>
  );
};

export default Editor;
