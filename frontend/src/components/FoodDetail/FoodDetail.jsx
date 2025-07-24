import React, { useContext } from "react";
import "./FoodDetail.css";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { useParams } from "react-router-dom";
const FoodDetail = () => {
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const { id } = useParams();

  const foodItem = food_list.find((item) => item._id === id);

  if (!foodItem) {
    return (
      <div className="food-detail-container">
        <div className="food-not-found">
          <h2>Food item not found</h2>
          <p>The requested food item could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-detail-container">
      <div className="food-detail-content">
        <div className="food-detail-image">
          <img src={foodItem.image} alt={foodItem.name} />
        </div>

        <div className="food-detail-info">
          <h2 className="food-detail-name">{foodItem.name}</h2>
          <div className="food-detail-rating">
            <img src={assets.rating_starts} alt="rating" />
            <span>(4.5 / 5)</span>
          </div>
          <p className="food-detail-description">{foodItem.description}</p>
          <div className="food-detail-price">
            <span className="currency">$</span>
            <span className="price">{foodItem.price}</span>
          </div>

          <div className="food-detail-actions">
            <div className="quantity-controls">
              {!cartItems[id] ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(id)}
                >
                  <img src={assets.add_icon_white} alt="Add" />
                  Add to Cart
                </button>
              ) : (
                <div className="quantity-counter">
                  <button
                    onClick={() => removeFromCart(id)}
                    className="quantity-btn"
                  >
                    <img src={assets.remove_icon_red} alt="Remove" />
                  </button>
                  <span className="quantity">{cartItems[id]}</span>
                  <button
                    onClick={() => addToCart(id)}
                    className="quantity-btn"
                  >
                    <img src={assets.add_icon_green} alt="Add" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="related-foods">
        <h3>Related Items</h3>
        <div className="related-foods-list">
          {food_list
            .filter(
              (item) => item.category === foodItem.category && item._id !== id
            )
            .slice(0, 4)
            .map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                hideViewButton={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
