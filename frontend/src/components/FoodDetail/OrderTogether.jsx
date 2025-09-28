/* eslint-disable no-unused-vars */
import React, { useContext, useMemo, useState } from 'react'
import { food_list } from '../../assets/frontend_assets/assets'
import { useParams } from 'react-router-dom'
import './OrderTogether.css'
import { FaShoppingCart } from 'react-icons/fa'
import { StoreContext } from '../context/StoreContext'


const OrderTogether = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState([]);
    const { addToCart } = useContext(StoreContext);


    const food = food_list.find((item) => item._id === id);  // original food item

    // select other food item
    const frequentlyOrdered = useMemo(() => {
        const otherFoods = food_list.filter((p) => p._id !== id);
        const shuffled = [...otherFoods].sort(() => 0.5 - Math.random());   
        return shuffled.slice(0, 2);
    }, [id]);   // food will suffle after changing dishes

    // handle checkbox logic
    const handleCheckboxChange = (itemId) => {
        if (selected.includes(itemId)) {
            setSelected(selected.filter((id) => id !== itemId))
        } else {
            setSelected([...selected, itemId])
        }
    }

    // price calculation
    const selectedFood = [food, ...frequentlyOrdered.filter((p) => selected.includes(p._id))];
    const totalPrice = selectedFood.reduce((acc, item) => acc + item.price, 0);

    return (
        <>
            <div className="order-together">
                <h1>Frequently Ordered Together</h1>
                <div className="order-together-food">
                    <div className="order-original-food">
                        <img src={food.image} alt={food.name} loading='lazy' width={250} />
                        <h4>{food.name}</h4>
                        <p>$ {food.price}</p>
                    </div>
                    {
                        frequentlyOrdered.map((item) => (
                            <div className="order-with-original-food" key={item._id}>
                                <img src={item.image} alt={item.name} loading='lazy' width={250} />
                                <div className='contain-checkbox-itemName'>
                                    <input
                                    type="checkbox"
                                    checked={selected.includes(item._id)}
                                    onChange={() => handleCheckboxChange(item._id)}
                                />
                                    <h4 id='food-heading'>{item.name}</h4>
                                </div>
                                
                                <p>$ {item.price}</p>
                                
                            </div>
                        ))
                    }
                    <div className="order-process">
                        <button
                            className="btn"
                            disabled={selectedFood.length <= 1}
                            onClick={() => {selectedFood.forEach((item) => addToCart(item._id))}}
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>
                        {
                            selected && <b>Total Price: $ {totalPrice}</b>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderTogether