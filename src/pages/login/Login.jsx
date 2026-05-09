import React, { useState } from "react";
import "./Login.css";
import { MdRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate, NavLink } from "react-router-dom";
import { loginUser } from "../../api/api";
import { useApp } from "../../context/AppContext";

function Login() {
  const [form, setForm] = useState({ email_or_phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const { onLoginSuccess } = useApp();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email_or_phone, password } = form;
    if (!email_or_phone.trim()) return showToast("Email yoki telefon kiriting!", "error");
    if (!password.trim()) return showToast("Parolni kiriting!", "error");

    setLoading(true);
    try {
      await loginUser({ email_or_phone, password });
      await onLoginSuccess();
      showToast("Xush kelibsiz!", "success");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const msg =
        err?.detail ||
        err?.non_field_errors?.[0] ||
        err?.email_or_phone?.[0] ||
        "Email yoki parol noto'g'ri!";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login">
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

      <img className="login__image" src="/imgs/login1.png" alt="" />

      <div className="login__form">
        <h1 className="login__title">Log in to Exclusive</h1>
        <p className="login__subtitle">Enter your details below</p>

        <div className="login__inputs">
          <div className="login__input-group">
            <input
              placeholder="Email or Phone Number"
              className="login__input"
              type="text"
              name="email_or_phone"
              value={form.email_or_phone}
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
            <button className="login__button" onClick={handleLogin} disabled={loading}>
              {loading ? "Kirish..." : "Log In"}
            </button>
            <p className="login__forgot">Forget Password?</p>
          </div>

          <div className="already" style={{ marginTop: 20 }}>
            <p>
              Akkaunt yo'qmi?{" "}
              <NavLink to="/sign_up">Ro'yxatdan o'tish</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
