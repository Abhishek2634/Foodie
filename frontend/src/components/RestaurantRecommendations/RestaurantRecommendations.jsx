import React, { useState, useEffect } from "react";
import { Star, MapPin, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import "./RestaurantRecommendations.css";

const RestaurantRecommendations = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities] = useState([
    // US Cities
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte",
    "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington",
    // Indian Cities
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
    "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
    "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi"
  ]);
  
  const navigate = useNavigate();

  const fetchBestRatedRestaurants = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError("");
    
    try {
      console.log("Fetching restaurants for city:", city);
      const response = await apiRequest.get(`/api/restaurant/best-rated?city=${encodeURIComponent(city)}&limit=8`);
      console.log("API Response:", response.data);
      
      if (response.data && response.data.success) {
        setRestaurants(response.data.data);
      } else {
        setError("No restaurants found for this city.");
        setRestaurants([]);
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        setError(`Failed to fetch restaurants: ${err.response.data.message || 'Server error'}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response from server. Please check if the backend is running on port 4000.");
      } else {
        setError("Failed to fetch restaurant recommendations. Please try again.");
      }
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (city) {
      fetchBestRatedRestaurants(city);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#FFD700" color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star 
          key="half" 
          size={16} 
          fill="#FFD700" 
          color="#FFD700" 
          style={{ opacity: 0.5 }} 
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#ddd" />);
    }

    return stars;
  };

  return (
    <div className="restaurant-recommendations">
      <div className="recommendations-header">
        <h2>🍽️ Discover Top-Rated Restaurants</h2>
        <p>Welcome! Here are the best-rated restaurants in your area</p>
        
        <div className="city-selector">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <select 
              value={selectedCity} 
              onChange={handleCityChange}
              className="city-select"
              placeholder="Select your city"
            >
              <option value="">Select your city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding the best restaurants for you...</p>
        </div>
      )}

      {!loading && selectedCity && restaurants.length === 0 && !error && (
        <div className="no-results">
          <p>No restaurants found in {selectedCity}. Try another city!</p>
        </div>
      )}

      {!loading && restaurants.length > 0 && (
        <div className="recommendations-content">
          <div className="recommendations-subheader">
            <h3>Top Picks in {selectedCity}</h3>
            <p>Based on customer ratings and reviews</p>
          </div>

          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                className="restaurant-card"
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              >
                <div className="restaurant-image-container">
                  <img 
                    src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop"} 
                    alt={restaurant.name} 
                    className="restaurant-image" 
                  />
                  {restaurant.discount && (
                    <div className="discount-badge">{restaurant.discount}</div>
                  )}
                  <div className="rating-badge">
                    <Star size={12} fill="#FFD700" color="#FFD700" />
                    <span>{restaurant.averageRating}</span>
                  </div>
                </div>

                <div className="restaurant-info">
                  <div className="restaurant-header">
                    <h4 className="restaurant-name">{restaurant.name}</h4>
                    <div className="rating-container">
                      {renderStars(restaurant.averageRating)}
                      <span className="rating-text">
                        ({restaurant.numReviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="restaurant-details">
                    <div className="detail-item">
                      <MapPin size={14} />
                      <span>{restaurant.address}</span>
                    </div>
                    {restaurant.deliveryTime && (
                      <div className="detail-item">
                        <Clock size={14} />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    )}
                  </div>

                  <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                  {restaurant.description && (
                    <p className="restaurant-description">
                      {restaurant.description.length > 100 
                        ? `${restaurant.description.substring(0, 100)}...` 
                        : restaurant.description
                      }
                    </p>
                  )}

                  <button className="explore-btn">
                    Explore Menu
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="recommendations-footer">
            <p>Can't find what you're looking for?</p>
            <button 
              className="browse-all-btn"
              onClick={() => navigate('/restaurants')}
            >
              Browse All Restaurants
            </button>
          </div>
        </div>
      )}

      {!selectedCity && !loading && (
        <div className="welcome-message">
          <div className="welcome-content">
            <h3>Welcome to Foodie! 🎉</h3>
            <p>Select your city above to discover the best-rated restaurants in your area.</p>
            <p>We'll show you top picks based on real customer reviews and ratings.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantRecommendations;
