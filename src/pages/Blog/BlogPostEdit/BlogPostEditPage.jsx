import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../../utilities/posts-api';
import { getUserProjects } from '../../../utilities/projects-api';

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
      console.log('Post updated:', updatedPost);
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <label>
          Project:
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
        </label>

        <label>
          Article:
          <textarea
            value={article}
            onChange={(event) => setArticle(event.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">Update Post</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
