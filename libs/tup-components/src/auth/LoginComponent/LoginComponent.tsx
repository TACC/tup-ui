import React, { useCallback } from 'react';
import { useLocation, Location, useSearchParams } from 'react-router-dom';
import { useAuth } from '@tacc/tup-hooks';
import { Formik, Form } from 'formik';
import { FormikInput } from '@tacc/core-wrappers';
import { Button } from '@tacc/core-components';
import * as Yup from 'yup';
import styles from './LoginComponent.module.css';
import { blackLogo } from '../../../assets';
import { AxiosError } from 'axios';

type LoginInfo = {
  username: string;
  password: string;
};

type LoginProps = {
  className?: string;
};

const LoginError: React.FC<{ status?: number }> = ({ status }) => {
  if (status === 200 || status === undefined) {
    return null;
  }
  if (status === 403) {
    return (
      <div className={`c-form__errors ${styles.error}`}>
        Sorry, we can't find an account matching those credentials.
        <br />
        Please try again or <a href="/account/create">create a new account</a>.
      </div>
    );
  }
  return (
    <div className={`c-form__errors ${styles.error}`}>
      Sorry. Something went wrong while trying to log in. Please try again
      later.
    </div>
  );
};

const CreateAccountLink = () => (
  <a
    href="https://accounts.tacc.utexas.edu/register"
    target="_blank"
    rel="noreferrer"
    className={styles.link}
  >
    Create Account
  </a>
);

const AccountHelpLink = () => (
  <a
    href="/about/help/"
    target="_blank"
    rel="noreferrer"
    className={styles.link}
  >
    Account Help
  </a>
);

const LoginComponent: React.FC<LoginProps> = ({ className }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Redirect precedence is 1) last router history location, 2) query string 'from'
  // parameter, 3) dashboard base route
  let from = (location.state as { from?: Location })?.from?.pathname ?? '';
  if (!from) {
    from = searchParams.get('from') ?? '/dashboard';
  } else from = `/dashboard${from}`;

  const authCallback = useCallback(() => {
    window.location.replace(from);
  }, [from]);
  const { login, data, error, isLoading } = useAuth();

  // FAQ: To use inline messaging for required fields (instead of browser):
  //      1. Uncomment this constant definition
  //      2. Pass this constant to <Formik>; validationSchema={validationSchema}
  //      3. Remove `required` attribute from <FormikInput>'s
  // const validationSchema = Yup.object({
  //   username: Yup.string().required(),
  //   password: Yup.string().required(),
  // });

  const initialValues: LoginInfo = {
    username: '',
    password: '',
  };

  const onSubmit = useCallback(
    ({ username, password }: LoginInfo) => {
      login({ username, password }, { onSuccess: authCallback });
    },
    [login, authCallback]
  );

  const status = (error as AxiosError)?.response?.status;

  return (
    <div className={`${styles.root} ${className}`}>
      <h3 className={`c-form__title ${styles.title}`}>
        <img src={blackLogo} className={styles.logo} alt="TACC Logo" />
        <span>Log In</span>
      </h3>
      <p className={`c-form__desc ${styles.subtitle}`}>
        to continue to the TACC User Portal
      </p>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="c-form">
          <LoginError status={status} />
          <FormikInput
            name="username"
            label="User Name"
            type="text"
            className={styles.field}
            autoComplete="username"
            required
          />
          <FormikInput
            name="password"
            label="Password"
            type="password"
            className={styles.field}
            autoComplete="current-password"
            required
          />
          <div className={`c-form__buttons ${styles['submit-container']}`}>
            <CreateAccountLink />
            <Button
              type="primary"
              attr="submit"
              size="long"
              className={styles.submit}
              isLoading={isLoading || !!data}
            >
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
      <div className={styles.footer}>
        <p>Having trouble logging in?</p>
        <AccountHelpLink />
      </div>
    </div>
  );
};

export default LoginComponent;
