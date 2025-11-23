import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opp, setOpp] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userSkills, setUserSkills] = useState([]);
  const [matchScore, setMatchScore] = useState(0);
  const [missingSkills, setMissingSkills] = useState([]);

  const [openCourse, setOpenCourse] = useState(null);
  const [courses, setCourses] = useState({}); // dynamic fetched courses


  // ---------------- FETCH USER SKILLS ----------------
async function fetchUserSkills() {
  try {
    const res = await fetch("http://localhost:4000/api/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      setUserSkills(data.skills || []);
    } else {
      console.error("Unauthorized:", data);
    }
  } catch (err) {
    console.error(err);
  }
}



  // ---------------- FETCH OPP DETAILS ----------------
  useEffect(() => {
    async function fetchOpp() {
      try {
        const res = await fetch(`http://localhost:4000/api/opportunities/${id}`);
        const data = await res.json();
        if (res.ok) setOpp(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOpp();
    fetchUserSkills();
  }, [id]);

  // ---------------- SKILL MATCH CALCULATION ----------------
  useEffect(() => {
    if (!opp || !userSkills.length) return;

    const jobSkills = opp.skills.map((s) => s.toLowerCase().trim());
    const user = userSkills.map((s) => s.toLowerCase().trim());

    const match = jobSkills.filter((skill) => user.includes(skill));
    const missing = jobSkills.filter((skill) => !user.includes(skill));

    setMissingSkills(missing);
    setMatchScore(Math.round((match.length / jobSkills.length) * 100));
  }, [opp, userSkills]);

  // ---------------- ADD SKILL TO USER PROFILE ----------------
  async function addSkillToProfile(skill) {
  try {
    const res = await fetch("http://localhost:4000/api/user/add-skill", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ skill }),
    });

    const data = await res.json();

    if (res.ok) {
      // Update state using returned data if API sends updated skills
      setUserSkills(data.skills || [...userSkills, skill]);
      setMissingSkills(prev => prev.filter(s => s !== skill));
    } else {
      console.error("Skill add failed:", data);
      alert(data.error || "Failed to add skill");
    }
  } catch (err) {
    console.error("Skill add error:", err);
    alert("Error adding skill, check console");
  }
}


  // ---------------- FETCH COURSES FROM COURSERA API ----------------
  


  // Load courses on dropdown open
  async function handleCourseOpen(skill) {
    setOpenCourse(openCourse === skill ? null : skill);

    
  }

  if (loading)
    return (
      <div className="flex justify-center py-32 text-gray-600 animate-pulse">
        Loading opportunity...
      </div>
    );

  if (!opp)
    return (
      <div className="text-center py-32 text-gray-600">
        Opportunity not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition"
      >
        ⬅ Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">

        {/* SCORE CIRCLE (top right) */}
        <div className="absolute top-6 right-6">
          <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center text-indigo-700 font-bold text-xl bg-indigo-50 shadow">
            {matchScore}%
            <span className="text-xs text-gray-600 font-normal">Match</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            💼 {opp.title}
          </h1>
          <p className="text-lg text-gray-600 mt-1">{opp.companyOrOrganizer}</p>

          <div className="flex gap-5 mt-3 text-gray-500">
            {opp.location && (
              <p className="flex items-center gap-1">📍 {opp.location}</p>
            )}
            <p>💼 {opp.workType}</p>
            <p>🌐 Remote: {opp.remote ? "Yes" : "No"}</p>
          </div>

          <p className="mt-3 font-semibold text-indigo-600">
            💰 Salary / Stipend:{" "}
            {opp.salaryLPA ? `${opp.salaryLPA} LPA` : opp.stipend || "Not Mentioned"}
          </p>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">📄 Description</h2>
          <p className="text-gray-700">{opp.description}</p>
        </section>

        {/* Responsibilities */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            📝 Responsibilities
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {opp.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">📌 Requirements</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {opp.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              🧠 Skills Required
            </h2>

            <button
              onClick={() => navigate(`/app`)}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow hover:opacity-90 transition"
            >
              Generate Resume ⚡
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {opp.skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* MISSING SKILLS */}
        {missingSkills.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3 text-red-600">⚠ Missing Skills</h2>

            {missingSkills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-red-50 p-4 rounded-xl border border-red-200 mb-4"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-red-700">{skill}</span>

                  <button
                    onClick={() => addSkillToProfile(skill)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg"
                  >
                    + Add Skill
                  </button>
                </div>

                {/* COURSE SUGGESTIONS */}
                <button
                  onClick={() => handleCourseOpen(skill)}
                  className="mt-3 text-indigo-600 underline text-sm"
                >
                  {openCourse === skill ? "Hide Courses" : "Show Courses"}
                </button>

                {openCourse === skill &&
                  (courses[skill] || []).map((course, i) => (
                    <a
                      key={i}
                      href={course.url}
                      target="_blank"
                      className="block bg-white p-3 mt-2 rounded-lg border shadow-sm hover:bg-gray-50"
                    >
                      📘 {course.name}
                    </a>
                  ))}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default OpportunityDetails;
