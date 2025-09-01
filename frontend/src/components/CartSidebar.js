import React from "react";
import { useCart } from "../context/CartContext";
import "./CartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h4>Shopping Cart</h4>
<button className="btn-close" onClick={onClose}></button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">R{(item.price).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => decreaseQty(item.id)}>-</button>
                    <span className="qty">{item.qty}</span>
                    <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <p className="total">Total: <span>R{total.toFixed(2)}</span></p>
              <button className="checkout-btn" onClick={() => window.location.href='/checkout'}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
