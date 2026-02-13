import { render, screen } from '@testing-library/react';
import App from './App';

test('renders knowledge base title', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    name: /personal knowledge base/i,
  });
  expect(headingElement).toBeInTheDocument();
});
