import React from "react";
import './Washlist_box.css';
import { PiHeartStraightBold } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaStar, FaStarOfDavid } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

function Wishlist_box() {
  return (
    <div className="card1">
      <div className="container">
        
        <div className="carsd_box">
          <div className="box_imgs">
            <img src="/imgs/odam.png" alt="" />
            <div className="box_button">
              <div className="like_button">
                <RiDeleteBin6Line />
              </div>
              
            </div>

            <Button className="Addbutton" variant="contained">
              Add To Cart
            </Button>
          </div>
          <h3>mahsulot</h3>
          <p>narx: 10$</p>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
        </div>
         <div className="carsd_box">
          <div className="box_imgs">
            <img src="/imgs/odam.png" alt="" />
            <div className="box_button">
              <div className="like_button">
                <RiDeleteBin6Line />
              </div>
              
            </div>

            <Button className="Addbutton" variant="contained">
              Add To Cart
            </Button>
          </div>
          <h3>mahsulot</h3>
          <p>narx: 10$</p>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
        </div>
         <div className="carsd_box">
          <div className="box_imgs">
            <img src="/imgs/odam.png" alt="" />
            <div className="box_button">
              <div className="like_button">
                <RiDeleteBin6Line />
              </div>
              
            </div>

            <Button className="Addbutton" variant="contained">
              Add To Cart
            </Button>
          </div>
          <h3>mahsulot</h3>
          <p>narx: 10$</p>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
        </div>
         <div className="carsd_box">
          <div className="box_imgs">
            <img src="/imgs/odam.png" alt="" />
            <div className="box_button">
              <div className="like_button">
                <RiDeleteBin6Line />
              </div>
              
            </div>

            <Button className="Addbutton" variant="contained">
              Add To Cart
            </Button>
          </div>
          <h3>mahsulot</h3>
          <p>narx: 10$</p>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <FaStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
        </div>
       
      </div>
    </div>
  );
}

export default Wishlist_box;
