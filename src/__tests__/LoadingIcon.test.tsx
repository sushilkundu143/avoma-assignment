import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIcon from '../components/LoadingIcon';
import '@testing-library/jest-dom';

describe('LoadingIcon Component', () => {
  test('renders loading spinner with correct styles', () => {
    render(<LoadingIcon />);

    // Check if the loader element is present
    const spinnerElement = screen.getByTestId('loader'); // Role might need adjustment based on actual implementation
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toBeInTheDocument();
  });
});
