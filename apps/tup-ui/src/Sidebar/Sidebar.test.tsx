import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders Sidebar component', () => {
    const { getAllByText } = render(<Sidebar />);
    expect(getAllByText(/Dashboard/).length).toEqual(1);
  });
});
