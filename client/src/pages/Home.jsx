//import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Banner from "../assets/banner.jpg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="home"
      style={{ backgroundImage: `url(${Banner})` }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="headerContainer">
        <h1>PizzaSi Pizzeria</h1>
        <br />
        <br />
        <p>{t("subtitle")}</p>
        <Link to="/menu">
          <button>{t("orderNow")}</button>
        </Link>
      </div>
    </motion.div>
  );
}
