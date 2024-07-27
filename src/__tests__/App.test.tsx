import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App component without crashing', () => {
  render(
      <App />
  );

  // Check if the components rendered by AppRoutes are present
  // For example, check if the Posts component's content is rendered
  expect(screen.getByText(/Posts/i)).toBeInTheDocument();
});
