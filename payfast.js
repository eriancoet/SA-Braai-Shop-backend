// backend/payfast.js
import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/pay", (req, res) => {
  const { amount, item_name, return_url, cancel_url, notify_url } = req.body;

  const merchant_id = process.env.PAYFAST_MERCHANT_ID;
  const merchant_key = process.env.PAYFAST_MERCHANT_KEY;
  const passphrase = process.env.PAYFAST_PASSPHRASE;

  const data = {
    merchant_id,
    merchant_key,
    return_url,
    cancel_url,
    notify_url,
    amount,
    item_name,
  };

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value)
  );

  const sortedKeys = [
    "merchant_id",
    "merchant_key",
    "return_url",
    "cancel_url",
    "notify_url",
    "amount",
    "item_name",
  ];
let queryString = sortedKeys
    .filter(key => filteredData[key])
    .map(key => `${key}=${encodeURIComponent(filteredData[key]).replace(/%20/g, '+')}`)
    .join("&");

  if (passphrase) {
    queryString += `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`;
  }

  console.log('--- Signature Debug ---');
  console.log('Raw String:', queryString);
  console.log('--- End Debug ---');

  const signature = crypto.createHash("md5").update(queryString).digest("hex");

  
  const fullData = { ...filteredData, signature };
  const fullQueryString = Object.keys(fullData)
    .map(key => `${key}=${encodeURIComponent(fullData[key]).replace(/%20/g, '+')}`)
    .join("&");

  const paymentUrl = `https://sandbox.payfast.co.za/eng/process?${fullQueryString}`;

  res.json({ paymentUrl });
});

export default router;