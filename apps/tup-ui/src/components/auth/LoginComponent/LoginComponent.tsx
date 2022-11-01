import React, { useCallback } from 'react';
import { useLocation, Location, useSearchParams } from 'react-router-dom';
import { useAuth } from '@tacc/tup-hooks';
import { Formik, Form, Field } from 'formik';
import { Label } from 'reactstrap';
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

type LoginFieldProps = {
  name: string;
  label: string;
  type?: string;
};

const LoginField: React.FC<LoginFieldProps> = ({ name, label, type }) => {
  // Matt does not want these form stylings to be global
  return (
    <div className={styles['form-field']}>
      <Label className={styles['form-field__label']} size="sm" htmlFor={name}>
        {label}
      </Label>
      <Field name={name} id={name} type={type} />
    </div>
  );
};

const LoginError: React.FC<{ status?: number }> = ({ status }) => {
  if (status === 200 || status === undefined) {
    return null;
  }
  if (status === 403) {
    return (
      <div className={styles.error}>
        Sorry, we can't find an account matching those credentials.
        <br />
        Please try again or <a href="/account/create">create a new account</a>.
      </div>
    );
  }
  return (
    <div className={styles.error}>
      Sorry. Something went wrong while trying to log in. Please try again
      later.
    </div>
  );
};

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
  const { login, error, isLoading } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

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
      <div className={styles.title}>
        <img src={blackLogo} className={styles.logo} alt="TACC Logo" />
        <h3>Log In</h3>
        <p className={styles.subtitle}>to continue to the TACC User Portal</p>
      </div>
      <LoginError status={status} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <LoginField name="username" label="User Name" />
          <LoginField name="password" label="Password" type="password" />
          <div className={styles['submit-container']}>
            <a className={styles.link} href="/account/create">
              Create Account
            </a>
            <Button
              type="primary"
              attr="submit"
              size="long"
              className={styles.submit}
              isLoading={isLoading}
            >
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
      <div className={styles.footer}>
        <p>Having trouble logging in?</p>
        <a className={styles.link} href="/account/help">
          Account Help
        </a>
      </div>
    </div>
  );
};

export default LoginComponent;
