import { Outlet, Routes, Route } from 'react-router-dom';
import {
  PageLayout,
  Sidebar,
  TicketCreateModal,
  Tickets,
  TicketModal,
} from '@tacc/tup-components';
import {
  Dashboard,
  Login,
  Logout,
  Projects,
  ProjectView,
  ProjectDetail,
  ProjectMember,
} from './pages';

const AppLayout = () => {
  return <PageLayout left={<Sidebar />} right={<Outlet />} />;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />}>
          <Route path="ticket-create" element={<TicketCreateModal />}>
            <Route path=":ticketId" element={<TicketModal />} />
          </Route>
          <Route path="dashboard-tickets/:ticketId" element={<TicketModal />} />
        </Route>
        <Route path="tickets" element={<Tickets />}>
          <Route path="create" element={<TicketCreateModal />}>
            <Route path=":ticketId" element={<TicketModal />} />
          </Route>
          <Route path=":ticketId" element={<TicketModal />} />
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
