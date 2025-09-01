import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Slideshow from "./Slideshow";
import HomeCards from "./HomeCards";
import ParallaxSection from "./ParallaxSection";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("/api/products") // <-- proxy handles localhost:5000
      .then(res => {
        console.log("Products fetched:", res.data);
        setProducts(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <Slideshow />
      <HomeCards />
      <ParallaxSection />
      <div className="container mt-4">
        <h2>Products</h2>
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">R{product.price.toFixed(2)}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
