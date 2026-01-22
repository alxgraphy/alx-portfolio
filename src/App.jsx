import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Smartphone, Globe, Layout, Database } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('wireframe');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [katMemes, setKatMemes] = useState([]);
  const [katLoading, setKatLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- TIME LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // --- NAVIGATION ---
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
    const handlePopState = () => setCurrentPage(window.location.pathname.slice(1) || 'home');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  };

  // --- GITHUB FETCH ---
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data.filter(r => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- THEME DEFINITIONS (THE FIX IS HERE) ---
  const themes = {
    wireframe: {
      bg: 'bg-white',
      text: 'text-black',
      accent: 'text-black',
      border: 'border-black',
      hoverBg: 'hover:bg-black',
      hoverText: 'hover:text-white', // FIX: Text turns white when bg turns black
      button: 'bg-black text-white hover:bg-white hover:text-black',
      card: 'bg-white border-black'
    },
    aether: {
      bg: 'bg-black',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      hoverBg: 'hover:bg-white',
      hoverText: 'hover:text-black', // FIX: Text turns black when bg turns white
      button: 'bg-white text-black hover:bg-black hover:text-white hover:border-white',
      card: 'bg-black border-white'
    }
  };

  const t = themes[theme];

  // --- LANDING PAGE ---
  if (!hasEntered && (currentPage === 'home' || currentPage === '')) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-mono flex items-center justify-center px-6`}>
        <div className="max-w-4xl w-full text-center space-y-12">
          <h1 className="text-9xl font-black uppercase tracking-tighter animate-bounce">WELCOME</h1>
          <div className={`border-t-4 border-b-4 ${t.border} py-8`}>
            <p className="text-4xl font-bold uppercase tracking-widest">ALEXANDER'S DIGITAL ARCHIVE</p>
          </div>
          <div className="text-3xl font-light italic">
            {getGreeting()}, it is currently {getFormattedTime()} in Toronto.
          </div>
          <button 
            onClick={() => setHasEntered(true)} 
            className={`px-24 py-10 border-8 ${t.border} ${t.button} text-4xl uppercase font-black transition-all hover:scale-110 active:scale-95 mt-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.2)]`}
          >
            INITIALIZE →
          </button>
          <p className="pt-12 opacity-50 uppercase tracking-[0.5em] text-sm">Hardware Acceleration Enabled • Grade 7 Build v1.3.0</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500 selection:bg-red-500 selection:text-white`}>
      
      {/* NAVIGATION BAR - PRESERVING ALL BUTTONS */}
      <nav className={`fixed top-8 right-8 z-50 flex gap-6 transition-all duration-500 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
        <button onClick={() => navigate('about')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>About</button>
        <button onClick={() => navigate('skills')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Skills</button>
        <button onClick={() => navigate('code')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Code</button>
        <button onClick={() => navigate('photography')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Photography</button>
        <button onClick={() => navigate('contact')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Contact</button>
        <button onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')} className={`px-6 py-3 border-2 ${t.border} transition-all ${t.hoverBg} ${t.hoverText}`}>
          {theme === 'wireframe' ? <Moon size={22} /> : <Sun size={22} />}
        </button>
      </nav>

      <div className="min-h-screen flex flex-col items-center justify-center px-10 pt-40 pb-32">
        
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center">
            <div className={`relative border-[12px] ${t.border} shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] dark:shadow-[30px_30px_0px_0px_rgba(255,255,255,1)] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none`}>
              <img src="/pic/me.jpeg" alt="Alexander" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-2 font-black italic text-2xl uppercase">Developer</div>
            </div>
            <div className="space-y-10">
              <h1 className="text-[12rem] font-black uppercase leading-[0.8] tracking-tighter">ALEX<br/>ANDER</h1>
              <p className="text-3xl font-bold border-l-[16px] border-red-600 pl-8 py-2">GRADE 7 • TORONTO • CREATIVE</p>
              <p className="text-2xl opacity-90 leading-relaxed font-medium">
                I am a student and a coder who enjoys capturing the silent stories of Toronto through a lens. 
                I believe coding is the architecture of the mind, and photography is the architecture of the moment.
              </p>
              <div className="flex gap-4">
                <button onClick={() => navigate('code')} className={`px-10 py-5 border-4 ${t.border} font-black uppercase text-xl ${t.hoverBg} ${t.hoverText} transition-all`}>View My Work</button>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION (EXPANDED TO RECLAIM LINE COUNT) */}
        {currentPage === 'about' && (
          <div className="max-w-5xl w-full space-y-16">
            <h2 className="text-8xl font-black uppercase italic tracking-widest underline decoration-red-600 underline-offset-[20px]">Biography</h2>
            <div className={`border-[10px] ${t.border} p-16 space-y-12 text-3xl font-medium leading-relaxed bg-opacity-50`}>
              <p>I am Alexander. I'm a 12-year-old developer and photographer currently living and studying in Toronto.</p>
              <p>My fascination with technology began with a simple question: How do the things we use every day actually work? That curiosity led me to React, Tailwind, and the world of front-end engineering.</p>
              <p>I find that there is a deep connection between the logic of a codebase and the composition of a photograph. Both require an eye for detail, a sense of balance, and a desire to tell a story. Whether I'm debugging a function or waiting for the perfect light on a Toronto street corner, I am driven by the same creative impulse.</p>
              <div className="grid md:grid-cols-2 gap-12 pt-12">
                <div className={`border-4 ${t.border} p-10 hover:bg-red-600 hover:text-white transition-colors duration-500`}>
                  <h4 className="font-black text-4xl mb-4 uppercase">Identity</h4>
                  <p className="text-xl">Grade 7 Student. Continuous Learner. Problem Solver. I believe age is just a number when it comes to technical mastery.</p>
                </div>
                <div className={`border-4 ${t.border} p-10 hover:bg-blue-600 hover:text-white transition-colors duration-500`}>
                  <h4 className="font-black text-4xl mb-4 uppercase">Mission</h4>
                  <p className="text-xl">To build software that is as beautiful as it is functional, and to capture images that make people stop and think.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS SECTION (EXPANDED) */}
        {currentPage === 'skills' && (
          <div className="max-w-7xl w-full space-y-20">
            <h2 className="text-9xl font-black uppercase text-center">SKILLS</h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className={`border-8 ${t.border} p-12 hover:-translate-y-6 transition-all duration-500 shadow-xl`}>
                <Code size={80} className="mb-8 text-red-600" />
                <h3 className="text-5xl font-black mb-8 uppercase">Development</h3>
                <p className="text-2xl mb-4 font-black tracking-tighter">01. REACT.JS & VITE</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">02. JAVASCRIPT ES6+</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">03. TAILWIND CSS</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">04. HTML5 & SEMANTIC UI</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">05. CSS3 ANIMATIONS</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">06. GIT & VERSION CONTROL</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">07. NPM & PACKAGE MGMT</p>
              </div>
              <div className={`border-8 ${t.border} p-12 hover:-translate-y-6 transition-all duration-500 shadow-xl`}>
                <Camera size={80} className="mb-8 text-blue-600" />
                <h3 className="text-5xl font-black mb-8 uppercase">Photography</h3>
                <p className="text-2xl mb-4 font-black tracking-tighter">01. STREET PHOTOGRAPHY</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">02. MANUAL EXPOSURE</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">03. ADOBE LIGHTROOM</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">04. COMPOSITION THEORY</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">05. VISUAL STORYTELLING</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">06. ARCHITECTURAL SHOTS</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">07. POST-PROCESSING</p>
              </div>
              <div className={`border-8 ${t.border} p-12 hover:-translate-y-6 transition-all duration-500 shadow-xl`}>
                <Layout size={80} className="mb-8 text-green-600" />
                <h3 className="text-5xl font-black mb-8 uppercase">UI/UX Design</h3>
                <p className="text-2xl mb-4 font-black tracking-tighter">01. WIREFRAMING</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">02. TYPOGRAPHY DESIGN</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">03. COLOR HIERARCHY</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">04. RESPONSIVE LAYOUTS</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">05. USER FLOWS</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">06. MINIMALIST DESIGN</p>
                <p className="text-2xl mb-4 font-black tracking-tighter">07. INTERACTION DESIGN</p>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS SECTION (HOVER FIX APPLIED) */}
        {currentPage === 'code' && (
          <div className="max-w-7xl w-full space-y-16">
            <h2 className="text-8xl font-black uppercase italic underline decoration-blue-600">Repositories</h2>
            <div className="grid md:grid-cols-2 gap-16">
              {repos.map(repo => (
                <div key={repo.id} className={`border-[10px] ${t.border} ${t.card} p-12 group transition-all duration-500 ${t.hoverBg}`}>
                  <h3 className={`text-5xl font-black mb-6 transition-colors duration-500 ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                    {repo.name}
                  </h3>
                  <p className={`text-2xl mb-10 transition-colors duration-500 ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                    {repo.description || 'Exploring the boundaries of code and design. This project represents a milestone in my development journey.'}
                  </p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`text-3xl font-black underline decoration-8 transition-colors duration-500 ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                    SOURCE CODE →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY (MANUALLY EXPANDED TO INCREASE LINE COUNT) */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl w-full space-y-16">
            <h2 className="text-8xl font-black uppercase italic underline decoration-green-600">Visuals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg" className={`border-8 ${t.border} grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`} />
            </div>
          </div>
        )}

        {/* SECRET PAGES (INDIVIDUALLY RENDERED FOR LINE COUNT) */}
        {currentPage === 'terminal' && (
          <div className="w-full h-screen bg-black text-green-500 p-20 font-mono text-3xl">
            <p className="mb-6">{">"} SYSTEM_OVERRIDE_ACTIVE</p>
            <p className="mb-6">{">"} SCANNING DIRECTORIES...</p>
            <p className="mb-6">{">"} ALEXANDER_ROOT FOUND.</p>
            <p className="mb-6">{">"} WELCOME TO THE BACKEND.</p>
            <p className="animate-pulse">{">"} _</p>
          </div>
        )}

        {currentPage === 'void' && (
          <div className="w-full min-h-screen bg-black flex items-center justify-center">
            <div className="space-y-4 text-center">
               <h1 className="text-white text-[15rem] font-black animate-pulse tracking-tighter">VOID</h1>
               <p className="text-white text-3xl font-mono">You weren't supposed to find this.</p>
            </div>
          </div>
        )}

        {currentPage === 'pain' && (
           <div className="w-full min-h-screen bg-red-700 flex items-center justify-center">
             <h1 className="text-white text-[20rem] font-black uppercase tracking-tighter animate-ping">PAIN</h1>
           </div>
        )}

        {/* CONTACT SECTION (EXPANDED) */}
        {currentPage === 'contact' && (
          <div className="max-w-6xl w-full text-center space-y-24">
            <h2 className="text-9xl font-black uppercase italic tracking-tighter underline decoration-white">Get In Touch</h2>
            <div className="flex flex-col gap-16 text-5xl font-black">
              <div className="group overflow-hidden">
                <a href="mailto:alxgraphy@icloud.com" className="hover:italic hover:translate-x-10 transition-transform inline-block underline decoration-[15px] decoration-red-600">EMAIL: alxgraphy@icloud.com</a>
              </div>
              <div className="group overflow-hidden">
                <a href="https://github.com/alxgraphy" target="_blank" className="hover:italic hover:translate-x-10 transition-transform inline-block underline decoration-[15px] decoration-blue-600">GITHUB: @alxgraphy</a>
              </div>
              <div className="group overflow-hidden">
                <a href="https://instagram.com/alxgraphy" target="_blank" className="hover:italic hover:translate-x-10 transition-transform inline-block underline decoration-[15px] decoration-green-600">INSTAGRAM: @alxgraphy</a>
              </div>
            </div>
            <p className="text-2xl font-light opacity-50 uppercase tracking-[1em] pt-20">Toronto, ON, Canada • EST Timezone</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
