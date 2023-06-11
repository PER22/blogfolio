import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavigationBar.css'
export default function NavBar({setUser, user}) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }
  return (
    <nav className='navbar'>
      <span className='navlinks'>
        <NavLink className='navlink'exact to="/" activeClassName="active">Home</NavLink>
        
        <NavLink className='navlink' to="/bio" activeClassName="active"> Bio</NavLink>

        <NavLink className='navlink' to="/projects" activeClassName="active">Portfolio</NavLink>
      
        <NavLink className='navlink' to="/blog" activeClassName="active">Blog</NavLink>
      </span>
      <span>
      <Link    className='logout-link'  onClick={handleLogOut}>Log Out</Link>
      </span>
    </nav>
  );
}