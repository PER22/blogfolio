import React, { useState } from 'react';
import { createProject } from '../../utilities/projects-api';

export default function NewProjectForm() {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const project = await createProject(projectData);
      // Reset form data
      setProjectData({
        title: '',
        description: '',
        image: ''
      });
      // Optionally perform any other actions after project creation
    } catch (error) {
      console.log(error);
      setError('Project creation failed. Please try again.');
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError('');
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" value={projectData.title} onChange={handleChange} required />
          <label>Description</label>
          <input type="text" name="description" value={projectData.description} onChange={handleChange} required />
          <label>Image</label>
          <input type="text" name="image" value={projectData.image} onChange={handleChange} />
          <button type="submit">Create Project</button>
        </form>
      </div>
      {error && <p className="error-message">&nbsp;{error}</p>}
    </div>
  );
}
