import React, { useRef, useEffect, useState } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const scroll = (direction) => {
    const scrollAmount = 250;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }

    // Pause logic for sudden break down of auto scrolling....
    setPaused(true);
    clearInterval(intervalRef.current);
    setTimeout(() => {
      setPaused(false);
      startAutoScroll();
    }, 1500);
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!scrollRef.current || paused) return;
      scrollRef.current.scrollLeft += 1;
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0;
      }
    }, 20);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [paused]); // Added paused dependency

  return (
    <div className="explore-menu" id="explore-menu">
      <h1 style={{ color: 'var(--text-color)' }}>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time
      </p>

      <div className="explore-menu-wrapper">
        <button className="arrow left" onClick={() => scroll("left")}>
          &lt;
        </button>
        
        <div className="explore-menu-list" ref={scrollRef}>
          {[...menu_list, ...menu_list].map((item, index) => (
            <div
              onClick={() =>
                setCategory(
                  category === item.menu_name ? "All" : item.menu_name
                )
              }
              key={`${item.menu_name}-${index}`} // Better key for duplicated items
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        
        <button className="arrow right" onClick={() => scroll("right")}>
          &gt;
        </button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
