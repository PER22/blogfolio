import React, { useEffect, useState, use } from 'react';
import { getPostsBy } from '../../../utilities/posts-api';
import { Link, useParams } from 'react-router-dom';
import BlogPostPreviewCard from '../../../components/BlogPostPreviewCard/BlogPostPreviewCard';
import EmptyBlogCard from '../../../components/EmptyBlogCard/EmptyBlogCard';


export default function BlogPostByUsernamePage() {
  const {username} = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await getPostsBy(username);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <>
      <Link to="/blog/new">New Post</Link>
      {posts.length===0 ? <EmptyBlogCard/> : 
      posts.map((post) => (
        <BlogPostPreviewCard className="info-card" post={post}/>
      ))}
    </>
  );
}