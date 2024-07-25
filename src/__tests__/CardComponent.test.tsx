import React from 'react';
import { render, screen } from '@testing-library/react';
import CardComponent from '../components/CardComponent';

describe('CardComponent', () => {
  test('renders card with title and body', () => {
    render(
      <CardComponent
        title="Card Title"
        body="Card Body"
        id={1}
        clickable={true}
      />
    );
    const cardElement = screen.getByTestId('cardComponent');
    expect(cardElement).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Body')).toBeInTheDocument();
  });

  test('renders non-clickable card', () => {
    render(
      <CardComponent
        title="Non-clickable Card Title"
        body="Non-clickable Card Body"
        id={1}
        clickable={false}
      />
    );

    expect(screen.getByText('Non-clickable Card Title')).toBeInTheDocument();
    expect(screen.getByText('Non-clickable Card Body')).toBeInTheDocument();
  });
});

