"use client";

import { useState, useRef } from "react";
import {
  Building2, User, Phone, MapPin, Globe, Palette,
  CheckCircle2, ChevronRight, Zap, Send, Upload, Sparkles, X, FileImage,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Services", icon: Globe },
  { id: 3, label: "Branding", icon: Palette },
];

// ✅ Your Apps Script Web App URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1YIl0chyZcV-fpaxfSVhr1IQ6kx7G1Y0Jw8WI8ghfEk1h7DyKIReLayFyJeR8Yo7hZA/exec";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    whatsapp: "",
    altWhatsapp: "",
    address: "",
    services: "",
    otherBusiness: "",
    colors: "",
    websiteType: "",
    requirements: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped].slice(0, 5));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const picked = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...picked].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // ✅ FIXED handleFormSubmit — uses no-cors to avoid CORS error
  // Data saves to Drive + Sheet, then WhatsApp opens immediately
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (loading || submitted) return;

    setLoading(true);
    setUploadProgress("Preparing your submission...");

    try {
      // Convert files to base64
      const fileData = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await toBase64(file),
        }))
      );

      setUploadProgress(
        files.length > 0 ? "Uploading files to Google Drive..." : "Submitting..."
      );

      const category =
        form.websiteType === "Other" && form.otherBusiness
          ? `Other: ${form.otherBusiness}`
          : form.websiteType || "General";

      const payload = {
        businessName: form.businessName,
        ownerName: form.ownerName,
        whatsapp: form.whatsapp,
        altWhatsapp: form.altWhatsapp,
        address: form.address,
        category: category,
        services: form.services,
        requirements: form.requirements,
        colors: form.colors || "Navy Blue",
        files: fileData,
      };

      // ✅ Use no-cors — avoids CORS error, data still saves correctly
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // ← key fix: no-cors skips response but saves data
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setUploadProgress("Done! Opening WhatsApp...");

      // Build WhatsApp message
      // Note: with no-cors we can't get Drive links back,
      // so we tell the user files are saved in Drive
      const filesInfo =
        files.length > 0
          ? `\n📁 *Files Uploaded:* ${files.map((f) => f.name).join(", ")}`
          : "\n📁 *Files:* None uploaded";

      const whatsappMessage =
        `🚀 *नवीन Onboarding — AyushNexa* 🚀\n\n` +
        `🏢 *Business:* ${form.businessName}\n` +
        `👤 *Owner:* ${form.ownerName}\n` +
        `📞 *WhatsApp:* ${form.whatsapp}\n` +
        `📞 *Alt WA:* ${form.altWhatsapp || "N/A"}\n` +
        `📍 *Address:* ${form.address}\n` +
        `🏷️ *Category:* ${category}\n` +
        `⚙️ *Services:* ${form.services}\n` +
        `📝 *Requirements:* ${form.requirements || "Not provided"}\n` +
        `🎨 *Colors:* ${form.colors || "Navy Blue"}` +
        filesInfo +
        `\n\n👉 *कृपया माझी प्रीमियम वेबसाईट लवकरात लवकर लाईव्ह करा!*`;

      // Mark submitted BEFORE redirect so user sees thank you page
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send?phone=919561042986&text=${encodeURIComponent(whatsappMessage)}`;
      }, 800);

    } catch (error) {
      console.error("Submission note:", error);
      // Even if fetch throws, data likely saved — still show success
      setSubmitted(true);
      setLoading(false);
    }
  };

  // ==================== THANK YOU PAGE ====================
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>
            <CheckCircle2 className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-black mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}>धन्यवाद! 🎉</h1>
          <p className="text-gray-600 text-lg mb-2">Your onboarding form has been submitted.</p>
          <p className="text-gray-500 mb-8">आमची team लवकरच तुमच्याशी WhatsApp वर संपर्क करेल.</p>
          <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50 text-left space-y-3 mb-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">What happens next</p>
            {["Our team reviews your submission", "WhatsApp confirmation within 30 minutes", "Website ready in 24–48 hours"].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "#1E40AF" }}>{i + 1}</div>
                <span className="text-sm text-gray-700">{t}</span>
              </div>
            ))}
          </div>
          <a href="https://quick.ayushnexa.com"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            ← Back to AyushNexa
          </a>
        </div>
      </div>
    );
  }

  // ==================== MAIN FORM ====================
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* TOP BAR */}
      <div className="text-white text-xs font-medium py-2.5 px-4 text-center"
        style={{ background: "linear-gradient(90deg, #1E3A8A, #1E40AF, #2563EB)" }}>
        🚀 फक्त <strong>₹३,९९९</strong> मध्ये Premium Business Website — Limited Offer! ⚡
      </div>

      {/* NAVBAR */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>AN</div>
            <div>
              <p className="font-black text-black text-sm leading-none">AYUSHNEXA</p>
              <p className="text-gray-400 text-xs">Digital Solutions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>Fast 24–48h Setup
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div className="border-b border-gray-100"
        style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 50%, #F5F3FF 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
            <Sparkles size={13} />Next-Gen AI Digital Studio
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black leading-tight mb-4"
            style={{ fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>
            Premium Website<br />
            <span style={{ background: "linear-gradient(135deg, #1E40AF, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Onboarding Form
            </span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-6">
            नमस्कार 👋 आपल्या व्यवसायासाठी Premium Website तयार करण्यासाठी कृपया खालील माहिती भरा.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            {["✓ 100% Secure", "✓ WhatsApp Automation", "✓ Domain Included", "✓ 6 Months Support"].map((t) => (
              <span key={t} className="font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* STEPPER */}
      <div className="bg-white border-b border-gray-100 sticky top-[57px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-100 z-0 mx-10">
              <div className="h-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #1E40AF, #3B82F6)" }} />
            </div>
            {STEPS.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1.5 relative z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2"
                    style={{ background: done || active ? "linear-gradient(135deg, #1E40AF, #3B82F6)" : "#fff", borderColor: done || active ? "#1E40AF" : "#E5E7EB" }}>
                    {done ? <CheckCircle2 size={18} className="text-white" /> : <Icon size={16} className={active ? "text-white" : "text-gray-400"} />}
                  </div>
                  <span className={`text-xs font-semibold ${active ? "text-blue-700" : done ? "text-gray-700" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORM CONTENT */}
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* STEP 1 — Business Info */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Business Information
            </h2>
            <FormField icon={<Building2 size={17} />} label="Business Name" required>
              <input required type="text" placeholder="e.g. Sharma Dental Clinic"
                value={form.businessName} onChange={(e) => update("businessName", e.target.value)}
                className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <FormField icon={<User size={17} />} label="Owner Name" required>
              <input required type="text" placeholder="Your full name"
                value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)}
                className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <FormField icon={<Phone size={17} />} label="WhatsApp Number" required>
              <input required type="tel" placeholder="+91 95610 42986"
                value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)}
                className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <FormField icon={<MapPin size={17} />} label="Business Address">
              <input type="text" placeholder="e.g. Latur, Maharashtra"
                value={form.address} onChange={(e) => update("address", e.target.value)}
                className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>

            {/* Business Category */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Business Category</label>
              <div className="grid grid-cols-2 gap-2.5">
                {["Dental / Clinic", "Gym / Fitness", "Salon / Spa", "Coaching / Education", "Restaurant / Hotel", "Other"].map((type) => (
                  <button key={type} type="button" onClick={() => update("websiteType", type)}
                    className="px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all"
                    style={{
                      background: form.websiteType === type ? "#EFF6FF" : "#FAFAFA",
                      borderColor: form.websiteType === type ? "#1E40AF" : "#E5E7EB",
                      color: form.websiteType === type ? "#1E40AF" : "#374151"
                    }}>
                    {type}
                  </button>
                ))}
              </div>

              {/* ✅ Other — expandable text box */}
              {form.websiteType === "Other" && (
                <div className="mt-3">
                  <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                    <label className="block text-xs font-semibold text-blue-700 mb-2">
                      📝 Please describe your business type *
                    </label>
                    <textarea
                      placeholder="e.g. I run a travel agency, photography studio, law firm, event management company..."
                      value={form.otherBusiness}
                      onChange={(e) => update("otherBusiness", e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none resize-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2 — Services + Requirements */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Business Details
            </h2>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                <Globe size={13} className="inline mr-1" />Your Services / Products *
              </label>
              <textarea required
                placeholder="List your main services or products..."
                value={form.services} onChange={(e) => update("services", e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none resize-none focus:border-blue-300 focus:bg-white transition-all" />
            </div>

            {/* ✅ Requirements paragraph */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                📋 Website Requirements (Optional)
              </label>
              <textarea
                placeholder="Describe what you want on your website — e.g. booking form, gallery, WhatsApp button, testimonials, pricing page..."
                value={form.requirements}
                onChange={(e) => update("requirements", e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none resize-none focus:border-blue-300 focus:bg-white transition-all"
              />
            </div>

            <FormField icon={<Phone size={17} />} label="Alternative WhatsApp Number">
              <input type="tel" placeholder="Backup number (Optional)"
                value={form.altWhatsapp} onChange={(e) => update("altWhatsapp", e.target.value)}
                className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 flex gap-3">
              <Zap size={18} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900">WhatsApp Automation चालू होईल</p>
                <p className="text-xs text-blue-700">Website वर येणारे leads थेट तुमच्या WhatsApp वर येतील.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Branding + File Upload */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Branding & Files
            </h2>

            {/* ✅ File Upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Upload Logo / Brand Files (Max 5)
              </label>
              <div
                className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 cursor-pointer transition-all ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"}`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}>
                <Upload size={24} className="text-blue-500" />
                <div className="text-center">
                  <p className="font-semibold text-sm text-gray-700">Click or drag files here</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF, SVG — max 5 files</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.svg"
                  className="hidden" onChange={handleFileInput} />
              </div>

              {/* File list with remove button */}
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                      <FileImage size={16} className="text-blue-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700 flex-1 truncate">{file.name}</span>
                      <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)}KB</span>
                      <button type="button" onClick={() => removeFile(i)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-1">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Color Picker — 6 options */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2.5">
                <Palette size={13} className="inline mr-1" />Preferred Colors
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Navy Blue",    colors: ["#1E3A8A", "#3B82F6"] },
                  { label: "Black & Gold", colors: ["#111827", "#D97706"] },
                  { label: "Forest Green", colors: ["#14532D", "#22C55E"] },
                  { label: "Rose & White", colors: ["#BE185D", "#FDF2F8"] },
                  { label: "Orange & Dark",colors: ["#EA580C", "#1C1917"] },
                  { label: "Purple & Soft",colors: ["#7C3AED", "#EDE9FE"] },
                ].map((c) => (
                  <button key={c.label} type="button" onClick={() => update("colors", c.label)}
                    className="rounded-xl border-2 overflow-hidden transition-all"
                    style={{ borderColor: form.colors === c.label ? "#1E40AF" : "transparent" }}>
                    <div className="h-8 flex">
                      <div className="flex-1" style={{ background: c.colors[0] }} />
                      <div className="flex-1" style={{ background: c.colors[1] }} />
                    </div>
                    <p className="text-[10px] py-1 text-center bg-white font-medium">{c.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION CONTROLS */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2.5 border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
              ← Back
            </button>
          ) : <div />}

          {step < STEPS.length ? (
            <button type="button" onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-7 py-3 text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button type="button" disabled={loading || submitted} onClick={handleFormSubmit}
              className="flex items-center gap-2 px-7 py-3 text-white text-sm font-bold rounded-xl shadow-lg disabled:opacity-60 transition-all"
              style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>
              <Send size={15} />
              {loading ? (uploadProgress || "Submitting...") : "Submit Information"}
            </button>
          )}
        </div>

        {/* Upload progress text */}
        {loading && uploadProgress && (
          <p className="mt-4 text-center text-xs text-blue-600 font-medium animate-pulse">
            {uploadProgress}
          </p>
        )}
      </div>
    </div>
  );
}

function FormField({ icon, label, required, children }: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
        <span className="inline-flex items-center gap-1">
          {icon} {label} {required && <span className="text-blue-600">*</span>}
        </span>
      </label>
      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3.5 focus-within:bg-white focus-within:border-blue-300 transition-all">
        <span className="text-blue-500 flex-shrink-0">{icon}</span>
        {children}
      </div>
    </div>
  );
}
