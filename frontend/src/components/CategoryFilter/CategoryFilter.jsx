import React, { useState, useEffect } from 'react';
import './CategoryFilter.css';
import { Utensils, Coffee, Cake, Coffee as Beverage, Apple, ChefHat } from 'lucide-react';

const CategoryFilter = ({ onCategoryChange, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  // Define food type categories with icons
  const foodTypes = [
    { id: 'all', name: 'All', icon: ChefHat },
    { id: 'appetizer', name: 'Appetizers', icon: Apple },
    { id: 'main', name: 'Main Course', icon: Utensils },
    { id: 'dessert', name: 'Desserts', icon: Cake },
    { id: 'beverage', name: 'Beverages', icon: Beverage },
    { id: 'snack', name: 'Snacks', icon: Apple },
    { id: 'side', name: 'Sides', icon: Utensils }
  ];

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className="category-filter">
      <h3 className="category-filter-title">Food Categories</h3>
      <div className="category-buttons">
        {foodTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              className={`category-btn ${selectedCategory === type.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(type.id)}
            >
              <IconComponent size={20} />
              <span>{type.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;