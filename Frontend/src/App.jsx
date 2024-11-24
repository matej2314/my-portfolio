import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetailsPage';
import PostReadMore from './pages/PostReadMore';

function App() {

  const [mainComponent, setMainComponent] = useState(<MainPage />);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile) {
      setMainComponent(<PortfolioPage />)
    } else {
      setMainComponent(<MainPage />)
    }
  }, [isMobile]);

  const router = createBrowserRouter([

    { path: '/', element: mainComponent },
    { path: 'portfolio', element: <PortfolioPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'contact', element: <Contact /> },
    { path: 'projects', element: <ProjectsPage /> },
    { path: '/project/details/:id', element: <ProjectDetails /> },
    { path: '/post/more/:id', element: <PostReadMore /> }

  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
