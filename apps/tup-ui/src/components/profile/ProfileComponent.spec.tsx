import { waitFor } from '@testing-library/react';
import ProfileComponent from './ProfileComponent';
import { testRender } from '@tacc/tup-ui/utils';

describe('ProfileComponent', () => {
  it('should render a user profile', async () => {
    const { getAllByText } = testRender(<ProfileComponent />);
    await waitFor(() => expect(getAllByText(/mock user/).length).toEqual(1));
  });
});
