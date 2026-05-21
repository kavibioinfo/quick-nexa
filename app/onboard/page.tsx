'use client';

import * as React from 'react';
import { Sparkles, ArrowRight, Building, User, MapPin, Globe, Image, FileText, CheckCircle, Upload } from 'lucide-react';

export default function OnboardingPage() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Form tracking submission data handler
    const formData = new FormData(e.currentTarget);
    const bName = formData.get('businessName');
    const oName = formData.get('ownerName');
    const wNum = formData.get('whatsappNumber');
    const domain = formData.get('desiredDomain');
    const services = formData.get('servicesList');
    const address = formData.get('businessAddress');

    // Generating clean data summary to push directly via secure trigger matrix
    const encodedSummary = encodeURIComponent(`👑 *AyushNexa Onboarding Submission* 🚀\n\n• *Business Name:* ${bName}\n• *Owner:* ${oName}\n• *WhatsApp:* ${wNum}\n• *Domain Requested:* ${domain}\n• *Services:* ${services}\n• *Address:* ${address}\n\n✨ _Kindly request photos/logo files over this chat interface._`);

    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
      // Seamless automated transfer redirection structure
      window.open(`https://wa.me/919561042986?text=${encodedSummary}`, '_blank');
    }, 1500);
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/10">
            <CheckCircle size={32} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wide">माहिती यशस्वीरित्या नोंदवली गेली!</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
            सर, तुमच्या व्यवसायाचा डेटा सुरक्षितपणे प्रोसेस झाला आहे. अंतिम पडताळणीसाठी तुम्हाला व्हॉट्सॲपवर रिडायरेक्ट केले जात आहे. कृपया चॅटवर तुमचे फोटो आणि लोगो पाठवून प्रक्रिया पूर्ण करा.
          </p>
          <button 
            onClick={() => setFormSubmitted(false)}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs tracking-widest rounded-xl uppercase transition-colors"
          >
            माहिती पुन्हा दुरुस्त करा
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans antialiased relative overflow-hidden py-12 px-4 selection:bg-blue-600 selection:text-white">
      
      {/* Background Tech Mesh Aurora */}
      <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(59,130,246,0.06)_0%,transparent_70%)] blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Head Branding Block */}
        <div className="text-center space-y-3">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mx-auto" style={{ filter: 'drop-shadow(0 0 12px rgba(0, 195, 255, 0.5))' }}>
            <path d="M18 74 L42 24 L52 44 L44 60 L35 74 H18 Z" fill="#4B9CD3" />
            <path d="M30 49 L42 24 L35 49 Z" fill="#4B9CD3" />
            <path d="M35 49 L42 24 L48 36 Z" fill="#1E6B9E" />
            <path d="M35 74 L44 60 L52 74 H35 Z" fill="#0A2C46" />
            <path d="M48 36 L68 74 H58 L44 60 Z" fill="#0B233A" />
            <path d="M71 44 H80 V74 H71 V44 Z" fill="#00A2E8" />
            <path d="M60 58 L71 74 H55 L60 58 Z" fill="#0072BC" />
          </svg>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white mt-2">AyushNexa Business Onboarding</h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            नमस्कार सर, तुमच्या व्यवसायासाठी प्रीमियम नेक्स्ट-जेन वेबसाईट अचूकपणे कोडिंग करण्यासाठी, कृपया खालील माहिती व फोटो सबमिट करा.
          </p>
        </div>

        {/* Executive Custom Form Grid */}
        <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6">
          
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Building size={14} className="text-blue-400" /> व्यवसायाचे अधिकृत नाव *</label>
              <input required name="businessName" type="text" placeholder="e.g. Matrix Fitness Hub" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>

            {/* Owner Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><User size={14} className="text-blue-400" /> मालकाचे नाव *</label>
              <input required name="ownerName" type="text" placeholder="e.g. Avinash Kumar" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Contact WhatsApp */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Phone size={14} className="text-blue-400" /> संपर्क व्हॉट्सॲप नंबर *</label>
              <input required name="whatsappNumber" type="tel" placeholder="e.g. 9561042986" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>

            {/* Desired Domain */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Globe size={14} className="text-blue-400" /> अपेक्षित डोमेन नेम *</label>
              <input required name="desiredDomain" type="text" placeholder="e.g. laturgym.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          {/* Services List Area */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><FileText size={14} className="text-blue-400" /> प्रमुख सेवांची यादी व त्यांचे दर *</label>
            <textarea required name="servicesList" rows={4} placeholder="तुमच्या व्यवसायातील प्रमुख सुविधा आणि पॅकेजेसची माहिती सविस्तर लिहा..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><MapPin size={14} className="text-blue-400" /> व्यवसायाचा पूर्ण पत्ता व लोकेशन लिंक *</label>
            <textarea required name="businessAddress" rows={3} placeholder="दुकानाचा/क्लिनिकचा पत्ता आणि गुगल मॅपची लिंक इथे पेस्ट करा..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>

          {/* Luxury Programmatic Graphics Drag Interface */}
          <div className="p-6 border border-dashed border-slate-800 hover:border-blue-500/40 bg-slate-950/60 rounded-2xl text-center space-y-2 transition-colors">
            <Upload size={24} className="mx-auto text-blue-400" />
            <p className="text-xs font-black uppercase text-slate-200">व्यवसायाचे फोटो आणि लोगो (Upload Media Assets)</p>
            <p className="text-[10px] text-slate-500 font-medium">टीप: वेबसाईटसाठी लागणारे एचडी फोटो आणि मूळ लोगो फाईल तुम्ही थेट आमच्या व्हॉट्सॲप चॅटवर सबमिट करू शकता.</p>
          </div>

          {/* Final Action Submission Dispatcher */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4.5 rounded-xl text-xs sm:text-sm tracking-widest uppercase shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'PROCESSING SECURE INFRASTRUCTURE...' : 'SUBMIT DATA & START INITIAL CODING'}
            <ArrowRight size={16} />
          </button>

        </form>

        {/* Baseline Trust Signature */}
        <div className="text-center text-[11px] font-medium text-slate-600 font-sans tracking-wide">
          © 2026 AyushNexa Digital Solutions. All Rights Reserved. Custom Engineered strictly under framework matrix.
        </div>
      </div>
    </div>
  );
}