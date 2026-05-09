import React, { useRef, useEffect } from "react";
import "./NavMadal.css";
import { AiOutlineUser } from "react-icons/ai";
import { BiArchive, BiLogOut, BiLogIn } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

function NavMadal({ onClose }) {
  const { isLoggedIn, logout } = useApp();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const go = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/login");
  };

  return (
    <div className="navmadal container" ref={ref}>
      <div className="navmadal_box">
        {isLoggedIn ? (
          <>
            <span><AiOutlineUser /></span>
            <p onClick={() => go("/profile")}>Mening Profilim</p>
            <span><BiArchive /></span>
            <p onClick={() => go("/orders")}>Buyurtmalarim</p>
            <span><FaRegStar /></span>
            <p onClick={() => go("/wishlist")}>Wishlist</p>
            <span><BiLogOut /></span>
            <p onClick={handleLogout}>Chiqish</p>
          </>
        ) : (
          <>
            <span><BiLogIn /></span>
            <p onClick={() => go("/login")}>Kirish</p>
            <span><AiOutlineUser /></span>
            <p onClick={() => go("/sign_up")}>Ro'yxatdan o'tish</p>
          </>
        )}
      </div>
    </div>
  );
}

export default NavMadal;
