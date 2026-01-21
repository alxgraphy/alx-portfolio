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
  const [captchaClicks, setCaptchaClicks] = useState(0);

  // Generate random target clicks once (1 to 100,000)
  const [captchaTarget] = useState(() => Math.floor(Math.random() * 100000) + 1);

  // Handle URL routing
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
    setCaptchaClicks(0); // Reset captcha progress when leaving
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

  const validPages = [
    'home', 'about', 'skills', 'code', 'photography', 'contact',
    'secret', 'admin', 'rickroll', 'source', 'coffee', 'old', 'test', 'terminal',
    'glowup', 'sus', 'void', 'winner', 'captcha',
    'cringe', 'timbits', 'hackerman', 'skillissue', 'delete',
    'ratio', 'mid', 'touchgrass', 'no-bitches', 'pain',
    'cope', 'seethe', 'mald', 'goon', 'brainrot',
    'l', 'w', 'skibidi', 'rizz', 'fanumtax',
    'sigma', 'mog', 'looksmax', 'doomscroll', 'rentfree',
    'yap', 'glaze'
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

  // Pages where nav + footer should be hidden
  const hideUIpages = ['rickroll', 'terminal', 'void', 'pain'];

  // Fake CAPTCHA messages
  const captchaChallenges = [
    "Select all squares with traffic lights (there are none, click anyway)",
    "Are you human? Prove it by clicking this button 47 times",
    "I'm not a robot... are YOU a robot? 🤖",
    "Click if you're not a time-traveling toaster",
    "Verify you're not Canadian spam (eh?)",
    "Solve: 1+1=? (trick question, it's 11 in binary)",
    "Pick the image of a sad developer (spoiler: it's you right now)",
    "Confirm you're not here to steal my Timbits",
    "Click to prove you're not a 404 in disguise",
    "Are you worthy of seeing my code? (Answer: no)",
    "Select all images of existential dread",
    "I'm watching you... click faster",
    "CAPTCHA level: over 9000. Good luck.",
    "Click until your finger falls off",
    "Are we sure you're not a very slow bot?",
    "This is not a drill. Click or be suspected forever."
  ];

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      {/* Nav & Logo — hidden on full-screen secret pages */}
      {!hideUIpages.includes(currentPage) && (
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
        {/* ────────────────────────────────────────────── */}
        {/* NORMAL PAGES (HOME, ABOUT, SKILLS, CODE, PHOTOGRAPHY, CONTACT) */}
        {/* ────────────────────────────────────────────── */}

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

        {currentPage === 'about' && (
          <div className="max-w-6xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
              ABOUT ME
            </h2>
            <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
              Grade 7 • Toronto, Canada
            </div>
            <div className="space-y-16">
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>WHO I AM</h3>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>Hello, my name is Alexander, a passionate photographer, student and a coder in grade 7 who enjoys capturing memorable and compelling moments.</p>
                  <p>I like experimenting with different perspectives, composition and light, turning everyday scenes into visually appealing photographs.</p>
                  <p>In my spare time, I practice for my next image and try to stay in the moment — in school, real life or through a lens.</p>
                </div>
              </div>
              {/* ... rest of ABOUT content unchanged ... */}
            </div>
          </div>
        )}

        {/* ... SKILLS, CODE, PHOTOGRAPHY, CONTACT blocks remain unchanged (omitted here for brevity) ... */}

        {/* ────────────────────────────────────────────── */}
        {/* ALL HIDDEN / SECRET PAGES (43 total) */}
        {/* ────────────────────────────────────────────── */}

        {/* Previous ones (secret, admin, rickroll, source, coffee, old, test, terminal, glowup, sus, void, winner, captcha, cringe, timbits, hackerman, skillissue, delete, ratio, mid, touchgrass, no-bitches, pain) */}
        {/* ... (your existing hidden page blocks here - unchanged) ... */}

        {/* ────────────── NEW ONES ────────────── */}

        {/* /ratio */}
        {currentPage === 'ratio' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              YOU'VE BEEN RATIO'D
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-red-500">
              L + RATIO + MID
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Your portfolio: 420 likes<br/>
              Random tweet: 69,420 likes<br/><br/>
              Ratio'd by the internet.<br/>
              Touch grass. Get help. Delete account.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Cope + seethe + mald
            </button>
          </div>
        )}

        {/* /mid */}
        {currentPage === 'mid' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              MID
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-yellow-500">
              OFFICIALLY MID
            </p>
            <p className={`text-3xl mb-16 leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Code: mid<br/>
              Photos: mid<br/>
              Personality: mid af<br/>
              Portfolio rating: 5/10<br/><br/>
              Not bad... just painfully average.<br/>
              Welcome to the mid club.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stay mid forever
            </button>
          </div>
        )}

        {/* /touchgrass */}
        {currentPage === 'touchgrass' && (
          <div className="fixed inset-0 bg-green-900 text-white font-mono p-8 overflow-hidden z-50 flex flex-col items-center justify-center">
            <h1 className="text-8xl md:text-10xl font-black mb-12 animate-pulse">
              TOUCH GRASS
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-8">
              You've been online for:
            </p>
            <p className="text-6xl mb-16">
              47 years, 3 months, 12 days
            </p>
            <p className="text-3xl mb-12 max-w-2xl text-center">
              Your vitamin D level: critically low<br/>
              Your social life: imaginary<br/>
              Your future: inside
            </p>
            <button
              onClick={() => navigate('home')}
              className="px-16 py-8 bg-green-600 text-white border-4 border-green-400 text-3xl font-black hover:bg-green-500 transition"
            >
              I refuse. Send help.
            </button>
          </div>
        )}

        {/* /no-bitches */}
        {currentPage === 'no-bitches' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              NO BITCHES?
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-purple-500">
              SKILL ISSUE
            </p>
            <p className={`text-3xl mb-16 leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Your dating profile:<br/>
              Likes: 0<br/>
              Matches: 0<br/>
              Rizz: negative<br/><br/>
              It's not you... wait, yes it is.<br/>
              Fix that haircut. Get a personality. Touch grass.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stay single king
            </button>
          </div>
        )}

        {/* /pain */}
        {currentPage === 'pain' && (
          <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
            <h1 className={`text-9xl md:text-[12rem] font-black text-red-600 mb-24 animate-pulse tracking-tighter`}>
              PAIN
            </h1>
            <iframe
              width="0"
              height="0"
              src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0&controls=0&loop=1&playlist=5qap5aO4i9A"
              title="Pain"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
            <p className="text-4xl md:text-6xl text-gray-500 mt-32 animate-pulse">
              Why are you still here?<br/>
              The pain is the point.
            </p>
            <button
              onClick={() => navigate('home')}
              className="mt-24 px-16 py-8 border-4 border-red-600 text-red-400 text-3xl font-black hover:bg-red-900 transition"
            >
              End the suffering
            </button>
          </div>
        )}

        {/* /cope */}
        {currentPage === 'cope' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              COPE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-blue-400">
              HARDER
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              It's not over bro...<br/>
              Next time you'll win...<br/>
              She's just playing hard to get...<br/>
              Keep coping king
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Still coping
            </button>
          </div>
        )}

        {/* /seethe */}
        {currentPage === 'seethe' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              SEETHE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-orange-500">
              AND MALD
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You're literally seething right now<br/>
              Steam coming out of ears<br/>
              Malding in 4K<br/>
              Skill issue detected
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Seething harder
            </button>
          </div>
        )}

        {/* /mald */}
        {currentPage === 'mald' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-shake`}>
              MALDING
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-red-600">
              INTENSIFIES
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You are currently maldmaxxing<br/>
              Rage level: nuclear<br/>
              Mald quota exceeded<br/>
              Please calm down king
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Mald elsewhere
            </button>
          </div>
        )}

        {/* /goon */}
        {currentPage === 'goon' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              GOON SESSION
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-purple-600">
              ACTIVE
            </p>
            <p className={`text-3xl mb-16 leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Eyes glazed<br/>
              Jaw dropped<br/>
              Soul leaving body<br/>
              You're gooning right now aren't you
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              End goon sesh
            </button>
          </div>
        )}

        {/* /brainrot */}
        {currentPage === 'brainrot' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              BRAINROT MAXED
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-cyan-400">
              SKIBIDI TOILET INFECTION
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Rizz? Gone.<br/>
              Gyatt? Missing.<br/>
              Only sigma brainrot remains.<br/>
              You have 3 days left.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Touch grass (impossible)
            </button>
          </div>
        )}

        {/* /l */}
        {currentPage === 'l' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-9xl md:text-[12rem] font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              L
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-red-500">
              BIGGEST L OF 2026
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Took an L today<br/>
              Took an L yesterday<br/>
              Will take L tomorrow<br/>
              L lifestyle
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Take another L
            </button>
          </div>
        )}

        {/* /w */}
        {currentPage === 'w' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-9xl md:text-[12rem] font-black uppercase tracking-tighter mb-8 ${t.accent} text-green-400`}>
              W
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12">
              RAREST W OF THE CENTURY
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You found a W page<br/>
              Actual W detected<br/>
              W in chat<br/>
              W forever king
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Secure the bag
            </button>
          </div>
        )}

        {/* /skibidi */}
        {currentPage === 'skibidi' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-bounce`}>
              SKIBIDI TOILET
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-cyan-500">
              BRAINROT OVERLOAD
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Skibidi bop mm dada<br/>
              Rizzler sigma gyatt<br/>
              Fanum tax ohio<br/>
              Your brain is cooked
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Detox
            </button>
          </div>
        )}

        {/* /rizz */}
        {currentPage === 'rizz' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              RIZZ LEVEL
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-purple-500">
              NEGATIVE ∞
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Your rizz is so low<br/>
              Even ChatGPT has more game<br/>
              Negative aura detected<br/>
              Leave the chat king
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Work on rizz
            </button>
          </div>
        )}

        {/* /fanumtax */}
        {currentPage === 'fanumtax' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              FANUM TAX
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-yellow-400">
              90% OF YOUR FOOD
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Fanum just walked in<br/>
              Took your fries<br/>
              Took your nuggets<br/>
              Left you with crumbs<br/>
              Classic Fanum tax
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Pay the tax
            </button>
          </div>
        )}

        {/* /sigma */}
        {currentPage === 'sigma' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              SIGMA MALE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-gray-400">
              GRINDSET ACTIVATED
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              No friends<br/>
              No emotions<br/>
              Only gains<br/>
              Sigma grindset never stops
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stay sigma
            </button>
          </div>
        )}

        {/* /mog */}
        {currentPage === 'mog' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              YOU JUST GOT MOGGED
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-blue-500">
              HARD MOG
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Height mogged<br/>
              Face mogged<br/>
              Aura mogged<br/>
              You're cooked lil bro
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Looksmax cope
            </button>
          </div>
        )}

        {/* /looksmax */}
        {currentPage === 'looksmax' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              LOOKSMAXING
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-cyan-500">
              IN PROGRESS
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Mewing: 24/7<br/>
              Chewing mastic gum: nonstop<br/>
              Bonesmashing: optional<br/>
              Still mid though
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Keep looksmaxxing
            </button>
          </div>
        )}

        {/* /doomscroll */}
        {currentPage === 'doomscroll' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              DOOMSCROLLING
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-gray-600">
              4:37 AM
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You've been here for 6 hours<br/>
              Eyes burning<br/>
              Soul decaying<br/>
              One more post...
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              One more scroll
            </button>
          </div>
        )}

        {/* /rentfree */}
        {currentPage === 'rentfree' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              LIVING RENT FREE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-purple-500">
              IN YOUR HEAD
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              I live in your mind rent-free<br/>
              Paying 0 dollars<br/>
              Occupying all thoughts<br/>
              Eviction impossible
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Pay rent
            </button>
          </div>
        )}

        {/* /yap */}
        {currentPage === 'yap' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              YAP SESSION
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-yellow-400">
              IN PROGRESS
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Yap yap yap yap yap<br/>
              You're yapping rn<br/>
              Yapaholic detected<br/>
              Yap until your jaw falls off
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stop yapping
            </button>
          </div>
        )}

        {/* /glaze */}
        {currentPage === 'glaze' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              GLAZING
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-cyan-500">
              INTENSE
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Glazing so hard rn<br/>
              Tongue on the floor<br/>
              Over-glazing detected<br/>
              Stop glazing bro
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Glaze elsewhere
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
      {!hideUIpages.includes(currentPage) && (
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
