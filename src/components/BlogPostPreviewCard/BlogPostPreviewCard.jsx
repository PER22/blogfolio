import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function BlogPostPreviewCard({post}){
return (
    <>   
        <div key={post._id} className="info-card">
            <h2>
                <Link to={`/blog/${post._id}`}>{post.title}</Link>
            </h2>
            <div className="post-info">
                <p><str>Written on: </str>
                <em>{new Date(post.dateCreated).toLocaleDateString()}</em></p>
                <p><str>By: </str>
                <em>{post.user.name}</em></p>
                <p><str>Project: </str>
                <Link to={`/projects/${post.project._id}`}>{post.project.title}</Link></p>
            </div>
            <ReactMarkdown>{post.article.split(' ').slice(0, 60).join(' ')+"..."}</ReactMarkdown>
            <Link className="read-more-link" to={`/blog/${post._id}`}>Read More</Link>
        </div>
</>
)
}