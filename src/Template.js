// src/Template.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Template = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles del Template {id}</h1>
      {/* Aquí puedes agregar más detalles sobre el template */}
    </div>
  );
};

export default Template;
