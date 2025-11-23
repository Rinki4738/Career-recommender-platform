// src/pages/ResumeBuilder.jsx
import { 
  ArrowLeftIcon, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  DownloadIcon, 
  EyeIcon, 
  EyeOffIcon, 
  FileText, 
  FolderIcon, 
  GraduationCap, 
  Share2Icon, 
  Sparkles, 
  User 
} from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import PersonalInfoForm from '../Components/PersonalInfoForm';
import ResumePreview from '../Components/ResumePreview';
import TemplateSelector from '../Components/TemplateSelector';
import ColorPicker from '../Components/ColorPicker';
import ProfessionalSummaryForm from '../Components/ProfessionalSummaryForm';
import ExperienceForm from '../Components/ExperienceForm';
import EducationForm from '../Components/EducationForm';
import ProjectForm from '../Components/ProjectForm';
import SkillsForm from '../Components/SkillsForm';
import { dummyResumeData } from "../assets/assets";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  // Load existing resume if editing
  // 👉 Add this import at the top



// Load resume based on ID (seeded OR create)
const loadExistingResume = async () => {
  // CASE 1 → If user is creating resume → don't load seeded
  if (resumeId === "create") {
    console.log("Create mode → skip seeded loading");

    // keep default state but allow user autofill to override later
    setResumeData(prev => ({
      ...prev,
      title: "My Resume"
    }));

    return;
  }

  // CASE 2 → If resumeId is NOT create → load seeded demo resumes
  const seeded = dummyResumeData.find(r => r._id === resumeId);

  if (seeded) {
    setResumeData(seeded);
    document.title = seeded.title;
    console.log("Loaded seeded resume:", seeded);
  }
};


  // Fetch logged-in user profile for autofill
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:4000/api/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!data || data.error) return;

      setResumeData(prev => ({
        ...prev,
        title: prev.title || "My Resume",
        personal_info: {
          full_name: data.personal_info?.full_name || data.name || "",
          email: data.personal_info?.email || data.email || "",
          phone: data.personal_info?.phone || "",
          location: data.personal_info?.location || data.preferences?.location || "",
          linkedin: data.personal_info?.linkedin || "",
          github: data.personal_info?.github || "",
          portfolio: data.personal_info?.portfolio || "",
          image: data.personal_info?.image || ""
        },
        professional_summary: data.professional_summary || data.resumeBullets?.join(" ") || "",
        experience: Array.isArray(data.experience) ? data.experience : [],
        education: Array.isArray(data.education) ? data.education : [],
        projects: Array.isArray(data.projects) ? data.projects : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        template: data.preferences?.default_template || prev.template,
        accent_color: data.preferences?.accent_color || prev.accent_color,
        public: prev.public
      }));

    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

 useEffect(() => {
  loadExistingResume();

  // Only fetch user data if creating new
  if (resumeId === "res123") {
    fetchUserProfile();
  }
}, [resumeId]);


  const changeResumeVisibility = () => {
    setResumeData(prev => ({ ...prev, public: !prev.public }));
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if (navigator.share)
      navigator.share({ url: resumeUrl, text: "My Resume" });
    else 
      alert("Sharing not supported on this browser");
  };

  const downloadResume = () => window.print();

  return (
    <div>
      {/* Back */}
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link 
          to={'/app'} 
          className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'
        >
          <ArrowLeftIcon className='size-4' /> Back to Dashboard
        </Link>
      </div>

      {/* Main */}
      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* LEFT SIDE – Forms */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>

              {/* Progress Bar */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr 
                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-700'
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} 
              />

              {/* Section Navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                <div className='flex items-center gap-2'>
                  <TemplateSelector 
                    selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                  />
                  <ColorPicker 
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                  />
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button 
                      onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                    >
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveSectionIndex(i => Math.min(i + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                  >
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* Forms */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))}
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                  />
                )}
              </div>

              <button 
                className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'
                onClick={() => {
                  // TODO: send PUT to backend to save updated resume data
                  alert("Save functionality not yet implemented here!");
                }}
              >
                Save Changes
              </button>

            </div>
          </div>

          {/* RIGHT SIDE – PREVIEW */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='sticky bottom-3 left-0 right-0 flex items-center justify-end gap-2 z-50 bg-white/70 backdrop-blur-sm p-2 rounded-lg'>
              
              {resumeData.public && (
                <button 
                  onClick={handleShare}
                  className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'
                >
                  <Share2Icon className='size-4' /> Share
                </button>
              )}

              <button 
                onClick={changeResumeVisibility}
                className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'
              >
                {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button 
                onClick={downloadResume}
                className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'
              >
                <DownloadIcon className='size-4' /> Download
              </button>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              classes=""
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
