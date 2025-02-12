import React from 'react';
import { useLocation, Location, useSearchParams } from 'react-router-dom';
import { Button } from '@tacc/core-components';
import styles from './LoginComponent.module.css';
import { blackLogo } from '../../../assets';
import Cookies from 'js-cookie';
import { useConfig } from '@tacc/tup-hooks';

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
        Please try again or{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://accounts.tacc.utexas.edu/register"
        >
          create a new account
        </a>
        .
      </div>
    );
  }
  if (status === 451) {
    return (
      <div className="c-form__errors">
        Your account has been suspended. Please{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://accounts.tacc.utexas.edu/login_support"
        >
          request account support
        </a>
        .
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
    Forgot Password
  </a>
);

const ForgotUsernameLink = () => (
  <a
    href="https://accounts.tacc.utexas.edu/forgot_username"
    target="_blank"
    rel="noreferrer"
  >
    Recover Username
  </a>
);

const LoginComponent: React.FC<LoginProps> = ({ className }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Redirect precedence is 1) last router history location, 2) query string 'from'
  // parameter, 3) dashboard base route
  let from = (location.state as { from?: Location })?.from?.pathname ?? '';
  if (!from) {
    from = searchParams.get('next') ?? '/portal';
  } else from = `/portal${from}`;

  // FAQ: To use inline messaging for required fields (instead of browser):
  //      1. Uncomment this constant definition
  //      2. Pass this constant to <Formik>; validationSchema={validationSchema}
  //      3. Remove `required` attribute from <FormikInput>'s
  // const validationSchema = Yup.object({
  //   username: Yup.string().required(),
  //   password: Yup.string().required(),
  // });

  const csrfcookie = Cookies.get('csrftoken');
  const loginStatus = parseInt(useConfig().httpStatus || '200');

  return (
    <div className={`c-form--login ${styles.root} ${className}`}>
      <h3 className="c-form__title">
        <img src={blackLogo} alt="TACC Logo" />
        <span>Log In</span>
      </h3>
      <p className="c-form__desc">to continue to the TACC User Portal</p>
      <form action="/portal/login" method="POST" className="c-form">
        <LoginError status={loginStatus} isError={loginStatus !== 200} />
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value={csrfcookie}
        ></input>
        <div className="c-form__field has-required">
          <label htmlFor="input-username">Username or Email</label>
          <input
            name="username"
            id="input-username"
            type="text"
            autoComplete="username email"
            required
          />
        </div>
        <div className="c-form__field has-required">
          <label htmlFor="input-username">Password</label>
          <input
            name="password"
            id="input-password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="c-form__buttons">
          <CreateAccountLink />
          <Button type="primary" attr="submit" size="long">
            Log In
          </Button>
        </div>
      </form>
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
