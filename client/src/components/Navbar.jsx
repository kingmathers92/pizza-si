import { useState, useEffect } from "react";
import logo from "../assets/pizza_logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageMenu from "./LanguageMenu";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUser,
  performingSignOut,
  selectUserCart,
} from "../redux/user/userSlice";
import { signOut } from "../auth.js";

import "../styles/Navbar.css";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const currentUser = useSelector(selectUser);
  const cart = useSelector(selectUserCart);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  const handleNavLinkClick = () => {
    setOpenMenu(false);
  };

  const handleCartClick = (e) => {
    if (!openMenu) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      localStorage.setItem("userImage", currentUser.photoURL);
    }
  }, [currentUser]);

  const handleSignInRedirect = () => {
    navigate("/login");
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("userImage");

      const user = await signOut();
      dispatch(performingSignOut(user));
      navigate("/");
    } catch (error) {
      setErrorMessage("Couldn't Sign Out: " + error.message);
    }
  };

  const commonLinks = (
    <>
      <Link to="/" onClick={handleNavLinkClick}>
        {t("home")}
      </Link>
      <Link to="/menu" onClick={handleNavLinkClick}>
        {t("menu")}
      </Link>
      <Link to="/about" onClick={handleNavLinkClick}>
        {t("about")}
      </Link>
      <Link to="/contact" onClick={handleNavLinkClick}>
        {t("contact")}
      </Link>
    </>
  );

  return (
    <>
      <div className="menuBtnContainer">
        <button onClick={toggleMenu}>
          {!openMenu ? <ReorderIcon /> : <CloseIcon />}
        </button>
      </div>
      <nav className={`navbar ${openMenu ? "open" : ""}`}>
        <div className="leftSide" id={openMenu ? "open" : "close"}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
          <span className="by">{!openMenu && t("bySinatra")}</span>
          <div className={`hiddenLinks ${openMenu ? "open" : ""}`}>
            {commonLinks}
            <div className="userDetail"></div>
          </div>
        </div>
        <div className="rightSide">{commonLinks}</div>
        {currentUser ? (
          <div className="userDetail">
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="userAvatar"
            />
            <button className="signOutButton" onClick={handleSignOut}>
              {t("signOut")}
            </button>
          </div>
        ) : (
          <div className="userDetail">
            <button className="signInButton" onClick={handleSignInRedirect}>
              {t("signIn")}
            </button>
          </div>
        )}
        <div className="cart-container" onClick={handleCartClick}>
          <Link to="/cart" replace>
            <ShoppingCartIcon fontSize="medium" />
            <p className="cartItemCount">{currentUser ? cart.length : 0}</p>
          </Link>
        </div>
        <LanguageMenu />
      </nav>
    </>
  );
}
