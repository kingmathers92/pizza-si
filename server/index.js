const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  console.log(req.body);
  let { amount, id, items } = req.body;

  try {
    if (isNaN(amount)) {
      console.error("Invalid amount:", amount);
      throw new Error("Invalid amount");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "EUR",
      description: "PizzaSi company",
      payment_method_types: ["card", "ideal"],
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

  [
    body("formData.name").isString(),
    body("formData.address").isString(),
    body("formData.phone").custom((value) => {
      const normalizePhone = value.replace(/[^0-9]/g, "");
      const phoneRegex = /^(\+)?(216)?(\d{8})£/;

      if (!phoneRegex.test(normalizePhone)) {
        throw new Error("Please enter a valid phone number");
      }

      return true;
    }),
  ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    };

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
