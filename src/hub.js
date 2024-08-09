// src/Hub.js
import React from 'react';
import './Hub.css'; // Verifica que el archivo CSS se llame Hub.css y esté en la misma carpeta

const Hub = () => {
  const sections = [
    'Publicidad',
    'Productos',
    'Promoción',
    'Eventos',
    'Novedades',
    'Ofertas',
    'Descuentos',
    'Exclusivos',
  ];

  return (
    <div className="hub">
      <div className="container">
        <div className="title">Templates</div>
        {sections.map((sectionName) => (
          <div key={sectionName} className={`section ${sectionName.toLowerCase()}`}>
            <div className="section-title">{sectionName}</div>
            <div className="images">
              {[...Array(8)].map((_, index) => (
                <img
                  key={index}
                  src="image.jpg" // Asegúrate de que la ruta sea correcta
                  alt="Black Jack Pepper"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hub;
