import { loadStripe } from "@stripe/react-stripe-js";

export function CheckoutForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "priceç1234",
          mode: "payment",
          successUrl: "https://your-website.com/success",
          cancelUrl: "https://your-website.com/cancel",
        },
      ],
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Pay</button>
    </form>
  );
}
