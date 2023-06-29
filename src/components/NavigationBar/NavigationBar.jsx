import { Link, NavLink} from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavigationBar.css'

export default function NavBar({setUser, user}) {

  async function handleLogOut() {
      userService.logOut();
      setUser(null);
  }
  return (
    <nav className='navbar'>
      <span className='navlinks'>
        <NavLink className='navlink' to="/" activeClassName="active">Home</NavLink>
        
        {user ? <NavLink className='navlink' to={`/bio/${user.username}`} activeClassName="active"> Bio</NavLink>: ""}

        {user ? <NavLink className='navlink' to="/projects" activeClassName="active">Portfolio</NavLink> : ""}
      
        {user ? <NavLink className='navlink' to="/blog" activeClassName="active">Blog</NavLink> : ""}
      </span>
      <span>
        {user ? <Link className='auth-link' onClick={handleLogOut} to="/auth">Log Out</Link> : <Link className='auth-link' to="/auth">Log In</Link> }
      </span>
    </nav>
  );
}