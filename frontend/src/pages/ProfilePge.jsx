// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { getToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", skills: "" });
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
      if (res.ok) {
        setUser(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          skills: data.skills ? data.skills.join(", ") : "",
        });
      } else {
        alert(data.error || "Failed to fetch profile");
      }
    }
    fetchProfile();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
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
    <div>
      <h2>Profile</h2>

      {user && !editing && (
        <div>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Skills:</b> {user.skills?.join(", ")}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {editing && (
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Comma separated skills"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
