import UserList from './UserList';
import { testRender } from '@tacc/tup-testing';
import { screen } from '@testing-library/react';

describe('userListComponent', () => {
  it('should render user list with all members plus delegate/PI', async () => {
    testRender(<UserList projectId={59184} />);
    const dataQuery = await screen.findAllByText(/Rosenberg/);
    expect(dataQuery.length).toBe(2);
    expect(screen.getAllByRole('link').length).toBe(5);
  });
});
