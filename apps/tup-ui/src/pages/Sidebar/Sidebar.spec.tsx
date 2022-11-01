import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { testRender } from '@tacc/tup-testing';
import { useAuth } from '@tacc/tup-hooks';
import Sidebar from './Sidebar';

jest.mock('@tacc/tup-hooks');

describe('Sidebar', () => {
  it('renders Sidebar component', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: true,
    });
    const { getAllByText } = testRender(<Sidebar />);
    expect(getAllByText(/Dashboard/).length).toEqual(1);
  });
});
