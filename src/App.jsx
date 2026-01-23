import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  Github, Instagram, Mail, Activity, Cpu, Target, 
  Shield, Box, Zap, User, MapPin, Calendar, Globe 
} from 'lucide-react';

/**
 * INDEX OF SECTIONS:
 * 1. CONFIG & STATE (Lines 25-60)
 * 2. REUSABLE COMPONENTS (Lines 62-95)
 * 3. HEADER & NAVIGATION (Lines 97-135)
 * 4. HOME PAGE (Lines 140-185)
 * 5. ABOUT PAGE (Lines 187-245)
 * 6. SKILLS PAGE (Lines 247-290)
 * 7. PHOTOGRAPHY PAGE (Lines 292-330)
 * 8. CONTACT PAGE (Lines 332-375)
 * 9. FOOTER & STYLES (Lines 380+)
 */

export default function AlexanderPortfolio() {
  /* --- 1. CONFIG & STATE --- */
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [showNav, setShowNav] = useState(true);
  const [time, setTime] = useState(new Date());
  const lastScrollY = useRef(0);

  // Live Clock Update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Header Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollY.current || window.scrollY < 50);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Color Logic (Change colors here!)
  const t = theme === 'light' 
    ? { bg: 'bg-[#F4F4F5]', text: 'text-black', border: 'border-black', accent: 'text-blue-600', panel: 'bg-white', grid: 'opacity-[0.05]' }
    : { bg: 'bg-[#000000]', text: 'text-white', border: 'border-[#27272A]', accent: 'text-blue-500', panel: 'bg-[#09090B]', grid: 'opacity-[0.15]' };

  /* --- 2. REUSABLE UI COMPONENTS --- */
  
  // The futuristic corner brackets
  const CornerBrackets = () => (
    <>
      <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-current" />
      <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-current" />
      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-current" />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-current" />
    </>
  );

  // Metadata text block
  const DataBlock = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black uppercase opacity-40 tracking-[0.2em]">{label}</span>
      <span className="text-[11px] font-black uppercase tracking-widest">{value}</span>
    </div>
  );

  /* --- 3. HEADER & NAVIGATION --- */
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden relative`}>
      
      {/* BACKGROUND GRID ARCHITECTURE */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
        <svg width="100%" height="100%">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8 backdrop-blur-xl border-b ${t.border} transition-transform duration-700 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter hover:text-blue-500 transition-colors">ALX.</button>
          <div className="hidden lg:flex gap-8 border-l border-white/10 pl-8">
            <DataBlock label="STATUS" value="SYSTEM_ACTIVE" />
            <DataBlock label="COORDS" value="43.65N / 79.38W" />
            <DataBlock label="CLOCK" value={time.toLocaleTimeString()} />
          </div>
        </div>
        
        <nav className="flex items-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:text-blue-500 transition-all ${page === item ? 'text-blue-500 underline underline-offset-8' : ''}`}>
              {item}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border ${t.border} hover:bg-blue-600 transition-all`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-20 px-8 md:px-12 max-w-[1400px] mx-auto">
        
        {/* --- 4. HOME PAGE --- */}
        {page === 'home' && (
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[60vh] animate-in fade-in duration-1000">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-blue-500/30 bg-blue-500/5 text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">
                <Activity size={12} className="animate-pulse" /> SYSTEM ARCHITECT INITIALIZED
              </div>
              <h1 className="text-7xl md:text-[9vw] font-black leading-[0.8] tracking-tighter uppercase italic">
                ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px currentColor' }}>WONDWOSSEN</span>
              </h1>
              <p className="text-xl md:text-3xl font-light opacity-60 max-w-2xl leading-tight">
                Crafting industrial-grade digital systems through <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4">Logic</span> and <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4">Composition</span>.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setPage('about')} className="px-10 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">Identity_Dossier</button>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className={`relative z-10 border-2 ${t.border} p-5 ${t.panel} transition-transform duration-700 group-hover:-translate-y-4 shadow-2xl`}>
                <CornerBrackets />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_15px_#60a5fa]" />
              </div>
              <div className="absolute -bottom-6 -right-6 text-blue-500/20"><Target size={150} /></div>
            </div>
          </div>
        )}

        {/* --- 5. ABOUT PAGE --- */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-4 space-y-6">
              <div className={`p-8 border-2 ${t.border} ${t.panel} relative`}>
                <CornerBrackets />
                <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 underline">System_Identity</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4"><User size={18}/><span className="text-sm font-bold uppercase">Alex Wondwossen</span></div>
                  <div className="flex items-center gap-4"><MapPin size={18}/><span className="text-sm font-bold uppercase">Toronto, CA</span></div>
                  <div className="flex items-center gap-4"><Calendar size={18}/><span className="text-sm font-bold uppercase">Grade 7 / Creator</span></div>
                  <div className="flex items-center gap-4 text-blue-500"><Globe size={18}/><span className="text-sm font-bold uppercase animate-pulse">Available for Projects</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-white/10 text-center"><p className="text-[9px] opacity-40 uppercase">Projects</p><p className="text-xl font-black">12+</p></div>
                <div className="p-4 border border-white/10 text-center"><p className="text-[9px] opacity-40 uppercase">Experience</p><p className="text-xl font-black">2YRS</p></div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-10">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter">Bio_Manifesto</h2>
              <div className="space-y-8 text-2xl md:text-3xl font-light leading-relaxed opacity-80 border-l-4 border-blue-600 pl-10">
                <p>I am a 12-year-old developer based in <span className="text-white font-bold">Toronto</span>. My work is defined by the intersection of high-contrast visual art and functional software engineering.</p>
                <p>Currently in Grade 7, I specialize in the <span className="text-blue-500 font-bold">React Ecosystem</span>. I treat every project as a piece of digital architecture—ensuring the structure is as clean as the interface.</p>
                <p>When I'm not in a code editor, I'm exploring the city with a camera, capturing the raw geometry and industrial patterns of the urban landscape.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- 6. SKILLS PAGE --- */}
        {page === 'skills' && (
          <div className="space-y-16 animate-in fade-in duration-700">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">System_Matrix</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Core_Logic', items: ['React.js', 'Vite', 'JavaScript ES6+', 'Tailwind CSS', 'Git Architecture'], icon: <Terminal className="text-blue-500"/> },
                { title: 'Visual_Assets', items: ['35mm Photography', 'Lightroom Editing', 'Urban Composition', 'Color Theory', 'Manual Glass'], icon: <Camera className="text-orange-500"/> },
                { title: 'Interface_UX', items: ['Future Patterns', 'Typography Hierarchy', 'Technical Prototyping', 'Figma', 'Aero-Brutalist Design'], icon: <Layers className="text-white"/> }
              ].map((s, i) => (
                <div key={i} className={`p-12 border-2 ${t.border} ${t.panel} relative group hover:border-blue-500 transition-all`}>
                  <CornerBrackets />
                  <div className="mb-8">{s.icon}</div>
                  <h3 className="text-2xl font-black uppercase mb-8 italic">{s.title}</h3>
                  <div className="space-y-4">
                    {s.items.map(item => (
                      <div key={item} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 bg-blue-500 rotate-45" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 7. PHOTOGRAPHY PAGE --- */}
        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Visual_Archives</h2>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Selected Works // 2024-2026</span>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border border-white/10 overflow-hidden bg-black shadow-2xl">
                  <img src={url} className="w-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute top-0 left-0 w-full h-[1.5px] bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20" />
                  <div className="absolute bottom-4 left-4 text-[9px] font-black bg-blue-600 text-white px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">TOR_UNIT_{i+100}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 8. CONTACT PAGE --- */}
        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-16 py-10 animate-in slide-in-from-bottom duration-700 text-center">
            <h2 className="text-[14vw] font-black italic uppercase tracking-tighter leading-none">Connect</h2>
            <div className="grid gap-4 text-left">
              {[
                { platform: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy' },
                { platform: 'TikTok', handle: '@alxgraphy', url: 'https://tiktok.com/@alxgraphy' },
                { platform: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy' },
                { platform: 'E-Mail', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' }
              ].map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" className={`p-10 border-2 ${t.border} flex justify-between items-center group hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all relative overflow-hidden`}>
                  <div className="z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40 mb-2">{item.platform}</p>
                    <p className="text-4xl md:text-5xl font-black italic tracking-tighter group-hover:translate-x-4 transition-transform">{item.handle}</p>
                  </div>
                  <ArrowRight size={40} className="z-10 group-hover:rotate-45 transition-transform" />
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 group-hover:w-full group-hover:opacity-10 transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* --- 9. FOOTER & GLOBAL STYLES --- */}
      <footer className="w-full py-20 px-8 md:px-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12 font-black uppercase text-[10px] tracking-[0.5em] opacity-40">
        <div className="flex flex-col gap-1">
          <span>ALX_ARCHIVE / TORONTO</span>
          <span>© 2024-2026 EDITION</span>
        </div>
        <div className="text-center">
          <a href="https://github.com/alxgraphy" target="_blank" className="text-xl underline decoration-blue-500 underline-offset-8">ALEXANDER WONDWOSSEN</a>
        </div>
        <div className="flex gap-10">
          <span>GH</span><span>TT</span><span>IG</span>
        </div>
      </footer>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 
          0% { top: 0; opacity: 0; } 
          50% { opacity: 1; } 
          100% { top: 100%; opacity: 0; } 
        }
        .animate-scan { animation: scan 3s linear infinite; }
        
        /* Utility for outline text */
        .text-transparent { -webkit-text-fill-color: transparent; }
      `}} />
    </div>
  );
}
