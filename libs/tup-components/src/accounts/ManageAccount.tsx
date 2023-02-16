import React from 'react';
import { Icon, Button } from '@tacc/core-components';
import { useProfile } from '@tacc/tup-hooks';
import { AccountMfa } from './ManageAccountMfa';
import styles from './ManageAccount.module.css';

const ManageUser = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>
        Edit User Information
      </strong>
    </div>
    <span className={styles['tap-description']}>
      Your user account can be managed on the TACC Account Management (TAM)
      portal.
    </span>
    <a
      href="https://accounts-dev.tacc.utexas.edu/profile"
      target="_blank"
      rel="noreferrer"
    >
      <Button className={styles['tap-button']} type="primary">
        Go to TAP
      </Button>
    </a>
  </>
);

const ManageDNs = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Distinguished Names</strong>
    </div>
    <span className={styles['tap-description']}>
      DNs are managed on the TACC Account Management (TAM) portal.
    </span>
    <a
      href="https://accounts-dev.tacc.utexas.edu/certificates"
      target="_blank"
      rel="noreferrer"
    >
      <Button className={styles['tap-button']} type="primary">
        Manage DNs
      </Button>
    </a>
  </>
);

const ManagePassword = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Password</strong>
    </div>
    <span className={styles['tap-description']}>
      Passwords are managed on the TACC Account Management (TAM) portal.
    </span>
    <a
      href="https://accounts-dev.tacc.utexas.edu/change_password"
      target="_blank"
      rel="noreferrer"
    >
      <Button className={styles['tap-button']} type="primary">
        Change Password
      </Button>
    </a>
  </>
);

const ManageAccount: React.FC = () => {
  const { data } = useProfile();
  return (
    <article className={styles['account-layout']}>
      <header className={styles['account-header']}>
        <Icon name="user" />
        <span>
          {data?.firstName} {data?.lastName}
        </span>
      </header>
      <div className={styles['account-body']}>
        <section>
          <ManageUser />
          <ManagePassword />
          <span />
          <ManageDNs />
        </section>
        <span className={styles['tap-separator']} />
        <section>
          <AccountMfa />
        </section>
      </div>
    </article>
  );
};

export default ManageAccount;
