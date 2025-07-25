import React, { useContext, useEffect } from "react";
// importing css from css file
import "./Dashboard.css";
import { ThemeContext } from "../context/ThemeContext";
import BarChart from "./BarChart";

function Dashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // demo data (fecthed from backend in this form only)
  const chartData = [
    {
      itemName : "Noodles",
      orderCount : 100
    },
    {
      itemName : "Pasta",
      orderCount : 120
    },
    {
      itemName : "Fried Rice",
      orderCount : 50
    },
    {
      itemName : "Chocolates",
      orderCount : 80
    },
    {
      itemName : "Veg Rolls",
      orderCount : 90
    },
  ]

  // fetch data from backend

  /*
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await  axios.get('/users/getUserProfile')
        console.log(response)
      } 
      catch (error) {
        console.log(error)
        const errMsg = error.response?.message || "Something went wrong"
        toast.error(errMsg)
      }
    }
  })
  */

  // to upadate user profile
  function updateProfile(){
    // update profile logic with redirection
  }

  return (
    <div>
      <h1 className='heading'>User Dashboard</h1>
      <p className='subHeading'>Manage your profile, past orders, and craving.</p>
      {/* container div */}
      <div className="container">
        {/* user details div */}
        <div className="user-container">
          {/* User image */}
          <div className="user-image-container">
            <img
              alt="profile picture"
              src="https://tse1.mm.bing.net/th/id/OIP.VX34_cNcA90IYsB4-F-IAAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            />
          </div>
          {/* user information */}
          <div className="user-info-container">
            <h1>John Doe</h1>
            <p>Email : johndeo@gmail.com</p>
            <p>Role : User</p>
            <button 
            onClick={updateProfile}
            className="userBtn">Update profile</button>
          </div>
        </div>

        {/* order summary div */}
        <div>

          <h1
          className="heading"
          >What You’re Ordering Most</h1>
          <p className='subHeading'>
            A snapshot of your top ordered items from your personal order
            history.
          </p>

          {/* Implementation of chart.js */}
          <div className='displayChart'>
            <BarChart data = {chartData}/>
            {/* Gome home to explore more button */}
            <a 
              href='/'
              className='userBtn'>Let's explore more</a>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Dashboard;
