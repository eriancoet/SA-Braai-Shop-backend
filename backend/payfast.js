// backend/payfast.js
import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/pay", (req, res) => {
  const { amount, item_name, return_url, cancel_url, notify_url } = req.body;

  const merchant_id = process.env.PAYFAST_MERCHANT_ID;
  const merchant_key = process.env.PAYFAST_MERCHANT_KEY;

  const data = {
    merchant_id,
    merchant_key,
    return_url,
    cancel_url,
    notify_url,
    amount,
    item_name,
  };

  // Generate signature
  const queryString = Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  const signature = crypto.createHash("md5").update(queryString).digest("hex");

  const paymentUrl = `https://sandbox.payfast.co.za/eng/process?${queryString}&signature=${signature}`;
  res.json({ paymentUrl });
});

export default router;
