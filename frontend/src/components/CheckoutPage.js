// src/components/CheckoutPage.js
import React from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart, getCartTotal } = useCart();
  const total = getCartTotal();

  const handleCheckout = async () => {
    try {
      const isDev = process.env.NODE_ENV === "development";

      const return_url = isDev
        ? "http://localhost:3000/checkout-success"
        : "https://yourdomain.com/checkout-success";

      const cancel_url = isDev
        ? "http://localhost:3000/checkout-cancel"
        : "https://yourdomain.com/checkout-cancel";

      // Make request to backend (proxy handles localhost:5000 in dev)
      const response = await axios.post("/api/payfast/pay", {
        amount: total,
        item_name: "Biltong Shop Order",
        return_url,
        cancel_url,
        notify_url: "/api/payfast/notify", // backend will handle
      });

      if (response.data && response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        alert("Payment failed: No redirect URL received.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error initiating payment.");
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "105px" }}>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name} x {item.qty}
                <span>R{(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h4>Total: R{total.toFixed(2)}</h4>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Pay with PayFast
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
