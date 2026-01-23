import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Layout, Database, ArrowRight, ExternalLink, Cpu, Activity, Zap, Terminal, Hash, Layers, Frame, Target, XCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const lastScrollY = useRef(0);

  // --- SMOOTH CLOCK ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- OPTIMIZED HEADER SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
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
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const t = theme === 'light' 
    ? { bg: 'bg-[#FFFFFF]', text: 'text-black', border: 'border-black', accent: 'bg-black text-white' }
    : { bg: 'bg-[#000000]', text: 'text-white', border: 'border-white', accent: 'bg-white text-black' };

  // --- REUSABLE DECOR: CORNER BRACKETS ---
  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans selection:bg-black selection:text-white transition-colors duration-500 overflow-x-hidden`}>
      
      {/* PERSISTENT HEADER */}
      <header 
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-opacity-90 backdrop-blur-md border-b ${t.border} transition-transform duration-500`}
        style={{ transform: showNav ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter hover:scale-110 transition-transform">A.</button>
          <div className="hidden lg:flex flex-col text-[9px] font-bold opacity-40 uppercase tracking-[0.3em] border-l pl-6 border-current">
            <span>43.6532° N</span>
            <span>79.3832° W</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(pg => (
            <button key={pg} onClick={() => navigate(pg)} className={`hover:line-through transition-all ${currentPage === pg ? 'underline underline-offset-4' : ''}`}>
              {pg}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border-2 ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-32">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className={`border-2 ${t.border} p-4 transition-all duration-700 group-hover:rotate-3 group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]`}>
                  <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-64 h-64 md:w-80 md:h-80 object-cover grayscale group-hover:grayscale-0" alt="Alexander" />
                  <Corners />
                </div>
                <div className={`absolute -bottom-4 -right-10 ${t.accent} px-6 py-2 text-[10px] font-black uppercase tracking-widest italic`}>
                  @alxgraphy
                </div>
              </div>
              <h1 className="mt-12 text-[15vw] font-black leading-none tracking-tighter uppercase italic text-center">ALEXANDER</h1>
              <p className="mt-8 text-xl md:text-3xl font-light text-center max-w-3xl opacity-80 leading-tight">
                Building digital systems in <span className="font-bold underline">Toronto</span>. Grade 7 student, React developer, and visual archivist.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-16">
            <h2 className="text-7xl font-black italic uppercase">The Bio</h2>
            <div className="space-y-8 text-2xl font-medium leading-relaxed border-l-4 border-current pl-10">
              <p>I am Alexander Wondwossen. Based in Toronto, I am a 12-year-old creator focusing on the intersection of code and visual art.</p>
              <p>I treat programming as a form of architecture. Using <span className="bg-black text-white px-2">React, Vite, and Tailwind CSS</span>, I build interfaces that prioritize speed and structural integrity.</p>
              <p>Outside of dev, I capture the urban geometry of my city through street photography. My visuals directly influence my design philosophy: clean lines, high contrast, and zero fluff.</p>
            </div>
          </div>
        )}

        {/* SKILLS PAGE */}
        {currentPage === 'skills' && (
          <div className="space-y-16">
            <h2 className="text-7xl font-black italic uppercase">Technical</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Development', list: ['React.js', 'Vite', 'JavaScript ES6+', 'Tailwind CSS', 'Git Architecture'], icon: <Terminal /> },
                { title: 'Visuals', list: ['Street Photography', '35mm Manual', 'Adobe Lightroom', 'Color Grading', 'Composition'], icon: <Camera /> },
                { title: 'Design', list: ['UI/UX Logic', 'Minimalism', 'Typography Hierarchy', 'Wireframing', 'System Design'], icon: <Layout /> }
              ].map(skill => (
                <div key={skill.title} className={`p-12 border-2 ${t.border} relative hover:bg-black hover:text-white transition-all group`}>
                  <Corners />
                  <div className="mb-6 opacity-50 group-hover:opacity-100">{skill.icon}</div>
                  <h3 className="text-3xl font-black uppercase mb-6 underline decoration-4 underline-offset-8">{skill.title}</h3>
                  <ul className="space-y-3 text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                    {skill.list.map(item => <li key={item}>// {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY PAGE */}
        {currentPage === 'photography' && (
          <div className="space-y-12">
            <h2 className="text-7xl font-black italic uppercase">Visuals</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={url} className={`border-2 ${t.border} overflow-hidden group relative`}>
                  <img src={url} className="w-full grayscale hover:grayscale-0 transition-all duration-1000" alt="Street Photo" loading="lazy" />
                  <div className="absolute top-2 right-2 text-[8px] font-black bg-black text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">00{i+1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10">
            <h2 className="text-[12vw] font-black italic uppercase leading-none text-center underline decoration-8 underline-offset-[20px]">Contact</h2>
            <div className="grid gap-6">
              {[
                { label: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy' },
                { label: 'TikTok', handle: '@alxgraphy', url: 'https://tiktok.com/@alxgraphy' },
                { label: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy' },
                { label: 'Email', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' }
              ].map(item => (
                <a key={item.label} href={item.url} target="_blank" className={`p-10 border-2 ${t.border} flex justify-between items-center group hover:bg-black hover:text-white transition-all`}>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">{item.label}</span>
                  <span className="text-2xl font-black italic group-hover:translate-x-2 transition-transform">{item.handle}</span>
                  <ArrowRight />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PERSISTENT FOOTER */}
      <footer className={`w-full py-16 px-6 md:px-12 border-t-2 ${t.border} flex flex-col md:flex-row justify-between items-center gap-10 font-black uppercase text-[10px] tracking-widest`}>
        <div className="flex flex-col gap-1">
          <span>Toronto, Canada 🇨🇦</span>
          <span className="opacity-40">{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="text-center">
          Designed & Built By <br/> 
          <a href="https://github.com/alxgraphy" className="text-lg underline underline-offset-4 decoration-2 hover:line-through transition-all">Alexander Wondwossen</a>
        </div>
        <div className="flex gap-8 opacity-60 font-black">
          <a href="https://github.com/alxgraphy" target="_blank">GH</a>
          <a href="https://tiktok.com/@alxgraphy" target="_blank">TT</a>
          <a href="https://instagram.com/alexedgraphy" target="_blank">IG</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
