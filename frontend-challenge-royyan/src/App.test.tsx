import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders News link', () => {
  render(<App />);
  const linkElement = screen.getByText(/News/i);
  expect(linkElement).toBeInTheDocument();
});
