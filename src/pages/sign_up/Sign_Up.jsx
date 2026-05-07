import React, { useState } from "react";
import "./Sign_Up.css";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";

function Sign_Up() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, password } = form;

    if (!name.trim()) return showToast("Ism kiriting!", "error");
    if (!email.trim())
      return showToast("Email yoki telefon kiriting!", "error");
    if (password.length < 6)
      return showToast(
        "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
        "error",
      );

    // LocalStorage ga saqlash
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const alreadyExists = users.find((u) => u.email === email);
    if (alreadyExists)
      return showToast("Bu email allaqachon ro'yxatdan o'tgan!", "error");

    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showToast(
      `${name}! Ro'yxatdan muvaffaqiyatli o'tdingiz`,
      "success",
    );
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="container sign">
      {/* Toast notification */}
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

      <img src="./imgs/login1.png" alt="" />

      <div className="sign_up">
        <h1>Create an account</h1>
        <p>Enter your details below</p>

        <div className="sing_inputs">
          <div className="input-container">
            <input
              placeholder="Name"
              className="input-field"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <label className="input-label">Name</label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <input
              placeholder="Email or Phone Number"
              className="input-field"
              type="text"
              name="email"
              value={form.email}
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
            <button className="accaunt" onClick={handleSubmit}>
              Create Account
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
