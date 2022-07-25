import { render, waitFor } from '@testing-library/react';
import ProfileComponent from './ProfileComponent';
import { testQueryClient, getTestWrapper } from '../../utils';

const Wrapper = getTestWrapper(testQueryClient);

describe('ProfileComponent', () => {
  afterEach(() => {
    testQueryClient.clear();
  });
  it('should render a user profile', async () => {
    const { getAllByText } = render(
      <Wrapper>
        <ProfileComponent />
      </Wrapper>
    );
    await waitFor(() => expect(getAllByText(/mock user/).length).toEqual(1));
  });
});
