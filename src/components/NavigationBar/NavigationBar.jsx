import { Link, NavLink} from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavigationBar.css'
import MenuItems from '../MenuItems/MenuItems';

export default function NavBar({setUser, user}) {

  async function handleLogOut() {
      userService.logOut();
      setUser(null);
  }
  return (
    <nav className='navbar'>
      <span className='navlinks'>
        

        {user ? 
            <MenuItems user={user}/>
          : <>
          <NavLink className='top-level-menu-item' to="/bio">All Profiles</NavLink>
          <NavLink className='top-level-menu-item'  to="projects/">All Portfolios</NavLink>
          <NavLink className='top-level-menu-item'  to={`/blog`}>All Blogs</NavLink> 
          </> 
        }


      </span>
      <span>
        {user ? <Link className='auth-link' onClick={handleLogOut} to="/auth">Log Out</Link> : <Link className='auth-link' to="/auth">Log In</Link> }
      </span>
    </nav>
  );
}