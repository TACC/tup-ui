import React from 'react';
import { ProjectsTable } from './ProjectsTable';
import { server, testRender } from '@tacc/tup-testing';
import { waitFor, render, screen, prettyDOM } from '@testing-library/react';
import { rest } from 'msw';

describe('Projects Table Component', () => {
  it('should render message when there are no projects to show', async () => {
    server.use(
      rest.get('http://localhost:8001/projects', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    const { getByText } = testRender(<ProjectsTable />);
    await waitFor(() =>
      expect(getByText('No active projects found.')).toBeDefined()
    );
  });
  it('should display the projects table', async () => {
    render(<ProjectsTable />)
    // server.use(
    //   rest.get('http://localhost:8001/projects', (req, res, ctx) => {
    //     return res.once(ctx.json([]));
    //   })
    // );
    screen.debug(screen.getByRole('table'))
  });



  // it('should display the projects table', async () => {
  //   server.use(
  //     rest.get('http://localhost:8001/projects', (req, res, ctx) => {
  //       return res.once(ctx.json([]));
  //     })
  //   );
  //   const { container, getByText, getByTestId, getAllByRole } = testRender(
  //     <ProjectsTable />
  //   );
  //   const {debug} = render({container})
  //   debug()
  //   expect(getByTestId('loading-spinner')).toBeDefined();
  //   await waitFor(() => getAllByRole('columnheader'));
  //   const columnHeaders: HTMLElement[] = getAllByRole('columnheader');
  //   expect(columnHeaders[0].textContent).toEqual('Project Title');
  //   // expect(columnHeaders[1].textContent).toEqual('Principal Investigator');
  //   // expect(columnHeaders[2].textContent).toEqual('Active Allocations');
  //   expect(getByText('JAR TUP Development Project')).toBeDefined();
  //   // expect(getByText('Jake Rosenberg')).toBeDefined();
  //   // expect(getByText('Lonestar6')).toBeDefined();
  // });
});
