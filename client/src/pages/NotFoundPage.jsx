import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/Message.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="message-container">
      <h1 className="message-title">{t("404")}</h1>
      <p className="message-text">{t("pageNonExist")}</p>
      <button className="message-btn" onClick={goToHome}>
        {t("goBack")}
      </button>
    </div>
  );
}
