import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectUserCart } from "../redux/user/userSlice";

const stripeTestPromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function StripeContainer() {
  const cartItems = useSelector(selectUserCart);

  const amount = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm items={cartItems} amount={amount} />
    </Elements>
  );
}
