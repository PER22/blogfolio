import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProjectPreviewCard({ project }) {
    const [imageLoadError, setImageLoadError] = useState(false);
    const handleImageLoadError = () => {
        setImageLoadError(true);
    };


    return (<>
        <div className='info-card' key={project._id}>
            <Link to={`/projects/${project._id}`}><h2>{project.title}</h2></Link>
            {!imageLoadError && project.image && (
                <img
                    className="project-image"
                    src={project.image}
                    alt={project.title}
                    onError={handleImageLoadError}
                />
            )}
            <ReactMarkdown className="project-description-paragraph">{`${project.description.split(' ').slice(0, 100).join(' ')}...`}</ReactMarkdown>
        </div>
    </>);
}