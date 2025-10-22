// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfile = () => navigate("/profile");
  const handleRecommendations = () => navigate("/recommendations");

  // Generate initials (e.g., "Shreya Saraswat" -> "SS")
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
            Dashboard
          </h1>

          {user && (
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">{user.name}</span>

              {user.avatarUrl ? (
                <img
                  onClick={handleProfile}
                  src={user.avatarUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
                />
              ) : (
                <div
                  onClick={handleProfile}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
                >
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Section */}
        <section className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg text-center mb-10 border border-indigo-100">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Welcome back, {user ? user.name : "there"} 👋
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here’s a quick overview of your profile, opportunities, and recent
            activity. Let’s make today productive!
          </p>
        </section>

        {/* Dashboard Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Overview */}
          <div
            onClick={handleProfile}
            className="rounded-3xl p-6 shadow-md cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
          >
            <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
            <p className="opacity-90 mb-4">
              View or edit your personal information and experience.
            </p>
            <p className="text-sm opacity-80">
              Profile completion: <span className="font-bold">80%</span>
            </p>
          </div>

          {/* Recommendations */}
          <div
            onClick={handleRecommendations}
            className="rounded-3xl p-6 shadow-md cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white"
          >
            <h3 className="text-xl font-semibold mb-2">
              Recommended Opportunities
            </h3>
            <p className="opacity-90">
              Discover jobs, internships, or projects that match your profile.
            </p>
          </div>

          {/* Activity / Notifications */}
          <div className="rounded-3xl p-6 shadow-md transition transform hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 text-white">
            <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
            <ul className="text-sm space-y-2 opacity-90">
              <li>✅ Profile updated 2 days ago</li>
              <li>💼 Applied to “Frontend Developer”</li>
              <li>📅 Interview scheduled for Monday</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
