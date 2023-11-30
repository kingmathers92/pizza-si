import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectUserCart } from "../redux/user/userSlice";

const stripeTestPromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function StripeContainer() {
  const cartItems = useSelector(selectUserCart);

  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm items={cartItems} />
    </Elements>
  );
}
