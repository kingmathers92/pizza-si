import { useNavigate } from "react-router-dom";

import "../styles/Message.css";

export default function SuccessPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">Payment Successful!</h1>
      <button className="message-btn" onClick={goToHome}>
        Go Back
      </button>
    </div>
  );
}
