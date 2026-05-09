import React, { useState } from "react";
import "./Sign_Up.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { registerUser } from "../../api/api";

function Sign_Up() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email_or_phone: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { first_name, last_name, email_or_phone, password } = form;
    if (!first_name.trim()) return showToast("Ism kiriting!", "error");
    if (!last_name.trim()) return showToast("Familiya kiriting!", "error");
    if (!email_or_phone.trim()) return showToast("Email yoki telefon kiriting!", "error");
    if (password.length < 6)
      return showToast("Parol kamida 6 ta belgidan iborat bo'lishi kerak!", "error");

    setLoading(true);
    try {
      await registerUser({ first_name, last_name, email_or_phone, password });
      showToast("Muvaffaqiyatli ro'yxatdan o'tdingiz!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg =
        err?.email_or_phone?.[0] ||
        err?.password?.[0] ||
        err?.first_name?.[0] ||
        err?.detail ||
        "Xatolik yuz berdi!";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container sign">
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 9999,
            padding: "14px 22px",
            borderRadius: "12px",
            background: toast.type === "success" ? "#22c55e" : "#ef4444",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 500,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            animation: "slideIn 0.3s ease",
            maxWidth: "340px",
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

      <img src="/imgs/login1.png" alt="" />

      <div className="sign_up">
        <h1>Create an account</h1>
        <p>Enter your details below</p>

        <div className="sing_inputs">
          <div className="input-container">
            <input
              placeholder="First Name"
              className="input-field"
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
            <label className="input-label">First Name</label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <input
              placeholder="Last Name"
              className="input-field"
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
            <label className="input-label">Last Name</label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <input
              placeholder="Email or Phone Number"
              className="input-field"
              type="text"
              name="email_or_phone"
              value={form.email_or_phone}
              onChange={handleChange}
            />
            <label className="input-label">Email or Phone Number</label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container" style={{ position: "relative" }}>
            <input
              placeholder="Password"
              className="input-field"
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <label className="input-label">Password</label>
            <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
              {showPass ? <MdRemoveRedEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <div className="signbutton">
            <button className="accaunt" onClick={handleSubmit} disabled={loading}>
              {loading ? "Yuklanmoqda..." : "Create Account"}
            </button>
            <button className="withgoogle">
              <FcGoogle className="googleicon" />
              Sign up with Google
            </button>
          </div>
        </div>

        <div className="already">
          <p>
            Already have account?{" "}
            <NavLink to="/login" title="Login">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sign_Up;
