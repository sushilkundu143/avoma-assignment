import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Post from '../pages/Post';
import { fetchPost, fetchComments } from '../utils/util';
import { Post as PostType, Comment as CommentType } from '../types/types';
import '@testing-library/jest-dom';

// Mock the fetch functions
jest.mock('../utils/util', () => ({
  fetchPost: jest.fn(),
  fetchComments: jest.fn(),
}));

const mockPost: PostType = { userId: 1, id: 1, title: 'Post Title 1', body: 'Post Body 1' };
const mockComments: CommentType[] = [
  { postId: 1, id: 1, name: 'Comment 1', email: 'email1@example.com', body: 'Comment Body 1' },
  { postId: 1, id: 2, name: 'Comment 2', email: 'email2@example.com', body: 'Comment Body 2' },
];

const queryClient = new QueryClient();

describe('Post Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const spinnerElement = screen.getByTestId('loader');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('renders error state if fetching post fails', async () => {
    (fetchPost as jest.Mock).mockRejectedValue({message: 'Failed to fetch post'});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

     // Wait for the loading state to transition
     await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('errorComponent')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch post')).toBeInTheDocument();
    });
  });

  test('renders post and comments', async () => {
    (fetchPost as jest.Mock).mockResolvedValue(mockPost);
    (fetchComments as jest.Mock).mockResolvedValue(mockComments);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });

    await waitFor(() => {
      mockComments.forEach((comment) => {
        expect(screen.getByText(comment.name)).toBeInTheDocument();
        expect(screen.getByText(comment.body)).toBeInTheDocument();
      });
    });
  });

  test('renders error state if fetching comments fails', async () => {
    (fetchPost as jest.Mock).mockResolvedValue(mockPost);
    (fetchComments as jest.Mock).mockRejectedValue({message: 'Failed to fetch comments'});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('errorComponent')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch comments')).toBeInTheDocument();
    });
  });

  test('renders loading state for comments', async () => {
    (fetchPost as jest.Mock).mockResolvedValue(mockPost);
    (fetchComments as jest.Mock).mockImplementation(() => new Promise(() => {})); // Keep it in loading state

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });

    const spinnerElement = screen.getByTestId('loader');
    expect(spinnerElement).toBeInTheDocument();
  });
});
