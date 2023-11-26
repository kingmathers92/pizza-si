import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  startCheckout,
  completeCheckout,
  cancelCheckout,
} from "../redux/user/userSlice";

export default function CheckoutForm({ items, totalPrice }) {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    dispatch(startCheckout());

    const { error } = await stripe.redirectToCheckout({
      lineItems: items.map((item) => ({
        price: item.priceId ? item.priceId.toString() : "0",
        quantity: item.quantity,
      })),
      mode: "payment",
      successUrl: "https://pizzasi.vercel.app/success",
      cancelUrl: "https://pizzasi.vercel.app/cancel",

      payment_method_types: ["card"],
    });

    if (error) {
      console.log(error);
      dispatch(cancelCheckout());
    } else {
      // If payment is successful, dispatching action to complete checkout and save payment details
      dispatch(completeCheckout({ items, totalPrice }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      {items.map((item) => (
        <div key={item.itemId}>
          <p>
            {item.name}: {item.price}DT x {item.quantity}
          </p>
        </div>
      ))}
      <p>Total: {totalPrice}DT</p>
      <button type="submit">Pay Now</button>
    </form>
  );
}

CheckoutForm.propTypes = {
  totalPrice: PropTypes.number,
  items: PropTypes.array,
};
