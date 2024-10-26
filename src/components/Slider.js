import React, { useEffect, useState } from "react";
import "./Slider.css";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    "../assets/m1.png",
    "../assets/m2.png",
    "../assets/m3.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="slider">
      <div className="slide-container">
        {slides.map((src, index) => (
          <div key={index} className={`slide ${index === slideIndex ? "fade" : ""}`} style={{ display: index === slideIndex ? "block" : "none" }}>
            <img src={src} alt={`App Screenshot ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slider;
