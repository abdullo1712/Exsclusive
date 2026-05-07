import React from 'react'
import './Footer.css'

function Footer() {
  return (
   <footer className="footer">
      <div className="footer_container">
        <div className="footer_col">
          <h3>Exclusive</h3>
          <h4>Subscribe</h4>
          <p>Get 10% off your first order</p>

          <div className="subscribe">
            <input type="email" placeholder="Enter your email" />
            <button><img src="./imgs/Vector.png" alt="" /></button>
          </div>
        </div>

        <div className="footer_col">
          <h4>Support</h4>
          <p>
            111 Bijoy sarani, Dhaka,
            <br />
            DH 1515, Bangladesh.
          </p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div className="footer_col">
          <h4>Account</h4>
          <ul>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div className="footer_col">
          <h4>Quick Link</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer_col">
          <h4>Download App</h4>
          <p className="small">Save $3 with App New User Only</p>

          <div className="app_box">
            <img src="/imgs/Qrcode.png" alt="qr" />

            <div className="stores">
              <img src="/imgs/playmerket.png" alt="" />
              <img src="/imgs/appmarket.png" alt="" />
            </div>
          </div>

          <div className="socials">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  )
}

export default Footer