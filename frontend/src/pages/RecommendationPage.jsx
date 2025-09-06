// src/pages/RecommendationPage.jsx
import { useState, useEffect } from "react";
import { getToken } from "../utils/auth";

function RecommendationPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Please login first!");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:4000/api/job/recommend", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setJobs(data.recommended);
        } else {
          setError(data.error || "Failed to fetch recommendations");
        }
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Recommended Jobs</h2>
      {jobs.length === 0 ? (
        <p>No recommendations found. Update your skills!</p>
      ) : (
        <ul>
          {jobs.map((job, i) => (
            <li key={i}>
              <h3>{job.title}</h3>
              <p>{job.company} - {job.location}</p>
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                Apply
              </a>
              <p><strong>Skills:</strong> {job.skills?.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendationPage;
