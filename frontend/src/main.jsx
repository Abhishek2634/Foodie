import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
  </React.StrictMode>
)
