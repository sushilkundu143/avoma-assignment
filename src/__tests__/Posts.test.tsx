import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Posts from '../pages/Posts';
import { fetchPosts } from '../utils/util';
import { Post as PostType } from '../types/types';
import '@testing-library/jest-dom';


jest.mock('../utils/util', () => ({
  fetchPosts: jest.fn(),
}));

const mockPosts: PostType[] = [
  { userId: 1, id: 1, title: 'Post Title 1', body: 'Post Body 1' },
  { userId: 2, id: 2, title: 'Post Title 2', body: 'Post Body 2' },
];

const queryClient = new QueryClient();

describe('Posts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const spinnerElement = screen.getByTestId('loader');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('renders error state if fetching posts fails', async () => {
    (fetchPosts as jest.Mock).mockRejectedValue(new Error('Failed to fetch posts'));
    console.log('>>> fetchPosts mock:', fetchPosts);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );
    // Log the DOM for debugging
    screen.debug();
  

    // Wait for the loading state to transition
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    // Check for the error state
    await waitFor(() => {
      expect(screen.getByTestId('errorComponent')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch posts')).toBeInTheDocument();
    });
  });


  test('renders posts and allows search', async () => {
    (fetchPosts as jest.Mock).mockResolvedValue(mockPosts);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      mockPosts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByPlaceholderText('Search posts...'), {
      target: { value: 'Post Title 1' },
    });

    await waitFor(() => {
      expect(screen.getByText('Post Title 1')).toBeInTheDocument();
      expect(screen.queryByText('Post Title 2')).not.toBeInTheDocument();
    });
  });

  test('renders "No matching search result found" if no posts match search term', async () => {
    (fetchPosts as jest.Mock).mockResolvedValue(mockPosts);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      mockPosts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByPlaceholderText('Search posts...'), {
      target: { value: 'Non-existent Post' },
    });

    await waitFor(() => {
      expect(screen.getByText('No matching search result found')).toBeInTheDocument();
    });
  });
});
