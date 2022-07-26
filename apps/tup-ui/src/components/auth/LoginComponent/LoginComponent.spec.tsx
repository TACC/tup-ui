import { render } from '@testing-library/react';
import LoginComponent from './LoginComponent';
import useAuth from '@tacc/tup-ui/hooks/useAuth';
import { getTestWrapper, testQueryClient } from '@tacc/tup-ui/utils';

jest.mock('@tacc/tup-ui/hooks/useAuth');

const Wrapper = getTestWrapper(testQueryClient);

describe('LoginComponent', () => {
  it('should render login component if not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: false,
      isLoading: false,
      error: null,
    });
    const { getAllByText } = render(
      <Wrapper>
        <LoginComponent />
      </Wrapper>
    );
    expect(getAllByText(/Login/)).toBeTruthy();
  });
});
