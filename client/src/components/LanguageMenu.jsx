import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import en from "../assets/en.png";
import it from "../assets/it.png";
import fr from "../assets/fr.png";

export default function LanguageMenu() {
  const [openDropdown, setOpendropdown] = useState(false);
  const { i18n, t } = useTranslation();

  const handleLanguage = (lng) => {
    console.log("Changing language to", lng);
    i18n.changeLanguage(lng);
    console.log("Current language is now", i18n.language);
    setOpendropdown(false);
  };

  // Array of languages
  const languages = [
    { code: "en", flag: en, name: "English" },
    { code: "it", flag: it, name: "Italian" },
    { code: "fr", flag: fr, name: "French" },
  ];

  const languageFlags = {
    en: en,
    it: it,
    fr: fr,
  };

  return (
    <div className="lng-menu">
      <button
        onClick={() => setOpendropdown(!openDropdown)}
        className="lng-btn"
      >
        <img src={languageFlags[i18n.language]} alt={i18n.language} />
        <ExpandMoreIcon
          className={`dropdown-icon ${openDropdown ? "open" : ""}`}
        />
      </button>
      {openDropdown && (
        <div className="dropdown-content">
          {/* Mapping through the array of languages & generate buttons accordingly :
            readability, consistency, scalability & reduced repetition
          */}
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguage(language.code)}
            >
              <img src={language.flag} alt="" />
              <span>{t(language.name)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
