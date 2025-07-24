import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import { PlusCircle, MinusCircle, ShoppingCart } from "lucide-react";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, removeFromCart, addToCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-bottom">
          <p className="food-item-price">${price}</p>

          {!cartItems[id] ? (
            <div className="icon-wrapper" onClick={() => addToCart(id)}>
              <ShoppingCart size={24} color="black" />
            </div>
          ) : (
            <div className="food-item-counter-inline">
              <MinusCircle
                size={24}
                color="tomato"
                onClick={() => removeFromCart(id)}
                className="icon-minus"
              />
              <p>{cartItems[id]}</p>
              <PlusCircle
                size={24}
                color="green"
                onClick={() => addToCart(id)}
                className="icon-plus"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
