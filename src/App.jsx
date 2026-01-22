import { useState, useEffect, useRef } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Layout, Database, ArrowRight, ExternalLink, Cpu, Activity, Zap, Terminal, Hash, Layers, Frame, Target } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- TIME LOGIC ---
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

  const t = theme === 'light' 
    ? { bg: 'bg-[#FFFFFF]', text: 'text-black', border: 'border-black', accent: 'bg-black text-white' }
    : { bg: 'bg-[#000000]', text: 'text-white', border: 'border-white', accent: 'bg-white text-black' };

  // --- COMPONENT: GEOMETRIC DECOR ---
  const CornerBrackets = () => (
    <>
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  // --- SCROLL REVEAL COMPONENT ---
  const Reveal = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      }, { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        {children}
      </div>
    );
  };

  // --- LANDING ---
  if (!hasEntered && currentPage === 'home') {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center font-mono relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <div className="z-10 text-center space-y-4">
          <p className="text-[10px] tracking-[0.8em] uppercase opacity-40">System Release 2.0 // Toronto</p>
          <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-none italic uppercase">Wondwossen</h1>
          <button 
            onClick={() => setHasEntered(true)}
            className={`mt-12 px-24 py-6 border-2 ${t.border} text-xs font-black uppercase tracking-[0.6em] hover:bg-black hover:text-white transition-all relative group`}
          >
            Initialize Archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans selection:bg-black selection:text-white transition-colors duration-500 relative`}>
      
      {/* HEADER: BIGGER & HIDDEN ON SCROLL */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-10 backdrop-blur-md transition-all duration-700 border-b ${t.border} ${showNav ? 'translate-y-0' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('home')} className="text-5xl font-black tracking-tighter italic">A.</button>
          <div className="hidden lg:block h-8 w-[1px] bg-current opacity-20 mx-4"></div>
          <div className="hidden lg:flex flex-col text-[10px] font-bold opacity-50 uppercase tracking-widest">
            <span>Lat: 43.6532° N</span>
            <span>Lon: 79.3832° W</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(pg => (
            <button key={pg} onClick={() => navigate(pg)} className="hover:line-through transition-all relative group">
              {pg}
              <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-current group-hover:w-full transition-all"></div>
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-3 border-2 ${t.border}`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </header>

      <main className="pt-56 pb-32 px-12">
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <Reveal>
            <div className="max-w-7xl mx-auto space-y-40">
              <div className="flex flex-col items-center relative">
                <div className="absolute -top-10 -left-10 opacity-20"><Target size={80}/></div>
                <div className="relative group">
                  <div className={`border-2 ${t.border} p-5 bg-white dark:bg-black transition-all duration-700 hover:shadow-[30px_30px_0px_0px_rgba(0,0,0,0.1)]`}>
                    <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-96 h-96 object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                    <CornerBrackets />
                  </div>
                  <div className={`absolute -bottom-4 -right-12 ${t.accent} px-8 py-3 text-xs font-black uppercase tracking-[0.5em] italic`}>
                    @alxgraphy
                  </div>
                </div>
                
                <h1 className="mt-16 text-[18vw] font-black leading-[0.75] text-center tracking-tighter uppercase italic">ALEXANDER</h1>
                
                <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 mt-20 border-t pt-10 border-current/20">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase opacity-40 font-bold">Grade</p>
                    <p className="font-black">Seven / 07</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase opacity-40 font-bold">Location</p>
                    <p className="font-black">Toronto, CA</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase opacity-40 font-bold">Role</p>
                    <p className="font-black">Developer & Artist</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase opacity-40 font-bold">Time</p>
                    <p className="font-black">{currentTime.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ABOUT SECTION */}
        {currentPage === 'about' && (
          <Reveal>
            <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-20">
              <div className="md:col-span-4 space-y-6">
                <div className={`border-2 ${t.border} p-10 relative`}>
                  <CornerBrackets />
                  <h2 className="text-4xl font-black uppercase italic leading-none">The<br/>Profile</h2>
                  <p className="mt-6 text-[10px] font-bold uppercase opacity-50 tracking-widest leading-loose">
                    Student. Coder. Visual Archivist. Based in Toronto, Ontario.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-black uppercase border-b pb-2"><span>GitHub</span><span>@alxgraphy</span></div>
                  <div className="flex justify-between text-[10px] font-black uppercase border-b pb-2"><span>TikTok</span><span>@alxgraphy</span></div>
                  <div className="flex justify-between text-[10px] font-black uppercase border-b pb-2"><span>Insta</span><span>@alexedgraphy</span></div>
                </div>
              </div>
              <div className="md:col-span-8 space-y-12">
                <p className="text-4xl font-light leading-tight italic">
                  "I balance the raw logic of React development with the organic geometry of 35mm street photography."
                </p>
                <div className="space-y-8 text-xl font-medium opacity-80 leading-relaxed">
                  <p>As a Grade 7 developer, I don't see age as a barrier—only as a starting point. I build high-performance web applications using modern stacks like Vite and Tailwind, ensuring every pixel serves a purpose.</p>
                  <p>My work is heavily inspired by <strong>Future Patterns</strong>: clean lines, technical metadata, and architectural balance. Whether it's a line of code or a photo of a skyscraper, I seek symmetry and function.</p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* SKILLS SECTION: TECH MATRIX */}
        {currentPage === 'skills' && (
          <Reveal>
            <div className="max-w-7xl mx-auto space-y-20">
              <div className="flex justify-between items-end border-b-2 border-current pb-8">
                <h2 className="text-8xl font-black italic uppercase">Matrix</h2>
                <div className="text-right text-[10px] font-bold opacity-40 uppercase tracking-[0.4em]">Integrated Core // 2024</div>
              </div>
              <div className="grid lg:grid-cols-3 gap-0 border-2 border-current">
                {[
                  { icon: <Terminal />, title: "Logic", items: ["React.js", "Vite", "JS / ES6+", "Tailwind", "Git"] },
                  { icon: <Frame />, title: "Composition", items: ["Street Photo", "35mm Analog", "Lightroom", "Color Theory"] },
                  { icon: <Layers />, title: "Systems", items: ["UI Patterns", "Typography", "Wireframing", "UX Logic"] }
                ].map((s, i) => (
                  <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-black hover:text-white transition-all`}>
                    <div className="mb-10 group-hover:scale-125 transition-transform">{s.icon}</div>
                    <h3 className="text-3xl font-black uppercase mb-8 italic underline decoration-4 underline-offset-8">{s.title}</h3>
                    <div className="space-y-4">
                      {s.items.map(item => (
                        <div key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                          <div className="w-2 h-2 bg-current" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* PHOTOGRAPHY: THE COLLAGE */}
        {currentPage === 'photography' && (
          <Reveal>
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-6xl font-black uppercase italic">The Archive</h2>
                <div className="flex gap-4"><Hash size={20}/><Activity size={20}/><Cpu size={20}/></div>
              </div>
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
                  <div key={i} className={`relative group border-2 ${t.border} overflow-hidden`}>
                    <img src={url} className="w-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 cursor-crosshair" />
                    <div className="absolute top-4 left-4 text-[8px] font-black bg-white text-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">IMG_REF_00{i}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* CONTACT SECTION */}
        {currentPage === 'contact' && (
          <Reveal>
            <div className="max-w-5xl mx-auto text-center space-y-20 py-20">
              <h2 className="text-[12vw] font-black italic leading-none underline decoration-8 underline-offset-20">CONNECT</h2>
              <div className="grid md:grid-cols-2 gap-12 text-left">
                <a href="mailto:alxgraphy@icloud.com" className={`p-10 border-2 ${t.border} group hover:bg-black hover:text-white transition-all`}>
                  <p className="text-[10px] font-bold opacity-50 uppercase mb-4">Direct Communication</p>
                  <p className="text-2xl font-black italic group-hover:translate-x-4 transition-transform">alxgraphy@icloud.com</p>
                </a>
                <a href="https://github.com/alxgraphy" target="_blank" className={`p-10 border-2 ${t.border} group hover:bg-black hover:text-white transition-all`}>
                  <p className="text-[10px] font-bold opacity-50 uppercase mb-4">Source Archive</p>
                  <p className="text-2xl font-black italic group-hover:translate-x-4 transition-transform">github.com/alxgraphy</p>
                </a>
                <a href="https://tiktok.com/@alxgraphy" target="_blank" className={`p-10 border-2 ${t.border} group hover:bg-black hover:text-white transition-all`}>
                  <p className="text-[10px] font-bold opacity-50 uppercase mb-4">Short Form Media</p>
                  <p className="text-2xl font-black italic group-hover:translate-x-4 transition-transform">tiktok.com/@alxgraphy</p>
                </a>
                <a href="https://instagram.com/alexedgraphy" target="_blank" className={`p-10 border-2 ${t.border} group hover:bg-black hover:text-white transition-all`}>
                  <p className="text-[10px] font-bold opacity-50 uppercase mb-4">Visual Documentation</p>
                  <p className="text-2xl font-black italic group-hover:translate-x-4 transition-transform">instagram.com/alexedgraphy</p>
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </main>

      {/* SIGNATURE FOOTER */}
      <footer className={`w-full py-20 px-12 border-t-2 ${t.border} flex flex-col lg:flex-row justify-between items-center gap-12 font-black uppercase text-[10px] tracking-[0.5em] relative`}>
        <div className="flex flex-col gap-2">
          <span>Toronto, Canada 🇨🇦</span>
          <span className="opacity-40 tracking-normal">Status: Operational // Build 4.1</span>
        </div>
        <div className="text-center group">
          Made with ❤️ by <br/> 
          <a href="https://github.com/alxgraphy" target="_blank" className="text-lg underline underline-offset-4 decoration-2 hover:bg-black hover:text-white px-2">Alexander Wondwossen</a>
        </div>
        <div className="flex gap-10">
          <a href="https://tiktok.com/@alxgraphy" target="_blank" className="hover:line-through">TikTok</a>
          <a href="https://github.com/alxgraphy" target="_blank" className="hover:line-through">GitHub</a>
          <a href="https://instagram.com/alexedgraphy" target="_blank" className="hover:line-through">Insta</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
