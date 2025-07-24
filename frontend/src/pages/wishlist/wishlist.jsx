import  { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';

const Wishlist = () => {
  const { food_list } = useContext(StoreContext);
  const [wishlistedItems, setWishlistedItems] = useState([]);

  useEffect(() => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    const filtered = food_list.filter(food => wishlistIds.includes(food._id));
    setWishlistedItems(filtered);
  }, [food_list]);

  return (
    <div className="wishlist-page">
      <h2>💖 Your Wishlist</h2>
      {wishlistedItems.length === 0 ? (
        <p>No items wishlisted yet!</p>
      ) : (
        <div className="food-display-list">
          {wishlistedItems.map(item => (
            <FoodItem key={item._id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
