// import React, { useState, useEffect } from 'react';

// // --- Icon Components ---
// // A map of skill names to their corresponding SVG icon components.
// const SKILL_ICON_MAP = {
//     'javascript': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.82-2.22-1.926-3.15-.992-.855-2.227-1.46-3.64-1.778-.71-.158-1.42-.237-2.14-.237-.71 0-1.42.08-2.13.237-1.42.318-2.65.923-3.64 1.778-1.106.93-1.75 2.055-1.926 3.15H0l.004-12.552L24 5.72l-.002 12.556h-1.964zM6.634 13.52c.626 0 1.16-.217 1.604-.65.443-.434.665-.964.665-1.59 0-.625-.222-1.155-.665-1.59-.444-.433-1.006-.65-1.604-.65-.626 0-1.16.217-1.604.65-.443.435-.665.965-.665 1.59 0 .626.222 1.156.665 1.59.444.434.978.65 1.604.65zm8.762 0c.625 0 1.16-.217 1.603-.65.444-.434.666-.964.666-1.59 0-.625-.222-1.155-.666-1.59-.443-.433-1.006-.65-1.603-.65-.626 0-1.16.217-1.604.65-.443.435-.665.965-.665 1.59 0 .626.222 1.156.665 1.59.444.434.978.65 1.604.65z"/></svg>,
//     'python': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Python</title><path d="M11.24 7.21c0-1.967.006-3.565 0-3.633a.533.533 0 00-.533-.533h-3.21a.533.533 0 00-.533.533v7.212h-3.4a.533.533 0 00-.533.533v3.21c0 .294.24.533.533.533h3.4v4.305c0 1.967-.006 3.565 0 3.633a.533.533 0 00.533.533h3.21a.533.533 0 00.533-.533V15.3H12c3.413 0 5.067-2.738 5.067-5.067v-1.28c0-2.43-1.5-3.743-4.827-3.743h-.002zM8.533 4.173h1.6v3.21h-1.6V4.173zm-1.6 15.654v-3.21h1.6v3.21h-1.6zm8.107-7.533c0 1.258-1.018 2.276-2.276 2.276H11.2V8.307h1.564c1.258 0 2.276 1.018 2.276 2.276v1.711z" /></svg>,
//     'react': ({ className }) => <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg"><title>React</title><circle cx="0" cy="0" r="2.05" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>,
//     'java': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Java</title><path d="M12.852 11.454c-1.39-2.482-1.39-5.923 0-8.404l1.24 2.148c-.927 1.636-.927 3.473 0 5.11l-1.24 1.145zm-1.703 1.145L9.91 10.45c.928-1.636.928-3.473 0-5.11L11.15 3.2c1.39 2.481 1.39 5.922 0 8.404zm7.042 3.272C14.379 11.235 11.838 7.39 11.838 3.2c.165-1.536.055-2.688-.823-3.2L9.776.055C3.842 1.31 1.146 6.812 1.146 12.91c0 5.98 2.913 11.01 8.288 11.034l1.208-.05c.88-.055 1.043-1.428.823-3.255.055-1.922.934-3.624 2.086-4.832 1.537-1.702 3.84-2.195 5.654-2.195l.165-2.197zm-5.654-9.39c.274.604.274 1.263 0 1.868-.275-.605-.275-1.263 0-1.868z"/></svg>,
//     'c++': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>C++</title><path d="M14.22 3.72a1.5 1.5 0 00-1.065.444l-9 9.07a1.5 1.5 0 000 2.12l9 9.07a1.5 1.5 0 002.128-2.12l-7.96-8.01 7.96-8.01a1.5 1.5 0 00-1.062-2.564zM16.5 10.5h2v2h-2v2h2v2h-2v2h2v2h-2v-2h-2v2h-2v-2h2v-2h-2v-2h2v-2h-2v2h-2v-2h2V8.5h-2V6.5h2v-2h-2v-2h2v2h2v-2h2v2h-2v2zm0 2h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-2h2v2h-2v-2zm0-4h2v2h-2v-2zm4 0h2v2h-2v-2z" /></svg>,
//     'mongodb': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>MongoDB</title><path d="M12.93,2.26a11.45,11.45,0,0,0-9.17,4.52,1,1,0,0,0,0,.19,1,1,0,0,0,0,.19,11.4,11.4,0,0,0,4.52,9.17,11.5,11.5,0,0,0,9.17,0,11.4,11.4,0,0,0,4.52-9.17.93.93,0,0,0,0-.19,1,1,0,0,0,0-.19,11.45,11.45,0,0,0-9-4.52ZM12,21.5A9.5,9.5,0,1,1,21.5,12,9.5,9.5,0,0,1,12,21.5Z" /><path d="M12.44,5.43a.81.81,0,0,0-.88,0,11.23,11.23,0,0,0-4,3.58,1,1,0,0,0,.16,1.29,4.4,4.4,0,0,0,2.6,1.25,10,10,0,0,1-1.39,3.13.78.78,0,0,0,.13,1,1.83,1.83,0,0,0,1.23.63,1.6,1.6,0,0,0,1.2-.6,10,10,0,0,0,2.1-4.49,4.41,4.41,0,0,0,2.51-1.42.8.8,0,0,0,.19-1.05A11.25,11.25,0,0,0,12.44,5.43Z" /></svg>,
//     'express': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Express</title><path d="M23.63 1c-.34-.23-.78-.23-1.12 0L14.05 6.6a1.09 1.09 0 0 1-1.12 0L4.47 1C4.13.77 3.7.77 3.35 1L1.2 2.3c-.34.23-.34.64 0 .87l7.15 5.1c.34.23.78.23 1.12 0L16.63 3.2c.34-.23.34-.64 0-.87l-2.15-1.3zM1.19 12.08c-.34.23-.34.64 0 .87l8.47 5.68c.34.23.78.23 1.12 0l8.47-5.68c.34-.23.34-.64 0-.87l-1.07-.65c-.34-.23-.78-.23-1.12 0l-6.28 4.2c-.34.23-.78.23-1.12 0l-6.28-4.2c-.34-.23-.78-.23-1.12 0L1.2 12.08z" /></svg>,
//     'node.js': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Node.js</title><path d="M11.75 0C10.15 0 9.53 1.33 9.53 1.33L4.22 10.2h5.31s.62-1.33.62-1.33H15.8c0 .27.14.4.28.4h1.82c.28 0 .56-.13.56-.4s-.28-.4-.56-.4h-1.82c-.14 0-.28-.13-.28-.4V1.73c0-.27-.14-.4-.28-.4H11.75zM23.18 10.6h-5.31s-.62 1.33-.62 1.33H5.06s-.62-1.33-.62-1.33H.82c-.28 0-.56.13-.56.4s.28.4.56.4h3.64s.62 1.33.62 1.33h12.19s.62-1.33.62-1.33h3.64c.28 0 .56-.13.56-.4s-.28-.4-.56-.4zm-1.12 5.06L18.42 12h-2.1s-.62 1.33-.62 1.33H8.38s-.62-1.33-.62-1.33H5.66l3.64 3.63v6.93h5.6v-6.93l3.64-3.63h-2.1z"/></svg>,
//     'c': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>C</title><path d="M16.481 3.518A10.5 10.5 0 0 0 1.498 13.48a1.5 1.5 0 0 0 2.598 1.5A7.5 7.5 0 1 1 12 19.5a7.447 7.447 0 0 1-4.002-1.098A1.5 1.5 0 1 0 5.4 20.002a10.5 10.5 0 1 0 11.08-16.484z"/></svg>,
//     'ruby': ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Ruby</title><path d="M12.01 1.632l8.834 6.326-3.13 12.31H6.208l-3.13-12.31L12.01 1.632zm4.338 1.157l-1.002 4.1-3.64 2.6-3.72-2.45-1.122-4.25 4.802-3.43 4.682 3.43zM4.15 8.952l1.96 7.73h11.68l1.96-7.73-5.28 3.75-2.58 8.16-2.58-8.16-5.2-3.75z"/></svg>,
// };


// // --- Helper Components ---
// // SkillBadge: Displays a skill name with its icon.
// const SkillBadge = ({ skill }) => {
//     const normalizedSkill = skill.toLowerCase().trim().replace('.js', '');
//     const IconComponent = SKILL_ICON_MAP[normalizedSkill];
//     return (
//         <span className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1 rounded-full">
//             {IconComponent ? <IconComponent className="h-4 w-4" /> : null}
//             {skill}
//         </span>
//     );
// };

// // InfoCard: A reusable card for displaying a piece of information.
// const InfoCard = ({ icon, title, value }) => (
//     <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-4">
//         <div className="bg-slate-200 p-2 rounded-full">{icon}</div>
//         <div>
//             <p className="text-sm text-slate-500 font-medium">{title}</p>
//             <p className="text-base text-slate-800 font-semibold">{value}</p>
//         </div>
//     </div>
// );

// // --- Main Profile Page Component ---
// function ProfilePage() {
//     // Mock user data for initial display and fallback
//     const mockUser = {
//         name: "Alex Doe",
//         email: "alex.doe@example.com",
//         skills: ["React", "Node.js", "MongoDB", "Express", "Python", "Java", "C++", "Ruby", "C"],
//         resumeBullets: [
//             "Developed a full-stack web application with the MERN stack.",
//             "Contributed to an open-source Python library, improving performance by 15%.",
//             "Built high-performance services in Java and C++."
//         ],
//         preferences: {
//             roles: ["Full Stack Developer", "Backend Developer"],
//             location: "Remote",
//             minLPA: 25,
//         },
//     };

//     const [user, setUser] = useState(mockUser);
//     const [editing, setEditing] = useState(false);
//     const [form, setForm] = useState(mockUser);
//     const [notification, setNotification] = useState({ message: '', type: '' });
    
//     // NOTE: This is your original data fetching logic.
//     // It's commented out to allow the component to render with mock data in a standalone environment.
//     // Uncomment this section in your actual application.
//     /*
//     const navigate = useNavigate();
//     useEffect(() => {
//         async function fetchProfile() {
//             const token = getToken();
//             if (!token) {
//                 navigate("/login");
//                 return;
//             }
//             try {
//                 const res = await fetch("http://localhost:4000/api/user/me", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const data = await res.json();
//                 if (res.ok && !data.error) {
//                     const userData = {
//                         name: data.name || "",
//                         email: data.email || "",
//                         skills: data.skills || [],
//                         resumeBullets: data.resumeBullets || [],
//                         preferences: {
//                             roles: data.preferences?.roles || [],
//                             location: data.preferences?.location || "",
//                             minLPA: data.preferences?.minLPA || 0,
//                         },
//                     };
//                     setUser(userData);
//                     setForm(userData);
//                 } else {
//                     showNotification(data.error || "Failed to fetch profile", 'error');
//                 }
//             } catch (error) {
//                 showNotification("An error occurred while fetching your profile.", 'error');
//             }
//         }
//         fetchProfile();
//     }, [navigate]);
//     */

//     const showNotification = (message, type) => {
//         setNotification({ message, type });
//         setTimeout(() => {
//             setNotification({ message: '', type: '' });
//         }, 3000);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.startsWith("preferences.")) {
//             const key = name.split(".")[1];
//             setForm(prevForm => ({
//                 ...prevForm,
//                 preferences: { ...prevForm.preferences, [key]: value },
//             }));
//         } else {
//             setForm(prevForm => ({ ...prevForm, [name]: value }));
//         }
//     };
    
//     const handleArrayChange = (e, field) => {
//         const { value } = e.target;
//         setForm(prevForm => ({...prevForm, [field]: value.split('\n')}));
//     };

//     const handleSave = async () => {
//         showNotification("Profile updated successfully!", 'success');
//         setUser(form);
//         setEditing(false);

//         // NOTE: This is your original save logic.
//         // Uncomment it in your actual application.
//         /*
//         const token = getToken();
//         const payload = {
//             ...form,
//             skills: Array.isArray(form.skills) ? form.skills : form.skills.split(',').map(s => s.trim()),
//             resumeBullets: Array.isArray(form.resumeBullets) ? form.resumeBullets : form.resumeBullets.split('\n').map(s => s.trim()),
//             preferences: {
//                 ...form.preferences,
//                 roles: Array.isArray(form.preferences.roles) ? form.preferences.roles : form.preferences.roles.split(',').map(r => r.trim()),
//                 minLPA: Number(form.preferences.minLPA) || 0,
//             }
//         };

//         try {
//             const res = await fetch("http://localhost:4000/api/user/update", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//                 body: JSON.stringify(payload),
//             });
//             const data = await res.json();
//             if (res.ok) {
//                 setUser(data);
//                 setEditing(false);
//                 showNotification("Profile updated successfully!", 'success');
//             } else {
//                 showNotification(data.error || "Failed to update profile", 'error');
//             }
//         } catch (error) {
//             showNotification("An error occurred while updating your profile.", 'error');
//         }
//         */
//     };

//     const handleLogout = () => {
//         showNotification("You have been logged out.", 'info');
//         // NOTE: Your original logout logic
//         // clearToken();
//         // navigate("/login");
//     };
    
//     const renderEditView = () => (
//         <div className="space-y-6">
//             <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
//                 <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
//                 <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Programming Languages (comma-separated)</label>
//                 <input name="skills" value={Array.isArray(form.skills) ? form.skills.join(', ') : form.skills} onChange={(e) => setForm({...form, skills: e.target.value.split(',').map(s=>s.trim())})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Resume Highlights (one per line)</label>
//                 <textarea name="resumeBullets" value={Array.isArray(form.resumeBullets) ? form.resumeBullets.join('\n') : form.resumeBullets} onChange={(e) => handleArrayChange(e, 'resumeBullets')} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//              <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Preferred Roles (comma-separated)</label>
//                 <input name="preferences.roles" value={Array.isArray(form.preferences.roles) ? form.preferences.roles.join(', ') : form.preferences.roles} onChange={(e) => setForm({...form, preferences: {...form.preferences, roles: e.target.value.split(',').map(r => r.trim())}})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//              <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Preferred Location</label>
//                 <input name="preferences.location" value={form.preferences.location} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Minimum LPA</label>
//                 <input name="preferences.minLPA" type="number" value={form.preferences.minLPA} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
//             </div>
//             <div className="flex items-center gap-4 pt-4">
//                 <button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">Save Changes</button>
//                 <button onClick={() => setEditing(false)} className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors duration-300">Cancel</button>
//             </div>
//         </div>
//     );

//     const renderDisplayView = () => (
//         <div className="md:col-span-2 space-y-6">
//             <InfoCard icon={<MailIcon />} title="Email Address" value={user.email} />

//             <div className="bg-slate-100 p-4 rounded-lg">
//                 <h3 className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
//                     <BriefcaseIcon /> Resume Highlights
//                 </h3>
//                 <ul className="space-y-2 list-disc list-inside text-slate-700">
//                     {user.resumeBullets?.map((item, i) => <li key={i}>{item}</li>)}
//                 </ul>
//             </div>

//             <div className="bg-slate-100 p-4 rounded-lg">
//                 <h3 className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
//                     <CodeIcon /> Programming Languages
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                     {user.skills?.map((skill) => <SkillBadge key={skill} skill={skill} />)}
//                 </div>
//             </div>

//             <div className="bg-slate-100 p-4 rounded-lg">
//                 <h3 className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
//                     <SettingsIcon /> Preferences
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//                     <div>
//                         <p className="text-sm text-slate-500">Role</p>
//                         <p className="font-semibold text-slate-800">{user.preferences?.roles?.join(', ')}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-slate-500">Location</p>
//                         <p className="font-semibold text-slate-800">{user.preferences?.location}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-slate-500">Min. Salary</p>
//                         <p className="font-semibold text-slate-800">{user.preferences?.minLPA} LPA</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
//                 <button onClick={() => setEditing(true)} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">Edit Profile</button>
//                 <button onClick={handleLogout} className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors duration-300">Logout</button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-100 font-sans text-slate-800 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-5xl mx-auto">
//                 <div className="text-center mb-10">
//                     <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">My Profile</h1>
//                     <p className="mt-2 text-lg text-slate-600">Manage your profile information and preferences.</p>
//                 </div>

//                 <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-10">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
//                         <div className="md:col-span-1 flex flex-col items-center text-center">
//                             <div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mb-4 shadow-lg">
//                                 <img
//                                     src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
//                                     alt="Profile Avatar"
//                                     className="w-32 h-32 rounded-full border-4 border-white"
//                                 />
//                             </div>
//                             <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
//                         </div>

//                         {editing ? renderEditView() : renderDisplayView()}
//                     </div>
//                 </div>
//             </div>
            
//              {/* Notification Popup */}
//             {notification.message && (
//                 <div className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white animate-fade-in-out ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'info' ? 'bg-blue-500' : 'bg-red-500'}`}>
//                     {notification.message}
//                 </div>
//             )}
//         </div>
//     );
// }


// // --- SVG Icons for UI Elements ---

// const MailIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
// );
// const BriefcaseIcon = () => (
//    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
// );
// const CodeIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
// );
// const SettingsIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
// );


// export default ProfilePage;
// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../utils/auth";

// --- Skill Icons ---
const SKILL_ICON_MAP = {
  javascript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24">
      <title>JavaScript</title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 2L1.5 21h21L12 2z" />
    </svg>
  ),
  react: ({ className }) => (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348">
      <title>React</title>
      <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"></ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
      </g>
    </svg>
  ),
};

// --- Helper Components ---
const SkillBadge = ({ skill }) => {
  const normalizedSkill = skill.toLowerCase().trim();
  const IconComponent = SKILL_ICON_MAP[normalizedSkill];
  return (
    <span className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1 rounded-full">
      {IconComponent ? <IconComponent className="h-4 w-4" /> : null}
      {skill}
    </span>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-4">
    <div className="bg-slate-200 p-2 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-base text-slate-800 font-semibold">{value}</p>
    </div>
  </div>
);

// --- SVG Icons ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  // --- Fetch Profile ---
  useEffect(() => {
    async function fetchProfile() {
      const token = getToken();
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://localhost:4000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          const userData = {
            name: data.name || "",
            email: data.email || "",
            skills: data.skills || [],
            resumeBullets: data.resumeBullets || [],
            preferences: {
              roles: data.preferences?.roles || [],
              location: data.preferences?.location || "",
              minLPA: data.preferences?.minLPA || 0,
            },
          };
          setUser(userData);
          setForm(userData);
        } else {
          showNotification(data.error || "Failed to fetch profile", "error");
        }
      } catch (err) {
        showNotification("Error fetching profile", "error");
      }
    }
    fetchProfile();
  }, [navigate]);

  // --- Notifications ---
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // --- Handle Form Changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "preferences.roles") {
      // Convert comma-separated string to array safely
      setForm((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, roles: value.split(",").map((s) => s.trim()) },
      }));
    } else if (name === "skills") {
      // Convert comma-separated string to array
      setForm((prev) => ({ ...prev, skills: value.split(",").map((s) => s.trim()) }));
    } else if (name === "resumeBullets") {
      // Convert textarea string to array of lines
      setForm((prev) => ({ ...prev, resumeBullets: value.split("\n").map((s) => s.trim()) }));
    } else if (name.startsWith("preferences.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({ ...prev, preferences: { ...prev.preferences, [key]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Save Profile ---
  const handleSave = async () => {
    const token = getToken();
    const payload = {
      ...form,
    };

    try {
      const res = await fetch("http://localhost:4000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setEditing(false);
        showNotification("Profile updated successfully!", "success");
      } else {
        showNotification(data.error || "Failed to update profile", "error");
      }
    } catch (err) {
      showNotification("Error updating profile", "error");
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    clearToken();
    showNotification("Logged out", "info");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-100 font-sans text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            My Profile
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Manage your profile information and preferences.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mb-4 shadow-lg">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt="Profile Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
            </div>

            <div className="md:col-span-2 space-y-6">
              {/* === Edit Mode === */}
              {editing ? (
                <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <textarea
                    name="resumeBullets"
                    value={form.resumeBullets.join("\n")}
                    onChange={handleChange}
                    placeholder="Resume Highlights (one per line)"
                    className="w-full border px-3 py-2 rounded"
                    rows={4}
                  />
                  <input
                    type="text"
                    name="skills"
                    value={form.skills.join(", ")}
                    onChange={handleChange}
                    placeholder="Skills (comma separated)"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      name="preferences.roles"
                      value={form.preferences.roles.join(", ")}
                      onChange={handleChange}
                      placeholder="Roles"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <input
                      type="text"
                      name="preferences.location"
                      value={form.preferences.location}
                      onChange={handleChange}
                      placeholder="Location"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <input
                      type="number"
                      name="preferences.minLPA"
                      value={form.preferences.minLPA}
                      onChange={handleChange}
                      placeholder="Min. Salary"
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <InfoCard icon={<MailIcon />} title="Email Address" value={user.email} />
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
                      <BriefcaseIcon /> Resume Highlights
                    </h3>
                    <ul className="space-y-2 list-disc list-inside text-slate-700">
                      {user.resumeBullets?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
                      <CodeIcon /> Programming Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
                      <SettingsIcon /> Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-slate-500">Role</p>
                        <p className="font-semibold text-slate-800">
                          {user.preferences.roles.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Location</p>
                        <p className="font-semibold text-slate-800">{user.preferences.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Min. Salary</p>
                        <p className="font-semibold text-slate-800">{user.preferences.minLPA} LPA</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button
                      onClick={() => setEditing(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white animate-fade-in-out ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "info"
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
