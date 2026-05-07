import React from "react";
import "./Contact.css";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";

function Contact() {
  return (
    <div >
      <br />
      <br />
      <br />
      <br />
      <div className="contact container">
        <div className="contact-container">
          {/* LEFT */}
          <div className="contact-left">
            <div className="contact-box">
              <div className="icon">
               <IoCallOutline />
              </div>
              <h3>Call To Us</h3>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>

            <div className="divider"></div>

            <div className="contact-box">
              <div className="icon">
               <AiOutlineMail />
              </div>
              <h3>Write To Us</h3>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-right">
            <div className="inputs-row">
              <input type="text" placeholder="Your Name *" />
              <input type="email" placeholder="Your Email *" />
              <input type="text" placeholder="Your Phone *" />
            </div>

            <textarea placeholder="Your Message"></textarea>

            <button className="send-btn">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
