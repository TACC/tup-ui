import { render, screen } from '@testing-library/react';
import { AxiosStatic } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginComponent from './LoginComponent';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';

jest.mock('../hooks/useAuth');
jest.mock('./ProfileComponent');


describe('LoginComponent', () => {
  it('should render login component if not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: false,
      isLoading: false,
      error: null
    })
    const { getAllByText } = render(<LoginComponent />);
    expect(getAllByText(/Login/)).toBeTruthy();
  });
  it('should render a logout component if logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: true,
      isLoading: false,
      error: null
    })
    const { getAllByText } = render(<LoginComponent />);
    expect(getAllByText(/Log Out/)).toBeTruthy();
  });
});
