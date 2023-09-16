import Location from "../assets/location.jpg";
import "../styles/Contact.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="contact"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${Location})` }}
      ></div>
      <div className="rightSide">
        <h1>{t("title")}</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">{t("fullName")}</label>
          <input
            name="name"
            placeholder={t("fullNamePlaceholder")}
            type="text"
          />
          <label htmlFor="email">{t("email")}</label>
          <input
            name="email"
            placeholder={t("emailPlaceholder")}
            type="email"
          />
          <label htmlFor="message">{t("message")}</label>
          <textarea
            rows="6"
            placeholder={t("messagePlaceholder")}
            name="message"
            required
          ></textarea>
          <button type="submit">{t("sendMessage")}</button>
        </form>
      </div>
    </motion.div>
  );
}
