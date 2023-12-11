import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../pages/CheckoutForm";
import { useSelector } from "react-redux";
import { selectUserCart } from "../redux/user/userSlice";
import { useLocation } from "react-router-dom";

const stripeKey =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_STRIPE_KEY_TEST
    : import.meta.env.VITE_STRIPE_KEY_LIVE;

const stripeTestPromise = loadStripe(stripeKey);
console.log("pub:", stripeKey);

export default function StripeContainer() {
  const location = useLocation();
  const cartItems = useSelector(selectUserCart);
  const amount = cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  console.log("Total Price stripe:", amount);

  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm amount={amount} location={location} items={cartItems} />
    </Elements>
  );
}
