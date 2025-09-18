import React, { useState } from "react";
import "./Restaurants.css";
import { Star, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SimilarRestaurants from "./SimilarRestaurants";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { FaSquareWhatsapp, FaSquareXTwitter, FaFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { LuShare2 } from "react-icons/lu";


const Restaurants = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "The Golden Plate",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
      rating: 4.5,
      discount: "20% OFF",
      cuisine: "Italian",
      deliveryTime: "25-35 min",
      location: "Downtown",
      description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
    },
    {
      id: 2,
      name: "Spice Garden",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop",
      rating: 4.2,
      discount: "15% OFF",
      cuisine: "Indian",
      deliveryTime: "30-45 min",
      location: "Midtown",
      description: "Exotic Indian flavors with aromatic spices and rich curries.",
    },
    {
      id: 3,
      name: "Ocean's Catch",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
      rating: 4.7,
      discount: "25% OFF",
      cuisine: "Seafood",
      deliveryTime: "20-30 min",
      location: "Harbor District",
      description: "Fresh seafood and coastal cuisine with stunning ocean views.",
    },
    {
      id: 4,
      name: "Burger Haven",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop",
      rating: 4.3,
      discount: "10% OFF",
      cuisine: "American",
      deliveryTime: "15-25 min",
      location: "Westside",
      description: "Gourmet burgers and comfort food with premium ingredients.",
    },
  ];

  const shareUrl = window.location.href;
  const options = [
    {
      icon: <FaSquareWhatsapp
        color="green"
        size={50}
        cursor={'pointer'}
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`)}
      />,
      text: "WhatsApp"
    },
    {
      icon: <FaFacebook
        color="blue"
        size={50}
        cursor={'pointer'}
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`, "_blank")}
      />,
      text: "Instagram"
    },
    {
      icon: <FaSquareXTwitter
        size={50}
        cursor={'pointer'}
        color="black"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}`)}
      />,
      text: "Twitter"
    },
    {
      icon: <SiGmail
        size={50}
        cursor={'pointer'}
        color="red"
        onClick={() => window.open(`mailto:?subject=${encodeURIComponent(
          "Check out this food on Foodie!"
        )}&body=${encodeURIComponent(
          `I found this food item, thought you might like it: ${shareUrl}`
        )}`)}
      />,
      text: "Mail"
    }
  ]

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter restaurants by cuisine search
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#FFD700" color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} fill="#FFD700" color="#FFD700" style={{ opacity: 0.5 }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#ddd" />);
    }

    return stars;
  };

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <h1>Discover Amazing Restaurants</h1>
        <p>Explore the best restaurants in your area with exclusive offers</p>
      </div>

      {/* 🔍 Search bar instead of buttons */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cuisine (e.g., Italian, Indian, American)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="restaurants-grid">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-card"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="restaurant-image-container">
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <div className="discount-badge">{restaurant.discount}</div>
              </div>

              <div className="restaurant-info">
                <div className="restaurant-header">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <div className="rating-container">
                    {renderStars(restaurant.rating)}
                    <span className="rating-text">{restaurant.rating}</span>
                  </div>
                </div>

                <div className="restaurant-details">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className='share-restaurants'>
                    <p className="restaurant-cuisine">{restaurants.cuisine}</p>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // prevent parent card onClick
                        handleOpen();
                      }}
                    >
                      <LuShare2 />
                    </IconButton>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle align="center">Share this Food</DialogTitle>
                      <DialogContent>
                        <div style={{ display: "flex", alignItems: "center", gap: "1vmax" }}>
                          {
                            options.map((item, index) => {
                              return (
                                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                  <IconButton>{item.icon}</IconButton>
                                  {item.text}
                                </div>
                              )
                            })
                          }
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <p className="restaurant-description">{restaurant.description}</p>

                <button className="order-now-btn">Order Now</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#555" }}>
            No restaurants found for this cuisine.
          </p>
        )}
      </div>
      <SimilarRestaurants />
    </div>
  );
};

export default Restaurants;
