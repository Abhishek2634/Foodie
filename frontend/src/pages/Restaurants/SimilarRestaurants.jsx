import { Clock, MapPin, Star } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Restaurants.css";

const SimilarRestaurants = () => {
    const navigate = useNavigate();
    const SimilarRestaurants = [
        {
            id: 1,
            name: "White Rose",
            image: "https://b.zmtcdn.com/data/pictures/1/2900111/bb0ff3eb4f4c5bc782e4e84aecca429b_featured_v2.jpg?output-format=webp",
            rating: 4.5,
            discount: "25% OFF",
            cuisine: "Chinese",
            deliveryTime: "40-45 min",
            location: "Gurgaon",
            description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
        },
        {
            id: 2,
            name: "The Fork",
            image: "https://b.zmtcdn.com/data/pictures/6/19729416/328bd9a65a1ebde88d5f70c8e1aaf90a_featured_v2.jpg?output-format=webp",
            rating: 4.3,
            discount: "15% OFF",
            cuisine: "North Indian",
            deliveryTime: "35-40 min",
            location: "Noida",
            description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
        },
        {
            id: 3,
            name: "Green tea",
            image: "https://b.zmtcdn.com/data/pictures/3/2901243/8b17b1df933b87ca0a537f2188343b2d_featured_v2.jpg?output-format=webp",
            rating: 4.4,
            discount: "20% OFF",
            cuisine: "Italian",
            deliveryTime: "20-25 min",
            location: "Hyderabad",
            description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
        },
        {
            id: 4,
            name: "Paris Bakry",
            image: "https://b.zmtcdn.com/data/pictures/chains/2/19391402/baba44b8700e02256928be092a272b42_featured_v2.jpg?output-format=webp",
            rating: 4.2,
            discount: "30% OFF",
            cuisine: "South Indian",
            deliveryTime: "25-30 min",
            location: "Bangalore",
            description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
        },

    ]
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
        <>
            <h2>Similar Restaurants</h2>
            <div className="restaurants-grid">
                {
                    SimilarRestaurants.map((restaurants) => {
                        return (
                            <div
                                key={restaurants.id}
                                className="restaurant-card"
                                onClick={() => navigate(`/restaurant/${restaurants.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="restaurant-image-container">
                                    <img src={restaurants.image} alt={restaurants.name} className="restaurant-image" />
                                    <div className="discount-badge">{restaurants.discount}</div>
                                </div>

                                <div className="restaurant-info">
                                    <div className="restaurant-header">
                                        <h3 className="restaurant-name">{restaurants.name}</h3>
                                        <div className="rating-container">
                                            {renderStars(restaurants.rating)}
                                            <span className="rating-text">{restaurants.rating}</span>
                                        </div>
                                    </div>

                                    <div className="restaurant-details">
                                        <div className="detail-item">
                                            <MapPin size={14} />
                                            <span>{restaurants.location}</span>
                                        </div>
                                        <div className="detail-item">
                                            <Clock size={14} />
                                            <span>{restaurants.deliveryTime}</span>
                                        </div>
                                    </div>

                                    <p className="restaurant-cuisine">{restaurants.cuisine}</p>
                                    <p className="restaurant-description">{restaurants.description}</p>

                                    <button className="order-now-btn">Order Now</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SimilarRestaurants