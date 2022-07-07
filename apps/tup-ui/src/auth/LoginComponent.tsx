import React, { useState } from 'react';
import { useProfile, useAuth } from '../hooks';
import ProfileComponent from './ProfileComponent';

export const LogoutComponent: React.FC = () => {
  const { logout } = useAuth();
    return (
      <div>
        <button onClick={() => logout()}>Log Out</button>
      </div>
    )
}


const LoginComponent: React.FC = () => {
  const { login, loggedIn, error, isLoading } = useAuth();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  if (isLoading) {
    return (
      <div>...</div>
    )
  }

  if (loggedIn) {
    return (
      <div>
        <ProfileComponent />
        <LogoutComponent />
      </div>
    )
  }

  return (
      <form onSubmit={authenticate}>
        <div>Login:</div>
        <div>
          Username:{' '}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
