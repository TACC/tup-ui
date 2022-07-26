import React, { useCallback } from 'react';
import { useLocation, Location, useNavigate } from 'react-router-dom';
import { useAuth } from '@tacc/tup-ui/hooks';
import { Formik, Form, Field, useFormik, useFormikContext } from 'formik';
import { Label } from 'reactstrap';
import { Button } from '@tacc/core-components';
import * as Yup from 'yup';
import styles from './LoginComponent.module.css';
import logo from '@tacc/tup-ui/assets/TACC-formal-Black-1c.svg';

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
      console.log(username, password);
      //login({ username, password }, { onSuccess: authCallback });
    },
    [login]
  );

  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <div className={styles.root}>
      <img src={logo} className={styles.logo} />
      <h2>Log In</h2>
      <div className={styles.subtitle}>to continue to the TACC User Portal</div>
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
            <Button type="primary" attr="submit" size="long" className={styles.submit}>
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
      
        <div className={styles.help}>Having trouble logging in?</div>
        <div className={styles.help}>Account Help</div>
    </div>
  );
};

export default LoginComponent;
