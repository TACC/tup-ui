import React, { createContext, useContext, useState } from 'react';
import axios, { AxiosStatic } from 'axios';
import Cookies from 'js-cookie';
import {
  useQuery,
  useMutation,
  useQueryClient,
  setLogger,
  UseQueryResult,
} from 'react-query';

// Disable error logging when we throw inside a react-query fetcher method.
setLogger({
  log: window.console.log,
  warn: window.console.warn,
  error: () => {
    /* */
  },
});

/*******************************************
                    TYPES
********************************************/

// Extend the window type to support custom config passed from the server side.
declare global {
  interface Window {
    __TUP_CONFIG__: {
      baseUrl: string;
    };
  }
}

export type AuthResponse = {
  exp: number;
  iat: number;
  ttl: number;
  jwt: string;
  username: string;
  profile: UserProfile;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  institutionId: number;
  department: string;
  departmentId: number;
  country: string;
  countryId: number;
  citizenship: string;
  citizenshipId: number;
  piEligibility: string;
  phone: string;
  title: string;
  uid: number;
  homeDirectory: string;
  gid: number;
  emailConfirmations: string[];
};

/*******************************************
                    UTILS
********************************************/

async function authUtil(
  client: AxiosStatic,
  baseUrl: string,
  username: string,
  password: string
) {
  const request = await client.post<AuthResponse>(`${baseUrl}/auth`, {
    username,
    password,
  });

  return request.data;
}

async function GetProfileUtil(
  client: AxiosStatic,
  baseUrl: string,
  jwt: string
) {
  const request = await client.get<UserProfile>(`${baseUrl}/auth/profile`, {
    headers: { 'x-tup-token': jwt },
  });
  return request.data;
}

/*******************************************
                  HOOKS
********************************************/

//Inject the Axios client via context so that it can be swapped out in tests.
export const AxiosClientContext = createContext(axios);
const useAxios = (): AxiosStatic => {
  return useContext(AxiosClientContext);
};

// Get config provided to the window object via SSR.
const useConfig = () => {
  const config = window.__TUP_CONFIG__;
  // return a default if no config exists on the window.
  return config ?? { baseUrl: 'http://localhost:8000' };
};

//Retrieve a JWT stored in the x-tup-token cookie.
const getJwt = () => {
  const cookie = Cookies.get('x-tup-token');
  if (!cookie) {
    throw new Error('No JWT found.');
  }
  return cookie;
};
const useJwt = () => {
  const query = useQuery('jwt', getJwt, { retry: false });
  return query;
};

// Mutation to POST credentials to tup-services and retrieve the user's JWT.
const useAuthMutation = () => {
  const client = useAxios();
  const config = useConfig();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const result = await authUtil(client, config.baseUrl, username, password);
      const expirationDate = new Date(Date.now() + 10000);
      Cookies.set('x-tup-token', result.jwt, { expires: expirationDate });
      // Invalidate the jwt query to trigger rerender of any component that uses it.
      queryClient.invalidateQueries('jwt');
    }
  );
  return mutation;
};

// Query to retrieve the user's profile object.
const useProfileQuery = (): UseQueryResult<UserProfile> => {
  const client = useAxios();
  const config = useConfig();
  const { data: jwt } = useJwt();
  const query = useQuery('profile', () =>
    GetProfileUtil(client, config.baseUrl, jwt ?? '')
  );
  return query;
};

/*******************************************
                COMPONENTS
********************************************/

export const ProfileComponent = () => {
  const profileQuery = useProfileQuery();
  const profile = profileQuery.data;
  if (profile) {
    return (
      <div>
        User Profile
        <ul>
          <li>
            {profile.firstName} {profile.lastName}
          </li>
          <li>{profile.institution}</li>
          <li>{profile.country}</li>
        </ul>
      </div>
    );
  }
  return <div>User Profile</div>;
};

const LoginComponent = () => {
  const authMutation = useAuthMutation();
  const jwtQuery = useJwt();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    authMutation.mutate({ username, password });
  };

  // Once routing is implemented, this logic can be used to wrap routes and redirect
  // to a login page if no JWT is saved.
  switch (jwtQuery.status) {
    case 'success':
      //return <div>User Profile</div>
      return <ProfileComponent />;
    case 'error':
      return (
        <form onSubmit={authenticate}>
          <div>Login:</div>
          <div>
            Username:{' '}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            Password:{' '}
            <input
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    case 'loading':
    default:
      return <div>...</div>;
  }
};

export default LoginComponent;
