import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../utilities/posts-api';
import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function BlogPostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const tempPost = await getPostById(postId);
        setPost(tempPost);
        setLoading(false);
      } catch (error) {
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }


  return (
    <div>
      <Link to={`/blog/${postId}/edit`}>Edit Post</Link>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.article}</ReactMarkdown>
    </div>
  );
}
