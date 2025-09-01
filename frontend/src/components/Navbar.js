import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import CartSidebar from "./CartSidebar";
import logo from "../assets/logoSA.png";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#F5F5DC",
          position: "sticky",
          top: 0,
          zIndex: 1000, // ensures navbar stays above content
        }}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Biltong Shop" width="80" height="100" className="me-2" />
            <span style={{ color: "#333", fontWeight: "bold" }}>SA Braai Shop</span>
          </Link>

          {/* Hamburger button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible nav items */}
          <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item"><Link className="nav-link text-dark" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link text-dark" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link text-dark" to="/contact">Contact</Link></li>
             
            </ul>

            {/* Cart button on far right */}
            <button
              className="btn btn-outline-dark position-relative ms-lg-3 mt-2 mt-lg-0"
              onClick={toggleCart}
              style={{ zIndex: 1100 }} // ensures button is above navbar content
            >
              <i className="bi bi-cart-fill"></i>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Navbar;
