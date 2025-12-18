
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const HeaderBar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${
      isScrolled ? 'glass-blue py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-2 h-8 bg-blue-600 rounded-full group-hover:scale-y-110 transition-transform"></div>
            <span className="text-2xl font-[900] tracking-tighter text-white uppercase group-hover:text-blue-400 transition-colors">
              VIDBANDA
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-1 ${location.pathname === '/' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              Home
              {location.pathname === '/' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>}
            </Link>
            <Link 
              to="/my-list" 
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-1 ${location.pathname === '/my-list' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              My List
              {location.pathname === '/my-list' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>}
            </Link>
          </nav>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative group">
          <input 
            type="text" 
            placeholder="Explore the cinema..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-500 focus:bg-slate-900/80 text-white"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        <div className="flex items-center gap-5">
           <Link to="/my-list" className="hidden sm:flex w-10 h-10 items-center justify-center rounded-2xl glass hover:bg-blue-600/20 hover:border-blue-600/30 transition-all text-slate-400 hover:text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
