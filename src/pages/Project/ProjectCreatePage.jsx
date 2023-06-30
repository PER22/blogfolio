import React from "react";
import NewProjectForm from "../../components/NewProjectForm/NewProjectForm";

export default function ProjectCreatePage({user}) {
  return (
    <>
      <h1>New Project</h1>
      <NewProjectForm user={user}/>
    </>
  );
}
