import { useState, useEffect } from "react";
import { getAllPosts } from "../../../utilities/posts-api";
import BlogPostPreviewCard from "../../../components/BlogPostPreviewCard/BlogPostPreviewCard";
export default function AllBlogPostsPage(){
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      {posts.map((eachPost, index) => (
        <BlogPostPreviewCard post={eachPost}/>
      ))}
    </>
  );






}