import React from 'react';
import { SectionHeader } from '@tacc/core-components';
import { Link } from 'react-router-dom';
import styles from './SecureUpload.module.css';

const SecureUpload: React.FC = () => {
  return (
    <div className={styles['secure-upload']}>
      <SectionHeader actions={<Link to="/account">Back to Profile</Link>}>
        Secure File Upload
      </SectionHeader>
      <iframe
        title="Secure Upload"
        id="box-upload-widget-iframe-g9aymjl7wd8"
        src="https://utexas.app.box.com/upload-widget/view/ei1fjhti7tlysjflmr8utiwf59phxxbe/65197433553?height=420&instructions=Please+use+this+area+to+upload+all+documents+securely.+&title=TACC+Secure+Upload&isDescriptionFieldShown=1&isEmailRequired=1"
        width="100%"
        allowTransparency
        style={{ border: 'none' }}
        height="433"
      ></iframe>
    </div>
  );
};

export default SecureUpload;
