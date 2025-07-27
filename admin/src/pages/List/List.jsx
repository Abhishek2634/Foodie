import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({url}) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching food list");
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}api/food/remove`, { id: foodId });
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchList(); // Re-fetch the list to update the UI
        } else {
            toast.error("Error removing food item");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div className='list-table-format' key={index}>
                            <img src={`${url}images/${item.image}`} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            {/* I removed the <p> tag and added a class to the button */}
                            <button onClick={() => removeFood(item._id)} className='remove-btn'>
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;
