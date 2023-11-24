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
    setOpenMenu(!openMenu);
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

  return (
    <>
      <div>
        <button onClick={toggleMenu}>
          <ReorderIcon className="menuBtn" />
        </button>
      </div>
      <nav className={`navbar ${openMenu ? "open" : ""}`}>
        <div className="leftSide" id={openMenu ? "open" : "close"}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
          <span className="by">{!openMenu && t("bySinatra")}</span>
          <div className={openMenu ? "hiddenLinks open" : "hiddenLinks"}>
            <Link to="/">{t("home")}</Link>
            <Link to="/menu">{t("menu")}</Link>
            <Link to="/about">{t("about")}</Link>
            <Link to="/contact">{t("contact")}</Link>
            <div className="userDetail"></div>
          </div>
        </div>
        <div className="rightSide">
          <Link to="/">{t("home")}</Link>
          <Link to="/menu">{t("menu")}</Link>
          <Link to="/about">{t("about")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </div>
        {currentUser ? (
          <div className="userDetail">
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="userAvatar"
            />
            <button className="signOutButton" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="userDetail">
            <button className="signInButton" onClick={handleSignInRedirect}>
              {t("Sign In")}
            </button>
          </div>
        )}
        <div className="cart-container">
          <Link to="/cart">
            <ShoppingCartIcon fontSize="medium" />
            <p className="cartItemCount">{currentUser ? cart.length : 0}</p>
          </Link>
        </div>
        <LanguageMenu />
      </nav>
    </>
  );
}
