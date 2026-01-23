import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  Github, Instagram, Mail, Activity, Cpu, Target, 
  Shield, Box, Zap, User, MapPin, Calendar, Globe, ExternalLink 
} from 'lucide-react';

/**
 * 🛠️ ALEXANDER'S MONOCHROME SYSTEM INDEX:
 * ---------------------------------------
 * 01. CONFIG & THEME ....... Line 30
 * 02. UI COMPONENTS ........ Line 65
 * 03. GLOBAL HEADER ........ Line 100
 * 04. HOME PAGE ............ Line 140
 * 05. ABOUT PAGE ........... Line 190
 * 06. SKILLS PAGE .......... Line 250
 * 07. CODE PAGE ............ Line 300
 * 08. PHOTOGRAPHY PAGE ..... Line 370
 * 09. CONTACT PAGE ......... Line 420
 * 10. FOOTER & STYLES ...... Line 470
 */

export default function App() {
  /* --- 01. CONFIG & STATE --- */
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [showNav, setShowNav] = useState(true);
  const [time, setTime] = useState(new Date());
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollY.current || window.scrollY < 50);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MONOCHROME THEMING
  const t = theme === 'light' 
    ? { bg: 'bg-[#FFFFFF]', text: 'text-black', border: 'border-black', accent: 'bg-black text-white', grid: 'opacity-[0.08]' }
    : { bg: 'bg-[#000000]', text: 'text-white', border: 'border-white', accent: 'bg-white text-black', grid: 'opacity-[0.12]' };

  /* --- 02. REUSABLE UI COMPONENTS --- */
  
  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  const DataStream = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-[8px] font-black uppercase opacity-30 tracking-[0.3em]">{label}</span>
      <span className="text-[10px] font-black uppercase tracking-widest">{value}</span>
    </div>
  );

  /* --- 03. GLOBAL HEADER --- */
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden relative selection:bg-white selection:text-black`}>
      
      {/* GRID OVERLAY */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
        <svg width="100%" height="100%">
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b ${t.border} transition-transform duration-700 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-12">
          <button onClick={() => setPage('home')} className="text-5xl font-black italic tracking-tighter transition-transform hover:scale-105">ALX</button>
          <div className="hidden lg:flex gap-12 border-l border-current/20 pl-12">
            <DataStream label="OS" value="STARK_v9" />
            <DataStream label="LAT/LON" value="43.65 / -79.38" />
            <DataStream label="SYSTEM_TIME" value={time.toLocaleTimeString()} />
          </div>
        </div>
        
        <nav className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through transition-all ${page === item ? 'underline underline-offset-8' : ''}`}>
              {item}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border-2 ${t.border} hover:bg-white hover:text-black transition-all`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* --- 04. HOME PAGE --- */}
        {page === 'home' && (
          <div className="flex flex-col items-center space-y-24 animate-in fade-in zoom-in duration-1000">
            <div className="relative group">
              <div className={`border-2 ${t.border} p-6 bg-transparent transition-all duration-700 group-hover:-translate-y-4`}>
                <Corners />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-80 h-80 object-cover grayscale brightness-110 contrast-125" alt="Alex" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_15px_white]" />
              </div>
              <div className={`absolute -bottom-4 -right-8 ${t.accent} px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] italic shadow-2xl`}>
                @ALXGRAPHY
              </div>
            </div>

            <div className="text-center space-y-12">
              <h1 className="text-8xl md:text-[14vw] font-black leading-[0.7] tracking-tighter uppercase italic">
                ALEXANDER<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
              </h1>
              <p className="text-xl md:text-3xl font-light opacity-50 max-w-3xl mx-auto leading-tight italic">
                Developing high-performance digital architecture through logic and visual composition. Based in Toronto.
              </p>
            </div>
          </div>
        )}

        {/* --- 05. ABOUT PAGE --- */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-20 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-4 space-y-10">
              <div className={`p-10 border-2 ${t.border} ${t.panel} relative`}>
                <Corners />
                <h3 className="text-[10px] font-black uppercase tracking-[0.6em] mb-10 opacity-30 italic">Identity_Archive</h3>
                <div className="space-y-8 font-black uppercase text-sm tracking-widest">
                  <div className="flex items-center gap-5 border-b border-current/10 pb-4"><User size={20}/><p>Alex Wondwossen</p></div>
                  <div className="flex items-center gap-5 border-b border-current/10 pb-4"><MapPin size={20}/><p>Toronto, Canada</p></div>
                  <div className="flex items-center gap-5 border-b border-current/10 pb-4"><Calendar size={20}/><p>Grade 7 / Creator</p></div>
                  <div className="flex items-center gap-5"><Activity size={20} className="animate-pulse"/><p className="opacity-40 italic">System Active</p></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-16">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-8">Manifesto</h2>
              <div className="space-y-10 text-3xl font-light leading-snug opacity-80 border-l-[12px] border-current pl-12 italic">
                <p>I am a 12-year-old developer carving a space where raw code meets brutalist geometry.</p>
                <p>Specializing in the <span className="font-black underline">React ecosystem</span>, I build tools that focus on performance and minimalist industrial design.</p>
                <p>Street photography is my secondary language. It allows me to study urban architecture and apply those patterns to digital interfaces.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- 06. SKILLS PAGE --- */}
        {page === 'skills' && (
          <div className="space-y-20 animate-in fade-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter">Specs</h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-current">
              {[
                { title: 'Frontend', items: ['React.js', 'Vite', 'JavaScript', 'Tailwind', 'State Logic'], icon: <Terminal /> },
                { title: 'Visuals', items: ['35mm Photo', 'Lightroom', 'Geometry', 'Composition', 'Glass'], icon: <Camera /> },
                { title: 'Design', items: ['Brutalism', 'Typography', 'Figma', 'System UX', 'Prototyping'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-current hover:text-current-inverse transition-all`}>
                  <div className="mb-10 scale-150 origin-left opacity-30 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                  <h3 className="text-3xl font-black uppercase mb-10 italic tracking-tight">{s.title}</h3>
                  <div className="space-y-5">
                    {s.items.map(item => (
                      <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">
                        <div className="w-2 h-2 bg-current" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 07. CODE PAGE --- */}
        {page === 'code' && (
          <div className="space-y-16 animate-in slide-in-from-right duration-700">
            <div className="flex justify-between items-end border-b-2 border-current pb-10">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter">Code</h2>
              <DataStream label="REPOS" value="03_ACTIVE" />
            </div>
            <div className="grid gap-8">
              {[
                { name: 'STARK_v9', tech: 'React / Tailwind', desc: 'Monochrome high-density system architecture.' },
                { name: 'MATRIX_OS', tech: 'JavaScript / CSS', desc: 'Industrial data visualization and monitoring.' },
                { name: 'ARCHIVE_SYNC', tech: 'Node / Cloud', desc: 'Automated photography deployment pipeline.' }
              ].map((repo, idx) => (
                <div key={idx} className={`group p-12 border-2 ${t.border} relative hover:invert transition-all`}>
                  <Corners />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-white"><Terminal size={24} /><h3 className="text-4xl font-black italic uppercase tracking-tighter">{repo.name}</h3></div>
                      <p className="text-lg opacity-40 italic">{repo.desc}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-black border-2 border-current px-5 py-2 uppercase tracking-widest">{repo.tech}</span>
                      <a href="https://github.com/alxgraphy" className="p-2 border-2 border-current hover:scale-110 transition-transform"><ExternalLink size={24} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 08. PHOTOGRAPHY PAGE --- */}
        {page === 'photography' && (
          <div className="space-y-16 animate-in zoom-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4 underline-offset-8">Archive</h2>
            <div className="columns-1 md:columns-3 gap-8 space-y-8">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-current overflow-hidden bg-black">
                  <img src={url} className="w-full grayscale brightness-75 contrast-125 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" alt="Gallery" />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20" />
                  <div className="absolute bottom-4 right-4 text-[8px] font-black bg-white text-black px-3 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity">FILE_TOR_0{i}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 09. CONTACT PAGE --- */}
        {page === 'contact' && (
          <div className="max-w-5xl mx-auto space-y-24 py-10 animate-in slide-in-from-bottom duration-700">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center">Sync</h2>
            <div className="grid gap-6">
              {[
                { platform: 'GitHub', handle: '@ALXGRAPHY', url: 'https://github.com/alxgraphy' },
                { platform: 'TikTok', handle: '@ALXGRAPHY', url: 'https://tiktok.com/@alxgraphy' },
                { platform: 'Instagram', handle: '@ALEXEDGRAPHY', url: 'https://instagram.com/alexedgraphy' },
                { platform: 'E-Mail', handle: 'ALXGRAPHY@ICLOUD.COM', url: 'mailto:alxgraphy@icloud.com' }
              ].map((item, idx) => (
                <a key={idx} href={item.url} className={`p-14 border-2 ${t.border} flex justify-between items-center group relative overflow-hidden hover:bg-white hover:text-black transition-all`}>
                  <div className="z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30 mb-3">{item.platform}</p>
                    <p className="text-5xl md:text-7xl font-black italic tracking-tighter group-hover:translate-x-6 transition-transform">{item.handle}</p>
                  </div>
                  <ArrowRight size={64} className="z-10 group-hover:rotate-45 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- 10. FOOTER --- */}
      <footer className="w-full py-24 px-12 border-t-2 border-current flex flex-col md:flex-row justify-between items-center gap-16 font-black uppercase text-[10px] tracking-[0.6em] opacity-30 relative z-10">
        <div className="flex flex-col gap-2"><span>ALX_SYSTEM / TORONTO</span><span>© 2026 EDITION</span></div>
        <a href="https://github.com/alxgraphy" className="text-2xl underline underline-offset-[12px] decoration-4">ALEXANDER WONDWOSSEN</a>
        <div className="flex gap-12 text-xs"><span>GH</span><span>TT</span><span>IG</span></div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 3s linear infinite; }
        .text-transparent { -webkit-text-fill-color: transparent; }
        .hover\\:text-current-inverse:hover { color: ${theme === 'dark' ? 'black' : 'white'}; }
      `}} />
    </div>
  );
}
