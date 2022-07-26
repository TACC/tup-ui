import { useState } from 'react';
import { Outlet, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth, useJwt } from './hooks';
import LoginComponent from './auth/LoginComponent';
import LogoutComponent from './auth/LogoutComponent';
import ProfileComponent from './auth/ProfileComponent';
import { Button, Message } from '@tacc/core-components';

const AppLayout = () => {
  const [count, setCount] = useState(0);
  const { loggedIn } = useAuth();
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <Message type="warning">Core-Components Message</Message>
        <p>
          <Button
            onClick={() => setCount((count) => count + 1)}
            size="long"
            type="primary"
          >
            count is: {count}
          </Button>
        </p>
        <Outlet />
        {loggedIn && <LogoutComponent />}
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
}

export default App;
