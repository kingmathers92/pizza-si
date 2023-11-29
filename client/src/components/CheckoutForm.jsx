import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  startCheckout,
  completeCheckout,
  cancelCheckout,
} from "../redux/user/userSlice";
import PropTypes from "prop-types";

import "../styles/CheckoutForm.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function CheckoutForm({ items, totalPrice }) {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        dispatch(startCheckout());
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3001/payment", {
          amount: totalPrice,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          dispatch(completeCheckout({ items, totalPrice }));
          window.location.href = "/success.html";
        }
      } catch (error) {
        dispatch(cancelCheckout());
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <div className="form-row">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="payBtn">Pay</button>
        </form>
      ) : (
        <div>
          <h2>Payment Successful!</h2>
        </div>
      )}
    </>
  );
}

CheckoutForm.propTypes = {
  totalPrice: PropTypes.number,
  items: PropTypes.array,
};
