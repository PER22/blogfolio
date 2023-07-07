import React from "react";
import NewProjectForm from "../../components/NewProjectForm/NewProjectForm";

export default function ProjectCreatePage({user}) {
  return (
    <>{!user ? <h1 className="info-card">You need to be logged in to create a project.</h1> :
      <>
        <h1>New Project</h1>
        <NewProjectForm user={user}/>
      </>
    }</>
  );
}
