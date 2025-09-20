/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './MyOrder.css'
import { food_list } from '../../assets/frontend_assets/assets'
import { Dialog, DialogContent, DialogTitle, Rating } from '@mui/material';

const MyOrder = () => {
    const [search, setSearch] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [orders, setOrders] = useState([]); // store items with status+time
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [description, setDescription] = useState("");
    const [ratingValue, setRatingValue] = useState(5);
    const [review, setReview] = useState([]);

    const orderStatus = [
        { text: "On the Way" },
        { text: "Delivered" },
        { text: "Cancelled" },
        { text: "Return" }
    ];

    const orderTime = [
        { time: 2024 },
        { time: 2023 },
        { time: 2022 },
        { time: 2021 },
    ];

    // Initialize food_list with random status and time
    useEffect(() => {
        const enriched = food_list.map(item => {
            const randomStatus =
                orderStatus[Math.floor(Math.random() * orderStatus.length)].text;
            const randomYear =
                orderTime[Math.floor(Math.random() * orderTime.length)].time;

            return { ...item, status: randomStatus, year: randomYear };
        });
        setOrders(enriched);
    }, []);

    const handleCloseModal = () => setOpenReviewModal(false);
    const handleOpenModal = () => setOpenReviewModal(true);
    const submitHandler = () => {
        const item = {
            id: review.length + 1,
            text: description,
            user: 'Jack Doe',  // replace with real user after integrating api
            ratings: ratingValue
        }
        setReview((prev) => [...prev, item])
        setDescription("");
        handleCloseModal()
    }


    return (
        <>
            <div className="my-order">
                <div className="my-order-filter">
                    <h2>Filter</h2>
                    <hr />
                    <p>Order Status</p>
                    {orderStatus.map((item, index) => (
                        <div key={index} className="my-order-status">
                            <input
                                type="checkbox"
                                value={item.text}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedStatuses([...selectedStatuses, item.text]);
                                    } else {
                                        setSelectedStatuses(
                                            selectedStatuses.filter((s) => s !== item.text)
                                        );
                                    }
                                }}
                            />
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="my-order-search-list">
                    <input
                        type="text"
                        placeholder="Search Your Order here..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="my-order-all">
                        {orders
                            .filter((item) =>
                                item.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .filter((item) => {
                                if (selectedStatuses.length === 0) return true;
                                return selectedStatuses.includes(item.status);
                            })
                            .map((item) => (
                                <div className="my-order-items" key={item._id}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={85}
                                        loading="lazy"
                                    />
                                    <p>{item.name}</p>
                                    <p>$ {item.price}</p>
                                    <div className="my-order-delivery-status">
                                        <div className="my-order-delivery-time">
                                            {item.status === "Delivered" && <span>🟢</span>}
                                            {item.status === "On the Way" && <span>🟡</span>}
                                            {item.status === "Cancelled" && <span>🔴</span>}
                                            {item.status === "Return" && <span>🔵</span>}

                                            <p>
                                                {item.status === "Delivered"
                                                    ? `Delivered in ${item.year}`
                                                    : item.status === "On the Way"
                                                        ? "Your order is on the way"
                                                        : item.status === "Cancelled"
                                                            ? "Your order was cancelled"
                                                            : "Your order was returned"}
                                            </p>
                                        </div>

                                        {item.status === "Delivered" && (
                                            <>
                                                <p style={{ color: "gray" }}>
                                                    Your item has been delivered
                                                </p>
                                                <b style={{ color: "tomato", cursor: "pointer" }} onClick={handleOpenModal}>
                                                    Rate & Review Product
                                                </b>
                                                <Dialog
                                                    open={openReviewModal}
                                                    onClose={handleCloseModal}
                                                    slotProps={{
                                                        backdrop: {
                                                            style: { backgroundColor: "transparent" }, // no black overlay
                                                        },
                                                    }}
                                                >
                                                    <DialogTitle textAlign={"center"}>Submit You Review</DialogTitle>
                                                    <DialogContent>
                                                        <div className="reviewratings">
                                                            <Rating
                                                                name="half-rating"
                                                                precision={0.5}
                                                                value={ratingValue}
                                                                onChange={(event, newValue) => {
                                                                    setRatingValue(newValue);   //  direct update
                                                                }}
                                                                sx={{
                                                                    '& .MuiRating-icon': {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        height: '30px',
                                                                    },
                                                                    '& .MuiRating-iconFilled': { color: '#ff4b2b' },
                                                                }}
                                                            />
                                                            <div className="description">
                                                                <textarea
                                                                    placeholder="Write your Review..."
                                                                    rows={5}
                                                                    autoFocus
                                                                    value={description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                            </div>
                                                            <button className="submitbtn" onClick={submitHandler}>Submit</button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyOrder;
