import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verificamos si el token existe en localStorage

  // Si no hay token, redirigimos a la página de advertencia (Unauthorized)
  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si hay token, renderizamos la vista protegida
  return children;
};

export default ProtectedRoute;
