import React, { useEffect, useState, use } from 'react';
import { getPostsBy } from '../../../utilities/posts-api';
import { Link, useParams } from 'react-router-dom';
import BlogPostCard from '../../../components/BlogPostCard/BlogPostCard';
import EmptyBlogCard from '../../../components/EmptyBlogCard/EmptyBlogCard';


export default function BlogPostByUsernamePage() {
  const {username} = useParams();
  console.log("Username: ", username);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await getPostsBy(username);
        console.log(JSON.stringify(userPosts));
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
        <BlogPostCard className="info-card" post={post}/>
      ))}
    </>
  );
}