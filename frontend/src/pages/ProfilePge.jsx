// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../utils/auth";

const emptyExperience = () => ({
  job_title: "",
  company: "",
  location: "",
  start_date: "",
  end_date: "",
  description: "",
});

const emptyEducation = () => ({
  degree: "",
  school: "",
  location: "",
  start_year: "",
  end_year: "",
});

const emptyProject = () => ({
  title: "",
  url: "",
  description: "",
  technologies: [],
});

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [skillsInput, setSkillsInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) return navigate("/login");

    (async function fetchProfile() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          showNotification(data.error || "Failed to fetch profile", "error");
          return;
        }

        const normalized = {
          name: data.name || "",
          email: data.email || "",
          personal_info: data.personal_info || {},
          professional_summary: data.professional_summary || "",
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: Array.isArray(data.education) ? data.education : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          preferences: data.preferences || { theme: "light", accent_color: "#3B82F6", default_template: "classic", location: "" },
          resumeBullets: Array.isArray(data.resumeBullets) ? data.resumeBullets : [],
        };

        setUser(normalized);
        setForm(normalized);
        setSkillsInput((normalized.skills || []).join(", "));
      } catch (err) {
        showNotification("Error fetching profile", "error");
      }
    })();
  }, [navigate]);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleInput = (path, value) => {
    setForm(prev => {
      const out = JSON.parse(JSON.stringify(prev || {}));
      const keys = path.split(".");
      let cur = out;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!cur[keys[i]]) cur[keys[i]] = {};
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return out;
    });
  };

  // array helpers
  const addItem = (field, factory) =>
    setForm(prev => ({ ...prev, [field]: [...(prev[field] || []), factory()] }));

  const updateItemField = (field, idx, key, value) =>
    setForm(prev => {
      const list = [...(prev[field] || [])];
      list[idx] = { ...list[idx], [key]: value };
      return { ...prev, [field]: list };
    });

  const removeItem = (field, idx) =>
    setForm(prev => {
      const list = [...(prev[field] || [])];
      list.splice(idx, 1);
      return { ...prev, [field]: list };
    });

  const updateProjectField = (idx, key, value) =>
    setForm(prev => {
      const list = [...(prev.projects || [])];
      list[idx] = { ...list[idx], [key]: value };
      return { ...prev, projects: list };
    });

  const handleSave = async () => {
    const token = getToken();
    if (!token) return navigate("/login");

    try {
      const payload = {
        name: form.name,
        personal_info: form.personal_info,
        professional_summary: form.professional_summary,
        experience: form.experience,
        education: form.education,
        projects: form.projects,
        skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean), // updated
        preferences: form.preferences,
        resumeBullets: form.resumeBullets,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/update`, {  // <-- ensure route matches backend
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        showNotification(data.error || "Update failed", "error");
        return;
      }

      setUser(data);
      setForm(data);
      setSkillsInput((data.skills || []).join(", "));
      setEditing(false);
      showNotification("Profile updated", "success");
    } catch (err) {
      showNotification("Error updating profile", "error");
    }
  };

  const handleLogout = () => {
    clearToken();
    showNotification("Logged out", "info");
    setTimeout(() => navigate("/login"), 800);
  };

  if (!user || !form) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile…</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded bg-gray-100" onClick={() => setEditing(e => !e)}>
              {editing ? "Preview" : "Edit"}
            </button>
            <button className="px-4 py-2 rounded bg-red-50" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 text-center">
            <div className="mb-4">
              <img
                src={form.personal_info?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(form.name || "user")}`}
                alt="avatar"
                className="w-28 h-28 rounded-full mx-auto border"
              />
            </div>
            <h2 className="text-xl font-semibold">{form.name}</h2>
            <p className="text-sm text-slate-500">{form.personal_info?.location}</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm text-slate-600">Full name</label>
              <input
                value={form.name}
                onChange={e => handleInput("name", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                readOnly={!editing}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <input
                value={form.personal_info?.email || form.email}
                onChange={e => handleInput("personal_info.email", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                readOnly={!editing}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input placeholder="Phone" value={form.personal_info?.phone || ""} onChange={e => handleInput("personal_info.phone", e.target.value)} className="border px-3 py-2 rounded" readOnly={!editing} />
              <input placeholder="Location" value={form.personal_info?.location || ""} onChange={e => handleInput("personal_info.location", e.target.value)} className="border px-3 py-2 rounded" readOnly={!editing} />
              <input placeholder="LinkedIn" value={form.personal_info?.linkedin || ""} onChange={e => handleInput("personal_info.linkedin", e.target.value)} className="border px-3 py-2 rounded" readOnly={!editing} />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm text-slate-600">Skills (comma separated)</label>
              <input
                value={skillsInput}
                onChange={e => setSkillsInput(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                readOnly={!editing}
                placeholder="e.g. JavaScript, Python, React"
              />
              <div className="mt-2 flex gap-2 flex-wrap">
                {skillsInput.split(",").map(s => s.trim()).filter(Boolean).map(s => (
                  <span key={s} className="px-3 py-1 rounded bg-slate-200 text-sm">{s}</span>
                ))}
              </div>
            </div>

            {/* Professional summary */}
            <div>
              <label className="block text-sm text-slate-600">Professional summary</label>
              <textarea value={form.professional_summary || ""} onChange={e => handleInput("professional_summary", e.target.value)} className="w-full border px-3 py-2 rounded mt-1" rows={4} readOnly={!editing} />
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          {(form.experience || []).map((exp, idx) => (
            <div key={idx} className="mb-4 border p-3 rounded">
              <input value={exp.job_title} placeholder="Job Title" onChange={e => updateItemField("experience", idx, "job_title", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={exp.company} placeholder="Company" onChange={e => updateItemField("experience", idx, "company", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={exp.location} placeholder="Location" onChange={e => updateItemField("experience", idx, "location", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={exp.start_date} placeholder="Start Date" onChange={e => updateItemField("experience", idx, "start_date", e.target.value)} className="border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={exp.end_date} placeholder="End Date" onChange={e => updateItemField("experience", idx, "end_date", e.target.value)} className="border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <textarea value={exp.description} placeholder="Description" onChange={e => updateItemField("experience", idx, "description", e.target.value)} className="w-full border px-2 py-1 rounded" readOnly={!editing} />
              {editing && <button onClick={() => removeItem("experience", idx)} className="text-red-500 text-sm mt-1">Remove</button>}
            </div>
          ))}
          {editing && <button onClick={() => addItem("experience", emptyExperience)} className="bg-blue-500 text-white px-3 py-1 rounded">Add Experience</button>}
        </div>

        {/* EDUCATION */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {(form.education || []).map((edu, idx) => (
            <div key={idx} className="mb-4 border p-3 rounded">
              <input value={edu.degree} placeholder="Degree" onChange={e => updateItemField("education", idx, "degree", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={edu.school} placeholder="School" onChange={e => updateItemField("education", idx, "school", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={edu.location} placeholder="Location" onChange={e => updateItemField("education", idx, "location", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={edu.start_year} placeholder="Start Year" onChange={e => updateItemField("education", idx, "start_year", e.target.value)} className="border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={edu.end_year} placeholder="End Year" onChange={e => updateItemField("education", idx, "end_year", e.target.value)} className="border px-2 py-1 rounded mb-1" readOnly={!editing} />
              {editing && <button onClick={() => removeItem("education", idx)} className="text-red-500 text-sm mt-1">Remove</button>}
            </div>
          ))}
          {editing && <button onClick={() => addItem("education", emptyEducation)} className="bg-blue-500 text-white px-3 py-1 rounded">Add Education</button>}
        </div>

        {/* PROJECTS */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          {(form.projects || []).map((proj, idx) => (
            <div key={idx} className="mb-4 border p-3 rounded">
              <input value={proj.title} placeholder="Project Title" onChange={e => updateProjectField(idx, "title", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <input value={proj.url} placeholder="Project URL" onChange={e => updateProjectField(idx, "url", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              <textarea value={proj.description} placeholder="Description" onChange={e => updateProjectField(idx, "description", e.target.value)} className="w-full border px-2 py-1 rounded mb-1" readOnly={!editing} />
              {editing && <button onClick={() => removeItem("projects", idx)} className="text-red-500 text-sm mt-1">Remove</button>}
            </div>
          ))}
          {editing && <button onClick={() => addItem("projects", emptyProject)} className="bg-blue-500 text-white px-3 py-1 rounded">Add Project</button>}
        </div>

        {/* Preferences & Save */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <label className="text-sm text-slate-600">Theme</label>
            <select value={form.preferences?.theme || "light"} onChange={e => handleInput("preferences.theme", e.target.value)} disabled={!editing} className="border px-2 py-1 rounded">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <label className="text-sm text-slate-600">Accent</label>
            <input type="color" value={form.preferences?.accent_color || "#3B82F6"} onChange={e => handleInput("preferences.accent_color", e.target.value)} disabled={!editing} />
            
            <label className="text-sm text-slate-600">Template</label>
            <select value={form.preferences?.default_template || "classic"} onChange={e => handleInput("preferences.default_template", e.target.value)} disabled={!editing} className="border px-2 py-1 rounded">
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <div className="flex gap-3">
            {editing ? (
              <>
                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save Profile</button>
                <button onClick={() => { setForm(user); setSkillsInput((user.skills || []).join(", ")); setEditing(false); }} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit Profile</button>
            )}
          </div>
        </div>

        {/* Notification */}
        {notification.message && (
          <div className={`fixed bottom-6 right-6 p-3 rounded shadow text-white ${notification.type === "success" ? "bg-green-500" : notification.type === "info" ? "bg-blue-500" : "bg-red-500"}`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
