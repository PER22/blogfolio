import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export default function ProjectDetailCard({project}){

    return(
        <>
        <div className='info-card' key={project._id}>
          
            <h1>{project.title}</h1>
            <h4>By {project.user.name}</h4>
          {project.image && <img className="project-image" src={project.image} alt={project.title} />}
          <ReactMarkdown className="project-description-paragraph">{project.description}</ReactMarkdown>
        </div>
        
        
      </>
    );
}