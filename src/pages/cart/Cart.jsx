import React, { useEffect } from "react";
import "./Cart.css";
import { useApp } from "../../context/AppContext";
import { imgUrl, addToCart, createOrder } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const { cart, cartLoading, handleRemoveFromCart, loadCart, isLoggedIn } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isLoggedIn) loadCart();
  }, [isLoggedIn]);

  const handleQuantityChange = async (product_id, delta, currentQty) => {
    const newQty = currentQty + delta;
    if (newQty < 1) {
      await handleRemoveFromCart(product_id);
      return;
    }
    try {
      await addToCart({ product_id, quantity: newQty });
      await loadCart();
    } catch {}
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      await createOrder();
      alert("Buyurtma muvaffaqiyatli yaratildi!");
      await loadCart();
    } catch (err) {
      alert(err?.detail || "Xatolik yuz berdi!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="cart_container" style={{ textAlign: "center", padding: "80px 0" }}>
        <h2>Savatni ko'rish uchun tizimga kiring</h2>
        <Link to="/login">
          <button className="cart_checkout_btn" style={{ width: "auto", padding: "12px 32px", marginTop: 20 }}>
            Kirish
          </button>
        </Link>
      </div>
    );
  }

  if (cartLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
        <div className="loading-spinner-cart"></div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="cart_container" style={{ textAlign: "center", padding: "80px 0" }}>
        <h2>Savat bo'sh</h2>
        <Link to="/">
          <button className="cart_checkout_btn" style={{ width: "auto", padding: "12px 32px", marginTop: 20 }}>
            Xarid qilish
          </button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.product?.discount_price || item.product?.price || item.price || 0);
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart_container">
      <div className="cart_header">
        <div className="cart_col">Mahsulot</div>
        <div className="cart_col">Narx</div>
        <div className="cart_col">Miqdor</div>
        <div className="cart_col">Jami</div>
      </div>

      {cart.map((item) => {
        const product = item.product || item;
        const price = parseFloat(product.discount_price || product.price || 0);
        const qty = item.quantity || 1;
        const pics = product.pictures || [];
        const imgSrc =
          pics.length > 0
            ? imgUrl(typeof pics[0] === "string" ? pics[0] : pics[0]?.file)
            : "/imgs/odam.png";

        return (
          <div className="cart_item" key={item.id || product.id}>
            <div className="cart_product">
              <div className="cart_img_wrapper">
                <img src={imgSrc} alt={product.title} />
              </div>
              <div>
                <span className="cart_title">{product.title}</span>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  style={{
                    display: "block",
                    marginTop: 6,
                    background: "none",
                    border: "none",
                    color: "#db4444",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  O'chirish
                </button>
              </div>
            </div>

            <div className="cart_price">{price.toLocaleString()} so'm</div>

            <div className="cart_quantity">
              <button onClick={() => handleQuantityChange(product.id, -1, qty)}>-</button>
              <span>{qty}</span>
              <button onClick={() => handleQuantityChange(product.id, 1, qty)}>+</button>
            </div>

            <div className="cart_subtotal">{(price * qty).toLocaleString()} so'm</div>
          </div>
        );
      })}

      <div className="cart_actions">
        <Link to="/">
          <button className="cart_btn">Xaridni davom ettirish</button>
        </Link>
      </div>

      <div className="cart_bottom">
        <div className="cart_coupon">
          <input type="text" placeholder="Kupon kodi" className="cart_input" />
          <button className="cart_apply_btn">Qo'llash</button>
        </div>

        <div className="cart_total">
          <h3>Savat jami</h3>
          <div className="cart_row">
            <span>Jami:</span>
            <span>{subtotal.toLocaleString()} so'm</span>
          </div>
          <div className="cart_row">
            <span>Yetkazib berish:</span>
            <span>Bepul</span>
          </div>
          <div className="cart_row total">
            <span>Umumiy:</span>
            <span>{subtotal.toLocaleString()} so'm</span>
          </div>
          <button className="cart_checkout_btn" onClick={handleCheckout}>
            Buyurtma berish
          </button>
        </div>
      </div>

      <style>{`
        .loading-spinner-cart {
          width: 50px; height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #db4444;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Cart;
