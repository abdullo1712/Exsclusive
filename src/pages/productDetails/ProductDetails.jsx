import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { FaStar } from "react-icons/fa";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { CiStar } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductDetail,
  getProductReviews,
  submitReview,
  imgUrl,
} from "../../api/api";
import { useApp } from "../../context/AppContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart, handleAddToWishlist, isInWishlist, isLoggedIn } = useApp();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Review form
  const [reviewForm, setReviewForm] = useState({ stars: 5, comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
  };

  useEffect(() => {
    const productId = id || 1;
    setLoading(true);
    Promise.all([
      getProductDetail(productId),
      getProductReviews(productId).catch(() => []),
    ])
      .then(([prod, revs]) => {
        setProduct(prod);
        setReviews(Array.isArray(revs) ? revs : []);
        if (prod.properties?.size?.length) setSelectedSize(prod.properties.size[0]);
        if (prod.properties?.color?.length) setSelectedColor(prod.properties.color[0]);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCart = async () => {
    if (!isLoggedIn) {
      showToast("Iltimos avval tizimga kiring!", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    const res = await handleAddToCart(product.id, quantity);
    if (res?.success) showToast("Savatga qo'shildi!", "success");
    else showToast("Xatolik yuz berdi!", "error");
  };

  const handleWishlist = async () => {
    if (!isLoggedIn) {
      showToast("Iltimos avval tizimga kiring!", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    const res = await handleAddToWishlist(product.id);
    if (res?.success) showToast("Wishlistga qo'shildi!", "success");
  };

  const handleReviewSubmit = async () => {
    if (!isLoggedIn) {
      showToast("Sharh qoldirish uchun tizimga kiring!", "error");
      return;
    }
    if (!reviewForm.comment.trim()) {
      showToast("Sharh matnini kiriting!", "error");
      return;
    }
    setReviewLoading(true);
    try {
      await submitReview({
        product_id: product.id,
        stars: reviewForm.stars,
        comment: reviewForm.comment,
      });
      showToast("Sharh qo'shildi!", "success");
      setReviewForm({ stars: 5, comment: "" });
      const revs = await getProductReviews(product.id).catch(() => []);
      setReviews(Array.isArray(revs) ? revs : []);
    } catch (err) {
      showToast(err?.detail || "Xatolik yuz berdi!", "error");
    } finally {
      setReviewLoading(false);
    }
  };

  const renderStars = (count) =>
    Array(5)
      .fill(0)
      .map((_, i) =>
        i < count ? (
          <FaStar key={i} style={{ color: "#ffad33" }} />
        ) : (
          <CiStar key={i} style={{ color: "#ffad33" }} />
        )
      );

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
        <div className="loading-spinner-lg"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <h2>Mahsulot topilmadi</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: 20, padding: "10px 24px", background: "#db4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  const pictures = product.pictures || [];
  const currentImg =
    pictures.length > 0
      ? imgUrl(typeof pictures[mainImg] === "string" ? pictures[mainImg] : pictures[mainImg]?.file)
      : "/imgs/odam.png";

  const inWish = isInWishlist(product.id);

  return (
    <div>
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

      <div className="product-container">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="thumbnails">
            {pictures.map((pic, index) => {
              const src = imgUrl(typeof pic === "string" ? pic : pic?.file);
              return (
                <div
                  className={`thumb-box ${mainImg === index ? "active-thumb" : ""}`}
                  key={index}
                  onClick={() => setMainImg(index)}
                >
                  <img src={src} alt={`thumb-${index}`} />
                </div>
              );
            })}
          </div>
          <div className="main-image">
            <img src={currentImg} alt={product.title} />
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-rating">
            <div className="stars">{renderStars(Math.round(product.stars || 0))}</div>
            <span className="reviews-count">({product.review_quantity} Reviews)</span>
            <span className="separator">|</span>
            <span className="stock-status">
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="product-price">
            {product.discount_price !== product.price ? (
              <>
                <span style={{ color: "#db4444" }}>
                  {Number(product.discount_price).toLocaleString()} so'm
                </span>{" "}
                <span
                  style={{
                    color: "#aaa",
                    textDecoration: "line-through",
                    fontSize: "18px",
                    fontWeight: "normal",
                  }}
                >
                  {Number(product.price).toLocaleString()} so'm
                </span>
              </>
            ) : (
              <span>{Number(product.price).toLocaleString()} so'm</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <hr className="divider" />

          {/* Colors */}
          {product.properties?.color?.length > 0 && (
            <div className="selector-group">
              <span className="selector-label">Rang:</span>
              <div className="color-options">
                {product.properties.color.map((c) => (
                  <div
                    key={c}
                    className={`color-circle-wrapper ${selectedColor === c ? "active" : ""}`}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                  >
                    <div
                      className="color-circle"
                      style={{ backgroundColor: c }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.properties?.size?.length > 0 && (
            <div className="selector-group">
              <span className="selector-label">O'lcham:</span>
              <div className="size-options">
                {product.properties.size.map((s) => (
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
          )}

          {/* Actions */}
          <div className="action-group">
            <div className="quantity-selector">
              <button
                className="qty-btn minus"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <FiMinus />
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn plus"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <FiPlus />
              </button>
            </div>

            <button className="buy-now-btn" onClick={handleCart}>
              Buy Now
            </button>

            <button
              className="wishlist-btn"
              onClick={handleWishlist}
              style={{ color: inWish ? "#db4444" : "inherit" }}
            >
              <FiHeart />
            </button>
          </div>

          {/* Delivery */}
          <div className="delivery-info">
            <div className="delivery-row">
              <TbTruckDelivery className="delivery-icon" />
              <div className="delivery-text">
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="delivery-row">
              <TfiReload className="delivery-icon" />
              <div className="delivery-text">
                <h4>Return Delivery</h4>
                <p>Free 30 Days Delivery Returns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section container">
        <h3 className="reviews-title">Sharhlar ({reviews.length})</h3>

        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((rev, i) => (
              <div className="review-card" key={i}>
                <div className="review-header">
                  <strong>{rev.user?.first_name || rev.user || "Foydalanuvchi"}</strong>
                  <div className="stars" style={{ display: "flex", gap: 2 }}>
                    {renderStars(rev.stars || 0)}
                  </div>
                </div>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#888", marginBottom: 20 }}>Hali sharh yo'q</p>
        )}

        {/* Submit Review */}
        {isLoggedIn && (
          <div className="review-form">
            <h4>Sharh qoldiring</h4>
            <div className="star-select">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  onClick={() => setReviewForm((f) => ({ ...f, stars: s }))}
                  style={{
                    cursor: "pointer",
                    fontSize: 24,
                    color: s <= reviewForm.stars ? "#ffad33" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Sharhingizni yozing..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
              className="review-textarea"
            />
            <button
              className="review-submit-btn"
              onClick={handleReviewSubmit}
              disabled={reviewLoading}
            >
              {reviewLoading ? "Yuborilmoqda..." : "Sharh yuborish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
