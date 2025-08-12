// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
import { IoHome } from "react-icons/io5";
import { SlSpeech } from "react-icons/sl";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdPrivacyTip } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className='footer' id='footer'> 
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.foodie_icon} alt="" />
                <p>Enjoy delicious food from your favorite restaurants.
Fast delivery, easy to use, and always satisfying.

No more waiting in lines or cooking at home.
Order fresh, tasty meals with just a few taps.

</p>
                <div className="footer-social-icons">
                    <span className="footer-social-svg">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="none"/><path d="M21.5 16H18V26H14V16H12V13H14V11.5C14 9.57 15.07 8 17.5 8H21V11H19C18.45 11 18 11.45 18 12V13H21.5V16Z" fill="currentColor"/></svg>
                    </span>
                    <span className="footer-social-svg">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="none"/><path d="M26 10.3c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9-.7-.7-1.7-1.2-2.7-1.2-2.1 0-3.7 2-3.2 4.1-2.7-.1-5.1-1.4-6.7-3.4-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.4 1.7 3-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.3 3 3.6-.3.1-.6.2-.9.2-.2 0-.4 0-.6-.1.4 1.3 1.7 2.3 3.2 2.3-1.2.9-2.7 1.4-4.2 1.4-.3 0-.6 0-.8-.1 1.5 1 3.3 1.6 5.2 1.6 6.2 0 9.6-5.1 9.6-9.6v-.4c.7-.5 1.3-1.2 1.8-1.9z" fill="currentColor"/></svg>
                    </span>
                    <span className="footer-social-svg">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="none"/><path d="M12.5 13H9.5V23H12.5V13ZM11 11.5C11.83 11.5 12.5 10.83 12.5 10C12.5 9.17 11.83 8.5 11 8.5C10.17 8.5 9.5 9.17 9.5 10C9.5 10.83 10.17 11.5 11 11.5ZM22.5 17.5C22.5 15.01 20.49 13 18 13C16.62 13 15.5 13.83 15 14.91V13H12V23H15V17.5C15 16.12 16.12 15 17.5 15C18.88 15 20 16.12 20 17.5V23H23V17.5C23 15.01 20.99 13 18.5 13Z" fill="currentColor"/></svg>
                    </span>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2 className='text'>COMPANY</h2>
                <ul>
                    <li><IoHome className='icon' /><span>Home</span></li>
                    <li><SlSpeech className='icon' /><span>About Us</span></li>
                    <li><CiDeliveryTruck className='icon' /><span>Delivery</span></li>
                    <li><MdPrivacyTip className='icon' /><span>Privacy Policy</span></li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2 className='text'>Get In Touch</h2>
                <ul>
                    <li><MdAddCall className='icon' /><span>+1-214-723-889</span></li>
                    <li><IoIosMail className='icon' /><span>Contact@foodie.com</span></li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright {new Date().getFullYear()} &nbsp; &copy; &nbsp; foodie.com - All Right Reserved
        </p>
    </div>
  )
}

export default Footer
