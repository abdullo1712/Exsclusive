import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { PiHeartStraightBold } from "react-icons/pi";
import NavMadal from "../navmadal/NavMadal";

function Navbar() {
  const [madal, setmadal] = useState(false);

  return (
    <nav>
      <div className="container">
        <div className="logo">E x c l u s i v e</div>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/sign_up">Sign Up</NavLink></li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search-input"
          />
          <div className="search-icon">
            <BiSearch />
          </div>
        </div>
        <div>
          <button className="likebutton">
           <Link to={"/wishlist"}><PiHeartStraightBold /></Link> 
          </button>
          <button className="shopbutton">
           
            <Link to={"/cart"}>  <FaCartShopping /></Link>
          </button>
          <button className="userbutton" onClick={() => setmadal(!madal)}>
            <FaUser />
          </button>
          {madal && <NavMadal />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;