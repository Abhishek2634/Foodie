import React from 'react'
import './Orders.css'
import { MdDeleteOutline } from "react-icons/md";

const OrderItems = ({ order }) => {
    return ( 
        <div className='order-content'>
            <p>{order.id}</p>
            <p>{order.user}</p>
            <p>{order.status}</p>
            <p>$ {order.price}</p>
            <MdDeleteOutline className='icon' size={20} />
        </div>
    )
}

export default OrderItems
