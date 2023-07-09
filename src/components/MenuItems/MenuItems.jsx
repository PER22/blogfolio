import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MenuItems.css";

export default function MenuItems({ user }) {
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [projectsMenuOpened, setProjectsMenuOpened] = useState(false);
  const [blogMenuOpened, setBlogMenuOpened] = useState(false);

  function openProfileMenu() {
    setProfileMenuOpened(true);
  }
  function closeProfileMenu() {
    setProfileMenuOpened(false);
  }

  function openProjectsMenu() {
    setProjectsMenuOpened(true);
  }
  function closeProjectsMenu() {
    setProjectsMenuOpened(false);
  }

  function openBlogMenu() {
    setBlogMenuOpened(true);
  }
  function closeBlogMenu() {
    setBlogMenuOpened(false);
  }

  return (
    <>
      <div onMouseOver={openProfileMenu} onMouseLeave={closeProfileMenu} className="menu-category">
        <div className='top-level-menu-item'>
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
      <div onMouseOver={openProjectsMenu} onMouseLeave={closeProjectsMenu} className={`menu-category`}>
        <div className='top-level-menu-item'>
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
      <div onMouseOver={openBlogMenu} onMouseLeave={closeBlogMenu} className={`menu-category `}>
        <div className='top-level-menu-item'>
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
