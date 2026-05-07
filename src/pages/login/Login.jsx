import React, { useState } from "react";
import "./Login.css";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const { email, password } = form;

    if (!email.trim())
      return showToast("Email yoki telefon kiriting!", "error");
    if (!password.trim()) return showToast("Parolni kiriting!", "error");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) return showToast("Email yoki parol noto'g'ri!", "error");

    showToast(`Xush kelibsiz, ${user.name}! `, "success");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container login">
      {/* Toast */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            padding: "14px 22px",
            borderRadius: 12,
            background: toast.type === "success" ? "#22c55e" : "#ef4444",
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            animation: "slideIn 0.3s ease",
            maxWidth: 340,
          }}
        >
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <img className="login__image" src="./imgs/login1.png" alt="" />

      <div className="login__form">
        <h1 className="login__title">Log in to Exclusive</h1>
        <p className="login__subtitle">Enter your details below</p>

        <div className="login__inputs">
          <div className="login__input-group">
            <input
              placeholder="Email or Phone Number"
              className="login__input"
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <label className="login__label">Enter email or phone number</label>
            <span className="login__underline"></span>
          </div>

          <div className="login__input-group" style={{ position: "relative" }}>
            <input
              placeholder="Password"
              className="login__input"
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <label className="login__label">Enter password</label>
            <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
              {showPass ? <MdRemoveRedEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <div className="login__actions">
            <button className="login__button" onClick={handleLogin}>
              Log In
            </button>
            <p className="login__forgot">Forget Password?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
