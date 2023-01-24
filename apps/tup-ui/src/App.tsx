import { Outlet, Routes, Route } from 'react-router-dom';
import { PageLayout, Sidebar, Tickets } from '@tacc/tup-components';
import {
  Dashboard,
  Login,
  Logout,
  Projects,
  ProjectView,
  ProjectDetail,
  ProjectMember,
  TicketDetail,
} from './pages';

const AppLayout = () => {
  return <PageLayout left={<Sidebar />} right={<Outlet />} />;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="tickets" element={<Tickets />}>
          <Route path=":ticketId" element={<TicketDetail />} />
        </Route>
        <Route path="projects" element={<Projects />}></Route>
        <Route path="projects/:projectId" element={<ProjectView />}>
          <Route path="" element={<ProjectDetail />}></Route>
          <Route path=":username" element={<ProjectMember />}></Route>
        </Route>
        <Route path="logout" element={<Logout />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;
