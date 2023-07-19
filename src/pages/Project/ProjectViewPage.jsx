import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "../../utilities/projects-api";

import ProjectDetailCard from "../../components/ProjectDetailCard/ProjectDetailCard";

export default function ProjectViewPage({user}) {
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

  // const lines = project.description.split("\n");
  return (
    <>
      {user && <>{project.user._id === user._id ? <Link className="button" to={`/projects/${project._id}/edit`}>Edit Project</Link> : "" }</>}
      <ProjectDetailCard project={project} user={user} setProject={setProject}></ProjectDetailCard>
    </>
  );
}
