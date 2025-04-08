import React from 'react';
import Tickets from './Tickets';
import { testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('js-cookie');

describe('Tickets Component', () => {
  beforeEach(() => {
    vi.stubGlobal('__TUP_CONFIG__', {
      authenticated: 'True',
      baseUrl: 'http://localhost:8001',
      httpStatus: '200',
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it('should render SectionTableWrapper and Table components', async () => {
    const { getByText } = testRender(<Tickets />);
    await waitFor(() => expect(getByText('Subject')).toBeDefined());
    expect(getByText('+ New Ticket')).toBeDefined();
    expect(getByText('Tickets')).toBeDefined();
    expect(getByText('Ticket Status')).toBeDefined();
  });
});
