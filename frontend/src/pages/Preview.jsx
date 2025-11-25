import React from "react";

const ResumePreview = ({ data, template, accentColor,classes }) => {
  if (!data) return null;

  const {
    full_name,
    personal_info = {},
    professional_summary,
    experience = [],
    education = [],
    project = [],
    skills = []
  } = data;

  return (
    <div
      className={`w-full p-8 text-slate-800 print:p-0 ${classes}`}
      style={{
        background: "white",
        "--accent": accentColor,
      }}
    >
      {/* PRINT CSS INSIDE COMPONENT */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .resume-print-area,
            .resume-print-area * {
              visibility: visible !important;
            }
            .resume-print-area {
              position: absolute;
              inset: 0;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}
      </style>

      <div className="resume-print-area">

        {/* Header */}
        <div
          className="border-b pb-4 mb-6"
          style={{ borderColor: "var(--accent)" }}
        >
          <h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
            {personal_info.full_name || "Your Name"}
          </h1>

          <p className="text-sm mt-1">
            {personal_info.email || "email@example.com"} •{" "}
            {personal_info.location || "Location"}
          </p>
        </div>

        {/* Summary */}
        {professional_summary && (
          <section className="mb-6">
            <h2
              className="text-xl font-semibold mb-1"
              style={{ color: "var(--accent)" }}
            >
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">
              {professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--accent)" }}
            >
              Experience
            </h2>

            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-slate-600">{exp.company}</p>
                <p className="text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--accent)" }}
            >
              Education
            </h2>

            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-slate-600">{edu.school}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {project.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--accent)" }}
            >
              Projects
            </h2>

            {project.map((p, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-slate-600">{p.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-4">
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--accent)" }}
            >
              Skills
            </h2>

            <div className="flex gap-2 flex-wrap">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
