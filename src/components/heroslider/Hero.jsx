import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AiOutlineRight } from "react-icons/ai";
import { getCategories, imgUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";

const SLIDES = [
  "/imgs/market.png",
  "/imgs/Frame 684.png",
  "/imgs/Frame 685.png",
];

function Hero() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <div className="item">
          <ul>
            {categories.length > 0
              ? categories.map((cat) => (
                  <li key={cat.id} onClick={() => navigate(`/?category=${cat.id}`)}>
                    {cat.title}
                    <span><AiOutlineRight /></span>
                  </li>
                ))
              : [
                  "Woman's Fashion",
                  "Men's Fashion",
                  "Electronics",
                  "Home & Lifestyle",
                  "Medicine",
                  "Sports & Outdoor",
                  "Baby's & Toys",
                  "Groceries & Pets",
                  "Health & Beauty",
                ].map((name) => (
                  <li key={name}>
                    {name}
                    <span><AiOutlineRight /></span>
                  </li>
                ))}
          </ul>
        </div>
        <div className="item">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {SLIDES.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src} alt={`slide-${i}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Hero;
