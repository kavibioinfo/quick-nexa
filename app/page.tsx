'use client';
 
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Phone,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Monitor,
  Search,
  Smartphone,
  Flame,
  Star,
  Dumbbell,
  Stethoscope,
  Scissors,
  GraduationCap,
  Sparkle,
  ArrowUpRight
} from 'lucide-react';
 
const WHATSAPP_NUMBER = "9561042986";
const WHATSAPP_WELCOME_MESSAGE = `✨ नमस्कार!
 
AyushNexa Digital Solutions मध्ये आपले स्वागत आहे. 🚀
 
आम्ही तुमच्या व्यवसायासाठी Premium Website, WhatsApp Automation, Google Growth आणि AI-Powered Branding Solutions तयार करतो.
 
कृपया खालील माहिती पाठवा:
 
• व्यवसायाचे नाव:
• व्यवसाय प्रकार:
• लोकेशन:
• आवश्यक सेवा:
 
आमची टीम लवकरच तुमच्याशी संपर्क साधेल. 👑`;
 
/* ─────────────────────────────────────────
   SHARED LOGO COMPONENTS
   Matches the dark-bg AN monogram exactly:
   - A: dark navy body, teal/cyan left inner facet, mid-blue crossbar fill
   - N: dark navy left stroke + diagonal, bright cyan right vertical bar
   - Both letters share/overlap at center for compact look
───────────────────────────────────────── */
 
 
function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex flex-col text-left">
      <span className="font-sans font-black tracking-tight text-base uppercase leading-none">
        <span style={{ color: onDark ? '#ffffff' : '#0D2A45' }}>AYUSH</span>
        <span style={{ color: onDark ? '#00C2F0' : '#0095D9' }}>NEXA</span>
      </span>
      <span
        className="text-[9px] font-black tracking-widest uppercase mt-1"
        style={{ color: onDark ? '#64748b' : '#2563eb' }}
      >
        Digital Solutions
      </span>
    </div>
  );
}
 
/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
 
export default function LandingPage() {
  // 🎯 RUNTIME SUBDOMAIN CHECKER (FAIL-PROOF)
  if (typeof window !== 'undefined' && window.location.hostname.includes('onboard.ayushnexa.com')) {
    window.location.href = '/onboard';
    return null;
  }
  const [timeLeft, setTimeLeft] = React.useState(3600 * 2 + 54 * 60);
 
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600 * 2));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
 
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };
 
  const handleWhatsAppRedirect = (customText?: string) => {
    const textToSend = customText || WHATSAPP_WELCOME_MESSAGE;
    const encodedText = encodeURIComponent(textToSend);
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };
 
  const LIVE_DEMOS = [
    {
      title: "Premium Gym Hub",
      icon: <Dumbbell className="text-amber-500 h-6 w-6" />,
      desc: "High-performance fitness website system with modern booking flow.",
      link: "https://latur-gym.ayushnexa.com",
    },
    {
      title: "Elite Dental Hub",
      icon: <Stethoscope className="text-cyan-500 h-6 w-6" />,
      desc: "Luxury clinic appointment experience designed for medical brands.",
      link: "https://latur-dental.ayushnexa.com",
    },
    {
      title: "Luxury Salon Hub",
      icon: <Scissors className="text-pink-500 h-6 w-6" />,
      desc: "Premium salon digital setup with WhatsApp lead automation.",
      link: "https://latur-salon.ayushnexa.com",
    },
    {
      title: "Coaching Growth Hub",
      icon: <GraduationCap className="text-emerald-500 h-6 w-6" />,
      desc: "Lead-focused educational platform for coaching institutes.",
      link: "https://latur-coaching.ayushnexa.com",
    },
  ];
 
  return (
    <div className="relative overflow-x-hidden min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
 
      {/* ── 1. STICKY TOP BANNER ── */}
      <div
        id="top-banner"
        className="sticky top-0 z-50 bg-slate-950 border-b border-neutral-800 text-white py-3.5 px-4 text-center font-sans tracking-wide text-xs sm:text-sm shadow-xl backdrop-blur-md bg-opacity-95"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            <Flame size={12} className="animate-pulse text-amber-400" /> मर्यादित कालावधी ऑफर • Limited Offer
          </span>
          <span className="font-medium text-slate-200 text-center">
            🚀 तुमच्या व्यवसायाला डिजिटल ओळख द्या! फक्त{' '}
            <strong className="text-white font-black">₹३,९९९</strong> मध्ये मिळवा Premium Business Website{' '}
            <span className="line-through text-slate-500 font-normal">(मूळ किंमत ₹१४,९९९)</span>{' '}
            📲 आजच तुमचा व्यवसाय Online सुरू करा!
          </span>
          <button
            onClick={() => handleWhatsAppRedirect()}
            className="inline-flex items-center gap-1 font-black text-cyan-400 hover:text-blue-400 transition-all border-b border-cyan-400/30 hover:border-blue-400 ml-1 cursor-pointer"
          >
            ✨ आत्ताच बुक करा <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="bg-neutral-800 border border-neutral-700 text-amber-400 px-2.5 py-0.5 rounded-full font-mono text-xs ml-2 shrink-0">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
 
      {/* AMBIENT GLOW ORBS */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(circle,_rgba(59,130,246,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(6,182,212,0.06)_0%,transparent_70%)] blur-[120px] pointer-events-none -z-10" />
 
      {/* ── 2. HEADER ── */}
      <header
        id="main-header"
        className="relative z-10 px-6 sm:px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur-xl border border-slate-200/60 max-w-7xl mx-auto rounded-2xl mt-4 shadow-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Wordmark onDark={false} />
        </div>
 
        {/* Nav */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5 text-xs md:text-sm font-bold text-slate-500 tracking-wider uppercase">
            <a href="#live-demos" className="hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#features-highlights" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <button
              onClick={() => handleWhatsAppRedirect()}
              className="text-blue-600 hover:text-blue-700 font-black transition-colors cursor-pointer uppercase"
            >
              Contact
            </button>
          </div>
        </div>
      </header>
 
      {/* ── 3. HERO ── */}
      <section id="hero-section" className="relative pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
 
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-xs font-black tracking-wider text-blue-700 uppercase">
                Next-Gen AI Digital Studio
              </span>
            </div>
          </div>
 
          <h1 className="max-w-4xl mx-auto text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.25] text-neutral-950 mb-8 uppercase px-1">
            तुमचा व्यवसाय <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 drop-shadow-2xs">
              Premium Digital Brand
            </span>{' '}
            <br />
            म्हणून ओळखला जाईल.
          </h1>
 
          <p className="max-w-3xl mx-auto text-sm md:text-lg text-slate-600 leading-relaxed font-semibold mb-12 px-4">
            Luxury Website, WhatsApp Automation आणि AI-Powered Growth System सोबत तुमच्या व्यवसायाला मिळवा आधुनिक
            डिजिटल ओळख. Engineered strictly via Next.js 16 frameworks.
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto mb-14 px-2">
            <button
              id="cta-whatsapp-hero"
              onClick={() => handleWhatsAppRedirect()}
              className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs md:text-sm py-4.5 px-8 rounded-xl shadow-lg shadow-blue-600/20 tracking-wider uppercase transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer h-14"
            >
              <span>START ON WHATSAPP</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </button>
 
            <a
              id="cta-demos-hero"
              href="#live-demos"
              className="w-full sm:w-1/2 border border-neutral-300 bg-white text-neutral-900 font-black text-xs md:text-sm tracking-wider py-4 rounded-xl hover:bg-slate-50 flex items-center justify-center uppercase shadow-sm h-14 transition-colors"
            >
              VIEW LIVE DEMOS
            </a>
          </div>
 
          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto pt-8 border-t border-slate-200/60 text-left font-black text-sm md:text-base px-2">
            {[
              { title: 'Ultra Fast Speed', sub: 'Next.js 16 Engine' },
              { title: 'WhatsApp Flow', sub: 'Smart Lead Capture' },
              { title: 'No WordPress Lag', sub: '100% Secure Code' },
              { title: 'SEO Schema Map', sub: 'Built for Google Growth' },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-2.5">
                <div className="text-blue-600 font-black text-lg">✓</div>
                <div>
                  <span className="block text-slate-900">{b.title}</span>
                  <span className="text-xs text-slate-500 font-bold">{b.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 4. LIVE DEMOS ── */}
      <section id="live-demos" className="py-16 bg-white border-y border-neutral-200/60 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 text-xs font-black uppercase tracking-widest block">
              Explore Premium Concepts
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-wide text-neutral-950 uppercase mt-1">
              Our Premium Live Demos
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1 font-medium">
              विविध स्थानिक व्यवसायांसाठी बनवलेले ४ अप्रतिम नमुने. त्यांच्या आकर्षक डिझाईन आणि युझर एक्सपिरियन्सवरून अंदाज लावा.
            </p>
          </div>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {LIVE_DEMOS.map((demo, idx) => (
              <div
                key={idx}
                className="bg-slate-50/60 border border-neutral-200 rounded-xl p-6 md:p-7 hover:shadow-xl hover:border-blue-500/30 hover:bg-white transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="absolute top-5 right-5 text-neutral-400 group-hover:text-blue-600 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
                <div>
                  <div className="w-fit p-3 rounded-xl bg-white border border-neutral-200 shadow-xs mb-5">
                    {demo.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-black text-neutral-900 uppercase tracking-wide mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-xs font-medium mb-6">{demo.desc}</p>
                </div>
                <a
                  href={demo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-black text-[11px] uppercase tracking-wider shadow-xs text-center cursor-pointer"
                >
                  या प्रकारची वेबसाईट सुरू करा
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 5. PRICING ── */}
      <section id="premium-pricing" className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-neutral-200 p-6 md:p-10 rounded-2xl grid lg:grid-cols-12 gap-8 items-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-neutral-950 text-white px-5 py-1.5 rounded-bl-xl font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Popular Growth Tier
          </div>
 
          <div className="lg:col-span-7">
            <h3 className="font-display text-xl md:text-2xl font-black text-slate-950 mb-3">
              AyushNexa Business Edition
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-medium">
              हा कोणताही सामान्य वर्डप्रेस टेंपलेट नाही. आम्ही स्वतः कस्टमाईज केलेल्या Next.js कोडसह तयार करतो.
              याद्वारे तुमच्या स्थानिक दंतचिकित्सक, जिम वा कोचिंग क्लासला मिळते सुपरफास्ट गती, आणि ग्राहकांशी थेट
              संवाद साधण्याचा उत्तम मार्ग.
            </p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-black uppercase text-neutral-800 tracking-wide">
              {[
                'Fast 24–48h Setup',
                'WhatsApp Automation',
                'Premium Domain Included',
                '6 Months Tier-1 Support',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-blue-600" /> {f}
                </div>
              ))}
            </div>
          </div>
 
          <div className="lg:col-span-5 bg-slate-50 border border-neutral-200 p-6 md:p-8 rounded-xl text-center shadow-inner w-full">
            <span className="text-xs font-bold uppercase text-neutral-400 line-through block">
              Standard Price: ₹14,999
            </span>
            <span className="text-3xl md:text-4xl font-black text-neutral-950 block mt-1.5">
              ₹3,999/-<span className="text-xs text-neutral-500 font-normal"> मात्र</span>
            </span>
            <span className="text-[9px] font-black bg-blue-100 text-blue-700 border border-blue-200 px-4 py-1 rounded-full inline-block mt-3 mb-6 uppercase tracking-wider">
              Saves Over 73% Instantly
            </span>
 
            <button
              onClick={() => {
                const templateText = `नमस्कार AyushNexa Solutions! \n\nमला तुमच्या Premium Digital Growth Pack (₹३,९९९) ऑफर मध्ये रस आहे. माझ्या व्यवसायासाठी नवीन वेबसाईट आणि WhatsApp Automation सुरू करायची आहे. कृपया लवकरात लवकर संपर्क करा आणि प्रक्रिया सुरू करा. ✨`;
                handleWhatsAppRedirect(templateText);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-4 rounded-xl text-xs md:text-sm tracking-widest uppercase shadow-md transition-all cursor-pointer"
            >
              GET STARTED NOW
            </button>
          </div>
        </div>
      </section>
 
      {/* ── 6. FEATURES ── */}
      <section id="features-highlights" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 text-xs font-black uppercase tracking-widest block">
            High Performance Architecture
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-wide text-neutral-950 uppercase mt-1">
            What AyushNexa Code Delivers
          </h2>
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[
            {
              icon: <Zap className="text-blue-600 mb-4" size={26} />,
              title: 'Ultra-Fast Speed',
              body: 'Next.js वर बनवलेली ही वेबसाईट १ सेकंदाच्या आत उघडते! जेणेकरून तुमचे ग्राहक वाट न पाहता पुढे जातील.',
            },
            {
              icon: <ShieldCheck className="text-emerald-500 mb-4" size={26} />,
              title: 'Secure Infrastructure',
              body: 'कोणतीही विनाकारण हॅकिंग किंवा व्हायरसची काळजी नाही. आमचे सर्व डिझाईन आधुनिक सर्व्हरवर सुरक्षित असतात.',
            },
            {
              icon: <Smartphone className="text-pink-500 mb-4" size={26} />,
              title: 'Mobile Optimization',
              body: '९५% पेक्षा जास्त लोकल ग्राहक मोबाईलवर असतात. म्हणूनच आमचे डिझाईन मोबाईलवर अतिशय वेगाने आणि सुबक उघडते.',
            },
            {
              icon: <Sparkle className="text-indigo-500 mb-4" size={26} />,
              title: 'No WordPress Lag',
              body: 'धीमे प्लगइन्स, त्रुटी आणि सतत कोलमडणारी रचना यापासून कायमची सुटका. आम्ही १००% सॉलिड कोडींग करतो.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs">
              {f.icon}
              <h4 className="font-black text-sm text-neutral-900 uppercase mb-2">{f.title}</h4>
              <p className="text-neutral-500 leading-relaxed text-xs font-medium">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── 7. METRICS ── */}
      <section
        id="trust-metrics"
        className="relative py-20 px-4 bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 text-white rounded-t-[40px] shadow-2xl"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase">
              We Build Authority
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase mt-1 tracking-wide">
              विश्वास आणि कामगिरीचे पुरावे.
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Monitor className="mx-auto w-10 h-10 text-blue-400 mb-4" />, value: '99/100', label: 'Google PageSpeed Score' },
              { icon: <TrendingUp className="mx-auto w-10 h-10 text-blue-400 mb-4" />, value: '2.5X', label: 'More WhatsApp Leads' },
              { icon: <Star className="mx-auto w-10 h-10 text-yellow-500 fill-yellow-500 mb-4" />, value: '100%', label: 'Elite Custom Coded' },
            ].map((m) => (
              <div
                key={m.label}
                className="p-6 rounded-xl bg-slate-900/40 border border-[#334155]/60 text-center"
              >
                {m.icon}
                <p className="text-4xl md:text-5xl font-black text-[#38BDF8] tracking-tight">{m.value}</p>
                <p className="text-sm font-bold text-slate-200 mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 8. FOOTER ── */}
      <footer id="luxury-footer" className="bg-[#090D1A] text-slate-400 py-12 px-4 border-t border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-900">
 
          {/* Dark logo */}
          <div className="flex items-center gap-3">
            <Wordmark onDark={true} />
          </div>
 
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => handleWhatsAppRedirect()}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-xs font-black text-white border border-slate-800 hover:border-blue-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Phone className="w-4 h-4 text-green-400 fill-green-400" />
              DIRECT WHATSAPP CONCIERGE
            </button>
          </div>
        </div>
 
        <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-600">
          <p>© 2026 AyushNexa Digital Solutions. All Rights Reserved.</p>
          <div className="flex items-center gap-6 font-bold">
            <a href="#premium-pricing" className="hover:text-slate-400 transition-colors">
              Pricing Pack
            </a>
            <a href="#live-demos" className="hover:text-slate-400 transition-colors">
              Live Demos
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://www.ayushnexa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82F6] hover:text-blue-400 transition-colors text-xs tracking-wide"
            >
              www.ayushnexa.com
            </a>
          </div>
        </div>
      </footer>
 
    </div>
  );
}