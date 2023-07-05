import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject, deleteProject } from '../../utilities/projects-api';



export default function ProjectEditPage({user}) {
  const { projectId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      navigate(`/projects/by/${user.username}`)
    } catch (err) {
      setError("Failed to delete project.");
      console.error('Error deleting project:', err);
      // Handle error if deletion fails
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(projectId);
        setTitle(projectData.title);
        setDescription(projectData.description);
        setImage(projectData.image);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleUpdateProjectSubmission = async (event) => {
    event.preventDefault();
    try {
      const projectData = { title, description, image };
      const updatedProject = await updateProject(projectId, projectData);
      navigate(`/projects/${updatedProject._id}`)
    } catch (error) {
      setError('Failed to update project. Please try again.');
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="info-card">
      <h1>Edit Project</h1>
      <form onSubmit={handleUpdateProjectSubmission}>
        <label>
          Title:<br />
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          /><br />
        </label>

        <label>
          Description:<br />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea><br />
        </label>

        <label>
          Image:<br />
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          /><br />
        </label>

        <button type="submit">Update Project</button><br />
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => handleDeleteProject(projectId)}>Delete Project</button>
    </div>
  );
}
