import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <h1>Welcome to Blogfolio!</h1>
      <div className="info-card">
        <p> BlogFolio exists to help you link markdown-formatted text to your deployed code projects. </p>
        <p>Create a project, and then write blog posts about it as you work towards completing it. </p>
        <p>Share your thought process, and log your progress.</p>
      </div>
      <div className="info-card">
        <p>You don't need to be logged in to access profiles, blog posts, or projects.
          You can also follow the links below to see:
          <ul>
            <li>
              <Link className='navlink' end to={`blog`}>everyone's blogs</Link>,
            </li>
            <li>  
              <Link className='navlink' end to={`projects`}>everyone's projects</Link>,
            </li>
            <li>
              or <Link className='navlink' end to={`bio`}>everyone's profiles</Link>.
            </li>
          </ul>
        </p>
      </div>
    </>
  );
}
