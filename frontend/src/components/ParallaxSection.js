// src/components/ParallaxSection.js
import React from "react";
import ParallaxImg from "../assets/about.jpg"; // replace with your image

const ParallaxSection = () => {
  return (
    <div
      className="parallax-section text-center text-white d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${ParallaxImg})`,
        height: "600px",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
     {/* Rounded rectangle for text */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // semi-transparent black
          padding: "30px 40px",
          borderRadius: "15px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 className="fw-bold">About SA Braai Shop</h2>
        <p style={{ maxWidth: "500px", margin: "0 auto" }}>
          We are a local braai and biltong shop situated in the Lowveld, Mpumalanga and have lots of tasty goods.
        </p>
      </div>
    </div>
  );
};

export default ParallaxSection;

