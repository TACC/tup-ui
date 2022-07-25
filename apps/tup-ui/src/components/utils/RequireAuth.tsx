import { useAuth, useJwt } from '../../hooks';
import { Navigate, useLocation } from 'react-router-dom';

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

export default RequireAuth;