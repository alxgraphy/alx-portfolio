import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Award, GraduationCap, Code2, Aperture, Download, Filter,
  Calculator, BookOpen, Globe2, Beaker, Palette, Languages, HeartPulse, Map
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const cursorRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('all');

  // EXACT REPLICA DATA FROM TCDSB PORTFOLIO
  const subjectData = {
    'Math': { 
      icon: <Calculator />, 
      desc: 'Numbers, Algebra, and Data.', 
      details: 'Current Focus: Algebraic Expressions and Cartesian Plane mapping. Working on linear patterns and coordinate transformations.' 
    },
    'Language': { 
      icon: <BookOpen />, 
      desc: 'Literacy and Media Studies.', 
      details: 'Active Projects: "Story Of My Name" essay (etymology and history). Ongoing Research: "Homelessness in Toronto" social justice project.' 
    },
    'Social Studies': { 
      icon: <Globe2 />, 
      desc: 'History and Global Perspectives.', 
      details: 'Focus: Global Quality of Life. Analyzing Human Development Index (HDI) and disparities between developed and developing nations.' 
    },
    'Science': { 
      icon: <Beaker />, 
      desc: 'Understanding Physical Systems.', 
      details: 'Units: Pure Substances and Mixtures; Heat in the Environment. Investigating particle theory and thermal energy transfer.' 
    },
    'Art': { 
      icon: <Palette />, 
      desc: 'Visual Arts and Digital Design.', 
      details: 'Core Focus: Minimalist Brutalism and high-contrast photography. Specializing in architectural framing and perspective.' 
    },
    'Geography': { 
      icon: <Map />, 
      desc: 'Physical Geography and Patterns.', 
      details: 'Focus: Landforms and Climate. Studying how physical environments dictate human settlement and urban population density.' 
    },
    'French': { 
      icon: <Languages />, 
      desc: 'Core French Communication.', 
      details: 'Focus: Oral communication and cultural appreciation. Practicing verb conjugation and everyday conversational fluency.' 
    },
    'Phys Ed': { 
      icon: <HeartPulse />, 
      desc: 'Health and Physical Education.', 
      details: 'Focus: Personal Fitness and Team Dynamics. Tracking cardiovascular health and cooperative movement strategies.' 
    }
  };

  const photos = [
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg", title: "Urban_Geometry_001", category: "architecture", location: "Toronto, CA" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg", title: "Architectural_Study_002", category: "architecture", location: "Downtown Core" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg", title: "Light_Pattern_003", category: "abstract", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg", title: "Shadow_Play_004", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg", title: "Street_Frame_005", category: "street", location: "Queen West" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg", title: "Perspective_006", category: "architecture", location: "Harbourfront" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg", title: "Minimal_007", category: "abstract", location: "Downtown" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg", title: "Structural_008", category: "architecture", location: "Distillery" },
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

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => { setRepos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

  const Corners = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-white/40" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-white/40" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />
    </>
  );

  const Label = ({ text, className = "" }) => (
    <div className={`absolute -top-6 left-0 text-[8px] font-bold tracking-[0.3em] uppercase opacity-40 ${className}`}>[{text}]</div>
  );

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-12 relative z-10">
          <div className="space-y-2 border-l border-white/20 pl-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Initialize_System</p>
            <p className="text-3xl font-black italic tracking-tighter uppercase">{time.toLocaleTimeString()}</p>
          </div>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>CORE</span></h1>
          <button onClick={() => { setHasEntered(true); navigate('home'); }} className="group w-full border border-white/20 p-8 hover:bg-white hover:text-black transition-all duration-700">
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
      <Analytics />
      {!isMobile && (
        <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center">
          <div className="w-1 h-1 bg-white" />
        </div>
      )}

      <header className="fixed top-0 w-full z-50 flex justify-between items-end px-12 py-12 pointer-events-none">
        <div className="pointer-events-auto"><button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button></div>
        <nav className="flex flex-col items-end gap-2 pointer-events-auto">
          {['about', 'education', 'skills', 'code', 'photography', 'contact'].map((item) => (
            <button key={item} onClick={() => navigate(item)} className="group flex items-center gap-4">
              <span className={`text-[9px] font-bold uppercase tracking-widest ${page === item ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>{item}</span>
              <div className={`h-[1px] transition-all duration-500 ${page === item ? 'w-12 bg-white' : 'w-4 bg-white/20 group-hover:w-8'}`} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto">
        {page === 'home' && (
          <div className="space-y-16 flex flex-col items-center text-center animate-in fade-in duration-1000">
            <div className="relative w-80 h-80 border border-white/10 p-2 overflow-hidden group">
              <Corners />
              <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Alexander" />
            </div>
            <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic">ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>WONDWOSSEN</span></h1>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-4xl mx-auto space-y-24 animate-in slide-in-from-left duration-700">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8 text-xl font-light italic opacity-80 border-l-2 border-white/10 pl-10">
                <p>Alexander: Photographer, Student, and Coder in Grade 7.</p>
                <p>Experimenting with perspective, composition, and light to turn everyday scenes into visually appealing photographs.</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/[0.02]">
                <Label text="AWARDS_LOG" />
                <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest">
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Canva Essentials</span><span className="text-white/40">Oct 2024</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Human-Centered Design</span><span className="text-white/40">Oct 2024</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {page === 'education' && (
          <div className="space-y-16 animate-in slide-in-from-right duration-700">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Education</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(subjectData).map(subject => (
                <button key={subject} onClick={() => setSelectedSubject(subject)} className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white hover:text-black transition-all">
                  <Corners />
                  <div className="mb-4 opacity-40 group-hover:opacity-100 flex justify-center scale-150 transition-transform group-hover:scale-125">{subjectData[subject].icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block text-center">{subject}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'skills' && (
          <div className="grid md:grid-cols-3 border border-white/10 animate-in slide-in-from-bottom duration-700">
            {[
              { title: 'Development', items: ['React', 'Tailwind CSS', 'Next.js'], icon: <Terminal /> },
              { title: 'Optics', items: ['Nikon D3200', 'Lightroom', 'Manual Exposure'], icon: <Camera /> },
              { title: 'Design', items: ['Brutalist UX', 'Figma', 'Typography'], icon: <Code2 /> }
            ].map((s, i) => (
              <div key={i} className="p-12 border-r border-white/10 last:border-r-0 hover:bg-white hover:text-black transition-all">
                <div className="mb-8 opacity-40">{s.icon}</div>
                <h3 className="text-2xl font-black uppercase mb-8 italic">{s.title}</h3>
                {s.items.map(item => <div key={item} className="text-[10px] font-bold uppercase tracking-widest mb-2">{item}</div>)}
              </div>
            ))}
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in-95 duration-700">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {['all', 'architecture', 'street', 'abstract', 'portrait'].map(cat => (
                  <button key={cat} onClick={() => setPhotoFilter(cat)} className={`px-4 py-2 text-[10px] border uppercase font-bold tracking-widest transition-all ${photoFilter === cat ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.filter(p => photoFilter === 'all' || p.category === photoFilter).map((photo, i) => (
                <button key={i} onClick={() => setSelectedPhoto(photo)} className="aspect-[4/5] relative border border-white/10 overflow-hidden group">
                  <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-end p-6 transition-opacity">
                    <p className="text-[10px] uppercase font-bold tracking-widest">{photo.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'code' && (
          <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-700">
             {loading ? <Loader2 className="animate-spin" /> : repos.map(repo => (
               <a key={repo.id} href={repo.html_url} target="_blank" className="p-8 border border-white/10 hover:bg-white hover:text-black transition-all">
                 <h3 className="text-2xl font-black uppercase italic">{repo.name}</h3>
                 <p className="text-xs opacity-60 mt-2">{repo.description || "System logic."}</p>
               </a>
             ))}
          </div>
        )}

        {page === 'contact' && (
          <div className="grid gap-4 animate-in fade-in duration-1000">
            {[
              { label: 'Mail', value: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' },
              { label: 'GitHub', value: 'alxgraphy', url: 'https://github.com/alxgraphy' }
            ].map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="group p-10 border border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-all">
                <span className="text-xs font-bold uppercase opacity-40">{item.label}</span>
                <p className="text-3xl font-black italic">{item.value}</p>
                <ArrowRight className="opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </div>
        )}
      </main>

      {/* SUBJECT MODAL */}
      {selectedSubject && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedSubject(null)}>
          <div className="relative w-full max-w-xl border border-white/10 bg-black p-12" onClick={e => e.stopPropagation()}>
            <Corners />
            <button onClick={() => setSelectedSubject(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-all"><X size={24}/></button>
            <div className="space-y-6">
              <Label text="SUBJECT_LOG_EXTRACT" />
              <div className="opacity-40 scale-150 transform origin-left mb-8">{subjectData[selectedSubject].icon}</div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedSubject}</h2>
              <p className="text-xl font-light italic text-white/60">{subjectData[selectedSubject].desc}</p>
              <div className="p-6 border border-white/10 bg-white/[0.02]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">{subjectData[selectedSubject].details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full border border-white/10 p-4 bg-black" onClick={e => e.stopPropagation()}>
            <Corners />
            <img src={selectedPhoto.url} className="w-full h-auto" />
            <div className="p-6 border-t border-white/10 mt-4">
              <h3 className="text-2xl font-black uppercase italic">{selectedPhoto.title}</h3>
              <p className="text-[10px] opacity-40 uppercase tracking-widest mt-2">{selectedPhoto.location} // {selectedPhoto.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
