import AddUserModal from './AddUserModal';
import { testRender } from '@tacc/tup-testing';
import { screen, fireEvent, within } from '@testing-library/react';

describe('AddUserModal', () => {
  it('should display search results', async () => {
    testRender(<AddUserModal projectId={59184} />);
    const modalButton = screen.getByRole('button');
    // open the modal
    fireEvent.click(modalButton);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(3);

    // A user in the project should display as added already
    const existingUserRow = rows[1];
    const rowQuery = await within(existingUserRow).findByText(/Added/);
    expect(rowQuery).toBeDefined();

    // A user who is not in the project should display a prompt.
    const newUserRow = rows[2];
    const rowQuery2 = await within(newUserRow).findByText(/Add User/);
    expect(rowQuery2).toBeDefined();
  });
});
