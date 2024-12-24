import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrackPageView from './hooks/TrackPageView';

import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetailsPage';
import PostReadMore from './pages/PostReadMore';
import NotFound from './pages/NotFound';
import CmsIndexPage from './components/cms/CmsIndexPage';
import CmsMainPage from './components/cms/CmsMainPage';
import { AuthProvider } from './store/auth-context';

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
    { path: 'login_admin', element: <AuthProvider><CmsIndexPage /></AuthProvider> },
    { path: '/cms', element: <AuthProvider><CmsMainPage /></AuthProvider> },
    { path: '*', element: <NotFound /> }
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    }
  });

  return (
    <>
      <TrackPageView />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2200}
        closeOnClick={false}
        hideProgressBar={true}
        newestOnTop={false}
        draggable={false}
        closeButton={false}
        toastClassName={({ type }) => {
          return type === "info"
            ? "text-lime-400 bg-gray-600 rounded-md"
            : type === "error"
              ? "text-red-400 bg-gray-600 rounded-md"
              : "text-black bg-gray-600 rounded-md"
        }}
      />

    </>
  )
}

export default App;
