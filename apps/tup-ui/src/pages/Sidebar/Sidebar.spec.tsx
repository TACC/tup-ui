import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { testRender } from '../../utils';
import { useAuth } from '../../hooks';
import Sidebar from './Sidebar';

jest.mock('../../hooks');

describe('Sidebar', () => {
  it('renders Sidebar component', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: true,
    });
    const { getAllByText } = testRender(<Sidebar />);
    expect(getAllByText(/Dashboard/).length).toEqual(1);
  });
});
