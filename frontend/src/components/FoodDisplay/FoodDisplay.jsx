import React, { useContext, useMemo, useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { ChevronDown } from 'lucide-react';

const FoodDisplay = ({ category }) => {
const { food_list } = useContext(StoreContext);
const [filterType, setFilterType] = useState('all'); // all | veg | non-veg
const [searchQuery, setSearchQuery] = useState('');
const [sortOption, setSortOption] = useState('none');
const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleToggle = (type) => {
    setFilterType(type);
  };

  const filteredFoodList = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const base = (food_list || []).filter((item) => {
      const matchCategory = category === item.category || category === 'All';
      const matchType =
        filterType === 'all' ||
        (filterType === 'veg' && item.type === 'veg') ||
        (filterType === 'non-veg' && item.type === 'nonveg');
      const matchQuery = query === '' || item.name.toLowerCase().includes(query);
      return matchCategory && matchType && matchQuery;
    });

    if (sortOption === 'price-asc') return [...base].sort((a, b) => a.price - b.price);
    if (sortOption === 'price-desc') return [...base].sort((a, b) => b.price - a.price);
    return base;
  }, [food_list, category, filterType, searchQuery, sortOption]);

  const getSortLabel = () => {
    if (sortOption === 'price-asc') return 'Price: Low → High';
    if (sortOption === 'price-desc') return 'Price: High → Low';
    return 'Default';
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  // Apply sorting by price if requested
  const sortedFoodList = [...filteredFoodList];
  if (sortOrder === 'asc') {
    sortedFoodList.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    sortedFoodList.sort((a, b) => b.price - a.price);
  }

  return (
    <div className='food-display' id='food-display'>
      <h4 className="top-dishes-heading">Top Dishes Near You</h4>
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
      {/* Sort control */}
      <div className="sort-control" style={{ margin: '12px 0' }}>
        <label htmlFor="sort-select" style={{ marginRight: 8 }}>Sort by price:</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className='food-display-list'>
        {sortedFoodList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;