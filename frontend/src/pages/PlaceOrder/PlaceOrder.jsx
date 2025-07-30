import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
const PlaceOrder = () => {
    const {getTotalCartAmount} = useContext(StoreContext)

    const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
    };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input placeholder="First Name" type="text" />
          <input placeholder="Last Name" type="text" />
        </div>
        <input placeholder="Email Adress" type="email" />
        <input placeholder="Street" type="text" />
        <div className="multi-fields">
          <input placeholder="City" type="text" />
          <input placeholder="State" type="text" />
        </div>
        <div className="multi-fields">
          <input placeholder="Zip Code" type="text" />
          <input placeholder="Country" type="text" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{formatPrice(getTotalCartAmount())}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{formatPrice(getTotalCartAmount()) === 0? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>
              <p>Total</p>
            </b>
            <b>
              <p>{formatPrice(getTotalCartAmount()) === 0 ? 0 : formatPrice(getTotalCartAmount()+2)}</p>
            </b>
          </div>
          <button>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
