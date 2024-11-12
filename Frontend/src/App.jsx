import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import Portfolio from './components/Portfolio';


const router = createBrowserRouter([
  {
    path: '/', element: <MainPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'portfolio', element: <Portfolio />},
      { path: 'contact', element: <Contact /> },
    ]
  },
 
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
