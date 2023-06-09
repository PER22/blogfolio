import React, { useState, useEffect } from 'react';
import { createPost } from '../../../utilities/posts-api';
import { getUser } from '../../../utilities/users-service';
import { getUserProjects } from '../../../utilities/projects-api';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [article, setArticle] = useState('');
  const [error, setError] = useState('');
  const user = getUser()

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
      const postData = { title, project, article, user: user._id };
      const createdPost = await createPost(postData);
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>New Post</h1>
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
            required>
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
            required>
          </textarea>
        </label>
        <button type="submit">Create Post</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
