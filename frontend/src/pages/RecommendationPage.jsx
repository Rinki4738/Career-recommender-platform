// import { useEffect, useState } from "react";

// function RecommendationsPage() {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchRecommendations() {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:4000/api/recommend/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setRecommendations(data);
//         } else {
//           console.error("Error fetching recommendations:", data);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRecommendations();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Recommended Opportunities
//           </h2>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-10">
//         {loading ? (
//           <div className="text-center py-20">
//             <p className="text-gray-500 animate-pulse">
//               Loading recommendations...
//             </p>
//           </div>
//         ) : recommendations.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-gray-500">
//               No recommendations available at the moment.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {recommendations.map((opp, index) => {
//               // Dynamic gradient per card
//               const gradients = [
//                 "from-indigo-500 via-purple-500 to-pink-500",
//                 "from-blue-500 via-cyan-400 to-teal-400",
//                 "from-green-500 via-emerald-400 to-lime-400",
//                 "from-rose-500 via-pink-400 to-orange-400",
//                 "from-fuchsia-500 via-purple-400 to-indigo-400",
//               ];
//               const gradient = gradients[index % gradients.length];

//               return (
//                 <div
//                   key={opp._id}
//                   className={`relative p-[2px] rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-gradient-to-r ${gradient}`}
//                 >
//                   <div className="bg-white rounded-3xl p-6 h-full flex flex-col justify-between">
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                           <span className="text-indigo-500">💼</span>
//                           {opp.title}
//                         </h3>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-1">
//                         {opp.companyOrOrganizer}
//                       </p>
//                       {opp.location && (
//                         <p className="text-sm text-gray-500 flex items-center gap-1">
//                           <span>📍</span>
//                           {opp.location}
//                         </p>
//                       )}
//                     </div>

//                     <button className="mt-5 flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition">
//                       View Details <span>➡️</span>
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default RecommendationsPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      try {
        // fetch recommendations
        const recRes = await fetch(`${import.meta.env.VITE_API_URL}/api/recommend/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const recData = await recRes.json();
        if (recRes.ok) setRecommendations(recData);

        // fetch user info
        const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        if (userRes.ok) setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // get initials if no avatar
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left Section — Home + Heading */}
          <div className="flex items-center gap-3">
            {/* Home icon */}
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Go to Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75h-4.5A.75.75 0 0115 21v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
                />
              </svg>
            </button>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Recommended Opportunities
            </h2>
          </div>

          {/* Profile icon */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium hidden sm:block">
                {user.name}
              </span>
              {user.avatarUrl ? (
                <img
                  onClick={() => navigate("/profile")}
                  src={user.avatarUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-indigo-400 transition"
                />
              ) : (
                <div
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold cursor-pointer hover:ring-2 hover:ring-indigo-400 transition"
                >
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500 animate-pulse">
              Loading recommendations...
            </p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No recommendations available at the moment...Please go and Update your Profile.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((opp, index) => {
              const gradients = [
                "from-indigo-500 via-purple-500 to-pink-500",
                "from-blue-500 via-cyan-400 to-teal-400",
                "from-green-500 via-emerald-400 to-lime-400",
                "from-rose-500 via-pink-400 to-orange-400",
                "from-fuchsia-500 via-purple-400 to-indigo-400",
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <div
                  key={opp._id}
                  className={`relative p-[2px] rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-gradient-to-r ${gradient}`}
                >
                  <div className="bg-white rounded-3xl p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-1">
                        <span className="text-indigo-500">💼</span>
                        {opp.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {opp.companyOrOrganizer}
                      </p>
                      {opp.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <span>📍</span> {opp.location}
                        </p>
                      )}
                    </div>

                    <button
  onClick={() => navigate(`/opportunity/${opp._id}`)}
  className="mt-5 flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
>
  View Details <span>➡️</span>
</button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default RecommendationsPage;
