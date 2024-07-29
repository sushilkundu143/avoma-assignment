// src/__tests__/PageNotFound.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageNotFound from '../pages/PageNotFound'; // Adjust the path as necessary

describe('PageNotFound', () => {
  test('renders 404 heading', () => {
    render(<PageNotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('renders Page Not Found text', () => {
    render(<PageNotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('renders Go Home link', () => {
    render(<PageNotFound />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go Home/i })).toHaveAttribute('href', '/');
  });
});
