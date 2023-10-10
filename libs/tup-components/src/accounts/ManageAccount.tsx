import React from 'react';
import { Icon, Button, SectionHeader } from '@tacc/core-components';
import { useProfile } from '@tacc/tup-hooks';
import { AccountMfa } from './ManageAccountMfa';
import styles from './ManageAccount.module.css';

const ManageUser = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Edit User Information</strong>
    </div>
    <span className={styles['tap-description']}>
      Your user account can be managed on the TACC Account Management (TAM)
      portal.
    </span>
    <a
      href="https://accounts.tacc.utexas.edu/profile"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="primary">
        Edit User Profile
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
      href="https://accounts.tacc.utexas.edu/certificates"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
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
      href="https://accounts.tacc.utexas.edu/change_password"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="primary">
        Change Password
      </Button>
    </a>
  </>
);

const ManageUpload = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Secure Upload</strong>
    </div>
    <span className={styles['tap-description']}>
      Upload documents securely through Box.
    </span>
    <a
      href="https://tacc.utexas.edu/secure-upload"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="primary">
        Secure File Upload
      </Button>
    </a>
  </>
);

const ManageAccount: React.FC = () => {
  const { data } = useProfile();
  return (
    <section className={styles['account-layout']}>
      <article>
        <SectionHeader className={styles['account-header']} isNestedHeader>
          <Icon name="user" />
          <span>
            {data?.firstName} {data?.lastName}
          </span>
        </SectionHeader>
        <div className={styles['account-body']}>
          <section>
            <ManageUser />
            <ManagePassword />
            <span />
            <ManageDNs />
            <ManageUpload />
          </section>
          <span className={styles['tap-separator']} />
          <section>
            <AccountMfa />
          </section>
        </div>
      </article>
    </section>
  );
};

export default ManageAccount;
