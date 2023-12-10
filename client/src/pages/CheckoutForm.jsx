import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadingState,
  startLoading,
  stopLoading,
  startCheckout,
  completeCheckout,
  cancelCheckout,
  cleanCart,
} from "../redux/user/userSlice";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { useTranslation } from "react-i18next";

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

export default function CheckoutForm({ location }) {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingState);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { t } = useTranslation();

  dispatch(stopLoading());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, items } = location.state;
    dispatch(startLoading());

    console.log("Total Price:", amount);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        dispatch(startCheckout());
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3001/payment", {
          amount: amount,
          items: items,
          id,
        });
        console.log();

        if (response.data.success) {
          console.log("Successful payment");
          dispatch(stopLoading());
          setSuccess(true);
          dispatch(completeCheckout({ items, amount }));
          dispatch(cleanCart());
          navigate("/success");
        }
      } catch (error) {
        console.log("Error", error);
        dispatch(stopLoading());
        dispatch(cancelCheckout());
        navigate("/canceled");
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!success && !loading ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <div className="form-row">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="payBtn" type="submit">
            {loading ? (
              <Loader type="Oval" color="#FFF" height={20} width={20} />
            ) : (
              "Pay"
            )}
          </button>
        </form>
      ) : (
        <div>
          <h2>{t("paymentSuccess")}</h2>
        </div>
      )}
    </div>
  );
}

CheckoutForm.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      items: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};