import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
        <p>For Better Experience Download <br /> Foodie App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="playstore icon" />
            <img src={assets.app_store} alt="app store logo" />
        </div>
    </div>
  )
}

export default AppDownload
