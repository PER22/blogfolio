import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../../utilities/posts-api';
import { Link } from 'react-router-dom';

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
      <h1>BlogPostListPage</h1>
      <Link to="/blog/new">New Post</Link>

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>
            <Link to={`/blog/${post._id}`}>{post.title}</Link>
          </h2>
          <h4>
            <Link to={`/projects/${post.project._id}`}>{post.project.title}</Link>
          </h4>
          <p>{post.article.slice(0, 30)}...</p>
          <div className="post-info">
            <p>Written on: {new Date(post.dateCreated).toLocaleDateString()}</p>
            <p>By: {post.user.name}</p>
          </div>
          {post.image && <img src={post.image} alt="Post" />}
        </div>
      ))}
    </div>
  );
}