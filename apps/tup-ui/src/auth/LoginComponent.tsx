import React, { useState } from 'react';
import { useProfile, useAuth, useJwt } from '../hooks';


export const LogoutComponent: React.FC = () => {
  const { loggedIn, logout } = useAuth();
  if (loggedIn) {
    return (
      <div>
        <button onClick={() => logout()}>Log Out</button>
      </div>
    )
  }
  return null;
}

export const ProfileComponent: React.FC = () => {
  const profileQuery = useProfile();

  const profile = profileQuery.data;
  if (profile) {
    return (
      <div>
        User Profile
        <ul>
          <li>
            {profile.firstName} {profile.lastName}
          </li>
          <li>{profile.institution}</li>
          <li>{profile.country}</li>
        </ul>
      </div>
    );
  }
  return <div>User Profile</div>;
};

const LoginComponent = () => {
  const { login } = useAuth();
  const jwtQuery = useJwt();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  // Once routing is implemented, this logic can be used to wrap routes and redirect
  // to a login page if no JWT is saved.
  switch (jwtQuery.status) {
    case 'success':
      //return <div>User Profile</div>
      return (
        <div>
          <ProfileComponent />
          <LogoutComponent />
        </div>
      );
    case 'error':
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
          <button type="submit">Submit</button>
        </form>
      );
    case 'loading':
    default:
      return <div>...</div>;
  }
};

export default LoginComponent;
