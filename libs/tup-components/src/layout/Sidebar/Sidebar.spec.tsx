import React from 'react';
import { testRender } from '@tacc/tup-testing';
import { useAuth } from '@tacc/tup-hooks';
import Sidebar from './Sidebar';
import { vi, Mock } from 'vitest';

vi.mock('@tacc/tup-hooks');

describe('Sidebar', () => {
  it('renders Sidebar component', () => {
    (useAuth as Mock).mockReturnValue({
      loggedIn: true,
    });
    const { getAllByText } = testRender(<Sidebar />);
    expect(getAllByText(/Dashboard/).length).toEqual(1);
  });
});
