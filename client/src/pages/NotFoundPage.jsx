import { useNavigate } from "react-router-dom";

import "../styles/NotFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">The page you are looking does not exist </p>
      <button className="not-found-btn" onClick={goToHome}>
        Go Back
      </button>
    </div>
  );
}
