// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { getToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    resumeBullets: "",
    preferences: { roles: [], location: "", minLPA: 0 },
  });
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch("http://localhost:4000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok || !data.error) {
        setUser(data);

        // Initialize form with defaults for old users
        setForm({
          name: data.name || "",
          email: data.email || "",
          skills: data.skills ? data.skills.join(", ") : "",
          resumeBullets: data.resumeBullets ? data.resumeBullets.join("\n") : "",
          preferences: {
            roles: data.preferences?.roles || [],
            location: data.preferences?.location || "",
            minLPA: data.preferences?.minLPA || 0,
          },
        });
      } else {
        alert(data.error || "Failed to fetch profile");
      }
    }
    fetchProfile();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("preferences.")) {
      const key = name.split(".")[1];
      if (key === "roles") {
        setForm({
          ...form,
          preferences: { ...form.preferences, roles: value.split(",").map(r => r.trim()) },
        });
      } else {
        setForm({
          ...form,
          preferences: { ...form.preferences, [key]: value },
        });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Save profile changes
  const handleSave = async () => {
    const token = getToken();
    const res = await fetch("http://localhost:4000/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        skills: form.skills.split(",").map((s) => s.trim()),
        resumeBullets: form.resumeBullets.split("\n").map((s) => s.trim()),
        preferences: {
          roles: form.preferences.roles,
          location: form.preferences.location,
          minLPA: Number(form.preferences.minLPA),
        },
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      setEditing(false);
      alert("Profile updated successfully!");
    } else {
      alert(data.error || "Failed to update profile");
    }
  };

  // Logout function
  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          My Profile
        </h2>

        {/* Show profile info */}
        {user && !editing && (
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-4">
              <img
                src="/default-avatar.png"
                alt="avatar"
                className="w-16 h-16 rounded-full border shadow"
              />
              <div>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <p>
              <b>Skills:</b>{" "}
              <span className="text-gray-600">
                {user.skills?.join(", ") || "Not added"}
              </span>
            </p>

            <p>
              <b>Resume Highlights:</b>{" "}
              <span className="text-gray-600">
                {user.resumeBullets?.join(", ") || "Not added"}
              </span>
            </p>

            <p>
              <b>Preferences:</b>{" "}
              <span className="text-gray-600">
                Roles: {user.preferences?.roles?.join(", ") || "N/A"}, Location:{" "}
                {user.preferences?.location || "N/A"}, Min LPA:{" "}
                {user.preferences?.minLPA || "N/A"}
              </span>
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Editing form */}
        {editing && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Skills
              </label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Comma separated skills"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Resume Highlights
              </label>
              <textarea
                name="resumeBullets"
                value={form.resumeBullets}
                onChange={handleChange}
                placeholder="Enter one bullet per line"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Preferred Roles
              </label>
              <input
                name="preferences.roles"
                value={form.preferences.roles.join(", ")}
                onChange={handleChange}
                placeholder="e.g., Full Stack Developer, SDE 1, Automation Tester"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Location Preference
              </label>
              <input
                name="preferences.location"
                value={form.preferences.location}
                onChange={handleChange}
                placeholder="City / Remote"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Minimum LPA
              </label>
              <input
                type="number"
                name="preferences.minLPA"
                value={form.preferences.minLPA}
                onChange={handleChange}
                placeholder="e.g., 5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
