import React, { useCallback } from 'react';
import { useLocation, Location, useSearchParams } from 'react-router-dom';
import { useAuth } from '@tacc/tup-hooks';
import { Formik, Form } from 'formik';
import { FormikInput } from '@tacc/core-wrappers';
import { Button } from '@tacc/core-components';
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

const LoginError: React.FC<{ status?: number; isError: boolean }> = ({
  status,
  isError,
}) => {
  if (!isError && (status === 200 || status === undefined)) {
    return null;
  }
  if (status === 403) {
    return (
      <div className="c-form__errors">
        Sorry, we can't find an account matching those credentials.
        <br />
        Please try again or <a href="/account/create">create a new account</a>.
      </div>
    );
  }
  return (
    <div className="c-form__errors">
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
  >
    Create Account
  </a>
);

const AccountHelpLink = () => (
  <a
    href="https://accounts.tacc.utexas.edu/login_support"
    target="_blank"
    rel="noreferrer"
  >
    Account Help
  </a>
);

const ForgotPasswordLink = () => (
  <a
    href="https://accounts.tacc.utexas.edu/forgot_password"
    target="_blank"
    rel="noreferrer"
  >
    Reset Password
  </a>
);

const ForgotUsernameLink = () => (
  <a
    href="https://accounts.tacc.utexas.edu/forgot_username"
    target="_blank"
    rel="noreferrer"
  >
    Request Username
  </a>
);

const LoginComponent: React.FC<LoginProps> = ({ className }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Redirect precedence is 1) last router history location, 2) query string 'from'
  // parameter, 3) dashboard base route
  let from = (location.state as { from?: Location })?.from?.pathname ?? '';
  if (!from) {
    from = searchParams.get('from') ?? '/portal';
  } else from = `/portal${from}`;

  const authCallback = useCallback(() => {
    window.location.replace(from);
  }, [from]);
  const { login, data, error, isLoading, isError } = useAuth();

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
    <div className={`c-form--login ${styles.root} ${className}`}>
      <h3 className="c-form__title">
        <img src={blackLogo} alt="TACC Logo" />
        <span>Log In</span>
      </h3>
      <p className="c-form__desc">to continue to the TACC User Portal</p>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="c-form">
          <LoginError status={status} isError={isError} />
          <FormikInput
            name="username"
            label="User Name"
            type="text"
            autoComplete="username"
            required
          />
          <FormikInput
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div className="c-form__buttons">
            <CreateAccountLink />
            <Button
              type="primary"
              attr="submit"
              size="long"
              isLoading={isLoading || !!data}
            >
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
      <div className="c-form__nav">
        <p>Having trouble logging in?</p>
        {/* CAUTION: Do not exceed three links. If more needed, ask design. */}
        <AccountHelpLink />
        <ForgotPasswordLink />
        <ForgotUsernameLink />
      </div>
    </div>
  );
};

export default LoginComponent;
