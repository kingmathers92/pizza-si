import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/Message.css";

export default function CanceledPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">
        {location.state && location.state.cancelType === "payment"
          ? t("paymentCanceled")
          : t("orderCanceled")}
      </h1>

      <button className="message-btn" onClick={goToHome}>
        {t("goBack")}
      </button>
    </div>
  );
}
