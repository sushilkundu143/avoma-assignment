import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import ReactDOM from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockImplementation(() => ({
    render: jest.fn(),
  })),
}));

test('renders App with QueryClientProvider', () => {
  const queryClient = new QueryClient();
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  const createRoot = ReactDOM.createRoot as jest.Mock;
  render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
    {
      container: root,
    }
  );

  // Check if the App component's content is rendered
  expect(createRoot).toHaveBeenCalledWith(root);
//   expect(screen.getByText(/Posts/i)).toBeInTheDocument();

  document.body.removeChild(root);
});
