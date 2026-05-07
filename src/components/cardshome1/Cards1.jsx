import React from "react";
import "./Cards1.css";
import Button from "@mui/material/Button";
import { CiStar } from "react-icons/ci";
import { PiHeartStraightBold } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Cards1() {
  return (
    <div className="card1">
      <div className="container">
        <div className="carsd_box">
          <div className="box_imgs">
            <img src="/imgs/odam.png" alt="" />
            <div className="box_button">
              <div className="like_button">
                <PiHeartStraightBold />
              </div>
              <div className="eye_button">
               
                <Link to={"/productDetails"}>  <IoEye /> </Link>
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
                <PiHeartStraightBold />
              </div>
              <div className="eye_button">
              <Link to={"/productDetails"}>  <IoEye /> </Link>
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
                <PiHeartStraightBold />
              </div>
              <div className="eye_button">
                 <Link to={"/productDetails"}>  <IoEye /> </Link>
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
                <PiHeartStraightBold />
              </div>
              <div className="eye_button">
                <Link to={"/productDetails"}>  <IoEye /> </Link>
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

export default Cards1;
