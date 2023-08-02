import { SectionHeader } from '@tacc/core-components';
import TicketCreateModal from '../tickets/TicketCreateModal';

const MfaHeader: React.FC = () => {
  const Actions = (
    <nav className="c-nav c-nav--no-list c-nav--piped">
      <TicketCreateModal display="link">Get Help</TicketCreateModal>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://docs.tacc.utexas.edu/basics/mfa/"
      >
        MFA Documentation
      </a>
    </nav>
  );

  return (
    <SectionHeader actions={Actions}>
      Multifactor Authentication Pairing
    </SectionHeader>
  );
};

export default MfaHeader;
