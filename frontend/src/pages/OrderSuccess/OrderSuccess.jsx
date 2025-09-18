/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material';
import React from 'react'
import { SiTicktick } from "react-icons/si";
import './OrderSuccess.css'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <>
            <div className="order-success">
                <SiTicktick color='tomato' size={60} />
                <h2>Congratulation !</h2>
                <Typography>Your Order has been Placed Successfully</Typography>
              <Link to={'/order/details'}><button className='order-success-btn'>View Orders Detail</button></Link>
            </div>
        </>
    )
}

export default OrderSuccess