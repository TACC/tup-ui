import LoginComponent from './LoginComponent';
import { testRender } from '@tacc/tup-ui/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { fireEvent, act, waitFor } from '@testing-library/react';

jest.mock('react-router-dom');


const mockNavigate = jest.fn();

describe('LoginComponent', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    (useNavigate as jest.Mock).mockReturnValue({
      navigate: mockNavigate
    });
    (useLocation as jest.Mock).mockReturnValue({
      state: undefined
    });
  });
  it('should render login component if not logged in', () => {
    const { getAllByText } = testRender(<LoginComponent />);
    expect(getAllByText(/Log In/)).toBeTruthy();
  });
  it('should perform a login', async () => {
    const { getByLabelText, getByRole } = testRender(<LoginComponent />);
    /*
    const username = getByLabelText(/User Name/);
    const password = getByLabelText(/Password/);
    const submit = getByRole(/button/);
    await act(
      async () => {
        await fireEvent.change(username, { target: { value: 'mockuser' }});
        await fireEvent.change(password, { target: { value: 'password' }});
        await fireEvent.click(submit);
      }
    );
    await waitFor(
      () => expect(mockNavigate).toHaveBeenCalled()
    )
    */
  });
});
