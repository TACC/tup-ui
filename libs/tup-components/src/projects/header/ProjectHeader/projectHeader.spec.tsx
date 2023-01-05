import ProjectHeader from './ProjectHeader';
import { testRender } from '@tacc/tup-testing';

import { screen, within } from '@testing-library/react';

describe('Projects Header Component', () => {
  it('should display the projects detail header', async () => {
    testRender(<ProjectHeader projectId={59184} />);
    await screen.findAllByText(/JAR TUP Development Project/);
    await screen.findByText(/Project Charge Code/);
    await screen.findByText(/STA22002/);
    await screen.findByText(/Field of Science/);
    await screen.findByText('Center Systems Staff (STA)');
    await screen.findByText(/Unix Group/);
    await screen.findByText('G-825495 }');
  });
  it('should have a link in the projects detail header', async () => {
    testRender(<ProjectHeader projectId={59184} />);
    const dataQuery = await screen.findByText(/Active Projects/);
    const link = dataQuery.closest('a') as HTMLElement;
    const linkQuery = within(link);
    expect(linkQuery.getByText('Active Projects')).toBeDefined();
  });
});
