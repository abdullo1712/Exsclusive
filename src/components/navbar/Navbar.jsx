import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { PiHeartStraightBold } from "react-icons/pi";
import NavMadal from "../navmadal/NavMadal";
import { useApp } from "../../context/AppContext";

function Navbar() {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const { cartCount, wishlistCount, isLoggedIn } = useApp();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">Exclusive</div>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          {!isLoggedIn && <li><NavLink to="/sign_up">Sign Up</NavLink></li>}
        </ul>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-icon" style={{ background: "none", border: "none", cursor: "pointer" }}>
            <BiSearch />
          </button>
        </form>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="likebutton" style={{ position: "relative" }}>
            <Link to="/wishlist">
              <PiHeartStraightBold />
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </Link>
          </button>
          <button className="shopbutton" style={{ position: "relative" }}>
            <Link to="/cart">
              <FaCartShopping />
              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </Link>
          </button>
          <button className="userbutton" onClick={() => setModal(!modal)}>
            <FaUser />
          </button>
          {modal && <NavMadal onClose={() => setModal(false)} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
