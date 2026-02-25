import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Search, Heart, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '#properties' },
    { name: 'Featured', href: '#' },
    { name: 'Calculator', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-6',
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 py-4 mt-0' : 'bg-transparent py-8'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/30">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className={cn('text-2xl font-black tracking-tighter transition-colors', isScrolled ? 'text-slate-900' : 'text-white')}>
            LUX<span className="text-blue-500">ESTATE</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-bold transition-all hover:text-blue-500 flex items-center gap-1 group',
                isScrolled ? 'text-slate-600' : 'text-slate-100'
              )}
            >
              {link.name}
              {link.name === 'Properties' && <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button className={cn('p-3 rounded-2xl transition-all', isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10')}>
            <Search className="w-5 h-5" />
          </button>
          <button className={cn('p-3 rounded-2xl transition-all', isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10')}>
            <Heart className="w-5 h-5" />
          </button>
          <div className="w-px h-8 bg-slate-200/20 mx-2" />
          <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className={cn('p-2.5 rounded-xl transition-all', isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white backdrop-blur-md')}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 bg-white rounded-3xl mt-4 border border-slate-100 p-6 lg:hidden shadow-2xl shadow-slate-900/10 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 font-bold py-4 px-4 hover:bg-slate-50 rounded-2xl transition-colors flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronDown className="w-4 h-4 -rotate-90 text-slate-300 group-hover:text-blue-500" />
                </a>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold active:scale-95 transition-transform">
                  <User className="w-5 h-5" /> Account
                </button>
                <button className="bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};