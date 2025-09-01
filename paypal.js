import express from "express";
import paypal from "@paypal/checkout-server-sdk";

const router = express.Router();

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

router.post("/paypal/create-order", async (req, res) => {
  const { total } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "USD", value: total } }],
  });

  const order = await client.execute(request);
  res.json({ id: order.result.id });
});

export default router;
