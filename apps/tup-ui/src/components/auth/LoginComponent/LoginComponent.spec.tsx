import LoginComponent from './LoginComponent';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { fireEvent, act, waitFor } from '@testing-library/react';
import { server, testRender } from '@tacc/tup-testing';
import { rest } from 'msw';
import { get } from 'js-cookie';

jest.mock('react-router-dom');
//jest.mock('@tacc/tup-hooks/useJwt');
jest.mock('js-cookie');

const mockNavigate = jest.fn();

describe('LoginComponent', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      state: undefined,
    });
    (get as jest.Mock).mockReturnValue('badjwt');
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => '' },
      jest.fn(),
    ]);
  });
  it('should perform a login', async () => {
    Object.defineProperty(window, 'location', {
      value: { replace: mockNavigate },
    });
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
      rest.post('http://localhost:8001/auth', (req, res, ctx) => {
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
      rest.post('http://localhost:8001/auth', (req, res, ctx) => {
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
