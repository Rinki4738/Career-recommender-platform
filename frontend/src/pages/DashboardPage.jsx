





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import { 
  FiArrowDown, FiUser, FiSettings, FiLogOut, FiClipboard, 
  FiFileText, FiCheckCircle, FiTrendingUp, FiBriefcase, FiAward 
} from "react-icons/fi";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
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
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const scrollToCards = () => {
    const section = document.getElementById("cards-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6"></div>
        <p className="text-gray-700 text-xl font-medium animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">CareerMate</h1>
          {user && (
            <div className="relative flex items-center gap-4">
              <span className="font-medium">{user.name}</span>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title="Profile Menu"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-blue-400 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    getInitials(user.name)
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-30">
                    <button
                      onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100 transition-all"
                    >
                      <FiUser /> Profile
                    </button>
                    <button
                      onClick={() => { navigate("/settings"); setDropdownOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100 transition-all"
                    >
                      <FiSettings /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 w-full hover:bg-red-100 text-red-500 transition-all"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Welcome Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-r from-blue-100 to-purple-100 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-700 mb-6 leading-tight">
            Welcome back, {user ? user.name.split(" ")[0] : "there"}! 👋
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
            Elevate your career with personalized opportunities, professional resume creation, and skill assessments.
          </p>
          <button
            onClick={scrollToCards}
            className="inline-flex items-center gap-3 bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Get Started <FiArrowDown className="animate-bounce" />
          </button>
        </div>
      </section>

     {/* Cards Section */}
<section id="cards-section" className="max-w-7xl mx-auto px-6 py-20">
  <div className="text-center mb-16">
    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Quick Actions</h3>
    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
      Select an option to advance your professional journey.
    </p>
  </div>

  {/* Grid — now 2 cards, perfect spacing maintained */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Opportunities */}
    <div
      onClick={() => navigate("/recommendations")}
      className="cursor-pointer rounded-2xl p-8 bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <FiClipboard className="text-3xl text-green-500" />
          <h3 className="text-2xl font-semibold">Opportunities</h3>
        </div>
        <p className="text-gray-600 text-base mb-4">
          Discover curated job roles that align with your expertise and aspirations.
        </p>
      </div>
      <button className="self-start bg-green-100 px-6 py-3 rounded-full font-semibold text-green-700 hover:bg-green-200 transition-all duration-300">
        Explore Jobs →
      </button>
    </div>

    {/* Resume Builder */}
    <div
      onClick={() => navigate("/app")}
      className="cursor-pointer rounded-2xl p-8 bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <FiFileText className="text-3xl text-purple-500" />
          <h3 className="text-2xl font-semibold">Resume Builder</h3>
        </div>
        <p className="text-gray-600 text-base mb-4">
          Build an impactful, ATS-friendly resume effortlessly.
        </p>
      </div>
      <button className="self-start bg-purple-100 px-6 py-3 rounded-full font-semibold text-purple-700 hover:bg-purple-200 transition-all duration-300">
        Create Resume →
      </button>
    </div>

  </div>
</section>


      {/* Footer */}
      <footer className="bg-white text-gray-500 py-8 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 CareerMate. All rights reserved.</p>
          <p className="text-sm flex items-center gap-3">
            Contributors:
            <span className="hover:text-blue-500 cursor-pointer transition-all">Rinki</span>,
            <span className="hover:text-blue-500 cursor-pointer transition-all">Palak</span>,
            <span className="hover:text-blue-500 cursor-pointer transition-all">Kuldeep</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
