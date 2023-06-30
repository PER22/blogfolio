//REACT imports
import React, { useState} from 'react';
import { Routes, Route} from 'react-router-dom';

//Utility imports
import { getLoggedInUser } from '../../utilities/users-service';

//CSS
import './App.css';

//Pages
  //Auth
import AuthPage from '../Authentication/AuthPage/AuthPage'

  //Bio
import ViewAllBiosPage from '../Bio/ViewAllBios/ViewAllBiosPage';
import ViewBioPageByUsername from '../Bio/ViewBioByUsername/ViewBioPageByUsername';
import EditBioPage from '../Bio/EditBio/EditBioPage';

  //Blog
import BlogPostCreatePage from '../Blog/BlogPostCreate/BlogPostCreatePage';
import BlogPostEditPage from '../Blog/BlogPostEdit/BlogPostEditPage';
import BlogPostDetailPage from '../Blog/BlogPostDetail/BlogPostDetailPage';
import BlogPostByUsernamePage from '../Blog/BlogPostByUsername/BlogPostByUsernamePage';
import AllBlogPostsPage from '../Blog/AllBlogPosts/AllBlogPostsPage';

  //Portfolio
import PortfolioPage from '../Portfolio/PortfolioPage';

  //Projects
import ProjectViewPage from '../Project/ProjectViewPage';
import ProjectCreatePage from '../Project/ProjectCreatePage';
import ProjectEditPage from '../Project/ProjectEditPage';
import ViewAllProjectsPage from '../Project/ViewAllProjectsPage'

  //Home
import HomePage from '../Home/HomePage';

  //Error
import ErrorPage from '../Error/ErrorPage';

//Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import FooterBar from '../../components/FooterBar/FooterBar'


export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser());
  return (
    <main className="App">
        <NavigationBar setUser={setLoggedInUser} user={loggedInUser} />
        <section className='content'>
          <Routes>
            <Route path="/auth" exact element={<AuthPage setUser={setLoggedInUser}/>}/>

            <Route path="/bio" exact element={<ViewAllBiosPage/>} />
            <Route path="/bio/edit" element={<EditBioPage user={loggedInUser}/>} />
            <Route path="/bio/:username" element={<ViewBioPageByUsername user={loggedInUser}/>} />
            
            <Route path="/blog" exact element={<AllBlogPostsPage/>} />
            <Route path="/blog/by/:username" element={<BlogPostByUsernamePage/>} />
            <Route path="/blog/new" element={<BlogPostCreatePage  user={loggedInUser}/>}/>
            <Route path="/blog/:postId/edit" element={<BlogPostEditPage  user={loggedInUser}/>} />
            <Route path="/blog/:postId" element={<BlogPostDetailPage/>} />

            <Route path="/projects" exact element={<ViewAllProjectsPage/>} />
            <Route path="/projects/new" element={<ProjectCreatePage user={loggedInUser}/>}/>
            <Route path="/projects/:projectId" element={<ProjectViewPage/>} />
            <Route path="projects/:projectId/edit" element={<ProjectEditPage user={loggedInUser}/>} />
            <Route path="/projects/by/:username"  element={<PortfolioPage/>} />
            
            <Route path="/error" element={<ErrorPage/>}/>
            
            <Route path="/" exact element={<HomePage/>} />
          </Routes>
        </section>
        <FooterBar></FooterBar>
    </main>
  );
}

