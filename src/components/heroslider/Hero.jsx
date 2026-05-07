import React from "react";
import "./Hero.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AiOutlineRight } from "react-icons/ai";

function Hero() {
  return (
    <div className="hero">
      <div class="container">
        <div class="item">
        <ul>
          <li>Woman’s Fashion  <span> <AiOutlineRight />  </span></li>
          <li>Men’s Fashion <span> <AiOutlineRight />  </span></li>
          <li>Electronics</li>
          <li>Home & Lifestyle</li>
          <li>Medicine</li>
          <li>Sports & Outdoor</li>
          <li>Baby’s & Toys</li>
          <li>Groceries & Pets</li>
          <li>Health & Beauty</li>
        </ul>
        </div>
        <div class="item">
         
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgs/market.png" alt="" /></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Hero;
