import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MenuItems.css";

export default function MenuItems({ user }) {
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [projectsMenuOpened, setProjectsMenuOpened] = useState(false);
  const [blogMenuOpened, setBlogMenuOpened] = useState(false);

  function toggleProfileMenuOpened() {
    setProfileMenuOpened(!profileMenuOpened);
    setProjectsMenuOpened(false);
    setBlogMenuOpened(false);
  }

  function toggleProjectsMenuOpened() {
    setProjectsMenuOpened(!projectsMenuOpened);
    setProfileMenuOpened(false);
    setBlogMenuOpened(false);
  }

  function toggleBlogMenuOpened() {
    setBlogMenuOpened(!blogMenuOpened);
    setProfileMenuOpened(false);
    setProjectsMenuOpened(false);
  }

  return (
    <>
      <div className="menu-category">
        <div className='top-level-menu-item' onClick={toggleProfileMenuOpened}>
          Profiles
          <div className={`dropdown-contents ${!profileMenuOpened ? 'category-closed' : ''}`}>
            <NavLink className="dropdown-link" end to="/bio">
              All Profiles
            </NavLink>
            <NavLink className="dropdown-link" end to={`/bio/${user.username}`}>
              My Profile
            </NavLink>
          </div>
        </div>
      </div>
      <div className={`menu-category`}>
        <div className='top-level-menu-item' onClick={toggleProjectsMenuOpened}>
          Projects
          <div className={`dropdown-contents ${!projectsMenuOpened ? 'category-closed' : ''}`}>
            <NavLink className="dropdown-link" end to="/projects">
              All Projects
            </NavLink>
            <NavLink className="dropdown-link" end to={`/projects/by/${user.username}`}>
              My Projects
            </NavLink>
          </div>
        </div>
      </div>
      <div className={`menu-category `}>
        <div className='top-level-menu-item' onClick={toggleBlogMenuOpened}>
          Blogs
          <div className={`dropdown-contents ${!blogMenuOpened ? 'category-closed' : ''}`}>
            <NavLink className="dropdown-link" end to="/blog">
              All Blogs
            </NavLink>
            <NavLink className="dropdown-link" end to={`/blog/by/${user.username}`}>
              My Blog
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
