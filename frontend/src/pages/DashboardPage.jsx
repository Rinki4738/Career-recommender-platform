// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { getToken } from "../utils/auth"; // assuming you saved token earlier
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from backend using token
    const fetchUser = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch("http://localhost:4000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  function handleProfile() {
    navigate("/profile");
  }

  function handleRecommendations() {
    navigate("/recommendations"); // SPA navigation, no reload
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="shadow bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
          {user && (
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">{user.name}</span>
              <img
                onClick={handleProfile}
                src="/default-avatar.png"
                alt="profile"
                className="w-10 h-10 rounded-full border cursor-pointer"
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-xl font-semibold">
          Welcome {user ? user.name : "loading..."} 👋
        </h2>

        <p className="text-gray-600">
          This is your personalized dashboard. From here you’ll be able to
          access your profile, settings, and other features.
        </p>

        {/* Recommendations Button */}
        <button
          onClick={handleRecommendations}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          View Recommended Opportunities
        </button>
      </main>
    </div>
  );
}

export default DashboardPage;
