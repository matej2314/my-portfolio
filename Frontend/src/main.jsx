import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataContext } from './store/data-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContext.Provider value={{data: []}}>
      <App />
      </DataContext.Provider>
  </StrictMode>
)
