import React, { useCallback, useState } from 'react';
import { useLocation, Location, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const LogoutComponent: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
};

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';
  const authCallback = useCallback(
    () => navigate(from, { replace: true }),
    [from, navigate]
  );
  const { login, error, isLoading } = useAuth();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password }, { onSuccess: authCallback });
  };

  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <form onSubmit={authenticate}>
      <div>Login:</div>
      <div>
        Username:{' '}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:{' '}
        <input
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log in</button>
      {error ? <div>Error logging in </div> : null}
    </form>
  );
};

export default LoginComponent;
