import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectUserCart } from "../redux/user/userSlice";

const PUBLIC_KEY =
  "pk_test_51MAt6AJU3RVFqD4TZZuEmbyaEWoQDGs06vruWuwLIgUKycVbr7xKg6Xo46D8LOLL7nu6GSKPAiUhiocGeoFyIvKg00VKFbEcSw";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  const cartItems = useSelector(selectUserCart);

  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm items={cartItems} />
    </Elements>
  );
}
