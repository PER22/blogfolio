import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useState, useEffect } from "react";
import { starProject, unstarProject, getProjectById } from "../../utilities/projects-api";
import greyStarIcon from '../../icons/greystar.png'
import starIcon from '../../icons/star.png'
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
  
  const [projectIsStarred, setProjectIsStarred] = useState(user?._id && project.stars.includes(user?._id));
  const [numStars, setNumStars] = useState(project.numStars);
  
  const [imageLoadError, setImageLoadError] = useState(false);
  const handleImageLoadError = () => {
    setImageLoadError(true);
  };

  useEffect(() => {
    setProjectIsStarred(user?._id && project.stars.includes(user?._id));
  }, [project, user?._id]);

  useEffect(() => {
    setNumStars(project.numStars);
  }, [project.numStars]);

    return(
        <>
        <div className='info-card' key={project._id}>
            <h1>{project.title}</h1>
            <h4>By {project.user.name}</h4>
            <div className="star-info">
                        {user && <img
                            src={!projectIsStarred ? greyStarIcon : starIcon}
                            className="star-icon"
                            alt="Star"
                            onClick={!projectIsStarred ? () => handleStarProject(project._id) : () => handleUnstarProject(project._id)}
                        />}
                        <span className="num-stars">{numStars} star{numStars !== 1 ? "s" : ""}</span>
                    </div> 
            {!imageLoadError && project.image && (
          <img
            className="project-image"
            src={project.image}
            alt={project.title}
            onError={handleImageLoadError}
          />
        )}
          <ReactMarkdown className="project-description-paragraph">{project.description}</ReactMarkdown>
        </div>
        
        
      </>
    );
}