import React from 'react';
import { Sparkles, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 no-print">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="text-champagne-400" size={24} />
              <span className="font-serif text-2xl font-bold">Aura'sFit</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              The world's most advanced AI stylist. Discover your perfect colors, cuts, and styles instantly using computer vision technology.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-champagne-400 transition-colors">AI Color Analysis</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Face Shape Finder</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Wardrobe Planner</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Eastern Collection</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-champagne-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-champagne-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-champagne-500 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-champagne-500 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-400 mt-4">
              <Mail size={16} />
              <span>hello@aurasfit.ai</span>
            </div>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>© 2024 Aura'sFit AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};