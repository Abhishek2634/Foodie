import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom' 
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import AppDownload from './components/AppDownlad/AppDownload'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ThemeContextProvider from './components/context/ThemeContext'
import Spinner from './components/LoadingSpinner/LoadingSpinner'
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Simulate loading time

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <ThemeContextProvider>
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        {loading && <Spinner />}
         {/* LoadingSpinner component to show loading state */}
        <Navbar setShowLogin ={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
        </Routes>
        <AppDownload/>
        <Footer/>
      </div>
      <Toaster position="top-center" />
    </>
    </ThemeContextProvider>
    
  )
}

export default App
