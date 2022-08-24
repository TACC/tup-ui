import LoginComponent from './LoginComponent';
import { testRender } from '../../../utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { fireEvent, act, waitFor } from '@testing-library/react';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import useJwt from '../../../hooks/useJwt';

jest.mock('react-router-dom');
jest.mock('../../../hooks/useJwt');

const mockNavigate = jest.fn();

describe('LoginComponent', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      state: undefined,
    });
    (useJwt as jest.Mock).mockReturnValue({
      jwt: undefined,
      isLoading: false,
    });
  });
  it('should render login component if not logged in', async () => {
    const { getAllByText } = testRender(<LoginComponent />);
    await waitFor(() => expect(getAllByText(/Log In/)).toBeTruthy());
  });
  it('should perform a login', async () => {
    const { getByLabelText, getByRole } = testRender(<LoginComponent />);
    const username = getByLabelText(/User Name/);
    const password = getByLabelText(/Password/);
    const submit = getByRole(/button/);
    await act(async () => {
      await fireEvent.change(username, { target: { value: 'mockuser' } });
      await fireEvent.change(password, { target: { value: 'password' } });
      await fireEvent.click(submit);
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  });
  it('should display an error message on bad passwords', async () => {
    // Mock a 403 error
    server.use(
      rest.post('http://localhost/auth', (req, res, ctx) => {
        return res.once(
          ctx.status(403),
          ctx.json({ message: 'Invalid username/password' })
        );
      })
    );
    const { getByLabelText, getByRole, getAllByText } = testRender(
      <LoginComponent />
    );
    const username = getByLabelText(/User Name/);
    const password = getByLabelText(/Password/);
    const submit = getByRole(/button/);
    await act(async () => {
      await fireEvent.change(username, { target: { value: 'mockuser' } });
      await fireEvent.change(password, { target: { value: 'password' } });
      await fireEvent.click(submit);
    });
    await waitFor(() =>
      expect(
        getAllByText(
          /Sorry, we can't find an account matching those credentials\./
        ).length
      ).toEqual(1)
    );
  });
  it('should display an error message for other status codes', async () => {
    // Mock a 403 error
    server.use(
      rest.post('http://localhost/auth', (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' })
        );
      })
    );
    const { getByLabelText, getByRole, getAllByText } = testRender(
      <LoginComponent />
    );
    const username = getByLabelText(/User Name/);
    const password = getByLabelText(/Password/);
    const submit = getByRole(/button/);
    await act(async () => {
      await fireEvent.change(username, { target: { value: 'mockuser' } });
      await fireEvent.change(password, { target: { value: 'password' } });
      await fireEvent.click(submit);
    });
    await waitFor(() =>
      expect(
        getAllByText(/Something went wrong while trying to log in/).length
      ).toEqual(1)
    );
  });
});
