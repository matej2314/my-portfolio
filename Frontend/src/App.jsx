import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrackPageView from './hooks/TrackPageView';
import routes from './configs/routerConfig';

function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const router = createBrowserRouter(routes(isMobile), {
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
      <RouterProvider router={router}>
        <TrackPageView />
      </RouterProvider>
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
