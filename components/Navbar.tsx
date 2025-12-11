import React, { useState, useEffect } from 'react';
import { NAV_LINKS, SectionId, CARAI_LOGO_SRC } from '../constants';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's the home link, we might want to just go to top
    if (href === '/') {
       e.preventDefault();
       if (location.pathname === '/') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
       } else {
         navigate('/');
       }
       setIsOpen(false);
       return;
    }
    // For other links, simple navigation
    setIsOpen(false);
    // Let standard React Router Link handle it unless we need special logic
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        navigate('/');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border-b border-gold-400/20 py-4 shadow-sm dark:shadow-none' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="/" onClick={handleLogoClick} className="relative w-12 h-12 flex items-center justify-center cursor-pointer rounded-xl overflow-hidden border border-gold-400/30 shadow-lg shadow-gold-500/10" aria-label="Carai Agency home">
                {/* lazy-loaded favicon/avatar */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <img
                  loading="lazy"
                  src={CARAI_LOGO_SRC}
                  alt="Carai Agency Logo"
                  className="w-full h-full object-cover"
                />
            </a>
            <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl tracking-widest text-navy-900 dark:text-white">
                  CARAI <span className="text-gradient-gold">AGENCY</span>
                </span>
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-gold-600 dark:text-gold-500 uppercase">
                  Caribbean AI Agency
                </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-label={`Navigate to ${link.label}`}
                  className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                    location.pathname === link.href 
                      ? 'text-gold-500 dark:text-gold-400' 
                      : 'text-navy-700 dark:text-silver-400 hover:text-gold-600 dark:hover:text-gold-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full cursor-pointer text-navy-700 dark:text-silver-400 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-silver-100 dark:hover:bg-white/5 transition-colors focus:outline-none border border-transparent hover:border-gold-400/50"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="-mr-2 flex md:hidden items-center gap-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full cursor-pointer text-navy-700 dark:text-silver-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors focus:outline-none"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-navy-700 dark:text-silver-300 hover:text-navy-900 dark:hover:text-white focus:outline-none hover:bg-silver-100 dark:hover:bg-white/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-navy-900 border-b border-gold-400/20 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-2 rounded-xl text-base font-medium ${
                    location.pathname === link.href
                    ? 'text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-navy-800'
                    : 'text-navy-700 dark:text-silver-300 hover:text-gold-600 dark:hover:text-gold-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;