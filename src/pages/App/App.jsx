//REACT imports
import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';

//Utility imports
import { getUser } from '../../utilities/users-service';

//CSS
import './App.css';

//Pages
  //Auth
import AuthPage from '../Authentication/AuthPage/AuthPage'

  //Bio
import ViewBioPage from '../Bio/ViewBio/ViewBioPage';
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
  //Home
import HomePage from '../Home/HomePage';
  //Error
import ErrorPage from '../Error/ErrorPage';

//Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import FooterBar from '../../components/FooterBar/FooterBar'


export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? <>
        <NavigationBar setUser={setUser} user={user}/>
        <section className='content'>
          <Routes>
            <Route path="/bio" exact element={<ViewBioPage user={user}/>} />
            <Route path="/bio/edit" element={<EditBioPage/>} />
            
            <Route path="/blog" exact element={<BlogPostListPage/>} />
            <Route path="/blog/new" element={<BlogPostCreatePage/>} />
            <Route path="/blog/:postId/edit" element={<BlogPostEditPage/>} />
            <Route path="/blog/:postId" element={<BlogPostDetailPage/>} />

            <Route path="/projects/new" element={<ProjectCreatePage/>}/>
            <Route path="/projects/:projectId" element={<ProjectViewPage/>} />
            <Route path="/projects" exact element={<PortfolioPage/>} />
            
            <Route path="/error" element={<ErrorPage/>}/>
            
            <Route path="/" exact element={<HomePage/>} />
          </Routes>
        </section>
        <FooterBar></FooterBar>
      </>
      :
      <><AuthPage setUser={setUser}/></>
      }
    </main>
  );
}

