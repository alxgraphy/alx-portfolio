import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram } from 'lucide-react';

// Your Cloudinary photos (unchanged)
const allPhotoUrls = [
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
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8607_kuco1i.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8571_i6mw8o.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8614_miqc9h.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8572_sz6aer.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8567_hlcana.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8565_v8k0ih.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8565_v8k0ih.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8554_mpcap8.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005816/DSC_8553_x5flqg.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005815/DSC_8552_xq0gpt.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005814/DSC_8548_z6x97g.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005814/DSC_8551_voipzu.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005813/DSC_8547_gfaa2p.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005813/DSC_8546_kh0mhr.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005813/DSC_8545_dweztf.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005809/DSC_8544_mcdmeu.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005805/DSC_8477_l3dxys.jpg"
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('wireframe');
  const [repos, setRepos] = useState([]);
  const [forkRepos, setForkRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [captchaClicks, setCaptchaClicks] = useState(0);
  const [katMemes, setKatMemes] = useState([]);
  const [katLoading, setKatLoading] = useState(true);
  const [lastCatSource, setLastCatSource] = useState(null);

  const catSources = ['catmemes', 'cats', 'IllegallySmolCats', 'MEOW_IRL', 'CatsAreAssholes'];

  // ─── LANDING PAGE STATES ─────────────────────────────────────
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [captchaTarget] = useState(() => Math.floor(Math.random() * 100000) + 1);

  // Update time every second
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
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // URL / history handling
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);

    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home';
      setCurrentPage(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page) => {
    if (page === 'kat') {
      setKatMemes([]); // clear old memes
      setCurrentPage(''); // force re-trigger
      setTimeout(() => setCurrentPage('kat'), 0);
      return;
    }
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    setCaptchaClicks(0);
  };

  // GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter(r => !r.fork));
        setForkRepos(data.filter(r => r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Random photos
  useEffect(() => {
    if (allPhotoUrls.length > 0) {
      const shuffled = [...allPhotoUrls].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 12));
    }
  }, []);

  // Kat memes (only one effect)
  useEffect(() => {
    if (currentPage !== 'kat') return;

    setKatLoading(true);
    let randomSource;
    do {
      randomSource = catSources[Math.floor(Math.random() * catSources.length)];
    } while (randomSource === lastCatSource && catSources.length > 1);

    setLastCatSource(randomSource);

    fetch(`https://meme-api.com/gimme/${randomSource}/15`)
      .then(res => res.json())
      .then(data => {
        setKatMemes(data.memes || []);
        setKatLoading(false);
      })
      .catch(() => setKatLoading(false));
  }, [currentPage]);

  // Nav hide on scroll
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

  const aboutMePhoto = '/pic/me.jpeg';
  const avatarUrl = 'https://avatars.githubusercontent.com/u/198081098?v=4';

  const themes = {
    wireframe: {
      bg: 'bg-white',
      text: 'text-black',
      accent: 'text-black',
      border: 'border-black',
      card: 'bg-white border-black',
      footerBg: 'bg-white'
    },
    aether: {
      bg: 'bg-black',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      card: 'bg-black border-white',
      footerBg: 'bg-black'
    }
  };

  const t = themes[theme];

  const validPages = [
    'home', 'about', 'skills', 'code', 'photography', 'contact',
    'secret', 'admin', 'rickroll', 'source', 'coffee', 'old', 'test', 'terminal',
    'glowup', 'sus', 'void', 'winner', 'captcha', 'cringe', 'timbits', 'hackerman',
    'skillissue', 'delete', 'ratio', 'mid', 'touchgrass', 'no-bitches', 'pain',
    'foreveralone', 'invisible', 'kat'
  ];

  const is404 = !validPages.includes(currentPage);

  const funny404Messages = [
    "Oops, that page wandered off... probably chasing clout. Skill issue.",
    "404: Page not found (but my excuses are premium). Cope harder.",
    // ... (keeping all your funny messages, just not pasting them all again here)
    "This is the part where you go back to the home page and pretend this never happened. Shhh."
  ];

  const [random404, setRandom404] = useState('');
  useEffect(() => {
    if (is404) {
      const pick = funny404Messages[Math.floor(Math.random() * funny404Messages.length)];
      setRandom404(pick);
    }
  }, [is404]);

  const hideUIpages = ['rickroll', 'terminal', 'void', 'pain'];

  const captchaChallenges = [
    "Select all squares with traffic lights (there are none, click anyway)",
    // ... your full list
    "This is not a drill. Click or be suspected forever."
  ];

  // ─── LANDING SCREEN ──────────────────────────────────────────
  if (!hasEntered && (currentPage === 'home' || currentPage === '')) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-mono flex items-center justify-center px-6`}>
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${t.accent} animate-pulse`}>
            WELCOME
          </h1>
          <p className="text-3xl md:text-4xl font-bold">
            TO ALEXANDER'S PORTFOLIO
          </p>
          <div className={`text-xl md:text-2xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
            {getGreeting()}, it's {getFormattedTime()}
          </div>
          <button
            onClick={() => setHasEntered(true)}
            className={`px-16 py-6 border-4 ${t.border} ${theme === 'wireframe' ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white'} text-2xl uppercase tracking-widest font-black transition hover:scale-110 mt-12`}
          >
            LET'S GO →
          </button>
          <div className={`text-sm uppercase tracking-widest mt-8 ${theme === 'wireframe' ? 'opacity-50' : 'opacity-60'}`}>
            Grade 7 • Toronto • Developer & Photographer
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN PORTFOLIO ──────────────────────────────────────────
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      {!hideUIpages.includes(currentPage) && (
        <>
          <nav className={`fixed top-6 right-6 z-50 flex gap-4 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            <button onClick={() => navigate('about')} className={`px-4 py-2 border-2 ${t.border} transition text-sm uppercase tracking-wider font-bold ${theme === 'wireframe' ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'}`}>About</button>
            <button onClick={() => navigate('skills')} className={`px-4 py-2 border-2 ${t.border} transition text-sm uppercase tracking-wider font-bold ${theme === 'wireframe' ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'}`}>Skills</button>
            <button onClick={() => navigate('code')} className={`px-4 py-2 border-2 ${t.border} transition text-sm uppercase tracking-wider font-bold ${theme === 'wireframe' ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'}`}>Code</button>
            <button onClick={() => navigate('photography')} className={`px-4 py-2 border-2 ${t.border} transition text-sm uppercase tracking-wider font-bold ${theme === 'wireframe' ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'}`}>Photography</button>
            <button onClick={() => navigate('contact')} className={`px-4 py-2 border-2 ${t.border} transition text-sm uppercase tracking-wider font-bold ${theme === 'wireframe' ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'}`}>Contact</button>
            <button onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')} className={`px-4 py-2 border-2 ${t.border} transition`}>
              {theme === 'wireframe' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </nav>
          <button
            onClick={() => navigate('home')}
            className={`fixed top-6 left-6 z-50 text-2xl font-black uppercase tracking-widest ${t.accent} hover:opacity-70 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
          >
            A.
          </button>
        </>
      )}

      <div className="min-h-screen flex items-center justify-center px-6 pb-24">
        {/* HOME */}
        {currentPage === 'home' && (
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <div className={`border-4 ${t.border} overflow-hidden shadow-2xl`}>
              <img
                src={aboutMePhoto}
                alt="Alexander"
                onError={(e) => { e.target.src = avatarUrl; }}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-6">
              <h1 className={`text-6xl md:text-7xl font-black uppercase tracking-tight ${t.accent}`}>
                ALEXANDER
              </h1>
              <div className={`text-sm uppercase tracking-widest ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                Grade 7 • Toronto • Developer & Photographer
              </div>
              <p className={`text-xl md:text-2xl leading-relaxed ${theme === 'wireframe' ? 'opacity-90' : 'opacity-95'}`}>
                Hello, my name is Alexander, a passionate photographer, student and a coder in grade 7 who enjoys capturing memorable and compelling moments.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                I like experimenting with different perspectives, composition and light, turning everyday scenes into visually appealing photographs.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                In my spare time, I practice for my next image and try to stay in the moment — in school, real life or through a lens.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT, SKILLS, CONTACT, KAT, SECRET PAGES, 404 — all unchanged, keeping your full personality */}

        {/* CODE — the fixed version */}
        {currentPage === 'code' && (
          <div className="max-w-7xl w-full py-20">
            {/* MAIN PROJECTS */}
            <div className="mb-20">
              <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
                PROJECTS
              </h2>
              <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                Original repositories auto-updating from GitHub
              </div>

              {loading ? (
                <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                  Loading projects...
                </div>
              ) : repos.length === 0 ? (
                <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                  No projects yet.
                </div>
              ) : (
                <div className="space-y-8">
                  {repos.map((repo) => (
                    <div
                      key={repo.id}
                      className={`border-2 ${t.border} ${t.card} p-8 transition-all duration-300 group ${
                        theme === 'aether'
                          ? 'hover:bg-white hover:text-black hover:border-white'
                          : 'hover:bg-black hover:text-white hover:border-black'
                      }`}
                    >
                      <h3
                        className={`text-3xl font-black uppercase tracking-tight mb-3 ${t.accent} ${
                          theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'
                        } transition-colors duration-300`}
                      >
                        {repo.name}
                      </h3>

                      <p
                        className={`text-base mb-4 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'} ${
                          theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'
                        } transition-colors duration-300`}
                      >
                        {repo.description || 'No description provided.'}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 underline ${t.accent} ${
                            theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'
                          } transition-colors duration-300`}
                        >
                          <Github size={18} /> View Repo
                        </a>

                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline ${
                              theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'
                            } transition-colors duration-300`}
                          >
                            → Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FORKED PROJECTS */}
            {forkRepos.length > 0 && (
              <div className="mt-32">
                <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
                  CONTRIBUTED TO
                </h2>
                <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                  Forked repositories
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {forkRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`border-2 ${t.border} ${t.card} p-6 transition-all duration-300 group flex flex-col justify-between ${
                        theme === 'aether'
                          ? 'hover:bg-white hover:border-white'
                          : 'hover:bg-black hover:border-black'
                      }`}
                    >
                      <h4
                        className={`text-xl font-bold uppercase mb-2 ${t.accent} ${
                          theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'
                        } transition-colors duration-300`}
                      >
                        {repo.name}
                      </h4>

                      <div
                        className={`text-sm uppercase tracking-wider mt-auto ${
                          theme === 'wireframe' ? 'opacity-80' : 'opacity-90'
                        } ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'} transition-colors duration-300`}
                      >
                        View →
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ... all your other pages (about, skills, contact, kat, secret pages, 404) go here unchanged ... */}

        {/* 404 */}
        {is404 && (
          <div className="max-w-4xl w-full text-center">
            <h2 className={`text-7xl md:text-9xl font-black uppercase tracking-tight mb-8 ${t.accent}`}>
              404
            </h2>
            <p className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
              {random404}
            </p>
            <p className={`text-xl mb-12 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Either you typed the wrong URL, or I forgot to build this page.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-8 py-4 border-2 ${t.border} ${theme === 'wireframe' ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white'} text-sm uppercase tracking-widest font-bold transition`}
            >
              Take me home
            </button>
          </div>
        )}
      </div>

      {!hideUIpages.includes(currentPage) && (
        <footer className={`fixed bottom-0 left-0 right-0 ${t.footerBg} border-t-2 ${t.border} py-4 z-40`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-sm uppercase tracking-widest">
            Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen (
            <a href="https://github.com/alxgraphy" target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:opacity-70 transition`}>
              @alxgraphy
            </a>)
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
