import React, { useEffect, useState } from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import "./Slideshow.css";

const slides = [img1, img2, img3];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-wrapper">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`slide ${index === current ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
