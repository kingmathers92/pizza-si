import { useNavigate } from "react-router-dom";

import "../styles/Message.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">404 - Page Not Found</h1>
      <p className="message-text">The page you are looking does not exist </p>
      <button className="message-btn" onClick={goToHome}>
        Go Back
      </button>
    </div>
  );
}
