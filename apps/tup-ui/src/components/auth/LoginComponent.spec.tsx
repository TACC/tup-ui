import { render } from '@testing-library/react';
import LoginComponent from './LoginComponent';
import useAuth from '../../hooks/useAuth';
import { getTestWrapper, testQueryClient } from '../../utils';

jest.mock('../hooks/useAuth');
jest.mock('./ProfileComponent');

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
