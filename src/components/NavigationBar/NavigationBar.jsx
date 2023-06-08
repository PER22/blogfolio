import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({setUser, user}) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }
  return (
    <nav>
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        <Link to="/bio">Bio</Link>
        &nbsp; | &nbsp;
        <Link to="/projects">Portfolio</Link>
        &nbsp; | &nbsp;
        <Link to="/blog">Blog</Link>

        &nbsp;&nbsp;<span>Welcome, {user.name}</span>
        &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
    
  );
}