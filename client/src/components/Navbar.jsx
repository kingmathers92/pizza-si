import { useState, useEffect } from "react";
import logo from "../assets/pizza_logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReorderIcon from "@mui/icons-material/Reorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageMenu from "./LanguageMenu";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, performingSignOut } from "../redux/user/userSlice";
import { selectCart } from "../redux/cart/cartSlice.js";
import { signOut } from "../auth.js";

import "../styles/Navbar.css";

export default function Navbar() {
  const [errorMessage, setErrorMessage] = useState(null);
  const currentUser = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      localStorage.setItem("userImage", currentUser.photoURL);
    }
  }, [currentUser]);

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

  return (
    <div className="navbar">
      <div className="leftSide" id={openMenu ? "open" : "close"}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
      </div>
      <div className="rightSide">
        <Link to="/">{t("home")}</Link>
        <Link to="/menu">{t("menu")}</Link>
        <Link to="/about">{t("about")}</Link>

        <Link to="/contact">{t("contact")}</Link>
        {currentUser && (
          <div className="userDetail">
            <img src={currentUser.photoURL} alt="avatar" />
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
        {!currentUser ? (
          <Link to="/login">{t("Sign In")}</Link>
        ) : (
          <button onClick={toggleMenu}>
            <ReorderIcon />
          </button>
        )}
      </div>
      <div className="cart-container">
        <Link to="/cart">
          <ShoppingCartIcon fontSize="medium" />
          <p className="cartItemCount">{cart.length}</p>
        </Link>
      </div>
      <LanguageMenu />
    </div>
  );
}
