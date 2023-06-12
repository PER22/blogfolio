import React, { useState } from 'react';
import { createProject } from '../../utilities/projects-api';
import './NewProjectForm.css'

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
      <div className="info-card">
        <form className='new-project-form' autoComplete="off" onSubmit={handleSubmit}>
          <label>Title</label><br/>
          <input type="text" name="title" value={projectData.title} onChange={handleChange} required /><br/>
          <label>Description</label><br/>
          <textarea
  id="description"
  name="description"
  value={projectData.description}
  onChange={handleChange}
  rows={5}
  required
></textarea><br/>
          <label>Image</label><br/>
          <input type="text" name="image" value={projectData.image} onChange={handleChange} /><br/>
          <button type="submit">Create Project</button><br/>
        </form>
      </div>
      {error && <p className="error-message">&nbsp;{error}</p>}
    </div>
  );
}
