import React from 'react';
import { useAuth } from '../hooks';

const LogoutComponent: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
};

export default LogoutComponent;
