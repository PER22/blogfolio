//REACT imports
import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';

//Utility imports
import { getLoggedInUser } from '../../utilities/users-service';
import { getProfileByIdRequest } from '../../utilities/profiles-api';

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
import BlogPostListPage from '../Blog/BlogPostList/BlogPostListPage';

  //Portfolio
import PortfolioPage from '../Portfolio/PortfolioPage';

  //Projects
import ProjectViewPage from '../Project/ProjectViewPage';
import ProjectCreatePage from '../Project/ProjectCreatePage';
import ProjectEditPage from '../Project/ProjectEditPage';

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
            

            <Route path="/blog" exact element={<BlogPostListPage/>} />
            <Route path="/blog/new" element={<BlogPostCreatePage/>} />
            <Route path="/blog/:postId/edit" element={<BlogPostEditPage/>} />
            <Route path="/blog/:postId" element={<BlogPostDetailPage/>} />

            <Route path="/projects/new" element={<ProjectCreatePage/>}/>
            <Route path="/projects/:projectId" element={<ProjectViewPage/>} />
            <Route path="projects/:projectId/edit" element={<ProjectEditPage/>} />
            <Route path="/projects" exact element={<PortfolioPage/>} />
            
            <Route path="/error" element={<ErrorPage/>}/>
            
            <Route path="/" exact element={<HomePage/>} />
          </Routes>
        </section>
        <FooterBar></FooterBar>
    </main>
  );
}

