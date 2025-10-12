import React, { useState } from 'react'
import './Orders.css'
import OrderItems from './OrderItems'

const Orders = () => {
  // Dummy data array (replace with API later if needed)
  const orders = Array.from({ length: 35 }, (_, i) => ({
    id: `${123456789 + i}`,
    user: `User ${i + 1}`,
    status: i % 2 === 0 ? "Processing" : "Delivered",
    price: (Math.random() * 100).toFixed(2),
  }))

  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 10;
  const totalOrder = 35;
  const noOfPages = Math.ceil(totalOrder/PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE

  const handlePrev = () =>{
    setCurrentPage((prev) => prev - 1)
  }
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1)
  }
  const handlePageChange = (n) => {
    setCurrentPage(n)
  }

  return (
    <div className='order-table'>
      <div className='order-heading'>
        <b>Order ID</b>
        <b>User</b>
        <b>Status</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {
        orders.slice(start,end).map((order) => (
        <OrderItems key={order.id} order={order} />
      ))}
      {/* Pagination Controls */}
      <div className='pagination'>
        <button 
          onClick={() => handlePrev()}
          disabled={currentPage === 0}
          className='prev'
        >
          Prev
        </button>

        {
          [...Array(noOfPages).keys()].map((p) => (
            <button onClick={() => handlePageChange(p)} className='active'>{p}</button>
          ))
        }

        <button 
          onClick={() => handleNext()}
          disabled={currentPage === noOfPages - 1}
          className='next'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Orders
