import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function RequireAuth({ children }: {children: React.ReactElement;}) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/portal/login" replace state={{ from: location.pathname }} />;
  return children;
}