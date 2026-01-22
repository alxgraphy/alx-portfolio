import { useState, useEffect, useRef, useMemo } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Layout, Database, ArrowRight, ExternalLink, Cpu, Activity, Zap, Terminal, Hash, Layers, Frame, Target, XCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const lastScrollY = useRef(0);

  // --- OPTIMIZED CLOCK ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- SMOOTH HEADER LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NAVIGATION ---
  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'instant' }); // Instant is less glitchy than smooth during state changes
  };

  // --- GITHUB FETCH ---
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setRepos(data.filter(r => !r.fork)); })
      .catch(err => console.error("API Limit reached or error:", err));
  }, []);

  const t = theme === 'light' 
    ? { bg: 'bg-white', text: 'text-black', border: 'border-black', accent: 'bg-black text-white', grid: 'bg-[url("https://www.transparenttextures.com/patterns/graphy.png")]' }
    : { bg: 'bg-black', text: 'text-white', border: 'border-white', accent: 'bg-white text-black', grid: 'bg-[url("https://www.transparenttextures.com/patterns/asfalt-dark.png")]' };

  // --- 404 HANDLER ---
  const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
  if (!validPages.includes(currentPage)) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center p-10 font-mono`}>
        <XCircle size={80} className="mb-6 animate-pulse" />
        <h1 className="text-9xl font-black italic">404</h1>
        <p className="text-xl font-bold uppercase tracking-widest mt-4 text-center">Data Packet Lost in Transit.</p>
        <button onClick={() => navigate('home')} className={`mt-10 px-10 py-4 border-2 ${t.border} font-black uppercase hover:invert transition-all`}>Return to Base</button>
      </div>
    );
  }

  // --- LANDING SCREEN ---
  if (!hasEntered && currentPage === 'home') {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center font-mono relative transition-colors duration-500`}>
        <div className="z-10 text-center space-y-4 px-6">
          <p className="text-[10px] tracking-[0.8em] uppercase opacity-40">Build 5.0 // System Initializing</p>
          <h1 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-none italic uppercase animate-pulse">Wondwossen</h1>
          <button 
            onClick={() => setHasEntered(true)}
            className={`mt-12 px-16 py-6 border-2 ${t.border} text-xs font-black uppercase tracking-[0.5em] hover:invert transition-all active:scale-95`}
          >
            Access Files
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans selection:bg-black selection:text-white transition-colors duration-500`}>
      
      {/* HEADER: HARDWARE ACCELERATED */}
      <header 
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-opacity-80 backdrop-blur-xl border-b ${t.border} transition-transform duration-500 ease-in-out`}
        style={{ transform: showNav ? 'translate3d(0,0,0)' : 'translate3d(0,-100%,0)' }}
      >
        <button onClick={() => navigate('home')} className="text-4xl md:text-5xl font-black tracking-tighter italic">A.</button>
        
        <nav className="flex items-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(pg => (
            <button key={pg} onClick={() => navigate(pg)} className="hidden md:block hover:underline underline-offset-8 decoration-2 transition-all">{pg}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border-2 ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <main className="pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="flex flex-col items-center space-y-24">
            <div className="relative group">
              <div className={`border-2 ${t.border} p-4 bg-transparent transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-105`}>
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-72 h-72 md:w-96 md:h-96 object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt="Alexander" />
              </div>
              <div className={`absolute -bottom-4 -right-8 ${t.accent} px-6 py-2 text-[10px] font-black uppercase tracking-widest italic shadow-xl`}>
                Toronto / Grade 7
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-[15vw] font-black leading-none tracking-tighter uppercase italic">ALEXANDER</h1>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-current/20 pt-10">
                <div><p className="text-[9px] uppercase opacity-40 mb-1">Status</p><p className="font-black text-sm uppercase">Available</p></div>
                <div><p className="text-[9px] uppercase opacity-40 mb-1">Local Time</p><p className="font-black text-sm uppercase">{currentTime.toLocaleTimeString()}</p></div>
                <div><p className="text-[9px] uppercase opacity-40 mb-1">Socials</p><p className="font-black text-sm uppercase">@alxgraphy</p></div>
                <div><p className="text-[9px] uppercase opacity-40 mb-1">Lat/Lon</p><p className="font-black text-sm uppercase">43.65 / 79.38</p></div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS SECTION: EFFICIENT GRID */}
        {currentPage === 'skills' && (
          <div className="space-y-16">
            <h2 className="text-7xl font-black italic uppercase">Matrix</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Development', list: ['React.js', 'Vite', 'JavaScript', 'Tailwind', 'Git'] },
                { title: 'Visuals', list: ['35mm Analog', 'Lightroom', 'Street Photo', 'Color Theory'] },
                { title: 'Systems', list: ['Figma Community', 'UI Patterns', 'Wireframing', 'UX Flow'] }
              ].map(skill => (
                <div key={skill.title} className={`p-10 border-2 ${t.border} space-y-6 hover:bg-black hover:text-white transition-colors duration-300`}>
                  <h3 className="text-2xl font-black uppercase italic underline decoration-2">{skill.title}</h3>
                  <ul className="space-y-3 text-xs font-bold uppercase tracking-widest opacity-70">
                    {skill.list.map(item => <li key={item}>// {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY: STATIC GRID (LESS GLITCHY) */}
        {currentPage === 'photography' && (
          <div className="space-y-12">
            <h2 className="text-6xl font-black uppercase italic">The Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg"
              ].map((url, i) => (
                <div key={i} className={`border-2 ${t.border} overflow-hidden aspect-square bg-neutral-100 dark:bg-neutral-900`}>
                  <img src={url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Gallery Work" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT: HIGH DENSITY HANDLES */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-12 py-10">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter">Handles</h2>
            <div className="grid gap-4">
              {[
                { label: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy' },
                { label: 'TikTok', handle: '@alxgraphy', url: 'https://tiktok.com/@alxgraphy' },
                { label: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy' },
                { label: 'Email', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' }
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" className={`p-8 border-2 ${t.border} flex justify-between items-center group hover:invert transition-all`}>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{link.label}</span>
                  <span className="text-2xl font-black italic">{link.handle}</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`w-full py-16 px-6 md:px-12 border-t-2 ${t.border} flex flex-col md:flex-row justify-between items-center gap-10 font-black uppercase text-[10px] tracking-widest`}>
        <div className="flex flex-col gap-1">
          <span>Toronto, Canada 🇨🇦</span>
          <span className="opacity-40">System Release 5.0.1</span>
        </div>
        <div className="text-center group">
          Made with ❤️ by <br/> 
          <a href="https://github.com/alxgraphy" target="_blank" className="text-lg underline underline-offset-4 decoration-2 hover:invert px-2 transition-all">Alexander Wondwossen</a>
        </div>
        <div className="flex gap-8 opacity-60">
          <a href="https://tiktok.com/@alxgraphy" className="hover:opacity-100 transition-opacity">TikTok</a>
          <a href="https://github.com/alxgraphy" className="hover:opacity-100 transition-opacity">GitHub</a>
          <a href="https://instagram.com/alexedgraphy" className="hover:opacity-100 transition-opacity">Insta</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
