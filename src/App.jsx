import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Smartphone, Globe, Layout, Database, ArrowRight, ExternalLink, Cpu, Activity, Zap } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- CLOCK LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- HEADER SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollY || window.scrollY < 50);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- NAVIGATION ---
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- GITHUB FETCH ---
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setRepos(data.filter(r => !r.fork)); });
  }, []);

  const t = {
    light: { bg: 'bg-[#F4F4F5]', text: 'text-[#18181B]', border: 'border-[#18181B]', grid: 'opacity-[0.03]', accent: 'text-blue-600' },
    dark: { bg: 'bg-[#09090B]', text: 'text-[#FAFAFA]', border: 'border-[#27272A]', grid: 'opacity-[0.07]', accent: 'text-blue-400' }
  }[theme];

  // --- FUTURE PATTERN BACKGROUND ---
  const GridBackground = () => (
    <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
      <svg width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-current opacity-10"></div>
    </div>
  );

  // --- 404 PAGE ---
  const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
  if (!validPages.includes(currentPage)) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center p-10 font-mono`}>
        <GridBackground />
        <h1 className="text-[15vw] font-black opacity-10 leading-none">404</h1>
        <p className="text-xl uppercase tracking-[0.5em] mb-12">Segment Not Found</p>
        <button onClick={() => navigate('home')} className={`px-8 py-3 border ${t.border} uppercase text-xs font-bold hover:bg-white hover:text-black transition-all`}>
          Return to Root
        </button>
      </div>
    );
  }

  // --- LANDING SCREEN ---
  if (!hasEntered && currentPage === 'home') {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center font-mono relative overflow-hidden`}>
        <GridBackground />
        <div className="z-10 text-center space-y-8 animate-in fade-in duration-1000">
          <div className="flex items-center justify-center gap-4 text-xs tracking-[0.4em] opacity-50 uppercase">
            <Activity size={14} /> System Initialized — Toronto, CA
          </div>
          <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none italic">ALEXANDER</h1>
          <div className="text-2xl font-light opacity-80">{currentTime.toLocaleTimeString()}</div>
          <button 
            onClick={() => setHasEntered(true)}
            className={`group mt-12 px-16 py-6 border-2 ${t.border} flex items-center gap-4 hover:bg-current hover:text-current transition-all overflow-hidden relative`}
          >
            <span className="relative z-10 uppercase tracking-[0.5em] text-xs font-bold group-hover:invert">Explore Archive</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-colors duration-500 relative selection:bg-blue-500 selection:text-white`}>
      <GridBackground />
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 transition-all duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter">A.</button>
        <nav className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(pg => (
            <button key={pg} onClick={() => navigate(pg)} className="hover:text-blue-500 transition-colors hidden md:block">{pg}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-32 px-12">
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="flex flex-col items-center">
              <div className="relative group mb-20">
                <div className={`border-[1px] ${t.border} p-4 transition-all duration-700 group-hover:scale-105 bg-black/5 backdrop-blur-sm`}>
                  <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-80 h-80 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  {/* Future Pattern Element: Scanning Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                </div>
                <div className="absolute -bottom-4 -right-8 bg-blue-600 text-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Toronto Based / Grade 7
                </div>
              </div>
              
              <h1 className="text-8xl md:text-[14rem] font-black leading-[0.75] text-center tracking-tighter uppercase italic">ALEXANDER</h1>
              <p className="mt-12 text-2xl md:text-4xl font-light text-center max-w-4xl leading-tight opacity-70">
                Architecting digital systems and visual narratives. Student developer exploring the intersection of <span className="text-blue-500 font-bold">code</span> and <span className="text-blue-500 font-bold">composition</span>.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-16">
            <h2 className="text-7xl font-black italic tracking-tighter uppercase">The Story</h2>
            <div className="space-y-8 text-2xl font-light leading-relaxed opacity-90">
              <p>I started my journey into development at age 11, driven by a desire to build things that didn't exist yet. As a Grade 7 student in Toronto, I balance academic growth with technical mastery.</p>
              <p>My toolkit centers around <span className="italic font-bold underline">React, Tailwind, and Vite</span>. I focus on creating performance-driven UIs that don't compromise on aesthetic integrity.</p>
              <p>Photography is my second language. By capturing the stark geometry of the city on 35mm film and digital sensors, I've learned how to bring balance and visual hierarchy to the software I build.</p>
            </div>
            <div className={`border-t ${t.border} pt-8 flex gap-8`}>
              <div className="flex flex-col"><span className="text-[10px] uppercase opacity-40">Location</span><span>Toronto, ON</span></div>
              <div className="flex flex-col"><span className="text-[10px] uppercase opacity-40">Focus</span><span>Frontend / Photo</span></div>
              <div className="flex flex-col"><span className="text-[10px] uppercase opacity-40">Status</span><span>Open for Collabs</span></div>
            </div>
          </div>
        )}

        {/* SKILLS SECTION */}
        {currentPage === 'skills' && (
          <div className="max-w-6xl mx-auto space-y-24">
            <h2 className="text-7xl font-black italic text-center uppercase">Technical Matrix</h2>
            <div className="grid md:grid-cols-3 gap-1px bg-current/10 border border-current/10">
              {[
                { icon: <Cpu />, title: "Development", list: ["React.js", "Vite", "JavaScript ES6+", "Tailwind CSS", "Git / GitHub"] },
                { icon: <Camera />, title: "Visuals", list: ["Street Photography", "Lightroom", "Color Theory", "Manual Exposure"] },
                { icon: <Zap />, title: "UX Design", list: ["Minimalist UI", "Typography", "Wireframing", "Interaction Logic"] }
              ].map(item => (
                <div key={item.title} className={`${t.bg} p-12 space-y-8 hover:bg-current/5 transition-colors`}>
                  <div className="text-blue-500">{item.icon}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest">{item.title}</h3>
                  <ul className="space-y-4 opacity-60 text-sm font-bold tracking-widest">
                    {item.list.map(s => <li key={s}>// {s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CODE SECTION */}
        {currentPage === 'code' && (
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="text-7xl font-black italic uppercase">Repository Archive</h2>
            <div className="grid gap-6">
              {repos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" className={`group border ${t.border} p-10 flex justify-between items-center hover:bg-blue-600 hover:text-white transition-all`}>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight">{repo.name}</h3>
                    <p className="text-sm opacity-60 mt-2 font-bold uppercase tracking-widest">{repo.language || 'Software'}</p>
                  </div>
                  <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY SECTION */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl mx-auto space-y-16">
            <h2 className="text-7xl font-black italic uppercase">Visual Grid</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg"
              ].map((url, i) => (
                <div key={i} className={`border ${t.border} overflow-hidden bg-black`}>
                  <img src={url} className="w-full grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 cursor-crosshair" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl mx-auto py-20 text-center space-y-24">
            <h2 className="text-[10vw] font-black italic leading-none tracking-tighter uppercase">Inquiries</h2>
            <div className="flex flex-col gap-6 text-2xl font-bold uppercase tracking-[0.4em]">
              <a href="mailto:alxgraphy@icloud.com" className="hover:text-blue-500 transition-colors">alxgraphy@icloud.com</a>
              <a href="https://github.com/alxgraphy" target="_blank" className="hover:text-blue-500 transition-colors">GitHub</a>
              <a href="https://instagram.com/alxgraphy" target="_blank" className="hover:text-blue-500 transition-colors">Instagram</a>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`w-full py-20 px-12 border-t ${t.border} flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.5em] opacity-50`}>
        <div>Toronto, Canada 🇨🇦</div>
        <div className="text-center">
          Made with ❤️ by Alexander Wondwossen (<a href="https://github.com/alxgraphy" className="underline hover:text-blue-500">@alxgraphy</a>)
        </div>
        <div>© 2024 All Rights Reserved</div>
      </footer>

      {/* Global CSS for the Scan Animation */}
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

export default App;
