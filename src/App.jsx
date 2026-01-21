import { useState, useEffect } from 'react';
import { Github, Mail, Camera, ExternalLink, Moon, Sun, Instagram } from 'lucide-react';

// All photos hosted on Cloudinary (your cloud name: dyjibiyac)
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
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005819/DSC_8554_mpcap8.jpg",
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
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
  };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter(r => !r.fork));
        setForkRepos(data.filter(r => r.fork));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allPhotoUrls.length > 0) {
      const shuffled = [...allPhotoUrls].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 12));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
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
      hoverBg: 'hover:bg-black hover:text-white',
      button: 'bg-black text-white hover:bg-white hover:text-black',
      card: 'bg-white border-black',
      footerBg: 'bg-white'
    },
    aether: {
      bg: 'bg-gradient-to-br from-gray-900 via-black to-gray-900',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      hoverBg: 'hover:bg-white hover:text-black',
      button: 'bg-white text-black hover:bg-black hover:text-white hover:border-white',
      card: 'bg-black/60 backdrop-blur-md border-white',
      footerBg: 'bg-black/80 backdrop-blur-md'
    }
  };

  const t = themes[theme];

  // All pages including hidden ones — no 404 trigger
  const validPages = [
    'home', 'about', 'skills', 'code', 'photography', 'contact',
    'secret', 'thealx', 'rickroll', 'source', 'coffee', 'old', 'test', 'terminal',
    'glowup', 'sus', 'void', 'winner'
  ];

  const is404 = !validPages.includes(currentPage);

  const funny404Messages = [
    "Oops, that page wandered off... probably chasing clout. Skill issue.",
    "404: Page not found (but my excuses are premium). Cope harder.",
    "This page is on vacation. Permanently. Don't wait up, loser.",
    "Error 404: My bad, this doesn't exist yet. Maybe next lifetime.",
    "You found the secret 'nothing here' page! Claim your participation trophy... oh wait, there isn't one.",
    "Congrats! You broke the internet. Just kidding — this page doesn't exist. Git gud.",
    "This page is in another castle. And Mario already rage-quit.",
    "Lost? Yeah, this page is too. Touch grass and try again.",
    "404: Reality not found. Try again in another universe, maybe one with better navigation.",
    "Page.exe has stopped responding. Classic skill issue detected.",
    "We let this page go touch grass. It never came back. Ghosted.",
    "This URL took an L and deleted itself. Brutal.",
    "Error 404: Too cool for this page. Sorry not sorry.",
    "You weren't supposed to find this... or maybe you were. I'm bad at secrets and you're bad at URLs.",
    "Page not found. Have you tried yelling at your screen? Works for me.",
    "This page ghosted you. Classic 2026 energy.",
    "404: We can neither confirm nor deny the existence of this page. Plausible deniability.",
    "The page you're looking for has left the chat. Blocked and reported.",
    "Error: Page took a sick day. Or a permanent one. Who knows. Not me.",
    "You're lost and I'm judging you silently from the home page.",
    "Bold of you to assume I built that page. Zero effort was made.",
    "This is what happens when you type random stuff. Natural consequences.",
    "404 energy only. No refunds, no sympathy.",
    "The page ran away because it heard you were coming. Smart page.",
    "Plot twist: the page was never real. Mind blown.",
    "This is the part where you go back to the home page and pretend this never happened. Shhh."
  ];

  const random404 = funny404Messages[Math.floor(Math.random() * funny404Messages.length)];

  // Hide footer on certain hidden pages (rickroll, terminal, void, etc.)
  const hideFooterPages = ['rickroll', 'terminal', 'void'];

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      {/* Nav & Logo — hidden on full-screen secret pages */}
      {!['rickroll', 'terminal', 'void'].includes(currentPage) && (
        <>
          <nav className={`fixed top-6 right-6 z-50 flex gap-4 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            <button onClick={() => navigate('about')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>About</button>
            <button onClick={() => navigate('skills')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Skills</button>
            <button onClick={() => navigate('code')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Code</button>
            <button onClick={() => navigate('photography')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Photography</button>
            <button onClick={() => navigate('contact')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Contact</button>
            <button onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition`}>
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

        {/* ABOUT, SKILLS, CODE, PHOTOGRAPHY, CONTACT — unchanged, keeping them short */}
        {/* ... (your existing ABOUT, SKILLS, CODE, PHOTOGRAPHY, CONTACT blocks here — I omitted them for brevity) ... */}

        {/* HIDDEN PAGES */}

        {/* 1. /secret */}
        {currentPage === 'secret' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              YOU ACTUALLY FOUND IT 🕵️‍♂️
            </h1>
            <p className="text-3xl md:text-5xl font-bold mb-12">
              Congratulations. You win... literally nothing.
            </p>
            <p className={`text-2xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              But since you're here, have this imaginary high-five ✋<br/>
              (Don't tell anyone. It's classified.)
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Okay I'm leaving now
            </button>
          </div>
        )}

        {/* 2. /thealx — fake denied */}
        {currentPage === 'thealx' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              ACCESS DENIED
            </h1>
            <p className="text-4xl md:text-6xl font-bold mb-12">
              Nice try, script kiddie.
            </p>
            <p className={`text-2xl mb-16 leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You thought you'd just /thealx your way in?<br/>
              This isn't 2012. Go back to inspecting elements like a normal person.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Leave before I call my mom
            </button>
          </div>
        )}

        {/* 3. /rickroll — FULL SCREEN + SOUND + AUTOPLAY + LOOP */}
        {currentPage === 'rickroll' && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase mb-12 animate-pulse z-10">
              NEVER GONNA GIVE YOU UP
            </h1>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=0&loop=1&playlist=dQw4w9WgXcQ&modestbranding=1&rel=0&showinfo=0"
              title="Never Gonna Give You Up"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* 4. /source */}
        {currentPage === 'source' && (
          <div className="max-w-4xl mx-auto py-32 text-center font-mono">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              CTRL+SHIFT+I ENJOYER
            </h1>
            <p className="text-3xl md:text-5xl font-bold mb-12">
              You really opened dev tools huh?
            </p>
            <p className={`text-2xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Respect. But there's nothing cool here.<br/>
              Just bad decisions and 7th-grade React code.
            </p>
            <pre className={`text-left text-lg p-8 border-4 ${t.border} ${t.card} overflow-auto max-h-96`}>
              {`console.log("stop looking at my code >:(")`}
            </pre>
            <button
              onClick={() => navigate('home')}
              className={`mt-12 px-10 py-5 border-4 ${t.border} ${t.button} text-xl uppercase tracking-widest font-black transition hover:scale-105`}
            >
              Close tab and pretend this never happened
            </button>
          </div>
        )}

        {/* 5. /coffee */}
        {currentPage === 'coffee' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              BUY ME A TIMS?
            </h1>
            <p className="text-4xl md:text-6xl font-bold mb-12">
              Double-double or nothing
            </p>
            <p className={`text-2xl mb-16 leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              My code runs on iced capps and regret.<br/>
              One medium double-double = one happy Canadian dev.<br/>
              (But seriously, just send good vibes. Or a Timbits box. I'm not picky.)
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Nah, I'm good on caffeine
            </button>
          </div>
        )}

        {/* 7. /old */}
        {currentPage === 'old' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              V1.0 — THE DARK TIMES
            </h1>
            <p className="text-4xl md:text-6xl font-bold mb-12">
              Welcome to 2025 me
            </p>
            <p className={`text-2xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              This is what the portfolio looked like before I learned CSS.<br/>
              Comic Sans, center-aligned everything, and a Geocities vibe.<br/>
              Never speak of this version again.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Burn my eyes no more
            </button>
          </div>
        )}

        {/* 9. /test */}
        {currentPage === 'test' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              UNDER CONSTRUCTION
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12">
              Since forever
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              This page has been "coming soon" longer than I've been alive.<br/>
              Estimated completion: 2037. Maybe.
            </p>
            <div className="text-6xl mb-8">🚧👷‍♂️💀</div>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Escape while you can
            </button>
          </div>
        )}

        {/* 10. /terminal — full screen, no footer */}
        {currentPage === 'terminal' && (
          <div className="fixed inset-0 bg-black text-green-400 font-mono p-8 overflow-auto z-50">
            <pre className="text-xl md:text-2xl leading-relaxed">
{`alxgraphy@portfolio:~$ whoami
> Alexander Wondwossen — 7th grader who knows too much React

alxgraphy@portfolio:~$ ls
> procrastination.txt  talent.exe (corrupted)  timbits.jpg  regrets/

alxgraphy@portfolio:~$ sudo make me famous
> sudo: make: command not found
> (try buying more Tims instead)

alxgraphy@portfolio:~$ exit
> nice try. you're stuck here now.`}
            </pre>
            <p className="text-4xl mt-16 animate-pulse">
              Type anything and press Enter... nothing will happen 😈
            </p>
            <button
              onClick={() => navigate('home')}
              className="mt-12 px-10 py-5 bg-green-900 text-green-200 border-2 border-green-500 text-xl font-bold hover:bg-green-800 transition"
            >
              CTRL+C to ragequit
            </button>
          </div>
        )}

        {/* NEW HIDDEN PAGES */}

        {/* /glowup — before/after roast */}
        {currentPage === 'glowup' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              GLOW UP ERA
            </h1>
            <p className="text-4xl md:text-6xl font-bold mb-12">
              Grade 5 me vs now
            </p>
            <p className={`text-2xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Left: stick figures and dreams<br/>
              Right: semi-functional React and 100+ photos<br/>
              Progress? Debatable.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Back to the future
            </button>
          </div>
        )}

        {/* /sus — Among Us style */}
        {currentPage === 'sus' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              SUS
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-red-500">
              EMERGENCY MEETING
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Who typed /sus?<br/>
              You. You're sus.<br/>
              Vote to eject yourself.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Self-eject
            </button>
          </div>
        )}

        {/* /void — pure existential black screen */}
        {currentPage === 'void' && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <p className="text-4xl md:text-6xl font-mono text-gray-600 animate-pulse">
              nothing here...<br/>
              just like my motivation
            </p>
          </div>
        )}

        {/* /winner — fake victory screen */}
        {currentPage === 'winner' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-bounce`}>
              WINNER WINNER
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-yellow-400">
              CHICKEN DINNER
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You found a hidden page.<br/>
              Your prize: eternal bragging rights.<br/>
              (And maybe a Timbits if you ask nicely)
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Claim victory and leave
            </button>
          </div>
        )}

        {/* 404 PAGE */}
        {is404 && (
          <div className="max-w-4xl w-full text-center">
            <h2 className={`text-7xl md:text-9xl font-black uppercase tracking-tight mb-8 ${t.accent}`}>
              404
            </h2>
            <p className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
              {random404}
            </p>
            <p className={`text-xl mb-12 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Either you typed the wrong URL, or I forgot to build this page. Probably the first one.
              Maybe the second. Definitely one of those.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-8 py-4 border-2 ${t.border} ${t.button} text-sm uppercase tracking-widest font-bold transition`}
            >
              Take me home
            </button>
          </div>
        )}
      </div>

      {/* Footer — hidden on full-screen secret pages */}
      {!hideFooterPages.includes(currentPage) && (
        <footer className={`fixed bottom-0 left-0 right-0 ${t.footerBg} border-t-2 ${t.border} py-4 z-40`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-sm uppercase tracking-widest">
            <span>Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen (</span>
            <a href="https://github.com/alxgraphy" target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:opacity-70 transition`}>
              @alxgraphy
            </a>
            <span>)</span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
