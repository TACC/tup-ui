import LoginComponent from './LoginComponent';
import useAuth from '@tacc/tup-ui/hooks/useAuth';
import { testRender } from '@tacc/tup-ui/utils';

jest.mock('@tacc/tup-ui/hooks/useAuth');

describe('LoginComponent', () => {
  it('should render login component if not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: false,
      isLoading: false,
      error: null,
    });
    const { getAllByText } = testRender(<LoginComponent />);
    expect(getAllByText(/Login/)).toBeTruthy();
  });
});
