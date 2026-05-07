import React from "react";
import "./Wishlist.css";
import Wishlist_box from "../../components/wishlist_box/Wishlist_box";
import { Button } from "@mui/material";
import Cards1 from "../../components/cardshome1/Cards1";
import Wishlist_box2 from "../../components/wishlist_box2/Wishlist_box2";

function Wishlist() {
  return (
    <div className="wishlist">
      <br />
      <br />
      <div className="flash-sales ">
        <div className="flash-sales__left">
          <h2 className="flash-sales__title">Wishlist</h2>
        </div>

        <div className="flash-sales__nav">
          <div className="home_button2 container">
            <Button variant="contained"> Move All To Bag</Button>
          </div>
        </div>
      </div>
      <Wishlist_box />

 <div className="flash-sales container">
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
      <Wishlist_box2/>

    </div>
  );
}

export default Wishlist;
