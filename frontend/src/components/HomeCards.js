// src/components/HomeCards.js
import React from "react";

// import images from assets
import BiltongImg from "../assets/biltong.jpg";
import BraaivleisImg from "../assets/meat.jpg";
import EverythingBraaiImg from "../assets/braai.jpg";

const cards = [
  {
    title: "Biltong",
    description: "Buy some traditional biltong, cured to perfection.",
    image: BiltongImg,
  },
  {
    title: "Braaivleis",
    description: "We have a variety of meats, all locally produced.",
    image: BraaivleisImg,
  },
  {
    title: "Everything Braai",
    description: "From tongs to braais, everything you need for your braai.",
    image: EverythingBraaiImg,
  },
];

const HomeCards = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Our Categories</h2>
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={card.image}
                className="card-img-top"
                alt={card.title}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
