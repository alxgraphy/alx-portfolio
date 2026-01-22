import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Smartphone, Globe, Layout, Database, ArrowRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('classic'); // 'classic' (Old Money) or 'midnight'
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [statusText, setStatusText] = useState('Toronto Based');

  // Randomize Status on Refresh
  useEffect(() => {
    const statuses = [
      "Toronto Based", 
      "Est. 2012", 
      "Available for Commissions", 
      "Digital Architect", 
      "Analog Soul", 
      "Grade 7 Build"
    ];
    setStatusText(statuses[Math.floor(Math.random() * statuses.length)]);
  }, []);

  // Scroll Header Logic
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

  // Navigation Logic
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo(0, 0);
  };

  // GitHub Fetch
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setRepos(data.filter(r => !r.fork)); });
  }, []);

  const themes = {
    classic: {
      bg: 'bg-[#FDFCF8]', // Cream / Bone
      text: 'text-[#1A1A1A]', // Off-black
      border: 'border-[#1A1A1A]',
      accent: 'bg-[#1A1A1A] text-[#FDFCF8]',
      card: 'bg-white border-[#1A1A1A]',
      footer: 'border-t border-[#1A1A1A]'
    },
    midnight: {
      bg: 'bg-[#0F1111]', // Deep Charcoal
      text: 'text-[#F2F2F2]',
      border: 'border-[#F2F2F2]',
      accent: 'bg-[#F2F2F2] text-[#0F1111]',
      card: 'bg-[#1A1A1A] border-[#F2F2F2]',
      footer: 'border-t border-[#F2F2F2]'
    }
  };

  const t = themes[theme];

  // --- Sarcastic 404 Handler ---
  const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
  if (!validPages.includes(currentPage)) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-serif flex items-center justify-center p-10`}>
        <div className="text-center space-y-6">
          <h1 className="text-9xl font-light italic">404</h1>
          <p className="text-2xl uppercase tracking-[0.3em]">"You seem lost. Should I call your mom?"</p>
          <p className="opacity-60 italic">This page exists only in your imagination.</p>
          <button onClick={() => navigate('home')} className={`px-8 py-3 border ${t.border} uppercase text-sm tracking-widest`}>Return to Reality</button>
        </div>
      </div>
    );
  }

  // --- LANDING ---
  if (!hasEntered && currentPage === 'home') {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex items-center justify-center font-serif`}>
        <div className="text-center space-y-12 animate-in fade-in duration-1000">
          <h1 className="text-[12vw] font-light leading-none tracking-tighter italic">Alexander</h1>
          <button onClick={() => setHasEntered(true)} className={`group relative px-20 py-6 border ${t.border} uppercase text-xs tracking-[0.5em] transition-all hover:bg-black hover:text-white`}>
            Enter Archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-serif selection:bg-black selection:text-white transition-colors duration-700`}>
      
      {/* HEADER: Hides on scroll */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => navigate('home')} className="text-3xl font-light italic tracking-tighter">A.</button>
        <nav className="hidden md:flex gap-12 text-xs uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => navigate(item)} className="hover:italic transition-all">{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'classic' ? 'midnight' : 'classic')}>
            {theme === 'classic' ? <Moon size={16} strokeWidth={1} /> : <Sun size={16} strokeWidth={1} />}
          </button>
        </nav>
      </header>

      <main className="pt-40 pb-20 px-12">
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="relative group mb-20">
              <div className={`border ${t.border} p-2 transition-transform duration-700 group-hover:rotate-6`}>
                <img 
                  src="https://avatars.githubusercontent.com/u/198081098?v=4" 
                  alt="Alexander" 
                  className="w-80 h-80 object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                />
              </div>
              <div className={`absolute -bottom-4 -right-8 ${t.accent} px-6 py-2 text-[10px] uppercase tracking-[0.4em]`}>
                {statusText}
              </div>
            </div>
            <h1 className="text-[14vw] font-light leading-[0.8] text-center tracking-tighter mb-10">ALEXANDER</h1>
            <p className="text-xl italic max-w-2xl text-center leading-relaxed opacity-80">
              A student and developer crafting digital experiences from Toronto. 
              Bridging the gap between timeless aesthetics and modern technology.
            </p>
          </div>
        )}

        {/* SKILLS: Equal Boxes & Sharp Lines */}
        {currentPage === 'skills' && (
          <div className="max-w-7xl mx-auto space-y-32">
            <h2 className="text-6xl font-light italic text-center">Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-0 border ${t.border}">
              <div className={`p-16 border-r border-b ${t.border} flex flex-col items-center text-center space-y-6`}>
                <Code size={40} strokeWidth={1} />
                <h3 className="text-xl uppercase tracking-widest">Engineering</h3>
                <p className="text-sm opacity-60 leading-loose">REACT.JS / VITE / JAVASCRIPT / TAILWIND / GIT</p>
              </div>
              <div className={`p-16 border-r border-b ${t.border} flex flex-col items-center text-center space-y-6`}>
                <Camera size={40} strokeWidth={1} />
                <h3 className="text-xl uppercase tracking-widest">Visuals</h3>
                <p className="text-sm opacity-60 leading-loose">STREET PHOTO / LIGHTROOM / COLOR THEORY</p>
              </div>
              <div className={`p-16 border-b ${t.border} flex flex-col items-center text-center space-y-6`}>
                <Layout size={40} strokeWidth={1} />
                <h3 className="text-xl uppercase tracking-widest">Design</h3>
                <p className="text-sm opacity-60 leading-loose">MINIMALISM / UI-UX / TYPOGRAPHY</p>
              </div>
            </div>
          </div>
        )}

        {/* CODE: Equal Boxes */}
        {currentPage === 'code' && (
          <div className="max-w-5xl mx-auto space-y-20">
            <h2 className="text-6xl font-light italic">Repositories</h2>
            <div className="grid gap-8">
              {repos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className={`group block border ${t.border} p-12 transition-all hover:bg-black hover:text-white`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-light uppercase">{repo.name}</h3>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-4 opacity-60 text-sm tracking-widest uppercase">{repo.language || 'Software'}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY: B&W to Color Collage */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl mx-auto space-y-12">
             <h2 className="text-6xl font-light italic">The Gallery</h2>
             <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg" className="border border-black grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" />
                <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg" className="border border-black grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" />
                <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg" className="border border-black grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" />
             </div>
          </div>
        )}

        {/* CONTACT: Back to original style */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl mx-auto text-center space-y-20 py-20">
            <h2 className="text-[8vw] font-light italic leading-none">Let's Talk</h2>
            <div className="flex flex-col gap-8 text-2xl uppercase tracking-[0.2em] font-light">
              <a href="mailto:alxgraphy@icloud.com" className="hover:italic transition-all border-b border-transparent hover:border-black py-4">Email</a>
              <a href="https://github.com/alxgraphy" target="_blank" className="hover:italic transition-all border-b border-transparent hover:border-black py-4">Github</a>
              <a href="https://instagram.com/alxgraphy" target="_blank" className="hover:italic transition-all border-b border-transparent hover:border-black py-4">Instagram</a>
            </div>
          </div>
        )}
      </main>

      {/* SIGNATURE FOOTER */}
      <footer className={`w-full py-20 px-12 mt-20 ${t.footer} flex flex-col md:flex-row justify-between items-center opacity-60 text-[10px] uppercase tracking-[0.3em]`}>
        <div>Toronto, Canada 🇨🇦</div>
        <div>Made with ❤️ by Alexander Wondwossen (<a href="https://github.com/alxgraphy" className="underline">@alxgraphy</a>)</div>
        <div>© 2026 All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
