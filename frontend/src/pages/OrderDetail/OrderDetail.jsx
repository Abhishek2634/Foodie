/* eslint-disable no-unused-vars */
import React from 'react'
import { food_list } from '../../assets/frontend_assets/assets'
import './OrderDetail.css'
import VerticalStepper from '../../../utility/VerticalStepper'

const OrderDetail = () => {
    return (
        <>
            <div className="order-detail">
                <div className="my-order-details">
                    {
                        food_list.slice(0, 1).map((item) => {
                            return (
                                <div className="my-order-detail-food" key={item._id}>
                                    <div className="my-order-detail-food-item">
                                        <h3>{item.name}</h3>
                                        <img src={item.image} alt={item.name} loading='lazy' width={85} />
                                    </div>
                                    <p>$ {item.price}</p>
                                </div>
                            )
                        })
                    }
                    <hr />
                    {/* stepper logic */}
                        <VerticalStepper/>
                    <hr />
                </div>
                <div className="my-order-address">
                    <h3>Delivery Details</h3>
                    <div className="my-order-address-detail">
                        <div className="address">
                            <h4>Other</h4>
                            <p>22 - ring road, Gorakhpur</p>
                        </div>
                        <div className="address">
                            <h4>Nikhil Yadav</h4>
                            <p>6789054321</p>
                        </div>
                    </div>
                    <h3 style={{marginTop: '1vmax'}}>Price Details</h3>
                    <div className="my-order-price-detail">
                        <div className="price">
                            <h4>SubTotal</h4>
                            <p>$ 70</p>
                        </div>
                        <div className="price">
                            <h4>Shipping</h4>
                            <p>$ 5</p>
                        </div>
                        <div className="price">
                            <h4>Tax</h4>
                            <p>$ 2</p>
                        </div>
                        <hr style={{marginTop: '-1vmax'}}/>
                        <div className="price">
                            <h4>Total Amount</h4>
                            <p>$ 77</p>
                        </div>
                        <button className='invoice-btn'>Download Invoice</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail