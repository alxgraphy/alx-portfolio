import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram } from 'lucide-react';

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
  const [hasEntered, setHasEntered] = useState(false);
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
  const [currentTime, setCurrentTime] = useState(new Date());

  const [captchaTarget] = useState(() => Math.floor(Math.random() * 100000) + 1);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  // Format time
  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
    window.addEventListener('popstate', () => {
      const path = window.location.pathname.slice(1) || 'home';
      setCurrentPage(path);
    });
    return () => window.removeEventListener('popstate', () => {});
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    setCaptchaClicks(0);
  };

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

  useEffect(() => {
    if (allPhotoUrls.length > 0) {
      const shuffled = [...allPhotoUrls].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 12));
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'kat') {
      setKatLoading(true);
      fetch('https://www.reddit.com/r/catmemes/hot.json?limit=15')
        .then(res => res.json())
        .then(data => {
          const posts = data.data.children
            .map(child => child.data)
            .filter(post => {
              const isImage = post.url && (
                post.url.endsWith('.jpg') || post.url.endsWith('.png') ||
                post.url.endsWith('.gif') || post.url.includes('i.redd.it') ||
                post.url.includes('imgur.com')
              );
              const isSafe = !post.over_18 &&
                !post.title.toLowerCase().includes('nsfw') &&
                !post.url.toLowerCase().includes('nsfw');
              return isImage && isSafe;
            });
          setKatMemes(posts);
          setKatLoading(false);
        })
        .catch(() => setKatLoading(false));
    }
  }, [currentPage]);

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
    'glowup', 'sus', 'void', 'winner', 'captcha', 'cringe', 'timbits', 'hackerman',
    'skillissue', 'delete', 'ratio', 'mid', 'touchgrass', 'no-bitches', 'pain',
    'foreveralone', 'invisible', 'kat'
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

  const hideUIpages = ['rickroll', 'terminal', 'void', 'pain'];

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

  // Show landing screen first
  if (!hasEntered) {
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
            className={`px-16 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110 mt-12`}
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

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
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

        {/* Rest of pages omitted for brevity - they remain the same */}
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
