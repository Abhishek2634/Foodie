/* eslint-disable no-unused-vars */
import React from 'react'
import { Typography } from '@mui/material'
import './ConfirmOrder.css'
import { food_list } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const ConfirmOrder = () => {
  return (
    <>
    
      <div className="order-confirm">
        <div className="order-confirm-left">
          <h1>Confirm Your order</h1>
          <Typography>Your order will be processed within few minutes, We will notify you once it is shipped</Typography>
          <h3>Billing Address</h3>
          <div className="order-confirm-user-details">
            <b>Name</b>
            <p>Nikhil Yadav</p>
          </div>
          <div className="order-confirm-user-details">
            <b>Address</b>
            <p style={{ marginLeft: '-1vmax' }}>22-ring road, Gorakhpur</p>
          </div>
          <div className="order-confirm-user-details">
            <b>Email</b>
            <p>nikhil@gmail.com</p>
          </div>
          <div className="order-confirm-user-details">
            <b>Phone</b>
            <p>6789045671</p>
          </div>
         <Link to={'/order/payment'}><button className='order-confirm-btn'>Procced To Payment</button></Link>
        </div>
        <div className="order-confirm-right">
          <h3>Order Summary</h3>
          <hr />
          <div className="order-confirm-details">
            <div className="order-confir-date">
              <p>Date</p>
              <b>13 Sep 2025</b>
            </div>
            <div className="order-confir-id">
              <p>Order Id</p>
              <b>1234567</b>
            </div>
            <div className="order-confir-payment">
              <p>Payment method</p>
              <b>RazorPay</b>
            </div>
          </div>
          <hr />
          {food_list.slice(0, 2).map((item) => {
            return (
              <div className="order-confirm-order" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  width={85}
                  loading="lazy"
                />
                <p>{item.name}</p>
                <p>$ {item.price}</p>
              </div>
            )
          })}
          <hr />
          <div className="order-confirm-total">
            <div className="order-conform-subtotal">
              <p>Sub total</p>
              <b>$ 70</b>
            </div>
            <div className="order-conform-shipping">
              <p>Shipping</p>
              <b>$ 5</b>
            </div>
            <div className="order-conform-tax">
              <p>tax</p>
              <b>$ 2</b>
            </div>
          </div>
          <hr />
          <div className="order-confirm-paytotal">
            <b>Order Total</b>
            <b>$ 77</b>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder