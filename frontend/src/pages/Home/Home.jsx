import React,{useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
const Home = () => {
    const [category, setCategory] = useState('All');
    const [foodType, setFoodType] = useState('all'); 

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} foodType={foodType} setFoodType={setFoodType}/>
        <FoodDisplay category={category} foodType={foodType}/>
    </div>
  )
}

export default Home
