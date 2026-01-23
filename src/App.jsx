import React, { useState, useEffect } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Database, Award, GraduationCap, Code2, Aperture, Download, Filter,
  Github, Mail, Instagram, Cpu
} from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('all');
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good_Morning";
    if (hour < 18) return "Good_Afternoon";
    return "Good_Evening";
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setPage(['home', 'about', 'education', 'skills', 'code', 'photography', 'contact'].includes(hash) ? hash : 'home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const interactives = document.querySelectorAll('button, a');
      let closest = null;
      let minDist = 80;
      
      interactives.forEach(el => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        if (dist < minDist) {
          minDist = dist;
          closest = { x: centerX, y: centerY };
        }
      });
      
      if (closest) {
        const pullX = (closest.x - e.clientX) * 0.15;
        const pullY = (closest.y - e.clientY) * 0.15;
        setMousePos({ x: e.clientX + pullX, y: e.clientY + pullY });
      } else {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledVal = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolledVal);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const playSound = () => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const handleNavigate = (path) => {
    playSound();
    navigate(path);
  };

  const Corners = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-white/40" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-white/40" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />
    </>
  );

  const Label = ({ text, className = "" }) => (
    <div className={`absolute -top-6 left-0 text-[8px] font-bold tracking-[0.3em] uppercase opacity-40 ${className}`}>
      [{text}]
    </div>
  );

  const BackgroundGrid = () => (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
      style={{ 
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: `40px 40px, 200px 200px, 200px 200px`
      }} 
    />
  );

  const photos = [
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg", title: "Urban_Geometry_001", category: "architecture", location: "Toronto, CA" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg", title: "Architectural_Study_002", category: "architecture", location: "Downtown Core" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg", title: "Light_Pattern_003", category: "abstract", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg", title: "Shadow_Play_004", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg", title: "Street_Frame_005", category: "street", location: "Queen West" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg", title: "Perspective_006", category: "architecture", location: "Harbourfront" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg", title: "Minimal_007", category: "abstract", location: "Downtown" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg", title: "Structural_008", category: "architecture", location: "Distillery District" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg", title: "Lines_009", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg", title: "Contrast_010", category: "street", location: "Downtown" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg", title: "Reflection_011", category: "architecture", location: "Financial District" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg", title: "Geometry_012", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg", title: "Motion_013", category: "street", location: "Urban Core" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg", title: "Portrait_014", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg", title: "Portrait_015", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8607_kuco1i.jpg", title: "Portrait_016", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8571_i6mw8o.jpg", title: "Portrait_017", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8614_miqc9h.jpg", title: "Portrait_018", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8572_sz6aer.jpg", title: "Portrait_019", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8567_hlcana.jpg", title: "Portrait_020", category: "portrait", location: "Studio" }
  ];

  const filteredPhotos = photoFilter === 'all' ? photos : photos.filter(p => p.category === photoFilter);
  const categories = ['all', ...new Set(photos.map(p => p.category))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">INITIALIZING_SYSTEM</div>
          <div className="text-6xl font-black italic tracking-tighter">{Math.floor(loadingProgress)}%</div>
          <div className="w-64 h-1 bg-white/10 mx-auto overflow-hidden">
            <div className="h-full bg-white transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6" style={isMobile ? {} : { cursor: 'none' }}>
        <BackgroundGrid />
        <div className="max-w-xl w-full space-y-12 relative z-10 animate-in fade-in duration-1000">
          <div className="space-y-2 border-l border-white/20 pl-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{getGreeting()}</p>
            <p className="text-3xl font-black italic tracking-tighter uppercase">{time.toLocaleTimeString()}</p>
          </div>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="opacity-30">CORE</span></h1>
          <button onClick={() => { setHasEntered(true); handleNavigate('home'); }} className="group w-full border border-white/20 p-8 hover:bg-white hover:text-black transition-all">
            <div className="flex justify-between items-center font-black uppercase tracking-[0.3em] text-xs">
              <span>Initialize_Pattern_Library</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-white selection:text-black" style={isMobile ? {} : { cursor: 'none' }}>
      <BackgroundGrid />
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[9999]">
        <div className="h-full bg-white transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {!isMobile && (
        <div className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
          style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
          <div className="w-1 h-1 bg-white" />
        </div>
      )}

      <header className={`fixed top-0 w-full z-50 flex justify-between items-end px-6 md:px-12 py-12 transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <button onClick={() => handleNavigate('home')} className="text-4xl font-black italic tracking-tighter pointer-events-auto">ALX.</button>
        <nav className="flex flex-col items-end gap-2 pointer-events-auto">
          {['about', 'education', 'skills', 'code', 'photography', 'contact'].map((item, idx) => (
            <button key={item} onClick={() => handleNavigate(item)} className="group flex items-center gap-4">
              <span className={`text-[9px] font-bold uppercase tracking-widest ${page === item ? 'text-white' : 'text-white/30'}`}>
                {idx.toString().padStart(2, '0')} // {item}
              </span>
              <div className={`h-[1px] transition-all duration-500 ${page === item ? 'w-12 bg-white' : 'w-4 bg-white/20 group-hover:w-8'}`} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-32 px-6 max-w-5xl mx-auto">
        {page === 'home' && (
          <div className="flex flex-col items-center text-center space-y-12">
            <div className="relative w-64 h-64 md:w-96 md:h-96 border border-white/10 p-2 group">
              <Corners />
              <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full h-full object-cover grayscale opacity-80" alt="Avatar" />
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">ALEXANDER<br/><span className="opacity-20">WONDWOSSEN</span></h1>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-3xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Profile</h2>
            <div className="grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
              <p>Hello, my name is Alexander, a passionate photographer and coder in grade 7. I capture the world through architectural and street photography, focusing on geometry and light.</p>
              <div className="border border-white/10 p-6 bg-white/[0.02]">
                <h3 className="text-white text-xs font-bold uppercase mb-4"><Award size={14} className="inline mr-2"/> Recognition</h3>
                <div className="space-y-2 text-[10px] tracking-widest uppercase">
                  <div>Canva Essentials Cert // 2024</div>
                  <div>HCD Field Guide Cert // 2024</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-12">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {categories.map(cat => (
                <button key={cat} onClick={() => setPhotoFilter(cat)} className={`px-4 py-1 border border-white/10 uppercase text-[9px] font-bold tracking-widest ${photoFilter === cat ? 'bg-white text-black' : ''}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPhotos.map((photo, i) => (
                <div key={i} onClick={() => setSelectedPhoto(photo)} className="aspect-square bg-white/5 border border-white/5 cursor-crosshair overflow-hidden group relative">
                  <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" alt="Gallery" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <p className="text-[10px] font-bold uppercase tracking-widest">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'code' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Library</h2>
            {loading ? <Loader2 className="animate-spin opacity-20" /> : (
              <div className="grid gap-4">
                {repos.map(repo => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="p-8 border border-white/10 hover:bg-white hover:text-black transition-all flex justify-between items-center group">
                    <div>
                      <h3 className="font-bold uppercase tracking-tight">{repo.name}</h3>
                      <p className="text-[10px] opacity-40 uppercase mt-1">{repo.language || 'Code'}</p>
                    </div>
                    <ExternalLink size={16} className="opacity-20 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {page === 'contact' && (
          <div className="max-w-xl mx-auto py-20 text-center space-y-12">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Contact</h2>
            <div className="grid gap-6">
              <a href="mailto:alx@example.com" className="p-10 border border-white/10 hover:border-white transition-all flex flex-col items-center gap-4">
                <Mail size={24} className="opacity-40" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Send_Email</span>
              </a>
              <div className="flex gap-6">
                <a href="#" className="flex-1 p-8 border border-white/10 hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest">Instagram</a>
                <a href="#" className="flex-1 p-8 border border-white/10 hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest">GitHub</a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <button className="absolute top-12 right-12 text-white/40 hover:text-white"><X size={32}/></button>
          <div className="max-w-5xl w-full border border-white/10 bg-black p-1" onClick={e => e.stopPropagation()}>
            <img src={selectedPhoto.url} className="w-full max-h-[80vh] object-contain" alt="Preview" />
            <div className="p-6 flex justify-between items-center text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
              <span>{selectedPhoto.title} // {selectedPhoto.category}</span>
              <span>{selectedPhoto.location}</span>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-12 left-12 z-50 pointer-events-none">
        <div className="text-[8px] font-bold tracking-[0.5em] opacity-20 uppercase">
          ALX.CORE // EST 2025 // {time.toLocaleTimeString()}
        </div>
      </footer>
    </div>
  );
}
