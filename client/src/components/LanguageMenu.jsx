import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import en from "../assets/en.png";
import it from "../assets/it.png";
import fr from "../assets/fr.png";

export default function LanguageMenu() {
  const [openDropdown, setOpendropdown] = useState(false);
  const { i18n } = useTranslation();

  const handleLanguage = (lng) => {
    i18n.handleLanguage(lng);
    setOpendropdown(false);
  };

  const toggleDropdown = () => {
    setOpendropdown(!openDropdown);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="lng-menu">
      <button onClick={toggleDropdown} className="lng-btn">
        <img src={`../assets/${currentLanguage}.png`} alt={currentLanguage} />
        <span>currentLanguage</span>
        <ExpandMoreIcon
          className={`dropdown-icon ${openDropdown ? "open" : ""}`}
        />
      </button>
      {openDropdown && (
        <div className="dropdown-content">
          <button onClick={() => handleLanguage("en")}>
            <img src={en} alt="" />
            <span>English</span>
          </button>
          <button onClick={() => handleLanguage("it")}>
            <img src={it} alt="" />
            <span>Italian</span>
          </button>
          <button onClick={() => handleLanguage("fr")}>
            <img src={fr} alt="" />
            <span>French</span>
          </button>
        </div>
      )}
    </div>
  );
}