import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the individual components used in the routes
jest.mock('../pages/Posts', () => () => <div>Mocked Posts Page</div>);
jest.mock('../pages/Post', () => () => <div>Mocked Post Page</div>);
jest.mock('../pages/PageNotFound', () => () => <div>Mocked Page Not Found</div>);
jest.mock('../components/ErrorBoundary', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('App Component', () => {
  test('renders App component with AppRoutes', () => {
    render(<App />);
    
    // Check if the App component renders correctly
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();

    // Check if the ErrorBoundary wraps the App component
    expect(screen.getByText('Mocked Posts Page')).toBeInTheDocument();
  });
});
