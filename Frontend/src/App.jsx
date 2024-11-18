import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import PortfolioPage from './pages/PortofioPage';
import BlogPage from './pages/BlogPage';



const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: 'portfolio', element: <PortfolioPage /> },
  { path: 'blog', element: <BlogPage /> },
  { path: 'contact', element: <Contact /> },

]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
