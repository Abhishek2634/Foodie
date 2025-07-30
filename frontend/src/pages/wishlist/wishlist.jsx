import  { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import "./wishlist.css";

const Wishlist = () => {
  const { food_list } = useContext(StoreContext);
  const [wishlistedItems, setWishlistedItems] = useState([]);

  useEffect(() => {
    const updateWishlist = () => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    const filtered = food_list.filter(food => wishlistIds.includes(food._id));
    setWishlistedItems(filtered);
  };
     updateWishlist(); // Load initially

  // Listen for custom wishlist update event
  window.addEventListener("wishlistUpdated", updateWishlist);

  // Cleanup when component unmounts
  return () => {
    window.removeEventListener("wishlistUpdated", updateWishlist);
  };
  }, [food_list]);

  return (
    <div className="wishlist-page">
      <h2>💖 Your Wishlist</h2>
      {wishlistedItems.length === 0 ? (
        <p>No items wishlisted yet!</p>
      ) : (
        <div className="food-display-list">
          {wishlistedItems.map(item => (
            <FoodItem
  key={item._id}
  id={item._id}   // Pass id explicitly
  name={item.name}
  description={item.description}
  price={item.price}
  image={item.image}
/>

          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
