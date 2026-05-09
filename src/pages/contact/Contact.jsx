import React, { useState } from "react";
import "./Contact.css";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-page">
      <p className="contact-breadcrumb">
        Home / <span>Contact</span>
      </p>

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
            <p>customer@exclusive.com</p>
            <p>support@exclusive.com</p>
          </div>
        </div>

        {/* RIGHT */}
        <form className="contact-right" onSubmit={handleSubmit}>
          <div className="inputs-row">
            <input
              type="text"
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Your Phone *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          {sent && (
            <p style={{ color: "#22c55e", fontSize: 14, fontWeight: 500 }}>
              ✓ Xabaringiz yuborildi!
            </p>
          )}

          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
