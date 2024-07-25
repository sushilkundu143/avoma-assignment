import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Posts from '../pages/Posts';
import { fetchPosts } from '../utils/util';
import { Post as PostType } from '../types/types';

// Mock the fetch function
jest.mock('../utils/util', () => ({
  fetchPosts: jest.fn(),
}));

const mockPosts: PostType[] = [
  { userId: 1, id: 1, title: 'Post Title 1', body: 'Post Body 1' },
  { userId: 1, id: 2, title: 'Post Title 2', body: 'Post Body 2' },
];

const queryClient = new QueryClient();

describe('Posts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  
  test('renders posts', async () => {
    (fetchPosts as jest.Mock).mockResolvedValue(mockPosts);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );

  
    const spinnerElement = screen.getByTestId('loader');
    expect(spinnerElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockPosts[0].body)).toBeInTheDocument();
      expect(screen.getByText(mockPosts[1].title)).toBeInTheDocument();
      expect(screen.getByText(mockPosts[1].body)).toBeInTheDocument();
    });
  });
});
