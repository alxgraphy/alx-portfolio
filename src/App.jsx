import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  Activity, User, MapPin, Calendar, ExternalLink, Loader2,
  Instagram, Github, Mail, Target
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
  
  return (
    <span onMouseEnter={() => setIsHovered(true)} className={className}>
      {output}
    </span>
  );
};

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoadingRepos(false);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t = theme === 'dark' 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black', panel: 'bg-[#f5f5f5]' };

  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden cursor-none`}>
      
      {/* SCANNER CURSOR */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-current rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}
      >
        <div className="w-1 h-1 bg-current animate-pulse" />
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 backdrop-blur-md border-b ${t.border}`}>
        <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through transition-all ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>
              {item}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`ml-4 p-2 border ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* --- HOME PAGE --- */}
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-8">
                <div className="inline-block px-3 py-1 border border-current text-[10px] font-bold uppercase tracking-widest">Nikon D3200 // 55mm Optics</div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic">
                  Toronto Developer. Photographer. Documenting the city through sharp optics and optimized code.
                </p>
                <div className="flex gap-6">
                  <button onClick={() => setPage('photography')} className="px-8 py-3 bg-current text-current-inverse font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform" style={{ color: theme === 'dark' ? 'black' : 'white', backgroundColor: theme === 'dark' ? 'white' : 'black' }}>View_Archive</button>
                  <button onClick={() => setPage('contact')} className={`px-8 py-3 border-2 ${t.border} font-black uppercase text-xs tracking-widest hover:bg-current hover:text-current-inverse transition-all`}>Contact_Me</button>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className={`p-4 border-2 ${t.border} transition-transform duration-500 hover:-translate-y-2 relative`}>
                  <Corners />
                  <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale brightness-110 contrast-125" alt="Alex" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ABOUT PAGE --- */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Profile" /></h2>
              <div className="space-y-8 text-3xl font-light italic leading-snug opacity-80 border-l-[10px] border-current pl-10">
                <p>I am a developer and creator based in Toronto.</p>
                <p>My work is a balance between building <span className="font-black">React-driven applications</span> and capturing the structural geometry of the city.</p>
                <p>Equipped with a <span className="font-black underline decoration-2">Nikon D3200</span> and a <span className="font-black underline decoration-2">55mm lens</span>, I approach photography with the same precision I use when writing code.</p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className={`p-10 border-2 ${t.border} ${t.panel} relative space-y-8`}>
                <Corners />
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Kit_Details</h3>
                <div className="space-y-4 text-xs font-black uppercase">
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><Target size={14}/> Body: Nikon D3200</div>
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><Target size={14}/> Lens: 55mm Prime</div>
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><MapPin size={14}/> Base: Toronto, ON</div>
                  <div className="flex items-center gap-3"><Code size={14}/> Env: React / JS</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PHOTOGRAPHY PAGE --- */}
        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-current pb-8">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Optics" /></h2>
              <p className="max-w-xs text-[10px] font-black uppercase tracking-widest opacity-50 italic">Street photography shot on Nikon D3200. Sharp glass, high contrast, industrial focus.</p>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-current overflow-hidden bg-black">
                  <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" alt="Work" />
                  <div className="absolute bottom-2 right-2 text-[8px] font-black bg-white text-black px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">55MM_SHARP</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CODE PAGE --- */}
        {page === 'code' && (
          <div className="space-y-12 animate-in slide-in-from-right duration-500">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter underline decoration-4 underline-offset-8"><CypherText text="Development" /></h2>
            {loadingRepos ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin" size={48} /></div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {repos.map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" 
                     className={`group p-10 border-2 ${t.border} hover:bg-white hover:text-black transition-all duration-300 relative`}>
                    <Corners />
                    <div className="space-y-4">
                      <div className="flex justify-between items-start italic">
                        <h3 className="text-3xl font-black uppercase">{repo.name}</h3>
                        <ExternalLink size={20} />
                      </div>
                      <p className="text-sm opacity-50 italic group-hover:opacity-100">{repo.description || 'Repository metadata restricted.'}</p>
                      <div className="flex gap-4 text-[10px] font-black pt-4">
                        <span className="border border-current px-2 py-0.5 group-hover:border-black">{repo.language || 'JS'}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- SKILLS PAGE --- */}
        {page === 'skills' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Skillset" /></h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-current">
              {[
                { title: 'Code', items: ['React.js', 'Tailwind', 'Vite', 'JavaScript', 'Node.js'], icon: <Terminal /> },
                { title: 'Optics', items: ['Digital Manual', '55mm Prime', 'Nikon Ecosystem', 'Architecture', 'Editing'], icon: <Camera /> },
                { title: 'Theory', items: ['UI Architecture', 'Industrial Design', 'Figma', 'Geometry', 'Logic'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-current transition-all duration-300`}>
                  <div className="mb-10 opacity-30 group-hover:opacity-100 group-hover:text-black transition-all transform group-hover:scale-125 origin-left">{s.icon}</div>
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black transition-colors">{s.title}</h3>
                  <div className="space-y-4">
                    {s.items.map(item => (
                      <div key={item} className="text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} group-hover:bg-black`} /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CONTACT PAGE --- */}
        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center">Sync</h2>
            <div className="grid gap-6">
              {[
                { platform: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy' },
                { platform: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy' },
                { platform: 'Email', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' }
              ].map((item, i) => (
                <a key={i} href={item.url} className={`p-14 border-2 ${t.border} flex justify-between items-center group hover:bg-white hover:text-black transition-all`}>
                  <div>
                    <p className="text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">{item.platform}</p>
                    <p className="text-4xl md:text-5xl font-black italic tracking-tighter group-hover:translate-x-6 transition-transform">{item.handle}</p>
                  </div>
                  <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-24 px-12 border-t-2 border-current flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 text-[10px] font-black uppercase tracking-[0.5em]">
        <p>Alexander Wondwossen // Toronto</p>
        <p className="text-xl italic">2026 Archive</p>
        <div className="flex gap-8">
          <a href="https://github.com/alxgraphy" className="hover:line-through">GH</a>
          <a href="https://instagram.com/alexedgraphy" className="hover:line-through">IG</a>
        </div>
      </footer>
    </div>
  );
}
