import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "../../utilities/projects-api";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function ProjectViewPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await getProjectById(projectId);
        setProject(project);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const lines = project.description.split("\n");
  return (
    <div>
      <div className='info-card' key={project._id}>
        
          <h1 className="project-title">{project.title}</h1>
        
        {project.image && <img className="project-image" src={project.image} alt={project.title} />}
        <ReactMarkdown className="project-description-paragraph">{project.description}</ReactMarkdown>
      </div>
    </div>
  );


}
