import { useState } from 'react';
import { Outlet, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Message } from '@tacc/core-components';
import { useAuth, useJwt } from './hooks';
import LoginComponent from './auth/LoginComponent';
import ProfileComponent from './auth/ProfileComponent';

const AppLayout = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <Message />
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <Outlet />
      </header>
    </div>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loggedIn } = useAuth();
  const { isLoading } = useJwt();
  const location = useLocation();

  // React-query fetches the JWT asynchronously so we need to wait for it
  // (this should be instantaneous).
  if (isLoading) return null;

  if (!loggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <ProfileComponent />
            </RequireAuth>
          }
        />
        <Route path="login" element={<LoginComponent />} />
      </Route>
    </Routes>
  );

  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <Message />
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <LoginComponent />
      </header>
    </div>
  );
}

export default App;
