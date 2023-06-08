import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../utilities/projects-api";

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

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <img src={project.image} alt="Project" />
    </div>
  );
}
