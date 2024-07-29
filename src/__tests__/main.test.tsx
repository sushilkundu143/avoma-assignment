import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import * as ReactDOM from 'react-dom/client';

// Mock ReactDOM.createRoot
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockImplementation(() => ({
    render: jest.fn(),
  })),
}));

test('renders App with QueryClientProvider', () => {
  const queryClient = new QueryClient();
  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);

  // Import main.tsx after setting up the DOM
  require('../main');

  const createRoot = ReactDOM.createRoot as jest.Mock;
  expect(createRoot).toHaveBeenCalledWith(rootElement);

  const root = createRoot.mock.results[0].value;
  expect(root.render).toHaveBeenCalledWith(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );

  // Clean up
  document.body.removeChild(rootElement);
});
