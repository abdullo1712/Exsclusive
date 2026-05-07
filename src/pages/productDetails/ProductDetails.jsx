import React, { useState } from "react";
import "./ProductDetails.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("blue");

  // Rasm manzillarini o'zingiznikiga o'zgartirib olasiz
  const images = [
    "https://5.imimg.com/data5/SELLER/Default/2022/6/KD/US/BN/22794873/ps5-style-ps-5-4-ps4-wireless-game-pc-ps4-joystick-ps5-controller.jpg",
    "https://exclusive-ecommerce-one.vercel.app/Assets/Images/toy-removebg-preview.png",
    "https://ng.jumia.is/6FYDFBzS4IMkL_HC6KKbKevW1aM=/fit-in/500x500/filters:fill(white)/product/60/638018/2.jpg?7564",
    "https://m.media-amazon.com/images/I/61A6CJ7Y4NL.jpg",
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { id: "blue", hex: "#a3b1c6" }, // taxminiy rang
    { id: "red", hex: "#e07575" },
  ];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-container">
      {/* Chap tomon - Rasmlar */}
      <div className="product-gallery">
        <div className="thumbnails">
          {images.map((img, index) => (
            <div className="thumb-box" key={index}>
              <img src={img} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-image">
          {/* Asosiy katta rasm uchun joy */}
          <img src="https://exclusive-ecommerce-one.vercel.app/Assets/Images/toy-removebg-preview.png" alt="Havic HV G-92 Gamepad" />
        </div>
      </div>

      {/* O'ng tomon - Ma'lumotlar */}
      <div className="product-info">
        <h1 className="product-title">Havic HV G-92 Gamepad</h1>
        
        <div className="product-rating">
          <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <span className="reviews-count">(150 Reviews)</span>
          <span className="separator">|</span>
          <span className="stock-status">In Stock</span>
        </div>

        <div className="product-price">$192.00</div>
        
        <p className="product-description">
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble free install & mess free removal Pressure
          sensitive.
        </p>

        <hr className="divider" />

        {/* Rang tanlash */}
        <div className="selector-group">
          <span className="selector-label">Colours:</span>
          <div className="color-options">
            {colors.map((c) => (
              <div
                key={c.id}
                className={`color-circle-wrapper ${selectedColor === c.id ? "active" : ""}`}
                onClick={() => setSelectedColor(c.id)}
              >
                <div
                  className="color-circle"
                  style={{ backgroundColor: c.hex }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* O'lcham tanlash */}
        <div className="selector-group">
          <span className="selector-label">Size:</span>
          <div className="size-options">
            {sizes.map((s) => (
              <button
                key={s}
                className={`size-btn ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Harakat tugmalari (Miqdor, Buy Now, Heart) */}
        <div className="action-group">
          <div className="quantity-selector">
            <button className="qty-btn minus" onClick={handleDecrease}>
              <FiMinus />
            </button>
            <span className="qty-value">{quantity}</span>
            <button className="qty-btn plus" onClick={handleIncrease}>
              <FiPlus />
            </button>
          </div>

          <button className="buy-now-btn">Buy Now</button>
          
          <button className="wishlist-btn">
            <FiHeart />
          </button>
        </div>

        {/* Yetkazib berish ma'lumotlari */}
        <div className="delivery-info">
          <div className="delivery-row">
            <TbTruckDelivery className="delivery-icon" />
            <div className="delivery-text">
              <h4>Free Delivery</h4>
              <p><u>Enter your postal code for Delivery Availability</u></p>
            </div>
          </div>
          <div className="delivery-row">
            <TfiReload className="delivery-icon" />
            <div className="delivery-text">
              <h4>Return Delivery</h4>
              <p>Free 30 Days Delivery Returns. <u>Details</u></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;