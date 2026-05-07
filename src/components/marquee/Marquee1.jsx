import React from "react";
import "./Marquee.css";
// import Marquee from "react-fast-marquee";

function Marquee1() {
  return (
    <marquee
      width="100%"
      direction="left"
      behavior="smooth"
      scrollAmount="10"
      className="maquesla"
      onMouseOver={(e) => e.currentTarget.stop()}
      onMouseOut={(e) => e.currentTarget.start()}
    >
      <div className="marquerslarrow">
        <div className="marquee_box">
          <img src="/imgs/marquee.png" alt="" />
          <p>salom</p>
        </div>
        <div className="marquee_box">
          <img src="/imgs/marquee.png" alt="" />
          <p>salom</p>
        </div>
        <div className="marquee_box">
          <img src="/imgs/marquee.png" alt="" />
          <p>salom</p>
        </div>
        <div className="marquee_box">
          <img src="/imgs/marquee.png" alt="" />
          <p>salom</p>
        </div>
        <div className="marquee_box">
          <img src="/imgs/marquee.png" alt="" />
          <p>salom</p>
        </div>
        <div className="marquee_box">
          <img src="/imgs/marquee.png" alt="" />
          <p>salom</p>
        </div>
      </div>
    </marquee>
  );
}

export default Marquee1;
