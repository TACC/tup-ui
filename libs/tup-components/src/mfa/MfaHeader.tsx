import styles from './Mfa.module.css';

const MfaHeader = () => {
  return (
    <div className={styles['mfa-header']}>
      <div>Multifactor Authentication Pairing</div>
      <div>Get Help | Exit Pairing Process</div>
    </div>
  );
};

export default MfaHeader;
