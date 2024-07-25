import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorComponent from '../components/ErrorComponent';

describe('ErrorComponent', () => {
  test('renders error message', () => {
    render(<ErrorComponent message="An error occurred" />);

    const errorElement = screen.getByTestId('errorComponent');
    expect(errorElement).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
