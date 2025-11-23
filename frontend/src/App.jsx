// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePge";
import RecommendationPage from "./pages/RecommendationPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import ResumeBuilder from "./pages/ResumeBuilder";
import Jonpage from "./pages/Jonpage";

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/opportunity/:id" element={<Jonpage />} />




        {/* <Route path='/' element={<Home  />}/> */}

        <Route path='app' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview  />}/>
        {/* <Route path='login' element={<Login  />}/> */}
        
      </Routes>
    </div>
  );
}






export default App;
