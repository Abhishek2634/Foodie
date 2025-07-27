import { createContext, useState } from "react";
import { toast } from 'react-toastify'; // Assuming you are using react-toastify
import { food_list } from "../../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    /**
     * Adds an item to the cart or increments its quantity if it already exists.
     * @param {string} itemId - The ID of the food item to add.
     */
    const addToCart = (itemId) => {
        // Check if the item is not already in the cart
        if (!cartItems[itemId]) {
            // Add the item to the cart with a quantity of 1
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            // If the item is already in the cart, increment its quantity
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        // Optional: Add a success notification
        toast.success("Item added to cart!");
    };

    /**
     * Removes an item from the cart by decrementing its quantity.
     * @param {string} itemId - The ID of the food item to remove.
     */
    const removeFromCart = (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            toast.error("Item removed from cart!");
        }
    };

    /**
     * Calculates the total amount for all items in the cart.
     * @returns {number} - The total cart amount.
     */
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Find the item details from the master food list
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
