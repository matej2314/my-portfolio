import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import DataProvider from './store/data-context.jsx';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XB5GM4PJX6', {
  debug: true,
});

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <App />
  </DataProvider>
)
