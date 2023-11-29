import { useNavigate } from "react-router-dom";

import "../styles/Message.css";

export default function CanceledPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">Payment Canceled</h1>
      <p className="message-text">Your payment was not successful.</p>
      <button className="message-btn" onClick={goToHome}>
        Go Back
      </button>
    </div>
  );
}
