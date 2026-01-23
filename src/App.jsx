import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Camera, Code, Terminal, Frame, Layers, ArrowRight, Github, Instagram, Mail, Activity, Cpu, Target, Hash } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [showNav, setShowNav] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const lastScrollY = useRef(0);

  // --- CLOCK & SYSTEM DATA ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- SMOOTH HEADER HIDE ---
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollY.current || window.scrollY < 50);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = theme === 'light' 
    ? { bg: 'bg-[#FDFDFD]', text: 'text-black', border: 'border-black', accent: 'bg-black text-white', grid: 'opacity-[0.03]' }
    : { bg: 'bg-[#000000]', text: 'text-white', border: 'border-white', accent: 'bg-white text-black', grid: 'opacity-[0.1]' };

  // --- GEOMETRIC UI ELEMENTS ---
  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  const Metadata = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black uppercase opacity-40 tracking-[0.2em]">{label}</span>
      <span className="text-[11px] font-black uppercase tracking-widest">{value}</span>
    </div>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden relative`}>
      
      {/* FUTURE PATTERN GRID OVERLAY */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
        <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      {/* HEADER: DATA HEAVY */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-10 backdrop-blur-xl border-b ${t.border} transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => setPage('home')} className="text-5xl font-black italic tracking-tighter hover:scale-110 transition-transform">A.</button>
          <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-2 border-l-2 pl-8 border-current">
            <Metadata label="Build" value="v7.2.0" />
            <Metadata label="Status" value="Operational" />
            <Metadata label="Location" value="43.65 N, 79.38 W" />
            <Metadata label="Time" value={currentTime.toLocaleTimeString()} />
          </div>
        </div>
        
        <nav className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline underline-offset-8' : ''}`}>{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-3 border-2 ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-64 pb-32 px-12 max-w-7xl mx-auto">
        
        {/* HOME: THE SCANNER */}
        {page === 'home' && (
          <div className="flex flex-col items-center space-y-32 animate-in fade-in duration-1000">
            <div className="relative group">
              <div className={`border-2 ${t.border} p-6 bg-transparent transition-all duration-700 group-hover:shadow-[40px_40px_0px_0px_rgba(0,0,0,0.1)]`}>
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-80 h-80 md:w-96 md:h-96 object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" alt="Alexander" />
                <Corners />
                {/* SCANNING LASER EFFECT */}
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20"></div>
              </div>
              <div className={`absolute -bottom-6 -right-12 ${t.accent} px-10 py-4 text-xs font-black uppercase tracking-[0.5em] italic shadow-2xl`}>
                @alxgraphy
              </div>
            </div>
            
            <div className="text-center space-y-12">
              <h1 className="text-[16vw] font-black leading-[0.7] tracking-tighter italic uppercase">ALEXANDER</h1>
              <div className="flex flex-wrap justify-center gap-12 pt-10 border-t border-current/20">
                <Metadata label="Core Stack" value="React / Vite / Tailwind" />
                <Metadata label="Focus" value="Systems & Visuals" />
                <Metadata label="Entity" value="Grade 7 Developer" />
                <Metadata label="Identity" value="Wondwossen" />
              </div>
            </div>
          </div>
        )}

        {/* ABOUT: THE MANIFESTO */}
        {page === 'about' && (
          <div className="max-w-4xl space-y-20 animate-in slide-in-from-left duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter">Bio_Archive</h2>
            <div className="text-3xl font-medium leading-relaxed space-y-12 border-l-8 border-current pl-12">
              <p>I am Alexander Wondwossen. Based in Toronto, I am a 12-year-old developer carving out a space where <span className="font-bold underline italic">raw logic</span> meets <span className="font-bold underline italic">visual geometry</span>.</p>
              <p>I believe that code is the architecture of the modern age. My workflow focuses on performance, scalability, and the "Future Patterns" aesthetic—clean lines, heavy data, and high-contrast functionality.</p>
              <p>My street photography serves as my secondary visual language, capturing the stark, brutalist energy of the city to inform the software I build. If it’s not sharp, it’s not finished.</p>
            </div>
          </div>
        )}

        {/* SKILLS: THE MATRIX */}
        {page === 'skills' && (
          <div className="space-y-20 animate-in fade-in duration-700">
            <h2 className="text-8xl font-black italic uppercase">Matrix_System</h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-current">
              {[
                { title: 'Development', list: ['React.js (Hooks/State)', 'Vite / Fast Refresh', 'JavaScript (ES6+)', 'Tailwind CSS', 'Git Systems'], icon: <Terminal /> },
                { title: 'Visuals', list: ['35mm Street Photo', 'Manual Exposure', 'Adobe Lightroom', 'Color Grading', 'Urban Composition'], icon: <Camera /> },
                { title: 'Design', list: ['Technical UI Patterns', 'Aero-Brutalist UX', 'Typography Systems', 'Figma Workspace', 'Wireframing'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all`}>
                  <div className="mb-10 text-red-500 group-hover:text-current">{s.icon}</div>
                  <h3 className="text-4xl font-black uppercase mb-8 italic">{s.title}</h3>
                  <div className="space-y-4">
                    {s.list.map(item => (
                      <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                        <div className="w-2 h-2 bg-current" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY: THE GRID */}
        {page === 'photography' && (
          <div className="space-y-16 animate-in zoom-in duration-700">
            <div className="flex justify-between items-end border-b-4 border-current pb-8">
              <h2 className="text-8xl font-black italic uppercase">Gallery_01</h2>
              <p className="text-xs font-black opacity-40">Capture Index: 35mm Digital</p>
            </div>
            <div className="columns-1 md:columns-3 gap-8 space-y-8">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg"
              ].map((url, i) => (
                <div key={i} className={`border-2 ${t.border} overflow-hidden group relative`}>
                  <img src={url} className="w-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 cursor-crosshair" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20"></div>
                  <div className="absolute top-4 right-4 text-[10px] font-black bg-white text-black px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">REF_ID: {i+100}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT: SOCIAL SYNC */}
        {page === 'contact' && (
          <div className="max-w-5xl mx-auto space-y-24 py-10 animate-in slide-in-from-bottom duration-700">
            <h2 className="text-[14vw] font-black italic uppercase text-center leading-none tracking-tighter">CONTACT</h2>
            <div className="grid gap-6">
              {[
                { label: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy' },
                { label: 'TikTok', handle: '@alxgraphy', url: 'https://tiktok.com/@alxgraphy' },
                { label: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy' },
                { label: 'Direct', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' }
              ].map(item => (
                <a key={item.label} href={item.url} target="_blank" className={`p-12 border-4 ${t.border} flex justify-between items-center group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all`}>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">{item.label}</p>
                    <p className="text-4xl font-black italic group-hover:translate-x-4 transition-transform">{item.handle}</p>
                  </div>
                  <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER: THE SIGNATURE */}
      <footer className={`w-full py-24 px-12 border-t-2 ${t.border} flex flex-col lg:flex-row justify-between items-center gap-16 font-black uppercase text-[11px] tracking-[0.5em]`}>
        <div className="flex flex-col gap-2">
          <span>Toronto, Canada 🇨🇦</span>
          <span className="opacity-40">Build Version 7.2.0_Final</span>
        </div>
        <div className="text-center group">
          <p className="opacity-40 mb-2 tracking-widest text-[9px]">Designed & Engineered By</p>
          <a href="https://github.com/alxgraphy" target="_blank" className="text-2xl underline decoration-4 underline-offset-8 hover:bg-red-500 hover:text-white px-4 py-2 transition-all">Alexander Wondwossen</a>
        </div>
        <div className="flex gap-12 opacity-60">
          <a href="https://github.com/alxgraphy" target="_blank" className="hover:opacity-100">GH</a>
          <a href="https://tiktok.com/@alxgraphy" target="_blank" className="hover:opacity-100">TT</a>
          <a href="https://instagram.com/alexedgraphy" target="_blank" className="hover:opacity-100">IG</a>
        </div>
      </footer>

      {/* GLOBAL CSS FOR SCAN ANIMATION */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}} />
    </div>
  );
}
