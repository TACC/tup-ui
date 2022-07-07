import { render } from '@testing-library/react';
import LoginComponent from './LoginComponent';
import useAuth from '../hooks/useAuth';

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
