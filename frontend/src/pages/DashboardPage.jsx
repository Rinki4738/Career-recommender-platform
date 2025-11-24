// // src/pages/DashboardPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken } from "../utils/auth";

// function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = getToken();
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:4000/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setUser(data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const getInitials = (name) => {
//     if (!name) return "?";
//     const parts = name.trim().split(" ");
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
//         <p className="text-gray-600 text-lg animate-pulse">
//           Loading your dashboard...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">

//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
//             CareerMate
//           </h1>

//           {user && (
//             <div className="flex items-center gap-3">
//               <span className="font-medium text-gray-700">{user.name}</span>

//               {user.avatarUrl ? (
//                 <img
//                   onClick={() => navigate("/profile")}
//                   title="View Profile"
//                   src={user.avatarUrl}
//                   alt="profile"
//                   className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
//                 />
//               ) : (
//                 <div
//                   onClick={() => navigate("/profile")}
//                   title="View Profile"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
//                 >
//                   {getInitials(user.name)}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 max-w-7xl mx-auto my-20 px-6 py-10 flex flex-col gap-10">

//         {/* Welcome Section */}
//         <section className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-lg text-center border border-indigo-100">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-3">
//             Welcome back, {user ? user.name : "there"} 👋
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Explore recommended opportunities and generate a resume tailored just for you!
//           </p>
//         </section>

//         {/* Cards Section */}
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-8">

//           {/* Recommended Opportunities */}
//           <div
//             onClick={() => navigate("/recommendations")}
//             className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white flex flex-col justify-between transition transform hover:-translate-y-1 hover:shadow-xl"
//           >
//             <h3 className="text-2xl font-semibold mb-3">Recommended Opportunities</h3>
//             <p className="opacity-90 mb-4">Go explore opportunities tailored to your skills and profile!</p>
//             <button className="self-start bg-white/20 px-5 py-2 rounded-xl font-semibold hover:bg-white/30 transition">
//               View Opportunities →
//             </button>
//           </div>

//           {/* Generate Resume */}
//           <div
//             onClick={() => navigate("/app")}
//             className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-between transition transform hover:-translate-y-1 hover:shadow-xl"
//           >
//             <h3 className="text-2xl font-semibold mb-3">Generate Resume</h3>
//             <p className="opacity-90 mb-4">Create a professional resume in minutes with CareerMate’s smart builder.</p>
//             <button className="self-start bg-white/20 px-5 py-2 rounded-xl font-semibold hover:bg-white/30 transition">
//               Generate Now →
//             </button>
//           </div>

//           {/* Check Your Skills (MCQ App) */}
//           <div
//             onClick={() => window.open("http://localhost:3008", "_blank")}
//             className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white flex flex-col justify-between transition transform hover:-translate-y-1 hover:shadow-xl"
//           >
//             <h3 className="text-2xl font-semibold mb-3">Check Your Skills</h3>
//             <p className="opacity-90 mb-4">Test your knowledge instantly.</p>
//             <button className="self-start bg-white px-6 py-3 rounded-full font-bold text-red-600 shadow-md hover:bg-gray-100 transition flex items-center gap-2">
//               Start Test <span className="ml-2 text-xl">→</span>
//             </button>
//           </div>

//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-black text-white py-10 mt-10">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p>© 2025 CareerMate. All rights reserved.</p>
//           <p>Contributors: Rinki, Palak, Kuldeep</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default DashboardPage;

















// // src/pages/DashboardPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken } from "../utils/auth";

// // Simple spinner component for loading state
// const Spinner = () => (
//   <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//   </svg>
// );

// function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Mocking the fetch for demonstration purposes if backend isn't running.
//     // Remove this setTimeout and uncomment the actual fetch below in production.
//     /*
//     setTimeout(() => {
//       setUser({ name: "Alex Johnson", avatarUrl: null });
//       setLoading(false);
//     }, 1000);
//     */

//     // --- Actual Fetch Logic ---
//     const fetchUser = async () => {
//       const token = getToken();
//       // If no token, redirect to login instead of just stopping loading
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const res = await fetch("http://localhost:4000/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setUser(data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//     // ---------------------------
//   }, [navigate]);

//   const getInitials = (name) => {
//     if (!name) return "?";
//     const parts = name.trim().split(" ");
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   // Improved Loading State: Cleaner and less jarring
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-white">
//         <Spinner />
//         <p className="text-gray-500 font-medium">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     // Changed main bg to a neutral slate-50 to let content pop
//     <div className="flex flex-col min-h-screen bg-slate-50">
//       {/* Header: Refined shadow and blur */}
//       <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20 border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text tracking-tight cursor-pointer" onClick={() => navigate("/")}>
//             CareerMate
//           </h1>
//           {user && (
//             <div className="flex items-center gap-4">
//               <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
//               <div onClick={() => navigate("/profile")} className="group relative flex-shrink-0 cursor-pointer">
//                 {user.avatarUrl ? (
//                   <img
//                     title="View Profile"
//                     src={user.avatarUrl}
//                     alt="profile"
//                     className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-purple-400 transition duration-300 object-cover"
//                   />
//                 ) : (
//                   <div
//                     title="View Profile"
//                     className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-sm group-hover:shadow-md group-hover:ring-2 ring-purple-300 ring-offset-2 transition duration-300"
//                   >
//                     {getInitials(user.name)}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Hero Section: Removed flex-1, gave distinct padding, added subtle pattern overlay */}
//       <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-24 px-6 text-center overflow-hidden">
//         {/* Subtle background pattern overlay */}
//         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

//         <div className="relative z-10 max-w-4xl mx-auto">
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
//             Welcome back, <span className="text-indigo-100">{user ? user.name.split(' ')[0] : "there"}</span>! 👋
//           </h2>
//           <p className="text-lg md:text-xl text-indigo-100/90 max-w-2xl mx-auto leading-relaxed">
//             Ready to take the next step? Explore tailored opportunities or generate your professional resume today.
//           </p>
//         </div>
//       </section>

//       {/* Cards Section: Added header, standardized buttons */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
//         <div className="mb-10">
//              <h3 className="text-2xl font-bold text-gray-800">Your Quick Actions</h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Card 1: Opportunities */}
//           <div
//             onClick={() => navigate("/recommendations")}
//             className="group cursor-pointer rounded-3xl p-8 shadow-md hover:shadow-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-white flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
//           >
//             <div>
//                {/* Optional: Add icons for better visual cue */}
//                <div className="mb-4 bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">🚀</div>
//               <h3 className="text-2xl font-bold mb-3">
//                 Recommended Opportunities
//               </h3>
//               <p className="text-teal-50 mb-8 leading-relaxed font-medium">
//                 Explore roles tailored specifically to your skills and profile preferences.
//               </p>
//             </div>
//             <button className="self-start bg-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/40 transition duration-300 flex items-center gap-2">
//               View Jobs <span>→</span>
//             </button>
//           </div>

//           {/* Card 2: Resume */}
//           <div
//             onClick={() => navigate("/app")}
//             className="group cursor-pointer rounded-3xl p-8 shadow-md hover:shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
//           >
//              <div>
//                <div className="mb-4 bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">📄</div>
//                 <h3 className="text-2xl font-bold mb-3">
//                   Generate Resume
//                 </h3>
//                 <p className="text-indigo-50 mb-8 leading-relaxed font-medium">
//                   Create a professional, ATS-friendly resume in minutes with our smart builder.
//                 </p>
//             </div>
//             <button className="self-start bg-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/40 transition duration-300 flex items-center gap-2">
//               Create Now <span>→</span>
//             </button>
//           </div>

//           {/* Card 3: Skills - FIXED BUTTON CONSISTENCY */}
//           <div
//             onClick={() => window.open("http://localhost:3008", "_blank")}
//             className="group cursor-pointer rounded-3xl p-8 shadow-md hover:shadow-xl bg-gradient-to-br from-orange-400 to-red-500 text-white flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
//           >
//             <div>
//                <div className="mb-4 bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
//               <h3 className="text-2xl font-bold mb-3">
//                 Check Your Skills
//               </h3>
//               <p className="text-orange-50 mb-8 leading-relaxed font-medium">
//                 Take assessments to validate your knowledge and stand out to recruiters.
//               </p>
//             </div>
//             {/* Fixed Button style to match the others */}
//             <button className="self-start bg-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/40 transition duration-300 flex items-center gap-2">
//               Start Test <span>→</span>
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Footer: Solid background for grounding */}
//       <footer className="bg-slate-900 text-slate-300 py-10 mt-auto">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
//           <p>© 2025 CareerMate. All rights reserved.</p>
//           <p className="font-medium">Crafted by Rinki, Palak, Kuldeep</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default DashboardPage;









import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import { FiArrowDown, FiUser, FiSettings, FiLogOut, FiClipboard, FiFileText, FiCheckCircle } from "react-icons/fi";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 animate-pulse">
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20 transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text tracking-tight">
            CareerMate
          </h1>

          {user && (
            <div className="relative flex items-center gap-4">
              <span className="font-medium text-gray-700">{user.name}</span>
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title="Profile Menu"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-purple-400 transition duration-300"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="profile" className="w-10 h-10 rounded-full"/>
                  ) : getInitials(user.name)}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-30">
                    <button onClick={() => navigate("/profile")} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
                      <FiUser /> Profile
                    </button>
                    <button onClick={() => navigate("/settings")} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
                      <FiSettings /> Settings
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600">
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Full-screen Welcome Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_70%)] animate-pulse-slow absolute"></div>
          <div className="w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1),transparent_70%)] animate-pulse-slow absolute"></div>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome back, {user ? user.name : "there"} 👋
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
          Explore recommended opportunities and generate a resume tailored just for you!
        </p>
        <FiArrowDown className="mt-10 text-white animate-bounce text-3xl"/>
      </section>

      {/* Cards Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Recommended Opportunities */}
        <div
          onClick={() => navigate("/recommendations")}
          className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out group"
        >
          <div className="flex items-center gap-3 mb-3 text-2xl">
            <FiClipboard /> <h3 className="text-2xl font-semibold group-hover:text-yellow-100 transition duration-300">Recommended Opportunities</h3>
          </div>
          <p className="opacity-90 mb-5 group-hover:opacity-100 transition duration-300">
            Explore opportunities tailored to your skills and profile!
          </p>
        </div>

        {/* Generate Resume */}
        <div
          onClick={() => navigate("/app")}
          className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out group"
        >
          <div className="flex items-center gap-3 mb-3 text-2xl">
            <FiFileText /> <h3 className="text-2xl font-semibold group-hover:text-yellow-100 transition duration-300">Generate Resume</h3>
          </div>
          <p className="opacity-90 mb-5 group-hover:opacity-100 transition duration-300">
            Create a professional resume in minutes with CareerMate’s smart builder.
          </p>
        </div>

        {/* Check Your Skills */}
        <div
          onClick={() => window.open("http://localhost:3008", "_blank")}
          className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out group"
        >
          <div className="flex items-center gap-3 mb-3 text-2xl">
            <FiCheckCircle /> <h3 className="text-2xl font-semibold group-hover:text-yellow-50 transition duration-300">Check Your Skills</h3>
          </div>
          <p className="opacity-90 mb-5 group-hover:opacity-100 transition duration-300">
            Test your knowledge instantly.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2025 CareerMate. All rights reserved.</p>
          <p className="flex items-center gap-3">
            Contributors: 
            <span className="hover:underline underline-offset-2 transition">Rinki</span>, 
            <span className="hover:underline underline-offset-2 transition">Palak</span>, 
            <span className="hover:underline underline-offset-2 transition">Kuldeep</span>
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition">Twitter</a>
            <a href="#" className="hover:text-gray-300 transition">LinkedIn</a>
            <a href="#" className="hover:text-gray-300 transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
