import { route } from 'preact-router';
import googleIcon from "../assets/icons/google.svg";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { loginUser, registerUser } from "../services/userService";
import { isTokenValid } from "../utils/authHandles";
interface GoogleButtonProps {
  text: string;
  type: "signIn" | "signUp";
}

const GoogleButton = ({ text, type }: GoogleButtonProps) => {
  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      const user = result.user;
      console.log("User:", user);

      if (type === "signUp") {
        const newUser = {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email || "",
          phoneNumber: "",
          role: "user",
          isGoogleSignIn: true,
        };

        const registeredUser = await registerUser(newUser);
        if (registeredUser) checkDataAndNavigate();
      } else {
        const userToLogin = {
          email: user.email || "",
          isGoogleSignIn: true,
        };

        const loggedInUser = await loginUser(userToLogin, false);
        if (loggedInUser) checkDataAndNavigate();
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
