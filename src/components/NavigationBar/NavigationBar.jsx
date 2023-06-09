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
        <NavLink exact to="/" activeClassName="active">&nbsp;Home&nbsp;</NavLink>
        
        <NavLink to="/bio" activeClassName="active"> &nbsp;Bio&nbsp;</NavLink>

        <NavLink to="/projects" activeClassName="active">&nbsp;Portfolio&nbsp;</NavLink>
      
        <NavLink to="/blog" activeClassName="active">&nbsp;Blog&nbsp;</NavLink>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;<Link  className to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}