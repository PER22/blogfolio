import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../../utilities/posts-api';
import { Link } from 'react-router-dom';
import BlogPostCard from '../../../components/BlogPostCard/BlogPostCard';
import EmptyBlogCard from '../../../components/EmptyBlogCard/EmptyBlogCard';


export default function BlogPostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await getUserPosts();
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div>
      <Link to="/blog/new">New Post</Link>
      {posts.length===0 ? <EmptyBlogCard/> : 
      posts.map((post) => (
        <BlogPostCard className="info-card" post={post}/>
      ))}
    </div>
  );
}