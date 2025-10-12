import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
import { IoHome } from "react-icons/io5";
import { SlSpeech } from "react-icons/sl";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdPrivacyTip } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs"; 
import { Link } from "react-router-dom";
import FacebookIcon from '../Icons/FacebookIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import LinkedInIcon from '../Icons/LinkedInIcon';
import GithubIcon from '../Icons/GithubIcon';
import FooterLogo from './FooterLogo';
import NewsletterSubscription from '../NewsletterSubscription/NewsletterSubscription';

const Footer = () => {
  return (
    <div className='footer' id='footer'> 
      <div className="footer-content">
        
        {/* Left side (logo + description + social) */}
        <div className="footer-content-left">
          {/* <img src={assets.foodie_icon} alt="Foodie Logo" /> */}
          <FooterLogo />
          <p>
            Enjoy delicious food from your favorite restaurants.  
            Fast delivery, easy to use, and always satisfying.  
            <br /><br />
            No more waiting in lines or cooking at home.  
            Order fresh, tasty meals with just a few taps.
          </p>
          <div className="footer-social-icons">
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
            <GithubIcon />  
          </div>
        </div>

        {/* Company Links */}
        <div className='footer-content-center'>
          <h2 className='text'>COMPANY</h2>
          <ul>
            <li><IoHome className='icon' /><Link to="/"><span>Home</span></Link></li>
            <li><SlSpeech className='icon' /><Link to="/aboutus"><span>About Us</span></Link></li>
            <li><CiDeliveryTruck className='icon' /><Link to="/delivery"><span>Delivery</span></Link></li>
            <li><MdPrivacyTip className='icon' /><Link to="/privacy"><span>Privacy Policy</span></Link></li>
            <li><BsQuestionCircle className='icon' /><Link to="/faq"><span>FAQ</span></Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='footer-content-right'>
          <h2 className='text'>Get In Touch</h2>
          <ul>
            <li><MdAddCall className='icon' /><span>+1-214-723-889</span></li>
            <li><IoIosMail className='icon' /><span>Contact@foodie.com</span></li>
          </ul>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <NewsletterSubscription />

      <hr />
      <p className="footer-copyright">
        Copyright {new Date().getFullYear()} &nbsp; &copy; &nbsp; foodie.com - All Rights Reserved
      </p>
    </div>
  )
}

export default Footer;