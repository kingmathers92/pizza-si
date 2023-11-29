const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

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
    res.json({
      //client_secret: paymentIntent.client_secret, // Corrected property name
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
