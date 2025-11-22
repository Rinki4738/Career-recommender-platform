import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalCorporate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white text-gray-900 font-sans leading-relaxed border border-gray-200 shadow-sm">
      {/* Header */}
      <header className="border-b pb-4 mb-6">
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-700">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold mb-2 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 text-xs">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <ul className="space-y-3">
            {data.project.map((proj, index) => (
              <li key={index}>
                <p className="font-medium text-gray-900">{proj.name}</p>
                <p className="text-sm text-gray-700">{proj.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-xs text-gray-600">
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-3 text-sm text-gray-800">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="border px-3 py-1 rounded-full border-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalCorporate;
