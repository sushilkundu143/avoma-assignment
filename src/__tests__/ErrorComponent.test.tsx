import { render, screen } from '@testing-library/react';
import ErrorComponent from '../components/ErrorComponent';
import '@testing-library/jest-dom';

describe('ErrorComponent', () => {
  test('renders error message with default title', () => {
    render(<ErrorComponent message="An error occurred" />);
    const errorElement = screen.getByTestId('errorComponent');
    expect(errorElement).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument(); // Check for default title
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  test('renders error message with custom title', () => {
    render(<ErrorComponent title="Custom Error" message="An error occurred" />);
    const errorElement = screen.getByTestId('errorComponent');
    expect(errorElement).toBeInTheDocument();
    expect(screen.getByText('Custom Error')).toBeInTheDocument(); // Check for custom title
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
