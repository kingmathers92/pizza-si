import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserCart } from "../redux/user/userSlice";
import axios from "axios";
import PropTypes from "prop-types";

export default function CashOnDeliveryForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectUserCart);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      cartItems: cart,
      formData: formData,
      //totalPrice
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
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <textarea
        placeholder="Additional Information"
        value={formData.additionalInfo}
        onChange={(e) =>
          setFormData({ ...formData, additionalInfo: e.target.value })
        }
      />
      <button type="submit">Submit Order</button>
    </form>
  );
}

CashOnDeliveryForm.propTypes = {
  amount: PropTypes.number,
  //items: PropTypes.array,
};
