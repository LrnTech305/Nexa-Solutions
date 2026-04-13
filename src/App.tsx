import { useState, useRef, useEffect } from 'react';
import { Brain, Building2, Palette, DollarSign, ArrowLeft, Star, ChevronRight, Sparkles, LogIn, User, X } from 'lucide-react';
import KeyNotesAI from './components/KeyNotesAI';
import OsasOseji from './components/OsasOseji';
import ArtNest from './components/ArtNest';
import DigitalPair from './components/DigitalPair';
import HamburgerMenu from './components/HamburgerMenu';
import { ThemeProvider } from './context/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

type Website = 'keynotes' | 'osas' | 'artnest' | 'digitalpair' | null;

function AppContent() {
  const [activeWebsite, setActiveWebsite] = useState<Website>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const servicesRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleReset = () => setActiveWebsite(null);
    window.addEventListener('reset-portfolio', handleReset);
    return () => window.removeEventListener('reset-portfolio', handleReset);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('nexa_user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSocialLogin = (provider: string) => {
    let fakeName = '';
    if (provider === 'google') fakeName = 'Google User';
    if (provider === 'apple') fakeName = 'Apple User';
    if (provider === 'microsoft') fakeName = 'Microsoft User';
    localStorage.setItem('nexa_user', fakeName);
    setIsLoggedIn(true);
    setUserName(fakeName);
    setShowAuthModal(false);
    alert(`Logged in as ${fakeName} (demo)`);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexa_user');
    setIsLoggedIn(false);
    setUserName('');
  };

  if (activeWebsite) {
    return (
      <div>
        <button
          onClick={() => setActiveWebsite(null)}
          className="fixed top-20 right-4 z-50 flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-100 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Portfolio
        </button>
        <HamburgerMenu />
        {activeWebsite === 'keynotes' && <KeyNotesAI />}
        {activeWebsite === 'osas' && <OsasOseji />}
        {activeWebsite === 'artnest' && <ArtNest />}
        {activeWebsite === 'digitalpair' && <DigitalPair />}
      </div>
    );
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">
              Nexa<span className="text-indigo-600 dark:text-indigo-400">Solutions</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo(servicesRef)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Services</button>
              <button onClick={() => scrollTo(featuredRef)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Projects</button>
              <button onClick={() => scrollTo(reviewsRef)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Reviews</button>
              {!isLoggedIn ? (
                <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition flex items-center gap-2">
                  <LogIn className="size-4" /> Sign In
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <User className="size-4" /> {userName}
                  </span>
                  <button onClick={handleLogout} className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    Logout
                  </button>
                </div>
              )}
            </nav>
            <HamburgerMenu />
          </div>
        </header>

        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Sign in to Nexa</h3>
                <button onClick={() => setShowAuthModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X className="size-5" />
                </button>
              </div>
              <div className="space-y-4">
                <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="size-5" />
                  Continue with Google
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="size-5 dark:invert" />
                  Continue with Apple
                </button>
                <button onClick={() => handleSocialLogin('microsoft')} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="size-5" />
                  Continue with Microsoft
                </button>
              </div>
              <p className="text-xs text-center text-gray-500 mt-6">
                Demo authentication – no real account required.
              </p>
            </div>
          </div>
        )}

        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 -z-10" />
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm mb-6">
                <Sparkles className="size-4" />
                <span>Nexa Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Digital products that<br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  perform and delight
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                We build AI tools, design agencies, and conversion platforms – all under one roof.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollTo(servicesRef)} className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition flex items-center gap-2">
                  Explore Services <ChevronRight className="size-4" />
                </button>
                <button onClick={() => scrollTo(featuredRef)} className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </section>

        <section ref={servicesRef} className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Specialized solutions for modern businesses</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div onClick={() => setActiveWebsite('keynotes')} className="group cursor-pointer bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 hover:shadow-xl transition-all border border-indigo-100 dark:border-indigo-900">
                <div className="size-14 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5"><Brain className="size-7" /></div>
                <h3 className="text-2xl font-semibold mb-2">KeyNotes AI</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">AI‑powered note summarization with practice exercises for students and professionals.</p>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ChevronRight className="size-4" /></span>
              </div>
              <div onClick={() => setActiveWebsite('artnest')} className="group cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-8 hover:shadow-xl transition-all border border-emerald-100 dark:border-emerald-900">
                <div className="size-14 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5"><Palette className="size-7" /></div>
                <h3 className="text-2xl font-semibold mb-2">ArtNest</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">UI/UX design and web development – beautiful, responsive interfaces that users love.</p>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ChevronRight className="size-4" /></span>
              </div>
              <div onClick={() => setActiveWebsite('digitalpair')} className="group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 hover:shadow-xl transition-all border border-blue-100 dark:border-blue-900">
                <div className="size-14 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5"><DollarSign className="size-7" /></div>
                <h3 className="text-2xl font-semibold mb-2">DigitalPair</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Live currency exchange and unit conversion tools for travellers and businesses.</p>
                <span className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ChevronRight className="size-4" /></span>
              </div>
            </div>
          </div>
        </section>

        <section ref={featuredRef} className="py-20 bg-gray-50 dark:bg-gray-900/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm uppercase tracking-wide">Featured Project</span>
                <h2 className="text-4xl font-bold mt-2 mb-4">Osas & Oseji</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Premium real estate agency in Lagos. A separate venture showcasing luxury property listings and professional real estate services.
                </p>
                <button onClick={() => setActiveWebsite('osas')} className="px-6 py-3 bg-amber-700 dark:bg-amber-600 text-white rounded-full hover:bg-amber-800 dark:hover:bg-amber-700 transition inline-flex items-center gap-2">
                  View Project <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="flex-1 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-8 text-center">
                <Building2 className="size-16 text-amber-700 dark:text-amber-500 mx-auto mb-4" />
                <p className="text-gray-700 dark:text-gray-300">Coming soon: More projects in this space.</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={reviewsRef} className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What our community says</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Trusted by creators, students, and businesses</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", role: "Product Designer", content: "KeyNotes AI saved me hours of study time. The summaries are incredibly accurate.", rating: 5 },
                { name: "Samira Okonkwo", role: "Startup Founder", content: "ArtNest redesigned our entire platform – conversion rates went up by 40%!", rating: 5 },
                { name: "David Chen", role: "Freelancer", content: "DigitalPair is my go‑to for quick currency conversions. Clean and fast.", rating: 5 }
              ].map((review, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="size-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">“{review.content}”</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-white font-bold">{review.name[0]}</div>
                    <div><div className="font-semibold">{review.name}</div><div className="text-sm text-gray-500 dark:text-gray-400">{review.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-3xl font-bold tracking-tight mb-4">Nexa<span className="text-indigo-400">Solutions</span></div>
            <p className="text-gray-400 max-w-md mx-auto mb-6">Building digital excellence – one product at a time.</p>
            <div className="flex justify-center gap-6 text-sm text-gray-400"><span>© 2026 Nexa Solutions</span><span>™ Trademark</span><span>All rights reserved</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}