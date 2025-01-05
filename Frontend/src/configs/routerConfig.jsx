import MainPage from '../pages/MainPage';
import Contact from '../pages/Contact';
import PortfolioPage from '../pages/PortfolioPage';
import BlogPage from '../pages/BlogPage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetails from '../pages/ProjectDetailsPage';
import PostReadMore from '../pages/PostReadMore';
import NotFound from '../pages/NotFound';
import CmsIndexPage from '../components/cms/CmsIndexPage';
import CmsMainPage from '../components/cms/CmsMainPage';
import { AuthProvider } from '../store/auth-context';

const routes = (isMobile) => {
  return [
    { path: '/', element: isMobile ? <PortfolioPage /> : <MainPage /> },
    { path: 'portfolio', element: <PortfolioPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'contact', element: <Contact /> },
    { path: 'projects', element: <ProjectsPage /> },
    { path: '/project/details/:id', element: <ProjectDetails /> },
    { path: '/post/more/:id', element: <PostReadMore /> },
    { path: 'login_admin', element: <AuthProvider><CmsIndexPage /></AuthProvider> },
    { path: '/cms', element: <AuthProvider><CmsMainPage /></AuthProvider> },
    { path: '*', element: <NotFound /> }
  ];
};

export default routes;