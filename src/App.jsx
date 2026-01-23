import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  Activity, User, MapPin, Calendar, ExternalLink, Loader2,
  Cpu, Zap, Shield, Database, Radio
} from 'lucide-react';

/* --- UTILITY: CYPHER EFFECT HOOK --- */
const useCypher = (text, active) => {
  const [output, setOutput] = useState(text);
  const chars = "!@#$%^&*()_+[]{};<>/?";
  
  useEffect(() => {
    if (!active) { setOutput(text); return; }
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);
  
  return output;
};

/* --- COMPONENT: CYPHER TEXT --- */
const CypherText = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrambled = useCypher(text, isHovered);
  return (
    <span onMouseEnter={() => setIsHovered(true)} className={className}>
      {scrambled}
    </span>
  );
};

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* --- 1. DATA FETCHING --- */
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoadingRepos(false);
      });
  }, []);

  /* --- 2. INTERACTIVE EFFECTS --- */
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t = theme === 'dark' 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]', sub: 'text-zinc-500' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black', panel: 'bg-[#f5f5f5]', sub: 'text-zinc-400' };

  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-hidden cursor-none`}>
      
      {/* CUSTOM SCANNER CURSOR */}
      <div 
        className="fixed top-0 left-0 w-10 h-10 border-2 border-current rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}
      >
        <div className="w-1 h-1 bg-current" />
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-[10px]">ID: 00198081098</div>
        <div className="absolute bottom-10 right-10 text-[10px] rotate-90 underline">ALX_ARCHIVE_2026</div>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 backdrop-blur-md border-b ${t.border}`}>
        <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">
          <CypherText text="ALX." />
        </button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline' : ''}`}>
              {item}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border-2 ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* --- HOME PAGE DASHBOARD --- */}
        {page === 'home' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-1000">
            {/* HERO SECTION */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs opacity-50"><Radio size={14} className="animate-pulse" /> BROADCASTING_FROM: TORONTO, CA</div>
                <h1 className="text-7xl md:text-9xl font-black leading-none italic tracking-tighter">
                  <CypherText text="DEVELOPER" /><br/>
                  <span className="opacity-20">& CREATOR</span>
                </h1>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className={`p-8 border-2 ${t.border} relative group hover:bg-current hover:text-black transition-all`}>
                  <Corners />
                  <h3 className="text-xl font-black mb-4 italic">01 // CODE_BASE</h3>
                  <p className="text-sm opacity-60 group-hover:opacity-100">Building scalable systems with React and industrial logic. Currently focusing on UI performance.</p>
                </div>
                <div className={`p-8 border-2 ${t.border} relative group hover:bg-current hover:text-black transition-all`}>
                  <Corners />
                  <h3 className="text-xl font-black mb-4 italic">02 // VISUAL_SYNC</h3>
                  <p className="text-sm opacity-60 group-hover:opacity-100">Capturing the raw architecture of the city through a 35mm lens. 12 years deep in the creative grind.</p>
                </div>
              </div>
            </div>

            {/* SIDEBAR DASHBOARD */}
            <div className="lg:col-span-4 space-y-8">
              <div className={`border-2 ${t.border} p-6 relative`}>
                <Corners />
                <h4 className="text-[10px] font-black opacity-30 uppercase tracking-[0.5em] mb-6">System_Status</h4>
                <div className="space-y-4 text-[11px]">
                  <div className="flex justify-between border-b border-current/10 pb-2"><span>UPTIME</span><span className="font-bold">99.9%</span></div>
                  <div className="flex justify-between border-b border-current/10 pb-2"><span>CORES</span><span className="font-bold text-green-500">ACTIVE_04</span></div>
                  <div className="flex justify-between border-b border-current/10 pb-2"><span>SYNC</span><span className="font-bold">GITHUB_OK</span></div>
                  <div className="flex justify-between"><span>LATENCY</span><span className="font-bold">24ms</span></div>
                </div>
              </div>

              <div className={`p-6 bg-current ${theme === 'dark' ? 'text-black' : 'text-white'} italic font-black text-center`}>
                <p className="animate-pulse">AVAILABLE FOR HIRE // 2026</p>
              </div>

              {/* LIVE REPO MINI-LIST */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black opacity-30 uppercase tracking-[0.5em]">Recent_Push</h4>
                {repos.slice(0, 3).map(repo => (
                  <div key={repo.id} className="text-[10px] flex items-center gap-3">
                    <div className="w-1 h-1 bg-current animate-ping" />
                    <span className="font-bold uppercase truncate">{repo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CODE PAGE (LIVE GITHUB) --- */}
        {page === 'code' && (
          <div className="space-y-12 animate-in slide-in-from-right duration-500">
            <h2 className="text-8xl font-black italic tracking-tighter uppercase"><CypherText text="Repositories" /></h2>
            {loadingRepos ? (
              <Loader2 className="animate-spin mx-auto" size={48} />
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {repos.map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" 
                     className={`group p-10 border-2 ${t.border} flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-300 relative`}>
                    <Corners />
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase group-hover:line-through">{repo.name}</h3>
                        <ExternalLink size={20} />
                      </div>
                      <p className="text-sm opacity-50 italic group-hover:opacity-100">{repo.description || 'System data redacted.'}</p>
                    </div>
                    <div className="mt-8 flex gap-4 text-[10px] font-black">
                      <span className="border border-current px-2 py-1">{repo.language || 'DATA'}</span>
                      <span className="opacity-40 italic">STARS: {repo.stargazers_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- PHOTOGRAPHY PAGE (COLOUR HOVER) --- */}
        {page === 'photography' && (
          <div className="columns-1 md:columns-3 gap-8 space-y-8 animate-in zoom-in duration-700">
            {[
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
            ].map((url, i) => (
              <div key={i} className={`border-2 ${t.border} overflow-hidden group bg-black transition-all duration-500 hover:scale-[1.02]`}>
                <img 
                  src={url} 
                  className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out" 
                  alt="Gallery" 
                />
              </div>
            ))}
          </div>
        )}

        {/* --- ABOUT --- */}
        {page === 'about' && (
          <div className="grid md:grid-cols-12 gap-12 animate-in slide-in-from-left duration-500">
            <div className="md:col-span-5 relative">
              <div className={`p-4 border-2 ${t.border}`}>
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale" alt="Profile" />
                <Corners />
              </div>
            </div>
            <div className="md:col-span-7 space-y-12">
              <h2 className="text-8xl font-black italic tracking-tighter uppercase underline decoration-4 underline-offset-8">Manifesto</h2>
              <p className="text-4xl font-light leading-tight italic opacity-80">
                A 12-year-old developer carving industrial logic into the digital sphere. Specializing in <span className="font-black bg-white text-black px-2">React Architecture</span> and urban geometry.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* SYSTEM SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-5 overflow-hidden">
        <div className="w-full h-[1px] bg-white animate-scan-y absolute top-0" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-y {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-y { animation: scan-y 8s linear infinite; }
        .text-transparent { -webkit-text-fill-color: transparent; }
      `}} />
    </div>
  );
}
