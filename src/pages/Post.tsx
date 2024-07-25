// src/Post.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "../components/CardComponent";
import LoadingIcon from "../components/LoadingIcon";
import ErrorComponent from '../components/ErrorComponent';
import { fetchPost, fetchComments } from '../utils/util';
import { Post as PostType, Comment as CommentType } from '../types/types';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useQuery<PostType, Error>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery<CommentType[], Error>({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id!),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  if (postLoading) return <LoadingIcon />;
  if (postError || !post) return <ErrorComponent message={postError?.message ?? 'No posts available'} />;

  if (commentsLoading) return <LoadingIcon />;
  if (commentsError || !comments) return <ErrorComponent message={commentsError?.message ?? 'No comments available'} />;
  
  return (
    <div className="p-4">
      <Link to="/" className="text-blue-900 underline">
        Back to Posts
      </Link>
      <h1 className="text-2xl font-bold mt-4">{post?.title}</h1>
      <p className="mt-2">{post?.body}</p>

      <h2 className="text-xl font-bold mt-4">Comments</h2>
      <div className="mt-2">
        {comments?.map((comment: CommentType) => (
          <CardComponent
            key={comment.id}
            title={comment.name}
            body={comment.body}
            id={comment.id}
            clickable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Post;
