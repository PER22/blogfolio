import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useState, useEffect } from "react";
import { starProject, unstarProject, getProjectById } from "../../utilities/projects-api";
export default function ProjectDetailCard({project , user, setProject}){
  
  const handleStarProject = async (projectId) => {
    try{
      await starProject(projectId);
      const updatedProject = await getProjectById(projectId);
      setProject(updatedProject);
    }catch(err){
      console.log(err);
    }
  };

  const handleUnstarProject = async (projectId) => {
    try{
      await unstarProject(projectId);
      const updatedProject = await getProjectById(projectId);
      setProject(updatedProject);
    }catch(err){
      console.log(err);
    }
  };
  
  const [projectIsStarred, setProjectIsStarred] = useState(user?._id && project.stars.includes(user._id));
  const [numStars, setNumStars] = useState(project.numStars);

  useEffect(() => {
    setProjectIsStarred(user?._id && project.stars.includes(user._id));
  }, [project]);

  useEffect(() => {
    setNumStars(project.numStars);
  }, [project.numStars]);

    return(
        <>
        <div className='info-card' key={project._id}>
            <h1>{project.title}</h1>
            <h4>By {project.user.name}</h4>
            {user && (projectIsStarred ? 
              <button onClick={()=>{handleUnstarProject(project._id)}}>Unstar</button> 
              : 
              <button onClick={()=>{handleStarProject(project._id)}}>Star</button>)}
            <h5 className="stars">{numStars} star{numStars !== 1 ? "s" : ""}</h5>  
          {project.image && <img className="project-image" src={project.image} alt={project.title} />}
          <ReactMarkdown className="project-description-paragraph">{project.description}</ReactMarkdown>
        </div>
        
        
      </>
    );
}