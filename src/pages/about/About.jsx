import React from "react";
import "./About.css";

import { IoStorefrontOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi2";
import { TbMoneybag } from "react-icons/tb";
import { RiFacebookLine, RiTwitterLine, RiInstagramLine } from "react-icons/ri";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa6";

function About() {
  return (
    <div className="about container">
      <div className="aboutbox">
        <div className="about_txt">
          <h1>Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img className="aboutimg" src="./imgs/Side.png" alt="" />
      </div>
      <div className="aboutcards">
        <div className="aboutcard">
          <div className="iconcard">
            <div className="miniiconcard">
              <IoStorefrontOutline className="abouticon" />
            </div>
          </div>
          <span>10.5k </span>
          <p>Sallers active our site</p>
        </div>
        <div className="aboutcard">
          <div className="iconcard">
            <div className="miniiconcard">
              <AiOutlineDollarCircle className="abouticon" />
            </div>
          </div>
          <span>133k </span>
          <p>Mopnthly Produduct Sale</p>
        </div>
        <div className="aboutcard">
          <div className="iconcard">
            <div className="miniiconcard">
              <HiShoppingBag className="abouticon" />
            </div>
          </div>
          <span>45.5k</span>
          <p>Customer active in our site</p>
        </div>
        <div className="aboutcard">
          <div className="iconcard">
            <div className="miniiconcard">
              <TbMoneybag className="abouticon" />
            </div>
          </div>
          <span>25k</span>
          <p>Anual gross sale in our site</p>
        </div>
      </div>
      <div className="devs">
        <div className="devscard">
          <div className="devimg">
            <img src="./imgs/odam.png" alt="" />
          </div>
          <h2>Tom Cruise</h2>
          <p>Founder & Chairman</p>
         <ul>
            <li><FaTwitter /></li>
            <li><FaTelegram /></li>
            <li><FaInstagram /></li>
          </ul>
        </div>
        <div className="devscard">
          <div className="devimg">
            <img src="./imgs/odam1.png" alt="" />
          </div>
          <h2>Tom Cruise</h2>
          <p>Founder & Chairman</p>
          <ul>
            <li><FaTwitter /></li>
            <li><FaTelegram /></li>
            <li><FaInstagram /></li>
          </ul>
        </div>
        <div className="devscard">
          <div className="devimg">
            <img src="./imgs/odam2.png" alt="" />
          </div>
          <h2>Tom Cruise</h2>
          <p>Founder & Chairman</p>
          <ul>
            <li><FaTwitter /></li>
            <li><FaTelegram /></li>
            <li><FaInstagram /></li>
          </ul>
        </div>
      </div>

      <div className="services">
        <div className="services_box">
          <img src="./imgs/Services.png" alt="" />
          <h2>FREE AND FAST DELIVERY</h2>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className="services_box">
          <img src="./imgs/Services1.png" alt="" />
          <h2>24/7 CUSTOMER SERVICE</h2>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="services_box">
          <img src="./imgs/Services2.png" alt="" />
          <h2>MONEY BACK GUARANTEE</h2>
          <p>We reurn money within 30 days</p>
        </div>
      </div>
    </div>
  );
}

export default About;
