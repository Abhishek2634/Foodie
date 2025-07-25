import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, removeFromCart, addToCart } = useContext(StoreContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(stored.includes(id));
  }, [id]);

  const toggleWishlist = () => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updated;

    if (stored.includes(id)) {
      updated = stored.filter((itemId) => itemId !== id);
      setIsWishlisted(false);
    } else {
      updated = [...stored, id];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleClick = () => {
    navigate(`/food/${id}`);
  };

  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={image} alt="" />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
          )}
          <div className="wishlist-icon" onClick={toggleWishlist}>
            {isWishlisted ? "💖" : "🤍"}
          </div>
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
