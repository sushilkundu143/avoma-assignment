import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import CardComponent from '../components/CardComponent'; // Update the path as needed
import LoadingIcon from '../components/LoadingIcon';
import { Post } from '../types/types';
import ErrorComponent from '../components/ErrorComponent';
import { fetchPosts } from '../utils/util';

const Posts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const filteredPosts = data?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingIcon />;
  if (error) return <ErrorComponent message={error.message} />;

  if (!data) return <ErrorComponent message="No posts available" />;
  
  return (
    <div className="p-4" data-testid="posts">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded search-input"
      />
      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post: Post) => (
            <CardComponent
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
              linkPath={`/post/${post.id}`}
            />
          ))}
        </div>
      ) : (
        <ErrorComponent title="Search Result" message="No matching search result found" />
      )}
    </div>
  );
};

export default Posts;
