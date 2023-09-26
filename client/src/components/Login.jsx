import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle, signInWithFacebook } from ".././auth.js";
import { signIn } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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
    <div>
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
          <button onClick={handleFacebookSignIn}>Sign In with Facebook</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
