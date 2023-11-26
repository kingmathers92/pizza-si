import { useState } from "react";
import Location from "../assets/location.jpg";
import "../styles/Contact.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessasge] = useState("");

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

        <form
          id="contact-form"
          action="https://getform.io/f/9789724e-994f-4ea8-8b4e-a328bedd28a7"
          method="POST"
        >
          <label htmlFor="name">{t("fullName")}</label>
          <input
            name="name"
            placeholder={t("fullNamePlaceholder")}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="email">{t("email")}</label>
          <input
            name="email"
            placeholder={t("emailPlaceholder")}
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <label htmlFor="message">{t("message")}</label>
          <textarea
            rows="6"
            placeholder={t("messagePlaceholder")}
            name="message"
            value={userMessage}
            onChange={(e) => setUserMessasge(e.target.value)}
            required
          ></textarea>
          <button
            disabled={!userName || !userEmail || !userMessage}
            type="submit"
          >
            {t("sendMessage")}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
