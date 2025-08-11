import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const [category, setCategory] = useState('All');
  const [showButton, setShowButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToMenu");
    if (shouldScroll === "true") {
      const section = document.getElementById("explore-menu");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("scrollToMenu");
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Scroll to food display section when search is performed
    const foodDisplaySection = document.getElementById("food-display");
    if (foodDisplaySection) {
      foodDisplaySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // Clear search when category is changed
    setSearchQuery('');
  };

  const handleSearchSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    // Scroll to food display section when suggestion is clicked
    const foodDisplaySection = document.getElementById("food-display");
    if (foodDisplaySection) {
      foodDisplaySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <Header />
      <ExploreMenu category={category} setCategory={handleCategoryChange} />
      <FoodDisplay 
        category={category} 
        searchQuery={searchQuery} 
        onSearchSuggestion={handleSearchSuggestion}
      />
    </div>
  );
};

export default Home;
