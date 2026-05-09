import React, { useEffect, useState } from "react";
import "./Marquee.css";
import { getCategories, imgUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Marquee1() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Duplicate for seamless scroll
  const items = [...categories, ...categories, ...categories];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((cat, i) => (
          <div
            className="marquee_box"
            key={`${cat.id}-${i}`}
            onClick={() => navigate(`/?category=${cat.id}`)}
          >
            <img src={imgUrl(cat.image)} alt={cat.title} />
            <p>{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee1;
