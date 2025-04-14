import React from 'react';
import { Icon, Button, SectionHeader } from '@tacc/core-components';
import { useProfile } from '@tacc/tup-hooks';
import styles from './ManageAccount.module.css';

const ManageUser = () => (
  <article className={styles['tap-feature']}>
    <h2 className={styles['tap-header']}>Account Managment</h2>
    <p className={styles['tap-description']}>
      Account details are mananged by the TACC Account Management portal. Follow
      the links below to:
    </p>
    <a
      href="https://accounts.tacc.utexas.edu/profile"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-action']}
    >
      <Button type="secondary">Edit User Profile</Button>
    </a>
    <a
      href="https://accounts.tacc.utexas.edu/change_password"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-action']}
    >
      <Button type="secondary">Change Password</Button>
    </a>
    <a
      href="https://accounts.tacc.utexas.edu/mfa"
      target="_blank"
      rel="noreferrer"
    >
      <Button type="secondary">Manage Multi-factor Authentication</Button>
    </a>
  </article>
);

const ManageUpload = () => (
  <article className={styles['tap-feature']}>
    <h2 className={styles['tap-header']}>Identity Management</h2>
    <p className={styles['tap-description']}>
      To confirm eligibility for access to a TACC account, you may be requested
      to upload identifying documents.
    </p>
    <a
      href="https://tacc.utexas.edu/secure-upload"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-action']}
    >
      <Button type="secondary">Secure File Upload</Button>
    </a>
  </article>
);

const ManageAccount: React.FC = () => {
  const { data } = useProfile();
  return (
    <section className={styles['account-layout']}>
      <SectionHeader className={styles['account-header']} isNestedHeader>
        <Icon name="user" />
        <span>
          {data?.firstName} {data?.lastName}
        </span>
      </SectionHeader>
      <div className={styles['account-body']}>
        <section>
          <ManageUser />
          <ManageUpload />
        </section>
      </div>
    </section>
  );
};

export default ManageAccount;
