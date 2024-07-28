import { useEffect } from "preact/hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isTokenValid } from "./utils/authHandles";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RequestAmbulance from "./pages/RequestAmbulance";
import ResetPassword from "./pages/ResetPassword";
import "./app.css";

export function App() {
  useEffect(() => {
    isTokenValid(); // This will check the token and set the user data in Redux
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request-ambulance" element={<RequestAmbulance />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        {window.location.pathname !== "/dashboard" && <Footer />}
      </BrowserRouter>
    </>
  );
}
