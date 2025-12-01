import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Stylist } from './pages/Stylist';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Page } from './types';
import { MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme based on system preference or default
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Update HTML class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setPage={setCurrentPage} />;
      case 'stylist': return <Stylist />;
      case 'about': return <About />;
      case 'pricing': return <Pricing />;
      case 'contact': return <Contact />;
      default: return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Navbar 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />

      {/* Floating Chat Widget Placeholder */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button className="w-14 h-14 bg-stone-900 dark:bg-champagne-500 text-white dark:text-stone-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform hover:bg-champagne-500 dark:hover:bg-champagne-400">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;