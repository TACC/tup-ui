import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getTestWrapper, testQueryClient } from '@tacc/tup-ui/utils';
import { useAuth } from '@tacc/tup-ui/hooks';
import Sidebar from './Sidebar';

jest.mock('@tacc/tup-ui/hooks');

const Wrapper = getTestWrapper(testQueryClient);

describe('Sidebar', () => {
  it('renders Sidebar component', () => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedIn: true
    });
    const { getAllByText } = render(<Wrapper><Sidebar /></Wrapper>);
    expect(getAllByText(/Dashboard/).length).toEqual(1);
  });
});
