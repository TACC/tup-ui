import LoginComponent from './LoginComponent';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { fireEvent, act, waitFor } from '@testing-library/react';
import { server, testRender } from '@tacc/tup-testing';
import { rest } from 'msw';
import cookies from 'js-cookie';
import { vi, Mock } from 'vitest';

vi.mock('react-router-dom');
//jest.mock('@tacc/tup-hooks/useJwt');
vi.mock('js-cookie');

const mockNavigate = vi.fn();

describe('LoginComponent', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocation as Mock).mockReturnValue({
      state: undefined,
    });
    (cookies.get as Mock).mockReturnValue('badjwt');
    (useSearchParams as Mock).mockReturnValue([{ get: () => '' }, vi.fn()]);
  });
  it('should perform a login', async () => {
    Object.defineProperty(window, 'location', {
      value: { replace: mockNavigate },
    });
    const { getByLabelText, getByRole } = testRender(<LoginComponent />);
    const username = getByLabelText(/User Name/);
    const password = getByLabelText(/Password/);
    const submit = getByRole("button");
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
    const submit = getByRole("button");
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
    const submit = getByRole("button");
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
  it('should link to TAS Create Account if Create Account clicked', async () => {
    const { getByText, getAllByRole } = testRender(<LoginComponent />);
    await waitFor(() => getAllByRole('link'));
    const links: HTMLElement[] = getAllByRole('link');
    expect(getByText('Create Account')).toBeDefined();
    expect(links[0].getAttribute('href')).toEqual(
      'https://accounts.tacc.utexas.edu/register'
    );
    expect(getByText('Reset Password')).toBeDefined();
    expect(links[1].getAttribute('href')).toEqual(
      'https://accounts.tacc.utexas.edu/forgot_password'
    );
    expect(getByText('Account Help')).toBeDefined();
    expect(links[2].getAttribute('href')).toEqual('/about/help/');
  });
});
