import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaDollarSign, FaListUl, FaStar, FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import "./FoodDetail.css";


const FoodDetail = () => {
  const { addToCart, food_list } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const foodItem = food_list.find(item => item._id === id);  // Use food_list from context
  console.log("URL ID:", id);
console.log("Food List IDs:", food_list.map(item => item._id));


  if (!foodItem) {
    return <div className="food-detail">No food item found.</div>;
  }

  return (
    <div className="food-detail-wrapper">
      <div className="food-detail-container">
        <div className="food-detail-image">
          <img src={foodItem.image} alt={foodItem.name} />
        </div>

        <div className="food-detail-info">
          <h1>{foodItem.name}</h1>
          <p className="description">{foodItem.description}</p>

          <div className="info-section">
            <div className="price">
              <FaDollarSign /> {foodItem.price}
            </div>
            <div className="category">
              <FaListUl /> {foodItem.category}
            </div>
            <div className="rating">
              <FaStar className="star-icon" /> 4.5 (120+ reviews)
            </div>
          </div>

          <button className="add-to-cart" onClick={() => addToCart(id)}>
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
