import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import CheckoutPage from "./components/CheckoutPage";
import Footer from "./components/Footer";
import CheckoutSuccessPage from "./components/CheckoutSuccessPage";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
            <Footer />
    </>
  );
}

export default App;
