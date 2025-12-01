import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { Page } from '../types';
import { Button } from './Button';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Pricing', value: 'pricing' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-white/80 dark:bg-stone-950/80 backdrop-blur-lg shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setPage('home')}
        >
          <div className="w-8 h-8 rounded-full bg-champagne-500 flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
            Aura'sFit<span className="text-champagne-600 dark:text-champagne-400">.AI</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setPage(link.value)}
              className={`text-sm font-medium transition-colors hover:text-champagne-600 dark:hover:text-champagne-400 ${
                currentPage === link.value 
                  ? 'text-stone-900 dark:text-white border-b-2 border-champagne-500' 
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setPage('stylist')}
            className="ml-2"
          >
            Launch Stylist
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="text-stone-800 dark:text-white"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="text-stone-800 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 p-6 flex flex-col gap-4 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => {
                setPage(link.value);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium ${
                currentPage === link.value ? 'text-champagne-600 dark:text-champagne-400' : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button 
            variant="primary" 
            onClick={() => {
              setPage('stylist');
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-2"
          >
            Launch Stylist
          </Button>
        </div>
      )}
    </nav>
  );
};