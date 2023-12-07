const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "PizzaSi company",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3001/success",
    });
    console.log("Payment", paymentIntent);
    res.status(200).json({
      message: "Payment successful",
      success: true,
      loading: false,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Payment failed",
      success: false,
      loading: false,
    });
  }
});

app.post("/create-order", cors(), async (req, res) => {
  const orderDetails = req.body;

  try {
    const db = admin.database();
    const ordersRef = db.ref("orders");

    const newOrderRef = ordersRef.push();
    await newOrderRef.set(orderDetails);

    res.status(200).json({
      message: "Order created successfully",
      success: true,
      loading: false,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Failed to create order",
      success: false,
      loading: false,
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
