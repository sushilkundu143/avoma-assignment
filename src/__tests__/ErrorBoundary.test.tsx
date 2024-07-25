import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../components/ErrorBoundary';

const ProblemChild: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('renders error message on error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText(/Error Details/)).toBeInTheDocument();
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument();
  });

  test('renders child components without error', () => {
    render(
      <ErrorBoundary>
        <div>Normal Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Child')).toBeInTheDocument();
  });
});
