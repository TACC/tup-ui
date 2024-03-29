import React, { useEffect } from 'react';
import { useAuth } from '@tacc/tup-hooks';
import { Navigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/login" replace />;
};

export default Layout;
