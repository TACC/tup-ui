import React from 'react';
import { Icon, SectionHeader } from '@tacc/core-components';
import { useProfile } from '@tacc/tup-hooks';
import { AccountMfa } from './ManageAccountMfa';
import styles from './ManageAccount.module.css';

// HACK: Use global classes until `<Button>` can be rendered as an `<a>`
const stylesGlobalButton = 'c-button c-button--secondary c-button--width-long';

const ManageUser = () => (
  <a
    href="https://accounts.tacc.utexas.edu/profile"
    target="_blank"
    rel="noreferrer"
    className={`${stylesGlobalButton} ${styles['tap-action']}`}
  >
    Edit User Profile
  </a>
);

const ManageDNs = () => (
  <a
    href="https://accounts.tacc.utexas.edu/certificates"
    target="_blank"
    rel="noreferrer"
    className={`${stylesGlobalButton} ${styles['tap-action']}`}
  >
    Manage DNs
  </a>
);

const ManagePassword = () => (
  <a
    href="https://accounts.tacc.utexas.edu/change_password"
    target="_blank"
    rel="noreferrer"
    className={`${stylesGlobalButton} ${styles['tap-action']}`}
  >
    Change Password
  </a>
);

const ManageUpload = () => (
  <a
    href="https://tacc.utexas.edu/secure-upload"
    target="_blank"
    rel="noreferrer"
    className={`${stylesGlobalButton} ${styles['tap-action']}`}
  >
    Secure File Upload
  </a>
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
            <div className={styles['tap-header']}>
              <strong>Account Managment</strong>
            </div>
            <p>
              Account details are mananged by the TACC Account Management portal.
              Follow the links below to:
            </p>
            <ManageUser />
            <ManagePassword />
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
