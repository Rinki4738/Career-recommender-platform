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
    <div className="max-w-5xl mx-auto bg-white text-gray-900 font-sans shadow-md border border-gray-200">
      <div className="grid grid-cols-3">
        {/* Left Sidebar */}
        <aside
          className="col-span-1 bg-gray-50 p-6 border-r border-gray-200"
          style={{ borderColor: accentColor }}
        >
          {/* Name */}
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: accentColor }}
          >
            {data.personal_info?.full_name || "Your Name"}
          </h1>

          {/* Contact */}
          <div className="space-y-2 text-sm text-gray-700 mt-4">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-gray-600" />
                <span className="break-all">{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="break-all">{data.personal_info.website}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div
            className="my-5 h-px"
            style={{ backgroundColor: accentColor }}
          ></div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-base font-semibold mb-2 uppercase tracking-wide"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <ul className="text-sm text-gray-800 space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index} className="before:content-['•'] before:mr-2">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2
                className="text-base font-semibold mb-2 uppercase tracking-wide"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-3 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-medium">{edu.degree}</p>
                    {edu.field && (
                      <p className="text-gray-700">{edu.field}</p>
                    )}
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="col-span-2 p-8">
          {/* Professional Summary */}
          {data.professional_summary && (
            <section className="mb-6">
              <h2
                className="text-lg font-semibold mb-2 border-b-2 pb-1 uppercase"
                style={{ borderColor: accentColor, color: accentColor }}
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
                className="text-lg font-semibold mb-3 border-b-2 pb-1 uppercase"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-700">{exp.company}</p>
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
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
            <section>
              <h2
                className="text-lg font-semibold mb-3 border-b-2 pb-1 uppercase"
                style={{ borderColor: accentColor, color: accentColor }}
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
        </main>
      </div>
    </div>
  );
};

export default MinimalCorporate;
