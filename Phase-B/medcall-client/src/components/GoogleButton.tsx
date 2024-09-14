import { route } from "preact-router";
import googleIcon from "../assets/icons/google.svg";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { loginUser } from "../services/userService";
import { isTokenValid } from "../utils/authHandles";
interface GoogleButtonProps {
  text: string;
  type: "signIn" | "signUp";
  setActiveModal?: (modal: "main" | "verify") => void;
  setVerifyType?: (type: "email" | "google") => void;
  setGoogleUser?: (item: any) => void;
}

const GoogleButton = ({
  text,
  type,
  setActiveModal,
  setVerifyType,
  setGoogleUser,
}: GoogleButtonProps) => {
  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setGoogleUser && setGoogleUser(result);
      // The signed-in user info
      const user = result.user;

      if (type === "signUp") {
        setVerifyType && setVerifyType("google");
        if (user && setActiveModal) setActiveModal("verify");
      } else {
        const userToLogin = {
          email: user.email || "",
          isGoogleSignIn: true,
        };

        const loggedInUser = await loginUser(userToLogin, false);
        if (loggedInUser) checkDataAndNavigate();
      }
    } catch (error) {
      // console.error("Error signing in with Google:", error);
    }
  };

  const checkDataAndNavigate = () => {
    const data = isTokenValid();
    if (data) {
      route("/dashboard");
    }
  };
  return (
    <>
      <button
        className={`flex items-center justify-center bg-white text-backText px-6 py-3 rounded-3xl shadow`}
        onClick={handleGoogleClick}
      >
        <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
        {text}
      </button>
    </>
  );
};

export default GoogleButton;
