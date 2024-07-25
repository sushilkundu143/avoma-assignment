// src/Posts.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CardComponent from '../components/CardComponent'; // Update the path as needed
import LoadingIcon from '../components/LoadingIcon'; 
import { Post } from '../types/types';
import ErrorComponent from '../components/ErrorComponent';
import { fetchPosts } from '../utils/util';



const Posts: React.FC = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  if (isLoading) return <LoadingIcon />;
  if (error) return <ErrorComponent message={error.message} />;

  if (!data) return <ErrorComponent message="No posts available" />;

  return (
    <div className="p-4" data-testid="posts">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((post: Post) => (
          <CardComponent
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            linkPath={`/post/${post.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
