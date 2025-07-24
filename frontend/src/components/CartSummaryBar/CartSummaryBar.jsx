import React, { useContext } from 'react';
import './CartSummaryBar.css';
import { StoreContext } from '../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom'; //  import useLocation

const CartSummaryBar = () => {
  const { cartItems, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const totalItems = Object.values(cartItems).reduce((sum, item) => sum + item, 0);
  const totalAmount = getTotalCartAmount();

  // Don't show if cart is empty or if you're already on the cart page
  if (totalItems === 0 || location.pathname === '/cart') return null;

  return (
    <div className="cart-summary-bar">
      <div className="cart-summary-info">
        🛒 {totalItems} item{totalItems > 1 ? 's' : ''} | 💵 ₹{totalAmount}
      </div>
      <button className="view-cart-btn" onClick={() => navigate('/cart')}>
        VIEW CART
      </button>
    </div>
  );
};

export default CartSummaryBar;

