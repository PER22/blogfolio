import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../../../utilities/posts-api';
import { getUserProjects } from '../../../utilities/projects-api';


const handleDeletePost = async (articleId) => {
  try {
    await deletePost(articleId);
    // Perform any additional actions after successful deletion
  } catch (error) {
    console.error('Error deleting article:', error);
    // Handle error if deletion fails
  }
};
export default function BlogPostEditPage() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [article, setArticle] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        setTitle(postData.title);
        setProject(postData.project._id);
        setArticle(postData.article);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getUserProjects();
        setProjectList(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const postData = { title, project, article };
      const updatedPost = await updatePost(postId, postData);
      // Handle successful post update, e.g., redirect to post detail page
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="info-card">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:<br/>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          /><br/>
        </label>

        <label>
          Project:<br/>
          <select
            value={project}
            onChange={(event) => setProject(event.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projectList.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
          <br/>
        </label>

        <label><br/>
          Article:
          <textarea
            value={article}
            onChange={(event) => setArticle(event.target.value)}
            required
          ></textarea><br/>
        </label>
        <button type="submit">Update Post</button><br/>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => handleDeletePost(postId)}>Delete Post</button>
    </div>
  );
}
