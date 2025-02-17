import LoginComponent from './LoginComponent';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { testRender } from '@tacc/tup-testing';
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
  it('should link to TAM', async () => {
    const { getByText, getAllByRole } = testRender(<LoginComponent />);
    await waitFor(() => getAllByRole('link'));
    const links: HTMLElement[] = getAllByRole('link');
    expect(getByText('Create Account')).toBeDefined();
    expect(links[0].getAttribute('href')).toEqual(
      'https://accounts.tacc.utexas.edu/register'
    );
    expect(getByText('Account Help')).toBeDefined();
    expect(links[1].getAttribute('href')).toEqual(
      'https://accounts.tacc.utexas.edu/login_support'
    );
    expect(getByText('Forgot Password')).toBeDefined();
    expect(links[2].getAttribute('href')).toEqual(
      'https://accounts.tacc.utexas.edu/forgot_password'
    );
    expect(getByText('Recover Username')).toBeDefined();
    expect(links[3].getAttribute('href')).toEqual(
      'https://accounts.tacc.utexas.edu/forgot_username'
    );
  });
});
