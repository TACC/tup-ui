import React, { useCallback } from 'react';
import { useLocation, Location, useNavigate } from 'react-router-dom';
import { useAuth } from '@tacc/tup-ui/hooks';
import { Formik, Form, Field, useFormik, useFormikContext } from 'formik';
import { Label } from 'reactstrap';
import { Button } from '@tacc/core-components';
import * as Yup from 'yup';
import styles from './LoginComponent.module.css';
import logo from '@tacc/tup-ui/assets/TACC-formal-Black-1c.svg';
import { AxiosError } from 'axios';

type LoginInfo = {
  username: string;
  password: string;
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
      <Label
        className={styles['form-field__label']}
        size="sm"
        style={{ display: 'flex', alignItems: 'center' }}
        htmlFor={name}
      >
        {label}
      </Label>
      <Field name={name} id={name} type={type} />
    </div>
  );
};

const LoginError: React.FC<{ status?: number}> = ({ status }) => {
  if (status == 200 || status == undefined) {
    return null;
  }
  if (status == 403) {
    return (
      <div className={styles.error}>
        Sorry. We can't find an account with a username and matching password.<br />
        Please try again or <a>submit a ticket</a>.
      </div>
    )
  }
  return (
    <div className={styles.error}>
      Sorry. Something went wrong while trying to log in. Please try again later.
    </div>
  )
}

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';
  const authCallback = useCallback(
    () => navigate(from, { replace: true }),
    [from, navigate]
  );
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
    [login]
  );

  const status = (error as AxiosError)?.response?.status;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <img src={logo} className={styles.logo} />
        <h2>Log In</h2>
        <div className={styles.subtitle}>to continue to the TACC User Portal</div>
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
            <div>
              Create Account
            </div>
            <Button type="primary" attr="submit" size="long" className={styles.submit} isLoading={isLoading}>
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
      <div className={styles.footer}>
        <div>Having trouble logging in?</div>
        <div>Account Help</div>
      </div>
    </div>
  );
};

export default LoginComponent;
