import { useState } from "react";
import logo from "../assets/pizza_logo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import LanguageMenu from "./LanguageMenu";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";
//import { handleSignOut } from "../auth.js";

import "../styles/Navbar.css";

export default function Navbar() {
  const currentUser = useSelector(selectUser);
  //const dispatch = useDispatch();
  const { t } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // const handleSignOut = () => {
  //   dispatch(signOut());
  // };

  return (
    <div className="navbar">
      <div className="leftSide" id={openMenu ? "open" : "close"}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <span className="by">{!openMenu && t("bySinatra")}</span>
        <div className="hiddenLinks">
          <Link to="/">{t("home")}</Link>
          <Link to="/menu">{t("menu")}</Link>
          <Link to="/about">{t("about")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </div>
        {currentUser && (
          <div className="userProfile">
            <img src={currentUser.photoURL} alt={currentUser.displayName} />
            <span>{currentUser.displayName}</span>
            <button>Sign Out</button>
          </div>
        )}
      </div>
      <div className="rightSide">
        <Link to="/">{t("home")}</Link>
        <Link to="/menu">{t("menu")}</Link>
        <Link to="/about">{t("about")}</Link>
        <Link to="/contact">{t("contact")}</Link>
        {!currentUser ? (
          <Link to="/login">{t("Sign In")}</Link>
        ) : (
          <button onClick={toggleMenu}>
            <ReorderIcon />
          </button>
        )}
      </div>
      <LanguageMenu />
    </div>
  );
}
