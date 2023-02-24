import { Outlet, Routes, Route, Navigate } from 'react-router-dom';

import {
  PageLayout,
  Sidebar,
  Tickets,
  MfaPairingview,
  MfaSelection,
  ManageAccount,
  RequireAuth,
} from '@tacc/tup-components';
import {
  Dashboard,
  Login,
  Projects,
  ProjectView,
  ProjectDetail,
  ProjectMember,
  Mfa,
  TicketDetail,
} from './pages';

const AppLayout = () => {
  return <PageLayout left={<Sidebar />} right={<Outlet />} />;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="tickets" element={<Tickets />}>
          <Route path=":ticketId" element={<TicketDetail />} />
        </Route>
        <Route path="projects" element={<Projects />}></Route>
        <Route path="projects/active" element={<Projects />}></Route>
        <Route path="projects/:projectId" element={<ProjectView />}>
          <Route path="" element={<ProjectDetail />}></Route>
          <Route path=":username" element={<ProjectMember />}></Route>
        </Route>
        <Route path="mfa" element={<Mfa />}>
          <Route path="" element={<MfaSelection />} />
          <Route path="totp" element={<MfaPairingview method="totp" />} />
          <Route path="sms" element={<MfaPairingview method="sms" />} />
        </Route>
        <Route
          path="account"
          element={
            <RequireAuth>
              <ManageAccount />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;
