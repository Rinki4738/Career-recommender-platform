import { useEffect, useState } from "react";

function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const token = localStorage.getItem("token"); // login token
      if (!token) {
      alert("Please login first");
      return;
    }

      const res = await fetch("http://localhost:4000/api/recommend/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRecommendations(data);
    }

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Opportunities</h2>
      <ul>
        {recommendations.map((opp) => (
          <li key={opp._id}>{opp.title} at {opp.companyOrOrganizer}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationsPage;
