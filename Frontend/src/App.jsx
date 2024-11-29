import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetailsPage';
import PostReadMore from './pages/PostReadMore';
import NotFound from './pages/NotFound';
import CmsIndexPage from './components/cms/CmsIndexPage';


function App() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const router = createBrowserRouter([
    { path: '/', element: isMobile ? <PortfolioPage /> : <MainPage /> },
    { path: 'portfolio', element: <PortfolioPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'contact', element: <Contact /> },
    { path: 'projects', element: <ProjectsPage /> },
    { path: '/project/details/:id', element: <ProjectDetails /> },
    { path: '/post/more/:id', element: <PostReadMore /> },
    { path: 'login_admin', element: <CmsIndexPage /> },
    { path: '*', element: <NotFound /> }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
