/* eslint-disable react/display-name */
import React, { useEffect, useContext, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaDollarSign, FaListUl, FaStar, FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDetail.css";
import "./print.css";

const PrintableSection = React.forwardRef(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

const FoodDetail = () => {
  const { addToCart, removeFromCart, cartItems, food_list } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const foodItem = food_list.find((item) => item._id === id);
  console.log("URL ID:", id);
  console.log("Food List IDs:", food_list.map((item) => item._id));

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: foodItem ? `${foodItem.name} - Foodie` : "Food Detail",
  });

  const ensureImagesLoaded = useCallback(async (node) => {
    const imgs = Array.from(node.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.addEventListener("load", res);
          img.addEventListener("error", res);
        });
      })
    );
  }, []);

  // HTML2PDF handler
  const handleExportPdf = useCallback(async () => {
    if (!printRef.current) return;
    await ensureImagesLoaded(printRef.current);

    const opt = {
      margin: [10, 10, 14, 10],
      filename: foodItem
        ? `${foodItem.name.replace(/\s+/g, "_")}_Foodie.pdf`
        : "food_detail.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(printRef.current).save();
  }, [foodItem, ensureImagesLoaded]);

  if (!foodItem) {
    return <div className="food-detail">No food item found.</div>;
  }

  // Get related products from the same category, excluding the current item
  const relatedProducts = food_list
    .filter(item => item.category === foodItem.category && item._id !== foodItem._id)
    .slice(0, 5); // Limit to 5 related products

  return (
    <div className="food-detail-wrapper">
      {/* Action Buttons */}
      <div className="no-print" style={{ marginBottom: "1rem", textAlign: "right" }}>
        <button
          onClick={handlePrint}
          style={{
            marginRight: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            background: "#ff0000",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          🖨️ Print
        </button>
        <button
          onClick={handleExportPdf}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            background: "#ff0000",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          ⬇️ Export PDF
        </button>
      </div>



      <PrintableSection ref={printRef}>

        <div className="food-detail-container">
          <div className="food-detail-image">
            <img src={foodItem.image} alt={foodItem.name} crossOrigin="anonymous" />
          </div>

          <div className="food-detail-info">
            <h1>{foodItem.name}</h1>
            <p className="description">{foodItem.description}</p>

            <div className="info-section">
              <div className="price">
                <FaDollarSign /> {foodItem.price}
              </div>
              <div className="category">
                <FaListUl /> {foodItem.category}
              </div>
              <div className="rating">
                <FaStar className="star-icon" /> 4.5 (120+ reviews)
              </div>
            </div>
            <div className="food-detail-cart-section">
              {!cartItems[id] ? (
                <button className="add-to-cart" onClick={() => addToCart(id)}>
                  <FaShoppingCart /> Add to Cart
                </button>
              ) : (
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => removeFromCart(id)}>
                    -
                  </button>
                  <span className="quantity-display">{cartItems[id]}</span>
                  <button className="quantity-btn" onClick={() => addToCart(id)}>
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </PrintableSection>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-products-title">Related Products</h2>
          <p className="related-products-subtitle">
            Other {foodItem.category.toLowerCase()} items you might like
          </p>
          <div className="related-products-grid">
            {relatedProducts.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;
