import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-5">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} SA Braai Shop. All rights reserved.</p>
        <p>
          <a href="mailto:contact@biltongshop.com" className="text-light">eriancoet@gmail.com</a> | 
          <a href="tel:+27831234567" className="text-light ms-2">+27 83 123 4567</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
