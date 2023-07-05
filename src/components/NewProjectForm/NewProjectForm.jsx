import React, { useState } from 'react';
import { createProject } from '../../utilities/projects-api';
import './NewProjectForm.css'
import { useNavigate } from 'react-router-dom';

export default function NewProjectForm() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const [error, setError] = useState('');

  const createProj = async (evt) => {
    evt.preventDefault();
    try {
      const createdProject = await createProject(projectData);
      setProjectData({
        title: '',
        description: '',
        image: ''
      });
      navigate(`/projects/${createdProject._id}`);
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
    <>
      <div className="info-card">
        <form className='new-project-form' autoComplete="off" onSubmit={createProj}>
          <label>Title</label><br/>
          <input type="text" name="title" value={projectData.title} onChange={handleChange} required /><br/>
          <label>Description</label><br/>
          <textarea className='new-project-description-textarea'
            cols="35"
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            rows="5"
            required
          ></textarea><br/>
          <label>Image</label><br/>
          <input type="text" name="image" value={projectData.image} onChange={handleChange} /><br/>
          <button type="submit">Create Project</button><br/>
        </form>
      </div>
      {error && <p className="error-message">&nbsp;{error}</p>}
    </>
  );
}
