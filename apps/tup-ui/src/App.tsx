import { Outlet, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout';
import { Sidebar, Dashboard, Login, Logout } from './pages';

const AppLayout = () => {
  return(
    <PageLayout left={<Sidebar />} right={<Outlet />} />
  )
};


function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <Dashboard />
          }
        />
        <Route path="logout" element={<Logout /> } />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};


export default App;
