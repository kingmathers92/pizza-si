import { useState } from "react";
import logo from "../assets/pizza_logo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";
import LanguageMenu from "./LanguageMenu";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openMenu ? "open" : "close"}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <span>{!openMenu && t("bySinatra")}</span>
        <div className="hiddenLinks">
          <Link to="/">{t("home")}</Link>
          <Link to="/menu">{t("menu")}</Link>
          <Link to="/about">{t("about")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">{t("home")}</Link>
        <Link to="/menu">{t("menu")}</Link>
        <Link to="/about">{t("about")}</Link>
        <Link to="/contact">{t("contact")}</Link>
        <button onClick={toggleMenu}>
          <ReorderIcon />
        </button>
      </div>
      <LanguageMenu />
    </div>
  );
}
