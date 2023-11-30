import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Message.css";

export default function CanceledPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">
        {location.state && location.state.cancelType === "payment"
          ? "Payment Canceled"
          : "Order Canceled"}
      </h1>

      <button className="message-btn" onClick={goToHome}>
        Go Back
      </button>
    </div>
  );
}
