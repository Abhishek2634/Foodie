import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './wishlist.css';

const Wishlist = () => {
  const { food_list } = useContext(StoreContext);
  const [wishlistedItems, setWishlistedItems] = useState([]);

  const updateWishlist = () => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    const filtered = food_list.filter(food => wishlistIds.includes(food._id));
    setWishlistedItems(filtered);
  };

  useEffect(() => {
    updateWishlist();
    
    // Listen for storage changes to update wishlist in real-time
    const handleStorageChange = () => {
      updateWishlist();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for wishlist updates
    window.addEventListener('wishlistUpdated', updateWishlist);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', updateWishlist);
    };
  }, [food_list]);

  return (
    <div className="wishlist-page">
      <h2>💖 Your Wishlist</h2>
      {wishlistedItems.length === 0 ? (
        <p>No items in your wishlist yet! Start adding your favorite foods by clicking the heart icon on any food card.</p>
      ) : (
        <div className="food-display-list">
          {wishlistedItems.map(item => (
            <FoodItem
              key={item._id}
              id={item._id}
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
