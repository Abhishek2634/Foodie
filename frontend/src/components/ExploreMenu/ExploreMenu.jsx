import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({ category, setCategory, foodType, setFoodType }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 style={{ color: 'var(--text-color)' }}>Explore Our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time
      </p>

      {/* Category buttons like Pasta, Pizza etc. */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>

      {/* Dropdown to select Veg / Non-Veg / Jain */}
      <div className="food-type-selector" style={{ marginTop: "1rem" }}>
        <label htmlFor="foodType">Filter by Food Type: </label>
        <select
          id="foodType"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="veg">Veg 🌿</option>
          <option value="non-veg">Non-Veg 🍗</option>
          <option value="jain">Jain 🙏</option>
        </select>
      </div>

      <hr />
    </div>
  )
}

export default ExploreMenu
