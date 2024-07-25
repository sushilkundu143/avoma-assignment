import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Post from '../pages/Post';
import { fetchPost, fetchComments } from '../utils/util';
import { Post as PostType, Comment as CommentType } from '../types/types';

jest.mock('../utils/util', () => ({
  fetchPost: jest.fn(),
  fetchComments: jest.fn(),
}));

const mockPost: PostType = { userId: 1, id: 1, title: 'Post Title', body: 'Post Body' };
const mockComments: CommentType[] = [
  { postId: 1, id: 1, name: 'Commenter 1', email: 'commenter1@example.com', body: 'Comment Body 1' },
  { postId: 1, id: 2, name: 'Commenter 2', email: 'commenter2@example.com', body: 'Comment Body 2' },
];

const queryClient = new QueryClient();

describe('Post Component', () => {
  beforeEach(() => {
    (fetchPost as jest.Mock).mockResolvedValue(mockPost);
    (fetchComments as jest.Mock).mockResolvedValue(mockComments);
  });

  test('renders post and comments', async () => {
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
      expect(screen.getByText('Comments')).toBeInTheDocument();
      expect(screen.getByText('Commenter 1')).toBeInTheDocument();
      expect(screen.getByText('Comment Body 1')).toBeInTheDocument();
    });
  });

});
