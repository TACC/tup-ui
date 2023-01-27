import { Link } from 'react-router-dom';
import styles from './Mfa.module.css';

const MfaHeader: React.FC = () => {
  return (
    <div className={styles['mfa-header']}>
      <div>Multifactor Authentication Pairing</div>
      <div>
        Get Help | <Link to="/account">Exit Pairing Process</Link>
      </div>
    </div>
  );
};

export default MfaHeader;
