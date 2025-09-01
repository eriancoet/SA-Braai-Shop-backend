// src/pages/AboutPage.js
import React from "react";
import AboutImage from "../assets/about.jpg"; // single image used

const AboutPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-5 text-center">About SA Braai Shop</h2>

      {/* Centered row with max width */}
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <div className="row align-items-start mb-4">
          {/* Text Column */}
          <div className="col-md-6 d-flex flex-column justify-content-start">
            <h5>Everything Braai</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus
              eget nunc convallis dignissim. Praesent in ligula id quam feugiat tincidunt.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus
              eget nunc convallis dignissim. Praesent in ligula id quam feugiat tincidunt.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus
              eget nunc convallis dignissim. Praesent in ligula id quam feugiat tincidunt.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus
              eget nunc convallis dignissim. Praesent in ligula id quam feugiat tincidunt.
            </p>
          </div>

          {/* Image Column */}
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={AboutImage}
              alt="About"
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
