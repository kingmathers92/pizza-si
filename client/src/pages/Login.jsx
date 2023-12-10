import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../auth.js";
import { signIn, updateUserCart } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import Banner2 from "../assets/pizza.jpeg";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
//import { AiFillFacebook } from "react-icons/ai";

import "../styles/Login.css";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  //const currentUser = useSelector(selectUser);

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      dispatch(signIn(user));
      if (user) {
        dispatch(updateUserCart({ cartItems: [] }));
      }

      navigate("/menu");
    } catch (error) {
      setErrorMessage("Google Sign-In Error: " + error.message);
    }
  };

  // const handleFacebookSignIn = async () => {
  //   try {
  //     const user = await signInWithFacebook();
  //     dispatch(signIn(user));
  //     navigate("/menu");
  //   } catch (error) {
  //     setErrorMessage("Facebook Sign-In Error: " + error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/menu");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [currentUser]);

  return (
    <motion.div
      className="login-page"
      style={{ backgroundImage: `url(${Banner2})` }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="login-container">
        <div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="social-buttons">
            <div className="social-login">
              <button className="social-button" onClick={handleGoogleSignIn}>
                <FcGoogle className="social-icon" />
                <span>{t("signWithGoogle")}</span>
              </button>
            </div>
            {/* <div className="social-login">
              <button
                className="social-button"
                onClick={handleFacebookSignIn}
              >
                <AiFillFacebook className="fb-icon" />
                <span>Sign In with Facebook</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
