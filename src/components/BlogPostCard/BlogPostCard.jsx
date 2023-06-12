import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function BlogPostCard({post}){
return (
    <>
        <div key={post._id} className="post-card">
            <h2>
                <Link to={`/blog/${post._id}`}>{post.title}</Link>
            </h2>
            <h4>
                <Link to={`/projects/${post.project._id}`}>{post.project.title}</Link>
            </h4>
            <ReactMarkdown>{post.article}</ReactMarkdown>
            <div className="post-info">
                <p>Written on: {new Date(post.dateCreated).toLocaleDateString()}</p>
                <p>By: {post.user.name}</p>
            </div>
            {post.image && <img src={post.image} alt="Post" />}
        </div>
</>
)
}