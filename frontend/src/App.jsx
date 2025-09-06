// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePge";
import RecommendationPage from "./pages/RecommendationPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        
      </Routes>
    </div>
  );
}






export default App;
