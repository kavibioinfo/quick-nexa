"use client";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* प्रिमियम ब्रँडिंग टॉप बार */}
      <div className="text-white text-xs font-medium py-3 px-4 text-center sticky top-0 z-50 shadow-md" style={{ background: "linear-gradient(90deg, #1E3A8A, #1E40AF, #2563EB)" }}>
        🚀 <strong>AYUSHNEXA DIGITAL SOLUTIONS</strong> — Premium Client Onboarding Pipeline ⚡
      </div>

      {/* थेट अधिकृत गुगल फॉर्म प्रिमियम आयफ्रेममध्ये लोड करणे */}
      <div className="flex-1 w-full h-[calc(100vh-40px)] overflow-hidden bg-white">
        <iframe
          src="https://docs.google.com/forms/d/1MCOxd5Ouan0XbToIoIZLbN0CW837SkudsguZjbYh74A/viewform?embedded=true"
          className="w-full h-full border-none"
          title="AyushNexa Onboarding Form"
        >
          Loading...
        </iframe>
      </div>
    </div>
  );
}