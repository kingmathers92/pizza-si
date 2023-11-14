const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.post("/payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntent.create({
      amout: req.body.amount,
      currency: "usd",
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    alert(error);
    res.status(500).send({ error: "Payment failed" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
