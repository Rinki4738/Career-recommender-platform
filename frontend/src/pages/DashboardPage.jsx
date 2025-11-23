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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
            CareerMate
          </h1>

          {user && (
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">{user.name}</span>
              {user.avatarUrl ? (
                <img
                  onClick={() => navigate("/profile")}
                  title="View Profile"
                  src={user.avatarUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
                />
              ) : (
                <div
                  onClick={() => navigate("/profile")}
                  title="View Profile"
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
      <main className="flex-1 max-w-7xl mx-auto my-20 px-6 py-10 flex flex-col gap-10">
        {/* Welcome Section */}
        <section className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-lg text-center border border-indigo-100">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Welcome back, {user ? user.name : "there"} 👋
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto ">
            Explore recommended opportunities and generate a resume tailored just
            for you!
          </p>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recommended Opportunities */}
          <div
            onClick={() => navigate("/recommendations")}
            className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white flex flex-col justify-between transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Recommended Opportunities
            </h3>
            <p className="opacity-90 mb-4">
              Go explore opportunities tailored to your skills and profile!
            </p>
            <button className="self-start bg-white/20 px-5 py-2 rounded-xl font-semibold hover:bg-white/30 transition">
              View Opportunities →
            </button>
          </div>

          {/* Generate Resume */}
          <div
            onClick={() => navigate("/app")}
            className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-between transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-3">Generate Resume</h3>
            <p className="opacity-90 mb-4">
              Create a professional resume in minutes with CareerMate’s smart
              builder.
            </p>
            <button className="self-start bg-white/20 px-5 py-2 rounded-xl font-semibold hover:bg-white/30 transition">
              Generate Now →
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2025 CareerMate. All rights reserved.</p>
          <p>
            Contributors: Rinki, Palak, Kuldeep
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
