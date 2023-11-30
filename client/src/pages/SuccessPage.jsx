import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Message.css";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">
        {location.pathname === "/success" && (
          <div className="success-message">
            {location.state && location.state.successType === "card"
              ? "Payment Successful!"
              : "Order Successful!"}
          </div>
        )}
      </h1>
      <button className="message-btn" onClick={goToHome}>
        Go Back
      </button>
    </div>
  );
}
