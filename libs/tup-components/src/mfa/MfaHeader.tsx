import styles from './Mfa.module.css';
import TicketCreateModal from '../tickets/TicketCreateModal';

const MfaHeader: React.FC = () => {
  return (
    <div className={styles['mfa-header']}>
      <div>Multifactor Authentication Pairing</div>
      <div>
        <TicketCreateModal display="link">Get Help</TicketCreateModal> |{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.tacc.utexas.edu/basics/mfa/"
        >
          MFA Documentation
        </a>
      </div>
    </div>
  );
};

export default MfaHeader;
