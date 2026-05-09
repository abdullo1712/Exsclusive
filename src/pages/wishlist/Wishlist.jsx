import React, { useEffect } from "react";
import "./Wishlist.css";
import { Button } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { imgUrl } from "../../api/api";
import Cards1 from "../../components/cardshome1/Cards1";

function Wishlist() {
  const {
    wishlist,
    wishlistLoading,
    handleRemoveFromWishlist,
    handleAddToCart,
    loadWishlist,
    isLoggedIn,
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) loadWishlist();
  }, [isLoggedIn]);

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

  const handleMoveAllToCart = async () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    for (const item of wishlist) {
      const product = item.product || item;
      await handleAddToCart(product.id);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="wishlist" style={{ textAlign: "center", padding: "80px 0" }}>
        <h2>Wishlistni ko'rish uchun tizimga kiring</h2>
        <Link to="/login">
          <button style={{ marginTop: 20, padding: "12px 32px", background: "#db4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            Kirish
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <br />
      <br />
      <div className="flash-sales">
        <div className="flash-sales__left">
          <h2 className="flash-sales__title">Wishlist ({wishlist.length})</h2>
        </div>
        <div className="flash-sales__nav">
          <div className="home_button2 container">
            <Button variant="contained" onClick={handleMoveAllToCart}>
              Move All To Bag
            </Button>
          </div>
        </div>
      </div>

      {wishlistLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
          <div className="loading-spinner-wish"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>
          <p>Wishlist bo'sh</p>
          <Link to="/">
            <button style={{ marginTop: 16, padding: "10px 24px", background: "#db4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
              Mahsulotlarni ko'rish
            </button>
          </Link>
        </div>
      ) : (
        <div className="card1">
          <div className="container">
            {wishlist.map((item) => {
              const product = item.product || item;
              const pics = product.pictures || [];
              const imgSrc =
                pics.length > 0
                  ? imgUrl(typeof pics[0] === "string" ? pics[0] : pics[0]?.file)
                  : "/imgs/odam.png";

              return (
                <div className="carsd_box" key={item.id || product.id}>
                  <div className="box_imgs">
                    <img src={imgSrc} alt={product.title} />
                    <div className="box_button">
                      <div
                        className="like_button"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        title="O'chirish"
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                    <Button
                      className="Addbutton"
                      variant="contained"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add To Cart
                    </Button>
                  </div>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <h3>{product.title}</h3>
                  </Link>
                  <p>
                    {Number(product.discount_price || product.price || 0).toLocaleString()} so'm
                  </p>
                  <div className="stars-row">{renderStars(product.stars)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flash-sales container" style={{ marginTop: 40 }}>
        <div className="flash-sales__left">
          <div className="flash-sales__tag">
            <span className="flash-sales__tag-bar"></span>
            <p>This Month</p>
          </div>
          <h2 className="flash-sales__title">Best Selling Products</h2>
        </div>
        <div className="flash-sales__nav">
          <div className="home_button2 container">
            <Button variant="contained">See All</Button>
          </div>
        </div>
      </div>
      <Cards1 limit={4} />

      <style>{`
        .loading-spinner-wish {
          width: 40px; height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #db4444;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .stars-row {
          display: flex; align-items: center;
          padding: 4px 10px; color: #f1c40f;
          font-size: 16px; gap: 2px;
        }
      `}</style>
    </div>
  );
}

export default Wishlist;
