import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { starPost, unstarPost, getPostById } from '../../utilities/posts-api';
export default function BlogPostCard({ post, user, setPost }) {

    const handleStarPost = async (postId) => {
        try {
            await starPost(postId);
            const updatedPost = await getPostById(postId);
            setPost(updatedPost);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnstarPost = async (postId) => {
        try {
            await unstarPost(postId);
            const updatedPost = await getPostById(postId);
            setPost(updatedPost);
        } catch (err) {
            console.log(err);
        }
    };

    const [postIsStarred, setPostIsStarred] = useState(user?._id && post.stars.includes(user._id));
    const [numStars, setNumStars] = useState(post.numStars);

    useEffect(() => {
        setPostIsStarred(user?._id && post.stars.includes(user._id));
      }, [post]);
    
      useEffect(() => {
        setNumStars(post.numStars);
      }, [post]);


    return (
        <>
            <div key={post._id} className="info-card">
                <h2>
                    {post.title}
                </h2>
                <h4>
                    <Link to={`/projects/${post.project._id}`}>{post.project.title}</Link>
                </h4>
                <ReactMarkdown>{post.article}</ReactMarkdown>
                <div className="post-info">
                    <p>Written on: {new Date(post.dateCreated).toLocaleDateString()}</p>
                    <p>By: {post.user.name}</p>
                    {user && (postIsStarred ?
                        <button onClick={() => { handleUnstarPost(post._id) }}>Unstar</button>
                        :
                        <button onClick={() => { handleStarPost(post._id) }}>Star</button>)}
                    <h5 className="stars">{numStars} star{numStars !== 1 ? "s" : ""}</h5>
                </div>
                {post.image && <img src={post.image} alt="Post" />}
            </div>
        </>
    )
}