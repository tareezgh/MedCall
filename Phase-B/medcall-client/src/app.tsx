import { useEffect } from "preact/hooks";
import { Router, Route } from "preact-router";
import { lazy, Suspense } from "preact/compat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isTokenValid } from "./utils/authHandles";
import Footer from "./components/common/Footer";
import "./app.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RequestAmbulance = lazy(() => import("./pages/RequestAmbulance"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

export function App() {
  useEffect(() => {
    isTokenValid(); // This will check the token and set the user data in Redux
  }, []);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/request-ambulance" component={RequestAmbulance} />
          <Route path="/reset-password" component={ResetPassword} />
        </Router>
      </Suspense>
      {window.location.pathname !== "/dashboard" && <Footer />}
    </>
  );
}
