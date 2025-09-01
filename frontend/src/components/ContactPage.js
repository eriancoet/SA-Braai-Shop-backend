// src/pages/ContactPage.js
import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaHome } from "react-icons/fa";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await axios.post("/api/contact", form);
      if (response.data.success) {
        setStatus({ loading: false, success: response.data.msg, error: null });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ loading: false, success: null, error: response.data.error });
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({ loading: false, success: null, error: "Failed to send message." });
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Contact Us</h2>
      <div className="row g-4">
        {/* Contact Form Column */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Send us a message</h4>

            {status.success && <div className="alert alert-success">{status.success}</div>}
            {status.error && <div className="alert alert-danger">{status.error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={status.loading}>
                {status.loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Our Contact Information</h4>
            <p className="d-flex align-items-center mb-2">
              <FaPhone className="me-2 text-primary" /> +27 079 9533 275
            </p>
            <p className="d-flex align-items-center mb-2">
              <FaHome className="me-2 text-primary" /> 75 Nelson Street, Sabie, South Africa
            </p>
            <p className="mt-3">
              We are here to answer any questions you have. Reach out to us via the form or using the contact info above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
