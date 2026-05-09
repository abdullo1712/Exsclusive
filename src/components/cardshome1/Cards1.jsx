import React, { useEffect, useState } from "react";
import "./Cards1.css";
import Button from "@mui/material/Button";
import { CiStar } from "react-icons/ci";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, imgUrl } from "../../api/api";
import { useApp } from "../../context/AppContext";

function Cards1({ limit, categoryId, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleAddToCart, handleAddToWishlist, isInWishlist, isLoggedIn } = useApp();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
  };

  useEffect(() => {
    getProducts()
      .then((data) => {
        let filtered = data;
        if (categoryId) {
          filtered = data.filter((p) => p.category?.id === categoryId);
        }
        if (searchQuery) {
          filtered = data.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(limit ? filtered.slice(0, limit) : filtered);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [limit, categoryId, searchQuery]);

  const handleCart = async (product_id) => {
    if (!isLoggedIn) {
      showToast("Iltimos avval tizimga kiring!", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    const res = await handleAddToCart(product_id);
    if (res?.success) showToast("Savatga qo'shildi!", "success");
    else if (res?.needLogin) {
      showToast("Iltimos avval tizimga kiring!", "error");
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  const handleWishlist = async (product_id) => {
    if (!isLoggedIn) {
      showToast("Iltimos avval tizimga kiring!", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    const res = await handleAddToWishlist(product_id);
    if (res?.success) showToast("Wishlistga qo'shildi!", "success");
  };

  const renderStars = (stars) => {
    const full = Math.floor(stars || 0);
    const empty = 5 - full;
    return (
      <>
        {Array(full).fill(0).map((_, i) => <FaStar key={`f${i}`} />)}
        {Array(empty).fill(0).map((_, i) => <CiStar key={`e${i}`} />)}
      </>
    );
  };

  if (loading) {
    return (
      <div className="card1">
        <div className="container" style={{ justifyContent: "center", padding: "40px 0" }}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="card1">
        <div className="container" style={{ justifyContent: "center", padding: "40px 0" }}>
          <p style={{ color: "#888" }}>Mahsulotlar topilmadi</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            padding: "12px 20px",
            borderRadius: 10,
            background: toast.type === "success" ? "#22c55e" : "#ef4444",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          {toast.message}
        </div>
      )}
      <div className="card1">
        <div className="container">
          {products.map((product) => {
            const mainImg = product.pictures?.[0];
            const imgSrc = typeof mainImg === "string" ? imgUrl(mainImg) : imgUrl(mainImg?.file);
            const inWish = isInWishlist(product.id);

            return (
              <div className="carsd_box" key={product.id}>
                <div className="box_imgs">
                  <img src={imgSrc} alt={product.title} />
                  <div className="box_button">
                    <div
                      className="like_button"
                      onClick={() => handleWishlist(product.id)}
                      style={{ color: inWish ? "#db4444" : "black" }}
                    >
                      {inWish ? <PiHeartStraightFill /> : <PiHeartStraightBold />}
                    </div>
                    <div className="eye_button">
                      <Link to={`/product/${product.id}`}>
                        <IoEye />
                      </Link>
                    </div>
                  </div>
                  <Button
                    className="Addbutton"
                    variant="contained"
                    onClick={() => handleCart(product.id)}
                  >
                    Add To Cart
                  </Button>
                </div>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                  <h3>{product.title}</h3>
                </Link>
                <p>
                  {product.discount_price !== product.price ? (
                    <>
                      <span style={{ color: "#db4444" }}>
                        {Number(product.discount_price).toLocaleString()} so'm
                      </span>{" "}
                      <span
                        style={{
                          color: "#aaa",
                          textDecoration: "line-through",
                          fontSize: "0.9rem",
                          fontWeight: "normal",
                        }}
                      >
                        {Number(product.price).toLocaleString()} so'm
                      </span>
                    </>
                  ) : (
                    <span>{Number(product.price).toLocaleString()} so'm</span>
                  )}
                </p>
                <div className="stars-row">{renderStars(product.stars)}</div>
                <span className="review-count">({product.review_quantity} ta sharh)</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cards1;
