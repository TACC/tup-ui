import { Outlet, Routes, Route } from 'react-router-dom';
import {
  PageLayout,
  Sidebar,
  TicketCreateModal,
  Tickets,
} from '@tacc/tup-components';
import { Dashboard, Login, Logout } from './pages';
import { TicketDetails } from '@tacc/tup-components';

const AppLayout = () => {
  return <PageLayout left={<Sidebar />} right={<Outlet />} />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />}>
          <Route path="tickets/create" element={<TicketCreateModal />} />
        </Route>
        <Route path="tickets" element={<Tickets />}>
          <Route path="create" element={<TicketCreateModal />} />
          <Route path=":ticketId" element={<TicketDetails />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
