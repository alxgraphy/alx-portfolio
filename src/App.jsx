import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  MapPin, ExternalLink, Loader2, Target, X,
  Instagram, Github, Mail, Activity, Globe, GitBranch, GitCommit, Clock
} from 'lucide-react';

/* --- CYPHER EFFECT --- */
const CypherText = ({ text, className }) => {
  const [output, setOutput] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  useEffect(() => {
    if (!isHovered) { setOutput(text); return; }
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text]);
  
  return <span onMouseEnter={() => setIsHovered(true)} className={className}>{output}</span>;
};

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // FETCH REPOS
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => setRepos(Array.isArray(data) ? data : []));

    // FETCH LIVE EVENTS
    fetch('https://api.github.com/users/alxgraphy/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const processedEvents = data.map(event => {
            const type = event.type.replace('Event', '').toUpperCase();
            const repo = event.repo.name.split('/')[1];
            let msg = "";
            if (event.payload.commits) msg = event.payload.commits[0].message;
            if (event.payload.pull_request) msg = event.payload.pull_request.title;
            return `${type}: [${repo}] - ${msg || 'SYSTEM_UPDATE'}`;
          }).slice(0, 10);
          setEvents(processedEvents);
          setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t = theme === 'dark' 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black' };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden cursor-none`}>
      
      <style>{`
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-top { display: flex; animation: marquee-fast 30s linear infinite; }
      `}</style>

      {/* CURSOR */}
      <div className="fixed top-0 left-0 w-8 h-8 border border-current rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
        <div className="w-1 h-1 bg-current animate-pulse" />
      </div>

      {/* TOP LIVE GITHUB TICKER */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-10 z-[60] bg-black border-x-2 border-b-2 border-white overflow-hidden hidden sm:block shadow-2xl`}>
        <div className="animate-marquee-top whitespace-nowrap flex gap-12 items-center h-full text-white px-4">
          {events.length > 0 ? [...events, ...events].map((log, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {log}
            </span>
          )) : (
            <span className="text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">ESTABLISHING_GITHUB_HANDSHAKE...</span>
          )}
        </div>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b ${t.border}`}>
        <div className="flex flex-col">
          <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
          <div className="text-[8px] font-black opacity-40 uppercase tracking-widest mt-1 flex items-center gap-2">
             <Clock size={10} /> Sync: {lastSync || '--:--'}
          </div>
        </div>

        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`ml-4 p-2 border ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                <div className="inline-block px-3 py-1 border border-current text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Globe size={12} /> Toronto, ON // 43.6532° N
                </div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-current pl-6">Digital systems built with an industrial lens.</p>
              </div>
              <div className="lg:col-span-4">
                 <div className={`p-4 border-2 ${t.border} transition-transform duration-500 hover:-translate-y-4`}>
                  <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale brightness-110 contrast-125" alt="Alex" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- DYNAMIC PAGES --- */}
        {page === 'code' && (
          <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
             {loading ? <Loader2 className="animate-spin mx-auto col-span-2" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => window.open(repo.html_url, '_blank')} 
                     className={`group text-left p-12 border-2 ${t.border} hover:bg-white hover:text-black transition-all duration-500`}>
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{repo.name}</h3>
                    <p className="opacity-50 line-clamp-2 italic mb-6">{repo.description || 'System data redacted.'}</p>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black border border-current px-3 py-1 uppercase">{repo.language || 'JS'}</span>
                       <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform"/>
                    </div>
                  </button>
                ))
              }
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Optics" /></h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-10">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-current overflow-hidden bg-black">
                  <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000 ease-in-out" alt="Work" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
