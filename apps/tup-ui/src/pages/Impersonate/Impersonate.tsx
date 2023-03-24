import React, { useState } from 'react';
import { Button } from '@tacc/core-components';
import styles from './Impersonate.module.css';

const Impersonate: React.FC = () => {
  const [username, setUsername] = useState('');
  return (
    <div className={styles['impersonate-container']}>
      <div>
        This feature can be used to impersonate a user given their TACC
        username. To end the impersonation session, you will need to log out.
      </div>
      <div>
        <label htmlFor="impersonate-username">Username:&nbsp;</label>
        <input
          id="impersonate-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <a href={`/portal/impersonate?username=${username}`}>
          <Button type="primary">Impersonate User</Button>
        </a>
      </div>
    </div>
  );
};

export default Impersonate;
