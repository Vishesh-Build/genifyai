"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AdSlot } from "@/components/ui/AdSlot";
import Link from "next/link";

interface Experience { role: string; company: string; duration: string; bullets: string; }
interface Education { degree: string; school: string; year: string; }
interface ResumeData {
  name: string; title: string; email: string; phone: string; location: string;
  summary: string; experience: Experience[]; education: Education[]; skills: string[];
}

const emptyExp = (): Experience => ({ role: "", company: "", duration: "", bullets: "" });
const emptyEdu = (): Education => ({ degree: "", school: "", year: "" });

export default function ResumePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<ResumeData | null>(null);

  const [form, setForm] = useState({
    name: "", title: "", email: "", phone: "", location: "", summary: "",
    skills: "",
    experience: [emptyExp()],
    education: [emptyEdu()],
  });

  function updateField(field: string, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }
  function updateExp(idx: number, field: keyof Experience, val: string) {
    setForm((f) => {
      const exp = [...f.experience];
      exp[idx] = { ...exp[idx], [field]: val };
      return { ...f, experience: exp };
    });
  }
  function updateEdu(idx: number, field: keyof Education, val: string) {
    setForm((f) => {
      const edu = [...f.education];
      edu[idx] = { ...edu[idx], [field]: val };
      return { ...f, education: edu };
    });
  }

  async function handleGenerate() {
    if (!form.name || !form.email) {
      toast.error("Name and email are required!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.resume) {
        setResume(data.resume);
        setStep(3);
        toast.success("Resume generated!");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPDF() {
    if (!resume) return;
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = 210, margin = 18;
      let y = 0;

      // Header bar
      doc.setFillColor(18, 0, 42);
      doc.rect(0, 0, W, 42, "F");
      doc.setFillColor(124, 58, 237);
      doc.rect(0, 42, W, 1.5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.text(resume.name, margin, 18);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(192, 132, 252);
      doc.text(resume.title, margin, 27);

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      const contactParts = [resume.email, resume.phone, resume.location].filter(Boolean);
      doc.text(contactParts.join("  ·  "), margin, 36);

      y = 54;

      // Summary
      if (resume.summary) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(139, 92, 246);
        doc.text("SUMMARY", margin, y);
        doc.setFillColor(139, 92, 246);
        doc.rect(margin + 22, y - 1, W - margin * 2 - 22, 0.4, "F");
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const summaryLines = doc.splitTextToSize(resume.summary, W - margin * 2);
        doc.text(summaryLines, margin, y);
        y += summaryLines.length * 4.5 + 6;
      }

      // Experience
      if (resume.experience.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(139, 92, 246);
        doc.text("EXPERIENCE", margin, y);
        doc.setFillColor(139, 92, 246);
        doc.rect(margin + 30, y - 1, W - margin * 2 - 30, 0.4, "F");
        y += 5;
        for (const exp of resume.experience) {
          if (!exp.role) continue;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(exp.role, margin, y);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          if (exp.company) doc.text(exp.company, margin, y + 4.5);
          if (exp.duration) doc.text(exp.duration, W - margin, y + 4.5, { align: "right" });
          y += 10;
          if (exp.bullets) {
            const bulletLines = exp.bullets.split("\n").filter(Boolean);
            doc.setFontSize(8.5);
            doc.setTextColor(51, 65, 85);
            for (const b of bulletLines) {
              const lines = doc.splitTextToSize(`• ${b}`, W - margin * 2 - 3);
              doc.text(lines, margin + 2, y);
              y += lines.length * 4 + 1;
            }
          }
          y += 4;
        }
      }

      // Education
      if (resume.education.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(139, 92, 246);
        doc.text("EDUCATION", margin, y);
        doc.setFillColor(139, 92, 246);
        doc.rect(margin + 28, y - 1, W - margin * 2 - 28, 0.4, "F");
        y += 5;
        for (const edu of resume.education) {
          if (!edu.degree) continue;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(edu.degree, margin, y);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          if (edu.school) doc.text(edu.school, margin, y + 4.5);
          if (edu.year) doc.text(edu.year, W - margin, y + 4.5, { align: "right" });
          y += 12;
        }
      }

      // Skills
      if (resume.skills.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(139, 92, 246);
        doc.text("SKILLS", margin, y);
        doc.setFillColor(139, 92, 246);
        doc.rect(margin + 16, y - 1, W - margin * 2 - 16, 0.4, "F");
        y += 6;
        let x = margin;
        for (const skill of resume.skills) {
          const sw = doc.getTextWidth(skill) + 8;
          if (x + sw > W - margin) { x = margin; y += 7; }
          doc.setFillColor(245, 243, 255);
          doc.roundedRect(x, y - 4, sw, 6, 1.5, 1.5, "F");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(109, 40, 217);
          doc.text(skill, x + 4, y);
          x += sw + 4;
        }
      }

      doc.save(`${resume.name.replace(/\s+/g, "_")}_Resume.pdf`);
      toast.success("PDF downloaded!");
    } catch (e) {
      console.error(e);
      toast.error("PDF generation failed.");
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <AdSlot slot="resume-top" label="Advertisement" height={80} className="mb-10" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-6">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Back to Tools
        </Link>
        <span className="tag mb-4 inline-flex">◈ Resume Builder</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Resume <span className="gradient-text">Generator</span>
        </h1>
        <p className="text-slate-400 text-lg">Fill the form, get a professional PDF in seconds.</p>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step >= s ? "btn-glow text-white" : "bg-white/5 text-slate-600 border border-white/10"
            }`}>{s}</div>
            {s < 3 && <div className={`w-16 h-0.5 transition-all duration-500 ${step > s ? "bg-violet-500" : "bg-white/10"}`} />}
          </div>
        ))}
        <span className="text-sm text-slate-500 ml-2">
          {step === 1 ? "Basic Info" : step === 2 ? "Experience & Education" : "Preview & Download"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="glass rounded-2xl p-7 space-y-5">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name *", field: "name", placeholder: "Alex Johnson" },
                { label: "Job Title", field: "title", placeholder: "Senior Product Designer" },
                { label: "Email *", field: "email", placeholder: "alex@example.com" },
                { label: "Phone", field: "phone", placeholder: "+1 555 000 0000" },
                { label: "Location", field: "location", placeholder: "San Francisco, CA" },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
                  <input type="text" className="input-glass w-full px-4 py-3 text-sm" placeholder={placeholder}
                    value={form[field as keyof typeof form] as string}
                    onChange={(e) => updateField(field, e.target.value)} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">Skills (comma separated)</label>
                <input type="text" className="input-glass w-full px-4 py-3 text-sm"
                  placeholder="React, TypeScript, Figma, Node.js, Leadership..."
                  value={form.skills} onChange={(e) => updateField("skills", e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">Professional Summary</label>
                <textarea className="input-glass w-full h-24 px-4 py-3 resize-none text-sm"
                  placeholder="Brief overview of your background and strengths..."
                  value={form.summary} onChange={(e) => updateField("summary", e.target.value)} />
              </div>
            </div>
            <button onClick={() => setStep(2)}
              className="btn-glow w-full py-4 rounded-xl text-sm font-semibold text-white">
              Next: Experience & Education →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6">
            {/* Experience */}
            <div className="glass rounded-2xl p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Work Experience</h2>
                <button onClick={() => setForm((f) => ({ ...f, experience: [...f.experience, emptyExp()] }))}
                  className="btn-outline-glow px-3 py-1.5 rounded-lg text-xs font-medium">+ Add</button>
              </div>
              <div className="space-y-6">
                {form.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-violet-500/10 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-mono">Experience {idx + 1}</span>
                      {form.experience.length > 1 && (
                        <button onClick={() => setForm((f) => ({ ...f, experience: f.experience.filter((_, i) => i !== idx) }))}
                          className="text-xs text-red-500/60 hover:text-red-400 transition-colors">Remove</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input className="input-glass px-3 py-2.5 text-sm" placeholder="Job Title" value={exp.role} onChange={(e) => updateExp(idx, "role", e.target.value)} />
                      <input className="input-glass px-3 py-2.5 text-sm" placeholder="Company" value={exp.company} onChange={(e) => updateExp(idx, "company", e.target.value)} />
                      <input className="input-glass px-3 py-2.5 text-sm md:col-span-2" placeholder="Duration (e.g. Jan 2022 – Present)" value={exp.duration} onChange={(e) => updateExp(idx, "duration", e.target.value)} />
                    </div>
                    <textarea className="input-glass w-full h-20 px-3 py-2.5 resize-none text-sm"
                      placeholder="Key achievements (one per line)&#10;• Led team of 8 engineers&#10;• Increased revenue by 40%"
                      value={exp.bullets} onChange={(e) => updateExp(idx, "bullets", e.target.value)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass rounded-2xl p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Education</h2>
                <button onClick={() => setForm((f) => ({ ...f, education: [...f.education, emptyEdu()] }))}
                  className="btn-outline-glow px-3 py-1.5 rounded-lg text-xs font-medium">+ Add</button>
              </div>
              <div className="space-y-4">
                {form.education.map((edu, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input className="input-glass px-3 py-2.5 text-sm" placeholder="Degree / Certification" value={edu.degree} onChange={(e) => updateEdu(idx, "degree", e.target.value)} />
                    <input className="input-glass px-3 py-2.5 text-sm" placeholder="School / University" value={edu.school} onChange={(e) => updateEdu(idx, "school", e.target.value)} />
                    <input className="input-glass px-3 py-2.5 text-sm" placeholder="Year (e.g. 2020)" value={edu.year} onChange={(e) => updateEdu(idx, "year", e.target.value)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline-glow px-6 py-3.5 rounded-xl text-sm font-medium flex-1">← Back</button>
              <button onClick={handleGenerate} disabled={loading}
                className="btn-glow py-3.5 rounded-xl text-sm font-semibold text-white flex-[2] flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <><LoadingSpinner size={18} /><span>Generating...</span></> : "◈ Generate Resume PDF"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && resume && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            {/* Preview card */}
            <div className="glass rounded-2xl overflow-hidden mb-6">
              <div className="p-7" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.06))" }}>
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{resume.name}</h2>
                  <span className="tag">Preview</span>
                </div>
                <p className="text-violet-400 font-medium mb-1">{resume.title}</p>
                <p className="text-slate-500 text-sm">{[resume.email, resume.phone, resume.location].filter(Boolean).join(" · ")}</p>
              </div>
              <div className="px-7 pb-7">
                <div className="border-t border-violet-500/10 pt-5 mt-0 space-y-6">
                  {resume.summary && (
                    <div>
                      <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Summary</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{resume.summary}</p>
                    </div>
                  )}
                  {resume.experience.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Experience</h3>
                      <div className="space-y-4">
                        {resume.experience.map((exp, i) => (
                          <div key={i}>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-white font-semibold text-sm">{exp.role}</p>
                                <p className="text-slate-400 text-xs">{exp.company}</p>
                              </div>
                              <span className="text-slate-600 text-xs">{exp.duration}</span>
                            </div>
                            {exp.bullets && <p className="text-slate-400 text-xs mt-1 whitespace-pre-line leading-relaxed">{exp.bullets}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {resume.education.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Education</h3>
                      {resume.education.map((edu, i) => (
                        <div key={i} className="flex justify-between">
                          <div>
                            <p className="text-white text-sm font-medium">{edu.degree}</p>
                            <p className="text-slate-400 text-xs">{edu.school}</p>
                          </div>
                          <span className="text-slate-600 text-xs">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {resume.skills.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.map((s) => (
                          <span key={s} className="text-xs px-3 py-1 rounded-full"
                            style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-outline-glow px-6 py-3.5 rounded-xl text-sm font-medium">← Edit</button>
              <button onClick={handleDownloadPDF}
                className="btn-glow py-3.5 rounded-xl text-sm font-semibold text-white flex-1 flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Download PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12">
        <AdSlot slot="resume-bottom" label="Advertisement" height={200} />
      </div>
    </div>
  );
}
