/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [responseId, setResponseId] = useState("");
  const navigate = useNavigate()

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/payment/create-order",
        { amount } // send in USD
      );

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      handleRazorpayScreen(data.orderId, data.amount, data.currency);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleRazorpayScreen = async (orderId, amount, currency) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: '', // RAZORPAY KEY ID
      amount: amount,
      currency: currency,
      name: "Foodie",
      description: "Payment to Foodie",
      order_id: orderId,
      handler: function (response) {
        // This gives you payment details
        setResponseId(response.razorpay_payment_id);
        console.log("Payment success:", response);

        // redirect to success page 
        navigate("/order/success");

      },
      prefill: {
        name: "Foodie Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="pay">
      <button onClick={() => createRazorpayOrder(100)} className="order-success-btn">Payment of $100</button>
      {responseId && <p>Payment ID: {responseId}</p>}
    </div>
  );
};

export default Payment;
