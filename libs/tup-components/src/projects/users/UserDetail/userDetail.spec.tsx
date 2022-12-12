import UserDetail from './UserDetail';
import { testRender } from '@tacc/tup-testing';
import { screen, within } from '@testing-library/react';

describe('UserDetailComponent', () => {
  it('should render user details with >1% usage', async () => {
    testRender(<UserDetail projectId={59184} username="jarosenb" />);
    const dataQuery = await screen.findByText('Lonestar6');
    const row = dataQuery.closest('tr') as HTMLElement;
    const rowQuery = within(row);

    expect(rowQuery.getByText('Lonestar6')).toBeDefined();
    expect(rowQuery.getByText('5')).toBeDefined();
    expect(rowQuery.getByText('50%')).toBeDefined();
  });

  it('should render user details with <1% usage', async () => {
    testRender(<UserDetail projectId={59184} username="smassie" />);
    const dataQuery = await screen.findByText('Lonestar6');
    const row = dataQuery.closest('tr') as HTMLElement;
    const rowQuery = within(row);

    expect(rowQuery.getByText('Lonestar6')).toBeDefined();
    expect(rowQuery.getByText('0.01')).toBeDefined();
    expect(rowQuery.getByText('<1%')).toBeDefined();
  });

  it('should render user details with 0% usage', async () => {
    testRender(<UserDetail projectId={59184} username="vg5726" />);
    const dataQuery = await screen.findByText('Lonestar6');
    const row = dataQuery.closest('tr') as HTMLElement;
    const rowQuery = within(row);

    expect(rowQuery.getByText('Lonestar6')).toBeDefined();
    expect(rowQuery.getByText('0')).toBeDefined();
    expect(rowQuery.getByText('0%')).toBeDefined();
  });
});
