import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../../../utilities/posts-api';
import { getProjectsBy } from '../../../utilities/projects-api';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';


export default function BlogPostEditPage({ user }) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [article, setArticle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        setTitle(postData.title);
        setProject(postData.project._id);
        setArticle(postData.article);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjectsBy(user.username);
        setProjectList(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleUpdatePostSubmit = async (event) => {
    event.preventDefault();

    try {
      const postData = { title, project, article };
      const updatedPost = await updatePost(postId, postData);
      navigate(`/blog/${updatedPost._id}`)
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.log('Error updating post:', error);
    }
  };

  const handleDeletePost = async (articleId) => {
    try {
      await deletePost(articleId);
      navigate(`/blog/by/${user.username}`);
    } catch (error) {
      console.log('Error deleting post:', error);
      setError("Deleting post failed.")
    }
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const closeModal = () => { setShowDeleteConfirmationModal(false) };
  const openModal = () => { setShowDeleteConfirmationModal(true) };

  return (
    <>
      <div className="info-card">
        <h1>Edit Post</h1>
        <form onSubmit={handleUpdatePostSubmit}>
          <label>
            Title:<br />
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            /><br />
          </label>

          <label>
            Project:<br />
            <select
              value={project}
              onChange={(event) => setProject(event.target.value)}
              required
            >
              <option value="">Select a project</option>
              {projectList.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
            <br />
          </label>

          <label><br />
            Article:
            <textarea
              value={article}
              onChange={(event) => setArticle(event.target.value)}
              required
            ></textarea><br />
          </label>
          <button type="submit">Update Post</button><br />
        </form>
        {error && <p className="error-message">{error}</p>}
        <button className="open-delete-modal-button" onClick={openModal}>Delete Post</button>
      </div>
      {showDeleteConfirmationModal && <div className="deletion-confirmation-modal">
        <ConfirmationModal closeFunction={closeModal}
          deleteFunction={handleDeletePost}
          confirmationText={"This will permanently delete this post, and can not be undone."}
          contentId={postId}
        />
      </div>}
    </>
  );
}
