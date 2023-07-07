import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../utilities/posts-api';
import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import BlogPostCard from '../../../components/BlogPostCard/BlogPostCard';

export default function BlogPostDetailPage({user}) {
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
      {user && <>{user._id === post.user._id? <Link to={`/blog/${postId}/edit`}>Edit Post</Link>: ""}</>}
      <BlogPostCard post={post} user={user} setPost={setPost}/>
    </div>
  );
}
