import React, { useEffect, useState } from 'react';
import { getProjectsBy } from '../../utilities/projects-api';
import { Link, useParams } from 'react-router-dom';
import EmptyPortfolioCard from '../../components/EmptyPortfolioCard/EmptyPortfolioCard';
import "./PortfolioPage.css"
import ProjectPreviewCard from '../../components/ProjectPreviewCard/ProjectPreviewCard';

export default function PortfolioPage({user}) {
  const [projects, setProjects] = useState([]);
  const {username} = useParams();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Call the API function to fetch projects associated with the logged-in user
        const projectsData = await getProjectsBy(username);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [username]);

  return (
    <>

      {user && <Link to="/projects/new">Create Project</Link>}
      {projects.length === 0 ? <EmptyPortfolioCard /> :
        projects.map((project) => (
            <ProjectPreviewCard key={project._id} project={project}/>
        ))
      }

    </>
  );
}
