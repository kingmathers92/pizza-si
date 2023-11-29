import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51MAt6AJU3RVFqD4TZZuEmbyaEWoQDGs06vruWuwLIgUKycVbr7xKg6Xo46D8LOLL7nu6GSKPAiUhiocGeoFyIvKg00VKFbEcSw";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
}
