import React, { useEffect, useState } from "react";
import "./Home.css";
import { CiInstagram } from "react-icons/ci";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import Hero from "../../components/heroslider/Hero";
import Cards1 from "../../components/cardshome1/Cards1";
import Marquee from "../../components/marquee/Marquee1";

function Home() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 1,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="home">
      <Hero />
      <div className="flash-sales ">
        <div className="flash-sales__left">
          <div className="flash-sales__tag">
            <span className="flash-sales__tag-bar"></span>
            <p>Today's</p>
          </div>
          <h2 className="flash-sales__title">Flash Sales</h2>
        </div>

        <div className="flash-sales__countdown">
          <div className="flash-sales__unit">
            <span className="flash-sales__label">Days</span>
            <span className="flash-sales__number">{pad(time.days)}</span>
          </div>
          <span className="flash-sales__colon">:</span>

          <div className="flash-sales__unit">
            <span className="flash-sales__label">Hours</span>
            <span className="flash-sales__number">{pad(time.hours)}</span>
          </div>
          <span className="flash-sales__colon">:</span>

          <div className="flash-sales__unit">
            <span className="flash-sales__label">Minutes</span>
            <span className="flash-sales__number">{pad(time.minutes)}</span>
          </div>
          <span className="flash-sales__colon">:</span>

          <div className="flash-sales__unit">
            <span className="flash-sales__label">Seconds</span>
            <span className="flash-sales__number">{pad(time.seconds)}</span>
          </div>
        </div>

        <div className="flash-sales__nav">
          <button className="flash-sales__nav-btn" aria-label="Previous">
            <AiOutlineArrowLeft />
          </button>
          <button className="flash-sales__nav-btn" aria-label="Next">
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
      <Cards1 />

      <div className="home_button container">
        <Button variant="contained">View All Products</Button>
      </div>

      <div className="flash-sales container">
        <div className="flash-sales__left">
          <div className="flash-sales__tag">
            <span className="flash-sales__tag-bar"></span>
            <p>Categories</p>
          </div>
          <h2 className="flash-sales__title">Browse By Category</h2>
        </div>

        {/* <div className="flash-sales__nav">
          <button className="flash-sales__nav-btn" aria-label="Previous">
            <AiOutlineArrowLeft />
          </button>
          <button className="flash-sales__nav-btn" aria-label="Next">
            <AiOutlineArrowRight />
          </button>
        </div> */}
      </div>

      <Marquee />

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
            <Button variant="contained">View All</Button>
          </div>
        </div>
      </div>
      <Cards1 />

      <div className="jbu_reklama">
        <div className="container">
          <div className="ong">
            <h4>Categories</h4>
            <h2>Enhance Your Music Experience</h2>
            <div className="soat">
              <div className="raqam">
                <b>23</b>
                <p>Hours</p>
              </div>
              <div className="raqam">
                <b>05</b>
                <p>Days</p>
              </div>
              <div className="raqam">
                <b>59</b>
                <p>Minutes</p>
              </div>
              <div className="raqam">
                <b>35</b>
                <p>Seconds</p>
              </div>
            </div>
            <button>Buy Now!</button>
          </div>
          <div className="jbuimgs">
            <img src="/imgs/jbu.png" alt="" />
          </div>
        </div>
      </div>

      <div className="flash-sales container">
        <div className="flash-sales__left">
          <div className="flash-sales__tag">
            <span className="flash-sales__tag-bar"></span>
            <p>Our Products</p>
          </div>
          <h2 className="flash-sales__title">Explore Our Products</h2>
        </div>

        <div className="flash-sales__nav">
          <button className="flash-sales__nav-btn" aria-label="Previous">
            <AiOutlineArrowLeft />
          </button>
          <button className="flash-sales__nav-btn" aria-label="Next">
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
      <Cards1 />

      <Cards1 />

      <div className="home_button">
        <div className="container">
          <Button variant="contained">View All Products</Button>
        </div>
      </div>

      <div className="flash-sales container">
        <div className="flash-sales__left">
          <div className="flash-sales__tag">
            <span className="flash-sales__tag-bar"></span>
            <p>Featured</p>
          </div>
          <h2 className="flash-sales__title">New Arrival</h2>
        </div>
      </div>
      <br />
      <br />

      <div className="arrival container">
        <div className="arr_left">
          <div className="arrimg">
            <img src="/imgs/Frame 684.png" alt="" />
          </div>
          <div className="arrivaltxt">
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <a href="">Shop Now</a>
          </div>
        </div>

        <div className="arr_right">
          <div className="top">
            <div className="arrimg">
              <img src="/imgs/Frame 685.png" alt="" />
            </div>
            <div className="arrivaltxt">
              <h3>PlayStation 5</h3>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <a href="">Shop Now</a>
            </div>
          </div>

          <div className="bottomn">
            <div className="carddd">
              <div className="arrimg">
                <img alt="" src="/imgs/Frame 686.png" />
              </div>
              <div className="arrivaltxt">
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <a href="">Shop Now</a>
              </div>
            </div>

            <div className="carddd">
              <div className="arrimg">
                <img alt="" src="/imgs/Frame 687.png" />
              </div>
              <div className="arrivaltxt">
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <a href="">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

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

export default Home;
