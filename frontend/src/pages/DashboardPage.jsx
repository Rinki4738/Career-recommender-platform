





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken, logout } from "../utils/auth";
// import { FiArrowDown, FiUser, FiSettings, FiLogOut, FiClipboard, FiFileText, FiCheckCircle } from "react-icons/fi";

// function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
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
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 animate-pulse">
//         <p className="text-gray-600 text-lg">Loading your dashboard...</p>
//       </div>
//     );
//   }

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">

//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20 transition-shadow duration-300">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text tracking-tight">
//             CareerMate
//           </h1>

//           {user && (
//             <div className="relative flex items-center gap-4">
//               <span className="font-medium text-gray-700">{user.name}</span>
//               <div className="relative">
//                 <div
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   title="Profile Menu"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-purple-400 transition duration-300"
//                 >
//                   {user.avatarUrl ? (
//                     <img src={user.avatarUrl} alt="profile" className="w-10 h-10 rounded-full"/>
//                   ) : getInitials(user.name)}
//                 </div>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-30">
//                     <button onClick={() => navigate("/profile")} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
//                       <FiUser /> Profile
//                     </button>
//                     <button onClick={() => navigate("/settings")} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
//                       <FiSettings /> Settings
//                     </button>
//                     <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600">
//                       <FiLogOut /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Full-screen Welcome Section */}
//       <section className="flex-1 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full -z-10">
//           <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_70%)] animate-pulse-slow absolute"></div>
//           <div className="w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1),transparent_70%)] animate-pulse-slow absolute"></div>
//         </div>
//         <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
//           Welcome back, {user ? user.name : "there"} 👋
//         </h2>
//         <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
//           Explore recommended opportunities and generate a resume tailored just for you!
//         </p>
//         <FiArrowDown className="mt-10 text-white animate-bounce text-3xl"/>
//       </section>

//       {/* Cards Section */}
//       <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
//         {/* Recommended Opportunities */}
//         <div
//           onClick={() => navigate("/recommendations")}
//           className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out group"
//         >
//           <div className="flex items-center gap-3 mb-3 text-2xl">
//             <FiClipboard /> <h3 className="text-2xl font-semibold group-hover:text-yellow-100 transition duration-300">Recommended Opportunities</h3>
//           </div>
//           <p className="opacity-90 mb-5 group-hover:opacity-100 transition duration-300">
//             Explore opportunities tailored to your skills and profile!
//           </p>
//         </div>

//         {/* Generate Resume */}
//         <div
//           onClick={() => navigate("/app")}
//           className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out group"
//         >
//           <div className="flex items-center gap-3 mb-3 text-2xl">
//             <FiFileText /> <h3 className="text-2xl font-semibold group-hover:text-yellow-100 transition duration-300">Generate Resume</h3>
//           </div>
//           <p className="opacity-90 mb-5 group-hover:opacity-100 transition duration-300">
//             Create a professional resume in minutes with CareerMate’s smart builder.
//           </p>
//         </div>

//         {/* Check Your Skills */}
//         <div
//           onClick={() => window.open("http://localhost:3008", "_blank")}
//           className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out group"
//         >
//           <div className="flex items-center gap-3 mb-3 text-2xl">
//             <FiCheckCircle /> <h3 className="text-2xl font-semibold group-hover:text-yellow-50 transition duration-300">Check Your Skills</h3>
//           </div>
//           <p className="opacity-90 mb-5 group-hover:opacity-100 transition duration-300">
//             Test your knowledge instantly.
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-12 mt-auto">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p>© 2025 CareerMate. All rights reserved.</p>
//           <p className="flex items-center gap-3">
//             Contributors: 
//             <span className="hover:underline underline-offset-2 transition">Rinki</span>, 
//             <span className="hover:underline underline-offset-2 transition">Palak</span>, 
//             <span className="hover:underline underline-offset-2 transition">Kuldeep</span>
//           </p>
//           <div className="flex gap-4">
//             <a href="#" className="hover:text-gray-300 transition">Twitter</a>
//             <a href="#" className="hover:text-gray-300 transition">LinkedIn</a>
//             <a href="#" className="hover:text-gray-300 transition">GitHub</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default DashboardPage;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken, logout } from "../utils/auth";
// import { FiArrowDown, FiUser, FiSettings, FiLogOut, FiClipboard, FiFileText, FiCheckCircle } from "react-icons/fi";

// function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
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
//     return parts.length === 1
//       ? parts[0][0].toUpperCase()
//       : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   const scrollToCards = () => {
//     const section = document.getElementById("cards-section");
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
//         <p className="text-gray-600 text-lg font-medium animate-pulse">Loading your dashboard...</p>
//       </div>
//     );
//   }

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 font-sans">
//       {/* Header */}
//       <header className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-20 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1
//             className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300"
//             onClick={() => navigate("/")}
//           >
//             CareerMate
//           </h1>

//           {user && (
//             <div className="relative flex items-center gap-4">
//               <span className="hidden sm:block font-medium text-gray-700 text-sm md:text-base">{user.name}</span>
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   title="Profile Menu"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-purple-400 hover:scale-110 transition-all duration-300 shadow-md"
//                 >
//                   {user.avatarUrl ? (
//                     <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
//                   ) : (
//                     getInitials(user.name)
//                   )}
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-30">
//                     <button
//                       onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
//                       className="flex items-center gap-3 px-4 py-3 w-full hover:bg-indigo-50"
//                     >
//                       <FiUser /> Profile
//                     </button>
//                     <button
//                       onClick={() => { navigate("/settings"); setDropdownOpen(false); }}
//                       className="flex items-center gap-3 px-4 py-3 w-full hover:bg-indigo-50"
//                     >
//                       <FiSettings /> Settings
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 text-red-600"
//                     >
//                       <FiLogOut /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Welcome Section */}
//       <section className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
//         <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
//           Welcome back, {user ? user.name.split(" ")[0] : "there"}! 👋
//         </h2>
//         <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md leading-relaxed mb-8">
//           Ready to level up your career? Explore tailored opportunities or build your dream resume today.
//         </p>
//         <button
//           onClick={scrollToCards}
//           className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//         >
//           Get Started <FiArrowDown className="animate-bounce" />
//         </button>
//       </section>

//       {/* Cards Section */}
//       <section id="cards-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Quick Actions</h3>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose an option below to get started on your career journey.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
//           {/* Recommended Opportunities */}
//           <div
//             onClick={() => navigate("/recommendations")}
//             className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group border border-white/20"
//           >
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <FiClipboard className="text-3xl text-white/80 group-hover:text-white transition-colors" />
//                 <h3 className="text-2xl font-bold">Recommended Opportunities</h3>
//               </div>
//               <p className="opacity-90 mb-6 leading-relaxed group-hover:opacity-100 transition-opacity">
//                 Discover roles perfectly matched to your skills and preferences.
//               </p>
//             </div>
//             <button className="self-start bg-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-md">
//               View Jobs →
//             </button>
//           </div>

//           {/* Generate Resume */}
//           <div
//             onClick={() => navigate("/app")}
//             className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group border border-white/20"
//           >
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <FiFileText className="text-3xl text-white/80 group-hover:text-white transition-colors" />
//                 <h3 className="text-2xl font-bold">Generate Resume</h3>
//               </div>
//               <p className="opacity-90 mb-6 leading-relaxed group-hover:opacity-100 transition-opacity">
//                 Craft a standout, ATS-optimized resume in just minutes.
//               </p>
//             </div>
//             <button className="self-start bg-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-md">
//               Create Now →
//             </button>
//           </div>

//           {/* Check Your Skills */}
//           <div
//             onClick={() => window.open("http://localhost:3008", "_blank")}
//             className="cursor-pointer rounded-3xl p-8 shadow-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group border border-white/20"
//           >
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <FiCheckCircle className="text-3xl text-white/80 group-hover:text-white transition-colors" />
//                 <h3 className="text-2xl font-bold">Check Your Skills</h3>
//               </div>
//               <p className="opacity-90 mb-6 leading-relaxed group-hover:opacity-100 transition-opacity">
//                 Test and validate your knowledge to impress recruiters.
//               </p>
//             </div>
//             <button className="self-start bg-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-md">
//               Start Test →
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 mt-auto">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-sm md:text-base">© 2025 CareerMate. All rights reserved.</p>
//           <p className="text-sm md:text-base flex items-center gap-3">
//             Contributors:
//             <span className="hover:text-indigo-400 cursor-pointer">Rinki</span>,
//             <span className="hover:text-indigo-400 cursor-pointer">Palak</span>,
//             <span className="hover:text-indigo-400 cursor-pointer">Kuldeep</span>
//           </p>
//           <div className="flex gap-6">
//             <a href="#" className="text-sm hover:text-indigo-400">Twitter</a>
//             <a href="#" className="text-sm hover:text-indigo-400">LinkedIn</a>
//             <a href="#" className="text-sm hover:text-indigo-400">GitHub</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default DashboardPage;



// // ye na bo dark theme ka hai
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken, logout } from "../utils/auth";
// import { 
//   FiArrowDown, FiUser, FiSettings, FiLogOut, FiClipboard, 
//   FiFileText, FiCheckCircle, FiTrendingUp, FiBriefcase, FiAward 
// } from "react-icons/fi";

// function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
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
//     return parts.length === 1
//       ? parts[0][0].toUpperCase()
//       : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   const scrollToCards = () => {
//     const section = document.getElementById("cards-section");
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6"></div>
//         <p className="text-gray-300 text-xl font-medium animate-pulse">Loading your dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 shadow-xl flex flex-col">
//         <div className="p-6 border-b border-gray-700">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
//             CareerMate
//           </h1>
//         </div>
//         <nav className="flex-1 p-6">
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => navigate("/")}
//                 className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <FiTrendingUp /> Dashboard
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => navigate("/recommendations")}
//                 className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <FiBriefcase /> Opportunities
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => navigate("/app")}
//                 className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <FiFileText /> Resume Builder
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => window.open("http://localhost:3008", "_blank")}
//                 className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <FiAward /> Skill Test
//               </button>
//             </li>
//           </ul>
//         </nav>
//         <div className="p-6 border-t border-gray-700">
//           <p className="text-sm text-gray-400">© 2025 CareerMate</p>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-gray-800 shadow-lg border-b border-gray-700">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//             <div></div> {/* Spacer for sidebar alignment */}
//             {user && (
//               <div className="relative flex items-center gap-4">
//                 <span className="font-medium text-gray-300">{user.name}</span>
//                 <div className="relative">
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     title="Profile Menu"
//                     className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-blue-400 hover:scale-110 transition-all duration-300 shadow-lg"
//                   >
//                     {user.avatarUrl ? (
//                       <img src={user.avatarUrl} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
//                     ) : (
//                       getInitials(user.name)
//                     )}
//                   </button>

//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-3 w-52 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-30">
//                       <button
//                         onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
//                         className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-700 transition-colors"
//                       >
//                         <FiUser /> Profile
//                       </button>
//                       <button
//                         onClick={() => { navigate("/settings"); setDropdownOpen(false); }}
//                         className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-700 transition-colors"
//                       >
//                         <FiSettings /> Settings
//                       </button>
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-700 text-red-400 transition-colors"
//                       >
//                         <FiLogOut /> Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Welcome Section */}
//         <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 relative overflow-hidden">
//           <div
//             className="absolute inset-0 animate-pulse"
//             style={{
//               backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
//             }}
//           ></div>
//           <div className="relative z-10 max-w-4xl mx-auto">
//             <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl leading-tight">
//               Welcome back, {user ? user.name.split(" ")[0] : "there"}! 👋
//             </h2>
//             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto drop-shadow-lg leading-relaxed mb-10">
//               Elevate your career with personalized opportunities, professional resume creation, and skill assessments.
//             </p>
//             <button
//               onClick={scrollToCards}
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-5 rounded-full font-bold text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
//             >
//               Get Started <FiArrowDown className="animate-bounce" />
//             </button>
//           </div>
//         </section>

//         {/* Cards Section */}
//         <section id="cards-section" className="max-w-7xl mx-auto px-6 py-20">
//           <div className="text-center mb-16">
//             <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Your Quick Actions</h3>
//             <p className="text-gray-400 text-xl max-w-3xl mx-auto">Select an option to advance your professional journey.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {/* Recommended Opportunities */}
//             <div
//               onClick={() => navigate("/recommendations")}
//               className="cursor-pointer rounded-3xl p-10 shadow-2xl bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-3xl group border border-white/10"
//             >
//               <div>
//                 <div className="flex items-center gap-4 mb-6">
//                   <FiClipboard className="text-4xl text-white/80 group-hover:text-white transition-colors" />
//                   <h3 className="text-3xl font-bold">Opportunities</h3>
//                 </div>
//                 <p className="opacity-90 mb-8 leading-relaxed text-lg group-hover:opacity-100 transition-opacity">
//                   Discover curated job roles that align with your expertise and aspirations.
//                 </p>
//               </div>
//               <button className="self-start bg-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
//                 Explore Jobs →
//               </button>
//             </div>

//             {/* Generate Resume */}
//             <div
//               onClick={() => navigate("/app")}
//               className="cursor-pointer rounded-3xl p-10 shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-3xl group border border-white/10"
//             >
//               <div>
//                 <div className="flex items-center gap-4 mb-6">
//                   <FiFileText className="text-4xl text-white/80 group-hover:text-white transition-colors" />
//                   <h3 className="text-3xl font-bold">Resume Builder</h3>
//                 </div>
//                 <p className="opacity-90 mb-8 leading-relaxed text-lg group-hover:opacity-100 transition-opacity">
//                   Build an impactful, ATS-friendly resume effortlessly.
//                 </p>
//               </div>
//               <button className="self-start bg-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
//                 Create Resume →
//               </button>
//             </div>

//             {/* Check Your Skills */}
//             <div
//               onClick={() => window.open("http://localhost:3008", "_blank")}
//               className="cursor-pointer rounded-3xl p-10 shadow-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-3xl group border border-white/10"
//             >
//               <div>
//                 <div className="flex items-center gap-4 mb-6">
//                   <FiCheckCircle className="text-4xl text-white/80 group-hover:text-white transition-colors" />
//                   <h3 className="text-3xl font-bold">Skill Assessment</h3>
//                 </div>
//                 <p className="opacity-90 mb-8 leading-relaxed text-lg group-hover:opacity-100 transition-opacity">
//                   Evaluate and showcase your skills to stand out in the job market.
//                 </p>
//               </div>
//               <button className="self-start bg-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
//                 Take Test →
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-800 text-gray-400 py-12 mt-auto border-t border-gray-700">
//           <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//             <p className="text-sm">© 2025 CareerMate. All rights reserved.</p>
//             <p className="text-sm flex items-center gap-4">
//               Contributors:
//               <span className="hover:text-blue-400 cursor-pointer transition-colors">Rinki</span>,
//               <span className="hover:text-blue-400 cursor-pointer transition-colors">Palak</span>,
//               <span className="hover:text-blue-400 cursor-pointer transition-colors">Kuldeep</span>
//             </p>
//             <div className="flex gap-6">
//               <a href="#" className="text-sm hover:text-blue-400 transition-colors">Twitter</a>
//               <a href="#" className="text-sm hover:text-blue-400 transition-colors">LinkedIn</a>
//               <a href="#" className="text-sm hover:text-blue-400 transition-colors">GitHub</a>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;


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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* Skill Assessment */}
          <div
            onClick={() => window.open("http://localhost:3008", "_blank")}
            className="cursor-pointer rounded-2xl p-8 bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <FiCheckCircle className="text-3xl text-yellow-500" />
                <h3 className="text-2xl font-semibold">Skill Assessment</h3>
              </div>
              <p className="text-gray-600 text-base mb-4">
                Evaluate and showcase your skills to stand out in the job market.
              </p>
            </div>
            <button className="self-start bg-yellow-100 px-6 py-3 rounded-full font-semibold text-yellow-700 hover:bg-yellow-200 transition-all duration-300">
              Take Test →
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
