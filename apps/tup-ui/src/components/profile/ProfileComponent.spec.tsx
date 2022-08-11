import { waitFor } from '@testing-library/react';
import ProfileComponent from './ProfileComponent';
import { testRender } from '../../utils';

describe('ProfileComponent', () => {
  it('should render a user profile', async () => {
    const { getAllByText } = testRender(<ProfileComponent />);
    await waitFor(() => expect(getAllByText(/mock user/).length).toEqual(1));
  });
});
