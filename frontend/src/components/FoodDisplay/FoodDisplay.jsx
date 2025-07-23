import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, foodType }) => {
  const { food_list } = useContext(StoreContext);
  

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>

      

      <div className="food-display-list">
        {food_list.map((item, index) => {
          const categoryMatch = category === item.category || category === "All";
          const foodTypeMatch = foodType === "all" || item.foodType?.toLowerCase() === foodType.toLowerCase();

          if (categoryMatch && foodTypeMatch) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
