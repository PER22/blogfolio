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
        <p>You don't need to be logged in to read profiles, blog posts, or projects.
          You can follow the links here or in the navigation bar to see everyone's&nbsp;
          <Link className='homepage-link' end to={`blog`}>blogs</Link>,&nbsp;
          <Link className='homepage-link' end to={`projects`}>projects</Link>,
          and&nbsp;<Link className='homepage-link' end to={`bio`}>profiles</Link>.
        </p>
      </div>
    </>
  );
}
