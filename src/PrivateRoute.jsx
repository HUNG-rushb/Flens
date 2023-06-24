import { useAuthState } from './context/AuthContext';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { id, isAdmin } = useAuthState(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return id !== '' || isAdmin !== '' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
