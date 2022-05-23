import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Renders the App', () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText(/Vite/).length).toBeGreaterThanOrEqual(1);
  });
});
