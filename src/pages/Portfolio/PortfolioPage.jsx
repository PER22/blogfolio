import React, { useEffect, useState } from 'react';
import { getUserProjects } from '../../utilities/projects-api';
import { Link } from 'react-router-dom';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Call the API function to fetch projects associated with the logged-in user
        const projectsData = await getUserProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h1>Portfolio Page</h1>
      <Link to="/projects/new">Create Project</Link>
      <div>
        {projects.map((project) => (
          <div key={project._id}>
             <Link to={`/projects/${project._id}`}>
              <h2>{project.title}</h2>
            </Link>
            <p>{project.description}</p>
            <img src={project.image} alt={project.title} />
          </div>
        ))}
      </div>
    </>
  );
}
