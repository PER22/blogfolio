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

  const lines=project.description.split("\n");
  console.log(lines);
  return (
    <div>
      <Link to={`/projects/${projectId}/edit`}>Edit Project</Link>
      <h1>{project.title}</h1>
      {lines.map((line,idx)=>{
        return (<ReactMarkdown key={idx}>{line}</ReactMarkdown>);
      })}
      
      <img src={project.image} alt="Project" />
    </div>
  );


}
