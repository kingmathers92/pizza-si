import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/Message.css";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">
        {location.pathname === "/success" && (
          <div className="success-message">
            {location.state && location.state.successType === "card"
              ? t("paymentSuccess")
              : t("orderSuccess")}
          </div>
        )}
      </h1>
      <button className="message-btn" onClick={goToHome}>
        {t("goBack")}
      </button>
    </div>
  );
}
