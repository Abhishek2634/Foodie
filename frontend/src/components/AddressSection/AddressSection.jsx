import React, { useState } from "react";
import "./AddressSection.css";
import { useNavigate } from "react-router-dom";

const AddressSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    doorNo: "",
    sector: "",
    landmark: "",
  });

  const [isPayEnabled, setIsPayEnabled] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    const isNameValid = formData.name.trim() !== "";
    const isContactValid = formData.contact.trim() !== "" && /^[0-9]{10}$/.test(formData.contact);
    const isSectorValid = formData.sector.trim() !== "";

    if (isNameValid && isContactValid && isSectorValid) {
      console.log("Address Data:", formData);
      setIsPayEnabled(true);
    }
  };

  const handleProceedToPay = () => {
    navigate('/order');
  };

  return (
    <div className="address-section-container">
      <h2>Delivery Address</h2>
      <form className="address-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact*</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="Phone Number"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Enter a 10-digit phone number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="doorNo">Door No</label>
            <input
              type="text"
              id="doorNo"
              name="doorNo"
              placeholder="Door Number"
              value={formData.doorNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              placeholder="Nearby Landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="sector">Sector*</label>
          <input
            type="text"
            id="sector"
            name="sector"
            placeholder="Sector"
            value={formData.sector}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-row">
          <button onClick={handleSaveAddress} className="address-submit-btn" type="button">Save Address</button>
          <button onClick={handleProceedToPay} className="address-pay-btn" type="button" disabled={!isPayEnabled}>Proceed to Pay</button>
        </div>
      </form>
    </div>
  );
};

export default AddressSection;
