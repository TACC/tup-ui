import { Outlet, Routes, Route } from 'react-router-dom';
import { Navbar, NavItem } from '@tacc/core-wrappers';
import { PageLayout } from './components/layout';
import Dashboard from './Dashboard';
import Logout from './Logout';
import Login from './Login';

const AppLayout = () => {
  const nav = (
    <Navbar>
      <NavItem to={"/"}>Dashboard</NavItem>
      <NavItem to={"/logout"}>Log Out</NavItem>
    </Navbar>
  )
  return(
    <PageLayout left={nav} right={<Outlet />} />
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
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout /> } />
      </Route>
    </Routes>
  );
}

export default App;
