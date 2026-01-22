import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Smartphone, Globe, Layout, Database, ArrowRight, ExternalLink, Heart, XCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusText, setStatusText] = useState('Toronto Based');

  // --- TIME & GREETING ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // --- STATUS RANDOMIZER ---
  useEffect(() => {
    const statuses = ["Toronto Based", "Grade 7 Build", "Learning React", "Capturing 35mm", "Building Systems", "Available for Commissions", "Coffee Powered"];
    setStatusText(statuses[Math.floor(Math.random() * statuses.length)]);
  }, [currentPage]);

  // --- HEADER SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- GITHUB FETCH ---
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setRepos(data.filter(r => !r.fork)); });
  }, []);

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

  const t = {
    light: { bg: 'bg-[#F9F9F9]', text: 'text-black', border: 'border-black', card: 'bg-white', accent: 'bg-yellow-400' },
    dark: { bg: 'bg-[#0F0F0F]', text: 'text-white', border: 'border-white', card: 'bg-[#1A1A1A]', accent: 'bg-red-600' }
  }[theme];

  // --- 404 LOGIC (Sarcastic) ---
  const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
  if (!validPages.includes(currentPage)) {
    const insults = [
      "You typed this in wrong, didn't you?",
      "My Grade 7 math is better than your navigation skills.",
      "This page is as real as your imaginary friend.",
      "404: Brain not found. (The page is missing too).",
      "Even my camera can't find what you're looking for."
    ];
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center p-10 font-mono`}>
        <XCircle size={100} className="mb-8 text-red-500 animate-bounce" />
        <h1 className="text-9xl font-black italic">404</h1>
        <p className="text-2xl mt-4 font-bold uppercase text-center max-w-xl">
          "{insults[Math.floor(Math.random() * insults.length)]}"
        </p>
        <button onClick={() => navigate('home')} className={`mt-10 px-10 py-4 border-4 ${t.border} font-black uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all`}>
          Go Back Home
        </button>
      </div>
    );
  }

  // --- LANDING SCREEN ---
  if (!hasEntered && currentPage === 'home') {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center font-mono p-10 text-center`}>
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <p className="text-xl uppercase tracking-[0.5em] opacity-60 font-black">{getGreeting()}</p>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none italic">ALEXANDER</h1>
          <div className="text-4xl font-light py-4 border-y-2 border-current inline-block px-12 uppercase tracking-widest">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <br />
          <button 
            onClick={() => setHasEntered(true)} 
            className={`mt-12 px-20 py-8 border-8 ${t.border} text-3xl font-black uppercase transition-all hover:scale-110 active:scale-95 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]`}
          >
            ENTER SYSTEM
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans selection:bg-yellow-400 selection:text-black transition-colors duration-500`}>
      
      {/* HEADER (Hides on Scroll) */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 transition-all duration-500 ${showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <button onClick={() => navigate('home')} className="text-5xl font-black tracking-tighter hover:rotate-12 transition-transform">A.</button>
        <nav className="flex items-center gap-10">
          {['about', 'skills', 'code', 'photography', 'contact'].map(pg => (
            <button key={pg} onClick={() => navigate(pg)} className="hidden lg:block text-xs font-black uppercase tracking-[0.3em] hover:underline decoration-4">
              {pg}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-3 border-4 ${t.border} rounded-full hover:rotate-180 transition-transform`}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </header>

      <main className="pt-48 pb-32 px-6 md:px-12">
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16">
            <div className="relative group">
              <div className={`border-[12px] ${t.border} p-3 bg-white transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-110 shadow-2xl`}>
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" alt="Alexander" className="w-80 h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className={`absolute -bottom-6 -right-10 ${t.accent} text-black px-6 py-3 font-black uppercase text-lg shadow-xl -rotate-6 group-hover:rotate-0 transition-transform`}>
                {statusText}
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <h1 className="text-8xl md:text-[15rem] font-black leading-[0.7] tracking-tighter uppercase italic">ALEXANDER</h1>
              <p className="text-3xl md:text-5xl font-light italic max-w-5xl mx-auto leading-tight">
                "Code is the architecture of the mind, and photography is the architecture of the moment."
              </p>
              <div className="flex justify-center gap-4 pt-10">
                <button onClick={() => navigate('code')} className={`px-10 py-5 border-4 ${t.border} font-black uppercase text-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all`}>View My Work</button>
                <button onClick={() => navigate('about')} className={`px-10 py-5 border-4 ${t.border} font-black uppercase text-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all`}>Read Story</button>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-7xl font-black uppercase italic tracking-tighter">The Narrative</h2>
            <div className={`border-l-8 border-black dark:border-white pl-10 space-y-8 text-2xl leading-relaxed`}>
              <p>I am Alexander Wondwossen. I’m a Grade 7 student based in Toronto with an obsession for digital craftsmanship. I don’t believe age defines technical ability.</p>
              <p>I build with <span className="font-black underline">React, Vite, and Tailwind CSS</span>. My goal is to create interfaces that feel snappy, logical, and visually striking. Every line of code I write is a step toward mastering the systems that power our world.</p>
              <p>When my hands aren't on a keyboard, they’re holding a camera. Street photography allows me to see the geometry of Toronto—the way light hits a building or the way people navigate the urban grid. This visual eye directly informs how I design my software.</p>
              <p className="text-4xl font-black italic mt-12">"Stay hungry, stay curious."</p>
            </div>
          </div>
        )}

        {/* SKILLS SECTION */}
        {currentPage === 'skills' && (
          <div className="max-w-7xl mx-auto space-y-20">
            <h2 className="text-8xl font-black uppercase italic text-center">Toolkit</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className={`border-8 ${t.border} p-12 hover:-translate-y-4 transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]`}>
                <Code size={60} className="mb-8" strokeWidth={3} />
                <h3 className="text-4xl font-black uppercase mb-6 underline">DEV</h3>
                <p className="text-xl font-bold leading-loose">REACT.JS / VITE / JAVASCRIPT / TAILWIND CSS / GIT / GITHUB / NPM / NODE.JS BASICS</p>
              </div>
              <div className={`border-8 ${t.border} p-12 hover:-translate-y-4 transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]`}>
                <Camera size={60} className="mb-8" strokeWidth={3} />
                <h3 className="text-4xl font-black uppercase mb-6 underline">PHOTO</h3>
                <p className="text-xl font-bold leading-loose">STREET PHOTOGRAPHY / MANUAL EXPOSURE / LIGHTROOM / COLOR THEORY / COMPOSITION</p>
              </div>
              <div className={`border-8 ${t.border} p-12 hover:-translate-y-4 transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]`}>
                <Layout size={60} className="mb-8" strokeWidth={3} />
                <h3 className="text-4xl font-black uppercase mb-6 underline">DESIGN</h3>
                <p className="text-xl font-bold leading-loose">MINIMALISM / UI-UX FLOW / TYPOGRAPHY / WIREFRAMING / BRANDING</p>
              </div>
            </div>
          </div>
        )}

        {/* CODE SECTION */}
        {currentPage === 'code' && (
          <div className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-7xl font-black uppercase italic">The Archives</h2>
            <div className="grid gap-8">
              {repos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" className={`group border-8 ${t.border} p-10 flex justify-between items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all`}>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase group-hover:italic">{repo.name}</h3>
                    <p className="text-xl opacity-70 font-medium">{repo.description || "A project representing deep technical exploration."}</p>
                    <div className="flex gap-4">
                      <span className="text-xs font-black px-3 py-1 border-2 border-current">GITHUB</span>
                      <span className="text-xs font-black px-3 py-1 border-2 border-current">{repo.language || 'JS'}</span>
                    </div>
                  </div>
                  <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY SECTION */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl mx-auto space-y-16">
            <h2 className="text-7xl font-black uppercase italic tracking-tighter">Visual Grid</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg"
              ].map((url, i) => (
                <div key={i} className={`border-4 ${t.border} overflow-hidden group`}>
                  <img src={url} className="w-full grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700 cursor-crosshair" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        {currentPage === 'contact' && (
          <div className="max-w-5xl mx-auto py-20 text-center space-y-24">
            <h2 className="text-[10vw] font-black italic leading-none tracking-tighter underline decoration-yellow-400">CONTACT</h2>
            <div className="flex flex-col gap-10 text-4xl md:text-6xl font-black italic">
              <a href="mailto:alxgraphy@icloud.com" className="hover:line-through transition-all">alxgraphy@icloud.com</a>
              <a href="https://github.com/alxgraphy" target="_blank" className="hover:line-through transition-all">github.com/alxgraphy</a>
              <a href="https://instagram.com/alxgraphy" target="_blank" className="hover:line-through transition-all">@alxgraphy</a>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`w-full py-16 px-12 border-t-8 ${t.border} flex flex-col md:flex-row justify-between items-center gap-8 font-black uppercase text-sm`}>
        <div>Toronto, Canada 🇨🇦</div>
        <div className="text-center">
          Made with ❤️ by Alexander Wondwossen (<a href="https://github.com/alxgraphy" target="_blank" className="underline hover:bg-yellow-400 hover:text-black px-2">@alxgraphy</a>)
        </div>
        <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}

export default App;
