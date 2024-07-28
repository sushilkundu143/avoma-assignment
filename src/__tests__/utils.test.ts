// utils.test.ts
import { fetchData, fetchPost, fetchComments, fetchPosts } from '../utils/util';
import { Post as PostType, Comment as CommentType } from '../types/types';

// Mock the fetch function
global.fetch = jest.fn();

const mockPost: PostType = { id: 1, userId: 1, title: 'Test Title', body: 'Test Body' };
const mockComments: CommentType[] = [{ postId: 1, id: 1, name: 'Test', email: 'test@test.com', body: 'Test Comment' }];

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost,
    });

    const data = await fetchData<PostType>('https://jsonplaceholder.typicode.com/posts/1');
    expect(data).toEqual(mockPost);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should throw an error if network response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchData<PostType>('https://jsonplaceholder.typicode.com/posts/1')).rejects.toThrow(
      'Network response was not ok'
    );
  });
});

describe('fetchPost', () => {
  it('should fetch a post by id', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost,
    });

    const post = await fetchPost('1');
    expect(post).toEqual(mockPost);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
  });
});

describe('fetchComments', () => {
  it('should fetch comments for a post', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments,
    });

    const comments = await fetchComments('1');
    expect(comments).toEqual(mockComments);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/comments?postId=1');
  });
});

describe('fetchPosts', () => {
  it('should fetch all posts', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockPost],
    });

    const posts = await fetchPosts();
    expect(posts).toEqual([mockPost]);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });
});
