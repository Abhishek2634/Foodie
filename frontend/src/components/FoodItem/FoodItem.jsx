import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.css";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Heart, Plus, Minus } from "lucide-react";
import { assets } from "../../assets/frontend_assets/assets";

const FoodItem = ({ id, name, price, description, image, isShared = false }) => {
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
     window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleClick = () => {
    navigate(`/food/${id}`);
  };

  return (
    <div className={`food-item ${isShared ? 'shared' : ''}`}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <div className="add" onClick={() => addToCart(id)}>
            <Plus size={20} color="white" />
          </div>
        ) : (
          <div className="food-item-counter">
            <Minus
              size={18}
              color="tomato"
              onClick={() => removeFromCart(id)}
              style={{ cursor: "pointer" }}
            />
            <p>{cartItems[id]}</p>
            <Plus
              size={18}
              color="green"
              onClick={() => addToCart(id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        {!isShared && (
          <div className="wishlist-icon" onClick={toggleWishlist}>
            <Heart
              size={20}
              color={isWishlisted ? "#e11d48" : "#444"}
              fill={isWishlisted ? "#e11d48" : "none"}
              stroke="#facc15"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" width={70} />
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
  );
};

export default FoodItem;
