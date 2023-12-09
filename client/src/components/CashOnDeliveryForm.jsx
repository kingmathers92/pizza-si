import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserCart } from "../redux/user/userSlice";
import axios from "axios";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "../styles/CashOnDelivery.css";

export default function CashOnDeliveryForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const cart = useSelector(selectUserCart);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });

  const { totalPrice } = location.state || { totalPrice: 0 };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert("Name, Address and Phone are required!");
      return;
    }

    // Phone number validation with regex
    const phoneRegex = /^(\+)?(216)?(\d{8}|\d{9}|\d{10})$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    const orderDetails = {
      cartItems: cart,
      formData: formData,
      totalPrice: totalPrice,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/create-order",
        orderDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        dispatch(cleanCart());
        navigate("/success");
      } else {
        console.error("Order submission failed");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {t("fullNamePlaceholder")}
        <span>*</span>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </label>

      <label>
        {t("address")}
        <span>*</span>

        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </label>

      <label>
        {t("phone")}
        <span>*</span>

        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </label>

      <textarea
        placeholder={t("customize")}
        value={formData.additionalInfo}
        onChange={(e) =>
          setFormData({ ...formData, additionalInfo: e.target.value })
        }
      />
      <button type="submit">{t("submitOrder")}</button>
      <p>
        {t("totalPrice")}: {totalPrice} DT
      </p>
    </form>
  );
}

CashOnDeliveryForm.propTypes = {
  totalPrice: PropTypes.number,
};
