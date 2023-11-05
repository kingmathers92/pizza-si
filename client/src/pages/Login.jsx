import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle, signInWithFacebook } from "../auth.js";
import { signIn } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import Banner2 from "../assets/pizza.jpeg";
import { motion } from "framer-motion";

import "../styles/Login.css";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      dispatch(signIn(user));
      navigate("/menu");
    } catch (error) {
      setErrorMessage("Google Sign-In Error: " + error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const user = await signInWithFacebook();
      dispatch(signIn(user));
      navigate("/menu");
    } catch (error) {
      setErrorMessage("Facebook Sign-In Error: " + error.message);
    }
  };

  return (
    <motion.div
      className="login-page"
      style={{ backgroundImage: `url(${Banner2})` }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="login-container">
        {user ? (
          <p>Welcome, {user.displayName}!</p>
        ) : (
          <div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="login-buttons">
              <div className="google-login">
                <button className="google-button" onClick={handleGoogleSignIn}>
                  Sign In with Google
                </button>
              </div>
              <div className="facebook-login">
                <button
                  className="facebook-button"
                  onClick={handleFacebookSignIn}
                >
                  Sign In with Facebook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default LoginPage;
