import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, searchQuery = '', onSearchSuggestion }) => {
  const { food_list } = useContext(StoreContext);
  const [filterType, setFilterType] = useState('all'); // all | veg | non-veg

  const handleToggle = (type) => {
    setFilterType(type);
  };

  // Enhanced search function with more flexible matching
  const matchesSearch = (item, query) => {
    if (!query) return true;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    const itemText = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    
    // Check if all search terms are found in the item
    return searchTerms.every(term => itemText.includes(term));
  };

  const handleSuggestionClick = (suggestion) => {
    if (onSearchSuggestion) {
      onSearchSuggestion(suggestion);
    }
  };

  const filteredFoodList = food_list.filter((item) => {
    // Filter by category
    const matchCategory = category === item.category || category === 'All';
    
    // Filter by type (veg/non-veg)
    const matchType =
      filterType === 'all' ||
      (filterType === 'veg' && item.type === 'veg') ||
      (filterType === 'non-veg' && item.type === 'nonveg');
    
    // Filter by search query with enhanced matching
    const matchSearch = matchesSearch(item, searchQuery);
    
    return matchCategory && matchType && matchSearch;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Top Dishes Near You'}
        {searchQuery && filteredFoodList.length > 0 && (
          <span className="result-count"> ({filteredFoodList.length} dishes found)</span>
        )}
      </h2>
      
      {/* Toggle Buttons */}
      <div className="filter-toggle">
        <button
          className={filterType === 'all' ? 'active' : ''}
          onClick={() => handleToggle('all')}
        >
          All
        </button>
        <button
          className={filterType === 'veg' ? 'active' : ''}
          onClick={() => handleToggle('veg')}
        >
          Veg
        </button>
        <button
          className={filterType === 'non-veg' ? 'active' : ''}
          onClick={() => handleToggle('non-veg')}
        >
          Non-Veg
        </button>
      </div>

      <div className='food-display-list'>
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No dishes found matching your search criteria.</p>
            {searchQuery && (
              <div className="search-suggestions">
                <p>Try searching for different keywords or browse our categories above.</p>
                <div className="suggestion-tags">
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('')}>All Dishes</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Pasta')}>Pasta</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Salad')}>Salad</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Sandwich')}>Sandwich</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Cake')}>Cake</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Ice Cream')}>Ice Cream</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Noodles')}>Noodles</span>
                  <span className="suggestion-tag" onClick={() => handleSuggestionClick('Rolls')}>Rolls</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay