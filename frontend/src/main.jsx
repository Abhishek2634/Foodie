import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'
import {AuthContextProvider} from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
