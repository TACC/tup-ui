import React from 'react';
import { Icon, Button, SectionHeader } from '@tacc/core-components';
import { useProfile } from '@tacc/tup-hooks';
import { AccountMfa } from './ManageAccountMfa';
import styles from './ManageAccount.module.css';

const ManageUser = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Account Managment</strong>
    </div>
    <p>
      Account details are mananged by the TACC Account Management
      portal. Follow the links below to:
    </p>
    <a
      href="https://accounts.tacc.utexas.edu/profile"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="secondary">
        Edit User Profile
      </Button>
    </a>
    <a
      href="https://accounts.tacc.utexas.edu/change_password"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="secondary">
        Change Password
      </Button>
    </a>
  </>
);

const ManageDNs = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>
        <dfn id="dn">Distinguished Name</dfn> (<abbr>DN</abbr>)
        Managment
      </strong>
    </div>
    <p>
      Generate a <abbr>DN</abbr> to permit you to move data between
      machines.{' '}
      <a
        href="https://docs.tacc.utexas.edu/basics/datatransfer/#step1"
        rel="noreferrer"
        target="_blank"
      >
        Learn more about DNs.
      </a>
    </p>
    <a
      href="https://accounts.tacc.utexas.edu/certificates"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="secondary">
        Manage DNs
      </Button>
    </a>
  </>
);

const ManageUpload = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Identity Management</strong>
    </div>
    <p>
      To confirm eligibility for access to a TACC account, you may be
      requested to upload identifying documents.
    </p>
    <a
      href="https://tacc.utexas.edu/secure-upload"
      target="_blank"
      rel="noreferrer"
      className={styles['tap-href']}
    >
      <Button className={styles['tap-button']} type="secondary">
        Secure File Upload
      </Button>
    </a>
  </>
);

const ManageAccount: React.FC = () => {
  const { data } = useProfile();
  return (
    <section>
      <article className={styles['account-layout']}>
        <SectionHeader className={styles['account-header']} isNestedHeader>
          <Icon name="user" />
          <span>
            {data?.firstName} {data?.lastName}
          </span>
        </SectionHeader>
        <div className={styles['account-body']}>
          <section>
            <ManageUser />
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
