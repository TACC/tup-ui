import ProjectDetails from './ProjectDetails';
import { testRender, server } from '@tacc/tup-testing';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

const mockPublication = {
  id: 7852,
  authors: 'Elizabeth Litvina, Amy Adams',
  title: 'BRAIN initiative: cutting-edge tools and resources for the community',
  yearPublished: 2019,
  publisher: 'Society for Neuroscience',
  venue: 'Journal of Neuroscience',
  userCitedTacc: true,
};

const mockPublicationsUrl = (url: string) =>
  server.use(
    rest.get(
      'http://localhost:8001/projects/:projectId/publications',
      (req, res, ctx) => res(ctx.json([{ ...mockPublication, url }]))
    )
  );

describe('Project Details Component', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectDetails projectId={59184} />);
    expect(getByTestId('loading-spinner')).toBeDefined();
  });
  it('should display the projects table', async () => {
    const { getByText, getByTestId, getAllByRole } = testRender(
      <ProjectDetails projectId={59184} />
    );
    expect(getByTestId('loading-spinner')).toBeDefined();
    await waitFor(() => getAllByRole('columnheader'));
    const columnHeaders: HTMLElement[] = getAllByRole('columnheader');
    expect(columnHeaders[0].textContent).toEqual('Systems');
    expect(columnHeaders[1].textContent).toEqual('Awarded');
    expect(columnHeaders[2].textContent).toEqual('Used');
    expect(columnHeaders[3].textContent).toEqual('Status');
    expect(columnHeaders[4].textContent).toEqual('Expires');
    expect(getByText('Lonestar6')).toBeDefined();
    expect(getByText('10 SU')).toBeDefined();
    expect(getByText('0 SU')).toBeDefined();
    expect(getByText('9/30/2023')).toBeDefined();
  });
  it('should link a publication url to the publication', async () => {
    testRender(<ProjectDetails projectId={59184} />);
    const link = await screen.findByRole('link', {
      name: 'https://doi.org/10.1523/JNEUROSCI.1169-19.2019',
    });
    expect(link.getAttribute('href')).toEqual(
      'https://doi.org/10.1523/JNEUROSCI.1169-19.2019'
    );
    expect(link.getAttribute('target')).toEqual('_blank');
    expect(link.getAttribute('rel')).toEqual('noreferrer');
  });
  it('should link a publication url that has no scheme', async () => {
    mockPublicationsUrl('doi.org/10.1234/no-scheme');
    testRender(<ProjectDetails projectId={59184} />);
    const link = await screen.findByRole('link', {
      name: 'doi.org/10.1234/no-scheme',
    });
    expect(link.getAttribute('href')).toEqual(
      'https://doi.org/10.1234/no-scheme'
    );
  });
  it('should not link a publication url that is not http(s)', async () => {
    mockPublicationsUrl('javascript:alert(document.cookie)');
    testRender(<ProjectDetails projectId={59184} />);
    const text = await screen.findByText('javascript:alert(document.cookie)');
    expect(text.closest('a')).toEqual(null);
  });
  it.skip('should display the projects publications, and abstract/grants', async () => {
    testRender(<ProjectDetails projectId={59184} />);
    await screen.findByText(/This project has no publications./);
    await screen.findByText(
      /If your allocation was awarded through ACCESS, it can be managed in the ACCESS portal/
    );
  });
});
