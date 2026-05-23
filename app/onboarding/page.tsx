"use client";
 
import { useState } from "react";
import {
  Building2,
  User,
  Phone,
  MapPin,
  Globe,
  Palette,
  CheckCircle2,
  ChevronRight,
  Zap,
  Send,
  Upload,
  Sparkles,
} from "lucide-react";
 
const STEPS = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Services", icon: Globe },
  { id: 3, label: "Branding", icon: Palette },
];
 
// ==========================================
// ✅ AYUSHNEXA — FIXED & FINAL CONFIG
// ==========================================
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfW1Xf_KYzPFAIeFFf7wP84rygF2TC_pDK7KS-y0NFmvSNRQA/formResponse";
 
const ENTRY_IDS = {
  businessName: "entry.86426507",   // Column B: Business Name
  ownerName:    "entry.385128650",  // Column C: Owner Name + WhatsApp
  address:      "entry.1247093245", // Column D: Address + Category
  services:     "entry.141297351",  // Column E: Services + Colors + Alt WA
};
// ==========================================
 
export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    whatsapp: "",
    address: "",
    services: "",
    instagram: "", // Alternative WhatsApp number
    colors: "",
    websiteType: "",
  });
 
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
 
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...dropped]);
  };
 
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const picked = Array.from(e.target.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...picked]);
    }
  };
 
  // ✅ FIXED: No duplicate formData.append — each entry ID used exactly once
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
 
    const formData = new FormData();
 
    // Column B — Business Name
    formData.append(ENTRY_IDS.businessName, form.businessName);
 
    // Column C — Owner Name + WhatsApp
    formData.append(ENTRY_IDS.ownerName, `${form.ownerName} | WA: ${form.whatsapp}`);
 
    // Column D — Address + Category
    formData.append(ENTRY_IDS.address, `${form.address} | Category: ${form.websiteType || "General"}`);
 
    // Column E — Services + Colors + Alt WA  ✅ ONLY ONCE (was duplicated before)
    const altWA = form.instagram ? `Alt WA: ${form.instagram}` : "No Alt WA";
    formData.append(
      ENTRY_IDS.services,
      `Services: ${form.services} | Colors: ${form.colors || "Navy Blue"} | ${altWA}`
    );
 
    try {
      // Send to Google Forms silently
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
 
      // Build WhatsApp message
      const whatsappMessage =
        `🚀 *नवीन Onboarding Form — AyushNexa* 🚀\n\n` +
        `🏢 *व्यवसायाचे नाव:* ${form.businessName}\n` +
        `👤 *मालकाचे नाव:* ${form.ownerName}\n` +
        `📞 *मुख्य व्हॉट्सॲप:* ${form.whatsapp}\n` +
        `📍 *पत्ता & कॅटेगरी:* ${form.address} (${form.websiteType || "General"})\n` +
        `⚙️ *सेवा / उत्पादने:* ${form.services}\n` +
        `🎨 *कलर Preference:* ${form.colors || "Navy Blue"}\n` +
        `📲 *बॅकअप व्हॉट्सॲप:* ${form.instagram || "Not Provided"}\n\n` +
        `👉 *कृपया माझी प्रीमियम वेबसाईट लवकरात लवकर लाईव्ह करा!*`;
 
      const waUrl = `https://api.whatsapp.com/send?phone=919561042986&text=${encodeURIComponent(whatsappMessage)}`;
 
      setSubmitted(true);
 
      // Redirect after state update
      setTimeout(() => {
        window.location.href = waUrl;
      }, 100);
 
    } catch (error) {
      console.error("Submission Failed:", error);
      alert("काहीतरी तांत्रिक त्रुटी आली आहे, कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };
 
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>
            <CheckCircle2 className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-black mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>धन्यवाद! 🎉</h1>
          <p className="text-gray-600 text-lg mb-2">Your onboarding form has been submitted.</p>
          <p className="text-gray-500 mb-8">आमची team लवकरच तुमच्याशी WhatsApp वर संपर्क करेल.</p>
          <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50 text-left space-y-3 mb-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">What happens next</p>
            {["Our team reviews your submission", "WhatsApp confirmation within 30 minutes", "Website ready in 24–48 hours"].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#1E40AF" }}>{i + 1}</div>
                <span className="text-sm text-gray-700">{t}</span>
              </div>
            ))}
          </div>
          <a href="https://quick.ayushnexa.com" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">← Back to AyushNexa</a>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />
 
      {/* TOP BAR */}
      <div className="text-white text-xs font-medium py-2.5 px-4 text-center" style={{ background: "linear-gradient(90deg, #1E3A8A, #1E40AF, #2563EB)" }}>
        🚀 फक्त <strong>₹३,९९९</strong> मध्ये Premium Business Website — Limited Offer! ⚡
      </div>
 
      {/* NAVBAR */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm" style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>AN</div>
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
      <div className="border-b border-gray-100" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 50%, #F5F3FF 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
            <Sparkles size={13} />Next-Gen AI Digital Studio
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black leading-tight mb-4" style={{ fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>
            Premium Website<br />
            <span style={{ background: "linear-gradient(135deg, #1E40AF, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Onboarding Form
            </span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-6">नमस्कार 👋 आपल्या व्यवसायासाठी Premium Website तयार करण्यासाठी कृपया खालील माहिती भरा.</p>
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
              <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #1E40AF, #3B82F6)" }} />
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
                  <span className={`text-xs font-semibold ${active ? "text-blue-700" : done ? "text-gray-700" : "text-gray-400"}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* FORM CONTENT */}
      <div className="max-w-2xl mx-auto px-4 py-10">
 
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'DM Serif Display', serif" }}>Business Information</h2>
            <FormField icon={<Building2 size={17} />} label="Business Name" required>
              <input required type="text" placeholder="e.g. Sharma Dental Clinic" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <FormField icon={<User size={17} />} label="Owner Name" required>
              <input required type="text" placeholder="Your full name" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <FormField icon={<Phone size={17} />} label="WhatsApp Number" required>
              <input required type="tel" placeholder="+91 95610 42986" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <FormField icon={<MapPin size={17} />} label="Business Address">
              <input type="text" placeholder="e.g. Latur, Maharashtra" value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full outline-none text-sm text-gray-800 bg-transparent" />
            </FormField>
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Business Category</label>
              <div className="grid grid-cols-2 gap-2.5">
                {["Dental / Clinic", "Gym / Fitness", "Salon / Spa", "Coaching / Education", "Restaurant / Hotel", "Other"].map((type) => (
                  <button key={type} type="button" onClick={() => update("websiteType", type)}
                    className="px-4 py-3 rounded-xl border text-sm font-medium text-left"
                    style={{ background: form.websiteType === type ? "#EFF6FF" : "#FAFAFA", borderColor: form.websiteType === type ? "#1E40AF" : "#E5E7EB", color: form.websiteType === type ? "#1E40AF" : "#374151" }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'DM Serif Display', serif" }}>Business Details</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                <Globe size={13} className="inline mr-1" />Your Services / Products *
              </label>
              <textarea required placeholder="Describe what you offer..." value={form.services} onChange={(e) => update("services", e.target.value)} rows={5}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none resize-none" />
            </div>
            <FormField icon={<Phone size={17} />} label="Alternative WhatsApp Number">
              <input type="tel" placeholder="Backup number (Optional)" value={form.instagram} onChange={(e) => update("instagram", e.target.value)} className="w-full outline-none text-sm text-gray-800 bg-transparent" />
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
 
        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'DM Serif Display', serif" }}>Branding & Colors</h2>
            <label htmlFor="file-upload"
              className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 cursor-pointer ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}>
              <Upload size={22} className="text-blue-600" />
              <p className="font-semibold text-sm">Click to upload files or logo</p>
              <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFileInput} />
            </label>
            {files.length > 0 && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">{files.join(", ")}</div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2.5">
                <Palette size={13} className="inline mr-1" />Preferred Colors
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Navy Blue", colors: ["#1E3A8A", "#3B82F6"] },
                  { label: "Black & Gold", colors: ["#111827", "#D97706"] },
                  { label: "Forest Green", colors: ["#14532D", "#22C55E"] },
                ].map((c) => (
                  <button key={c.label} type="button" onClick={() => update("colors", c.label)}
                    className="rounded-xl border-2 overflow-hidden"
                    style={{ borderColor: form.colors === c.label ? "#1E40AF" : "transparent" }}>
                    <div className="h-8 flex">
                      <div className="flex-1" style={{ background: c.colors[0] }} />
                      <div className="flex-1" style={{ background: c.colors[1] }} />
                    </div>
                    <p className="text-[10px] py-1 text-center bg-white">{c.label}</p>
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
              className="px-5 py-2.5 border rounded-xl text-sm font-semibold text-gray-600">← Back</button>
          ) : <div />}
 
          {step < STEPS.length ? (
            <button type="button" onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-7 py-3 text-white text-sm font-bold rounded-xl shadow-lg"
              style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button type="button" disabled={loading} onClick={handleFormSubmit}
              className="flex items-center gap-2 px-7 py-3 text-white text-sm font-bold rounded-xl shadow-lg disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)" }}>
              <Send size={15} />{loading ? "Submitting..." : "Submit Information"}
            </button>
          )}
        </div>
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
      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3.5 focus-within:bg-white transition-all">
        <span className="text-blue-500">{icon}</span>
        {children}
      </div>
    </div>
  );
}