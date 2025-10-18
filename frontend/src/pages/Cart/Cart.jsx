import "./Cart.css";
import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../components/context/StoreContext";
import AddressSection from "../../components/AddressSection/AddressSection.jsx"
import { useNavigate, Link } from "react-router-dom";
import CouponGenerator from "../../components/CouponGenerator/CouponGenerator";

const Cart = () => {
  const [checkoutBtnClicked, setCheckoutBtnClick] = useState(false);
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if cart is empty
  const isCartEmpty = getTotalCartAmount() === 0;

  const [promo, setPromo] = useState("");
  const [err, setErr] = useState();
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Check if there's a coupon in localStorage
  useEffect(() => {
    const savedCoupon = localStorage.getItem('foodieCoupon');
    if (savedCoupon) {
      const couponObj = JSON.parse(savedCoupon);
      setPromo(couponObj.code);
    }
  }, []);

  const handlebtn = () => {
    if (!promo) {
      setErr("Please enter a promo code");
      return;
    }
    
    // Check if the promo code is valid
    const validCoupons = [
      { code: 'FOOD10', discount: 10 },
      { code: 'SAVE15', discount: 15 },
      { code: 'YUMMY20', discount: 20 },
      { code: 'TASTY25', discount: 25 },
      { code: 'DELISH30', discount: 30 }
    ];
    
    const foundCoupon = validCoupons.find(coupon => coupon.code === promo);
    
    if (foundCoupon) {
      setDiscount(foundCoupon.discount);
      setAppliedCoupon(foundCoupon);
      setErr("");
    } else {
      setErr("Invalid promo code");
      setDiscount(0);
      setAppliedCoupon(null);
    }
  };

  if (isCartEmpty) {
    return (
      <div className="cart">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          flexDirection: 'column'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            opacity: '0.8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '4rem',
              position: 'relative',
              color: '#666'
            }}>🍽️</div>
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              width: '25px',
              height: '25px',
              backgroundColor: 'tomato',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              color: 'white',
              fontWeight: 'bold',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>0</div>
          </div>
          <h2 style={{
            color: '#333',
            fontSize: '2rem',
            marginBottom: '15px',
            fontWeight: '600'
          }}>
            Your Cart is Empty
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            Start your food journey by adding some delicious items!
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              border: 'none',
              color: 'white',
              backgroundColor: 'tomato',
              padding: '15px 30px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e74c3c'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'tomato'}
          >
            Continue Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <Link to={`/food/${item._id}`}>{item.name}</Link>
                  <p>${item.price}</p>
                  <div className="cart-quantity-controls">
                    <button
                      onClick={() => removeFromCart(item._id)}
                    >-</button>
                    <span>{cartItems[item._id]}</span>
                    <button
                      onClick={() => addToCart(item._id)}
                      disabled={cartItems[item._id] >= 20}   // disable plus if quantity goes above 20
                    >+</button>
                  </div>
                  <p>${item.price * cartItems[item._id]}</p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          {appliedCoupon && (
            <>
              <hr />
              <div className="cart-total-details discount-row">
                <p>Discount ({appliedCoupon.discount}%)</p>
                <p>-${((getTotalCartAmount() * appliedCoupon.discount) / 100).toFixed(2)}</p>
              </div>
            </>
          )}
          <hr />
          <div className="cart-total-details">
            <b><p>Total</p></b>
            <b><p>${
              getTotalCartAmount() === 0 
                ? 0 
                : (
                    appliedCoupon 
                      ? (getTotalCartAmount() - (getTotalCartAmount() * appliedCoupon.discount / 100) + 2).toFixed(2)
                      : getTotalCartAmount() + 2
                  )
            }</p></b>
          </div>
          {/*<button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>*/}
          <button onClick={() => setCheckoutBtnClick(true)}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input 
                placeholder="Promo Code" 
                type="text" 
                id="promo" 
                value={promo}
                onChange={(e) => setPromo(e.target.value)} 
              />
              <button onClick={() => handlebtn()}>Apply</button>
            </div>
            {err && <p id="promo-err" style={{color:'red'}}>{err}</p>}
            {appliedCoupon && (
              <p style={{color:'green', marginTop: '10px'}}>
                Coupon {appliedCoupon.code} applied! ({appliedCoupon.discount}% discount)
              </p>
            )}
            
            <div className="coupon-divider">
              <span>OR</span>
            </div>
            
            <p>Get a random discount coupon:</p>
            <CouponGenerator />
          </div>

          {checkoutBtnClicked && (<AddressSection />)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
