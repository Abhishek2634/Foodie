import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // Clear search query when category changes
    setSearchQuery("");
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <Header />
      <ExploreMenu category={category} setCategory={handleCategoryChange} />
      <FoodDisplay category={category} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
