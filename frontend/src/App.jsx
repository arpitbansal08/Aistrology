import axios from "axios";
import { lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../components/layout/Header.jsx"; // Import Header
import DelayedSuspense from "./DelayedSuspense.jsx";

// Lazy load pages
const Chat = lazy(() => import("../pages/Chat.jsx"));
const Landing = lazy(() => import("../pages/Landing.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));

const checkAuthStatus = async (setIsLoggedIn) => {
  try {
    const response = await axios.get("http://localhost:3000/auth/status", {
      withCredentials: true, // Ensures cookies are sent
    });

    // console.log("User Authenticated:", response.data.authenticated);
    // console.log("User Data:", response.data.user);

    setIsLoggedIn(response.data.authenticated); // Set login state based on response
  } catch (error) {
    console.log("User not authenticated");
    setIsLoggedIn(false); // Ensure state updates correctly
  }
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from cookies on mount
  useEffect(() => {
    // console.log("Checking login status...");
    checkAuthStatus(setIsLoggedIn);
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/* Pass state as props */}
      {/* <DelayedSuspense minDuration={2000}> */}
        <Routes>
          <Route path="/" element={<Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/profile"
            element={<Profile setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      {/* </DelayedSuspense> */}
    </Router>
  );
};

export default App;
