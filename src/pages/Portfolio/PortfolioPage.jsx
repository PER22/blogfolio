import React, { useEffect, useState } from 'react';
import { getUserProjects } from '../../utilities/projects-api';
import { Link } from 'react-router-dom';
import EmptyPortfolioCard from '../../components/EmptyPortfolioCard/EmptyPortfolioCard';
import ReactMarkdown from 'react-markdown';
import "./PortfolioPage.css"

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
      {projects.length === 0 ? <EmptyPortfolioCard /> :
        projects.map((project) => (
          
            <div className='info-card' key={project._id}>
              <Link to={`/projects/${project._id}`}><h2 className="project-title">{project.title}</h2></Link>
              {project.image && <img className="project-image" src={project.image} alt={project.title} />}
              <ReactMarkdown className="project-description-paragraph">{`${project.description.split(' ').slice(0, 100).join(' ')}...`}</ReactMarkdown>
            </div>
        ))
      }

    </>
  );
}
