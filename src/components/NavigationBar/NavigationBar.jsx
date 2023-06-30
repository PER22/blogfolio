import { Link, NavLink} from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavigationBar.css'

export default function NavBar({setUser, user}) {

  async function handleLogOut() {
      userService.logOut();
      setUser(null);
  }
  return (
    <nav className='navbar closed'>
      <span className='navlinks'>
        
        <NavLink className='navlink' to="/">Home</NavLink>
        
        {user ? <NavLink className='navlink' exact strict to={`bio/${user.username}`}>My Profile</NavLink>: ""}

        {user ? <NavLink className='navlink' exact strict to={`projects/by/${user.username}`}>My Portfolio</NavLink> : ""}
      
        {user ? <NavLink className='navlink' exact strict to={`blog/by/${user.username}`}>My Blog</NavLink> : ""}


      </span>
      <span>
        {user ? <Link className='auth-link' onClick={handleLogOut} to="/auth">Log Out</Link> : <Link className='auth-link' to="/auth">Log In</Link> }
      </span>
    </nav>
  );
}