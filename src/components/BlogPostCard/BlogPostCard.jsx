import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { starPost, unstarPost, getPostById } from '../../utilities/posts-api';
import greyStarIcon from '../../icons/greystar.png'
import starIcon from '../../icons/star.png'
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
    }, [post, user._id]);

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
                
                <div className="post-info">
                    <h3>By: {post.user.name}</h3>
                    <p>Written on: {new Date(post.dateCreated).toLocaleDateString()}</p>
                    
                    <div className="star-info">
                        {user && <img
                            src={!postIsStarred ? greyStarIcon : starIcon}
                            className="star-icon"
                            alt="Star"
                            onClick={!postIsStarred ? () => handleStarPost(post._id) : () => handleUnstarPost(post._id)}
                        />}
                        <span className="num-stars">{numStars} star{numStars !== 1 ? "s" : ""}</span>
                    </div>
                </div>
                {post.image && <img src={post.image} alt="Post" />}
                <ReactMarkdown>{post.article}</ReactMarkdown>
            </div>
        </>
    )
}