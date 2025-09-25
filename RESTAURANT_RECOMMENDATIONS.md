# Restaurant Recommendations Feature

## Overview

The Restaurant Recommendations feature helps new users discover the best-rated restaurants in their city. This feature provides personalized restaurant suggestions based on customer ratings and reviews, making it easier for new users to find quality dining options.

## Features

### 🏆 Best-Rated Restaurant Suggestions
- Displays top-rated restaurants in a selected city
- Sorted by average rating and number of reviews
- Shows restaurant details including cuisine, delivery time, and discounts

### 🎯 New User Experience
- Automatically shows recommendations for new users on the home page
- City selector with popular US cities
- Welcome banner with call-to-action

### 📱 Responsive Design
- Mobile-friendly interface
- Beautiful gradient backgrounds
- Smooth animations and hover effects

## Backend Implementation

### Database Schema Updates

#### Restaurant Model (`backend/models/restaurantModel.js`)
```javascript
{
  name: String,
  address: String,
  city: String, // Required for city-based filtering
  phone: String,
  cuisine: String, // Required for cuisine categorization
  description: String,
  image: String,
  averageRating: Number, // Auto-calculated from food ratings
  numReviews: Number, // Total number of reviews
  deliveryTime: String,
  discount: String,
  isActive: Boolean
}
```

### API Endpoints

#### 1. Get Best-Rated Restaurants
```
GET /api/restaurant/best-rated?city={city}&limit={limit}
```
- Returns top-rated restaurants in a specific city
- Sorted by rating (descending) and number of reviews
- Optional limit parameter (default: 10)

#### 2. Get Restaurants by City
```
GET /api/restaurant/city/{city}
```
- Returns all restaurants in a specific city
- Sorted by rating

#### 3. Get Restaurant Details
```
GET /api/restaurant/{id}
```
- Returns restaurant details with associated foods

### Rating System

The restaurant rating is automatically calculated from the average ratings of all foods in that restaurant. When a user reviews a food item, the restaurant's overall rating is updated accordingly.

## Frontend Implementation

### Components

#### RestaurantRecommendations (`frontend/src/components/RestaurantRecommendations/`)
- Main component for displaying restaurant recommendations
- City selector with dropdown
- Restaurant cards with ratings, cuisine, and details
- Loading states and error handling

#### Home Page Integration
- Shows recommendations banner for new users
- Detects if user has previous orders or preferences
- Provides easy access to recommendations

### Routes

#### New Route
```
/recommendations - Restaurant recommendations page
```

#### Navigation
- Added "Top Picks" link in navbar with star icon
- Accessible from any page

## Usage

### For New Users
1. Visit the home page
2. See welcome banner with restaurant recommendations
3. Select your city from the dropdown
4. Browse top-rated restaurants
5. Click on restaurant to view details and menu

### For Existing Users
1. Click "Top Picks" in the navigation
2. Select a city to see recommendations
3. Explore restaurants by rating and cuisine

## Sample Data

The system includes sample restaurant data for testing:

### Cities Available
- New York
- Los Angeles
- Chicago
- Houston
- Phoenix
- And more...

### Restaurant Types
- Italian
- Indian
- Seafood
- American
- Japanese
- Mexican
- Vietnamese
- BBQ
- Thai

## Setup Instructions

### 1. Database Setup
```bash
cd backend
node seedRestaurants.js
```

### 2. Start Backend
```bash
cd backend
npm start
```

### 3. Start Frontend
```bash
cd frontend
npm start
```

### 4. Access Recommendations
- Visit `http://localhost:5173/recommendations`
- Or see recommendations on home page for new users

## Technical Details

### Rating Calculation
```javascript
// Restaurant rating is calculated from food ratings
const updateRestaurantRating = async (restaurantId) => {
  const foods = await Food.find({ restaurantId });
  let totalRating = 0;
  let totalReviews = 0;
  
  for (const food of foods) {
    totalRating += food.averageRating * food.numReviews;
    totalReviews += food.numReviews;
  }
  
  const newAverageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
  
  await Restaurant.findByIdAndUpdate(restaurantId, {
    averageRating: newAverageRating,
    numReviews: totalReviews
  });
};
```

### City Search
- Case-insensitive search using MongoDB regex
- Supports partial city name matching
- Returns restaurants sorted by rating

## Future Enhancements

1. **Personalized Recommendations**: Based on user preferences and order history
2. **Cuisine Filtering**: Filter restaurants by cuisine type
3. **Price Range Filtering**: Filter by price range
4. **Distance-based Recommendations**: Use user location for nearby restaurants
5. **Review Sentiment Analysis**: Analyze review text for better recommendations
6. **Popular Times**: Show when restaurants are busiest
7. **Dietary Restrictions**: Filter by dietary preferences (vegetarian, vegan, etc.)

## Contributing

To contribute to this feature:

1. Follow the existing code style
2. Add proper error handling
3. Include responsive design considerations
4. Test with different screen sizes
5. Update documentation as needed

## Support

For issues or questions about the restaurant recommendations feature, please create an issue in the repository or contact the development team.
