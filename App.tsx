
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronRight, AlertCircle } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Manifesto from './pages/Manifesto';
import News from './pages/News';
import Join from './pages/Join';
import Contact from './pages/Contact';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'LEADERSHIP', path: '/leadership' },
    { name: 'MANIFESTO', path: '/manifesto' },
    { name: 'ARCHIVE', path: '/news' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 border-2 border-[#d90429] flex items-center justify-center relative overflow-hidden bg-black">
               <div className="absolute inset-0 bg-[#d90429] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="text-[#d90429] group-hover:text-white font-black text-2xl z-10 transition-colors">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white">VOICE OF BD</span>
              <span className="text-[10px] font-bold text-[#d90429] tracking-[0.2em] uppercase">Sovereignty First</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black tracking-widest transition-all hover:text-[#d90429] ${
                  location.pathname === link.path ? 'text-[#d90429] border-b-2 border-[#d90429] pb-1' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/join" 
              className="bg-[#d90429] text-white px-8 py-3 font-black text-xs tracking-widest hover:bg-white hover:text-black transition-all"
            >
              JOIN RESISTANCE
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-black border-b border-white/10 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen py-12 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col items-center space-y-8 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black tracking-tighter w-full text-center py-4 ${
                location.pathname === link.path ? 'text-[#d90429] bg-zinc-900' : 'text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/join"
            onClick={() => setIsOpen(false)}
            className="w-full bg-[#d90429] text-white py-5 text-center font-black text-xl"
          >
            JOIN RESISTANCE
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-[#d90429] flex items-center justify-center">
                 <span className="text-[#d90429] font-black text-xl">V</span>
              </div>
              <span className="text-xl font-black tracking-tighter">VOICE OF BD</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mono">
              A documentary archive and sovereign movement dedicated to protecting the 2024 Revolution and resisting foreign aggression.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black tracking-widest text-white mb-10 uppercase border-b border-[#d90429] pb-4 inline-block">The Archive</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-500 hover:text-[#d90429] transition-colors text-sm font-bold uppercase">Our Manifesto</Link></li>
              <li><Link to="/news" className="text-slate-500 hover:text-[#d90429] transition-colors text-sm font-bold uppercase">Declassified Reports</Link></li>
              <li><Link to="/join" className="text-slate-500 hover:text-[#d90429] transition-colors text-sm font-bold uppercase">Volunteer Registration</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black tracking-widest text-white mb-10 uppercase border-b border-[#006a4e] pb-4 inline-block">Directives</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#d90429]"></div> Anti-Aggression Policy</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#d90429]"></div> Water Rights Restoration</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#d90429]"></div> Border Protection Act</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black tracking-widest text-white mb-10 uppercase border-b border-white pb-4 inline-block">Contact Cell</h4>
            <ul className="space-y-6">
              <li className="flex items-center text-slate-500 text-sm mono">
                <MapPin className="w-5 h-5 mr-3 text-[#d90429]" />
                Dhaka Central HQ
              </li>
              <li className="flex items-center text-slate-500 text-sm mono">
                <Mail className="w-5 h-5 mr-3 text-[#d90429]" />
                intel@voiceofbd.org
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-xs mono">© 2024-2025 VOICE OF BANGLADESH. AUTHORIZED FOR PUBLIC DISSEMINATION.</p>
          <div className="flex gap-10">
             <AlertCircle className="w-5 h-5 text-[#d90429]" />
             <span className="text-[10px] font-black tracking-widest text-[#d90429] animate-pulse">SYSTEMS ONLINE / SOVEREIGNTY SECURED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/news" element={<News />} />
            <Route path="/join" element={<Join />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
