import { Post as PostType, Comment as CommentType } from '../types/types';

export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the server. Please try again later.');
    }
    return response.json();
  };

  export const fetchPost = async (id: string): Promise<PostType> => {
    return fetchData(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
  
export const fetchComments = async (postId: string): Promise<CommentType[]> => {
    return fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
};

export const fetchPosts = async (): Promise<PostType[]> => {
  return fetchData<PostType[]>('https://jsonplaceholder.typicode.com/posts');
};