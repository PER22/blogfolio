import React, { useEffect, useState } from 'react';
import { getUserProjects } from '../../utilities/projects-api';
import { Link } from 'react-router-dom';
import EmptyPortfolioCard from '../../components/EmptyPortfolioCard/EmptyPortfolioCard';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';


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
      
      <Link to="/projects/new">Create Project</Link>
      <div>
        {projects.length === 0 ? <EmptyPortfolioCard /> :
          projects.map((project) => (
            <div className='info-card' key={project._id}>
              <Link to={`/projects/${project._id}`}>
                <h2>{project.title}</h2>
              </Link>
              <ReactMarkdown>{project.description}</ReactMarkdown>
              {project.image && <img src={project.image} alt={project.title} />}
            </div>
          ))
        }
      </div>
    </>
  );
}
