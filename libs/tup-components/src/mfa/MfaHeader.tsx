const MfaHeader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid black',
        padding: '10px',
      }}
    >
      <div style={{ fontSize: '2rem' }}>Multifactor Authentication Pairing</div>
      <div>Get Help | Exit Pairing Process</div>
    </div>
  );
};

export default MfaHeader;
