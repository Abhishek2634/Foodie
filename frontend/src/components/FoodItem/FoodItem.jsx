import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, removeFromCart, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/food/${id}`);
  };
  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={image} alt="" />
          {!cartItems[id] ? (
            <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          ) : (
            <div className="food-item-counter">
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{description}</p>
          <div className="food-item-footer">
            <p className="food-item-price">${price}</p>
            <button className="view-btn" onClick={handleClick}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
