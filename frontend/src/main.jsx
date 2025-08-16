import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'
import ThemeContextProvider from './components/context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
)
