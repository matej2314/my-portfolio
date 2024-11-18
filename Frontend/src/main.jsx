import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import DataProvider from './store/data-context.jsx';

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <App />
  </DataProvider>
)
