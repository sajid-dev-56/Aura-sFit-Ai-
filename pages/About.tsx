import React from 'react';
import { Page } from '../types';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in dark:bg-stone-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-stone-900 dark:text-white mb-6">Our Story</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
            Aura'sFit was born from a simple belief: <br/>Everyone deserves to look and feel their best, effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
             <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop" alt="Fashion Design" className="rounded-2xl shadow-xl w-full" />
             <div className="absolute -bottom-6 -right-6 bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg max-w-xs hidden md:block border border-stone-100 dark:border-stone-700">
               <p className="font-serif text-xl italic text-stone-800 dark:text-stone-200">"Fashion is the armor to survive the reality of everyday life."</p>
             </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">The Intersection of AI & Art</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Traditional personal styling has always been a luxury service, costing hundreds or thousands of dollars. We asked ourselves: could we democratize this expertise using artificial intelligence?
            </p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Our team of fashion experts and computer vision engineers spent two years training our models on thousands of faces, skin tones, and style profiles. The result is Aura'sFit - an intelligent stylist that understands the nuance of human aesthetics.
            </p>
          </div>
        </div>

        <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-3xl p-12 mb-20">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
             <div>
               <div className="text-champagne-500 font-bold text-5xl mb-4">01</div>
               <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
               <p className="text-stone-400 text-sm">Trained on diverse datasets to accurately style every skin tone and ethnicity.</p>
             </div>
             <div>
               <div className="text-champagne-500 font-bold text-5xl mb-4">02</div>
               <h3 className="text-xl font-bold mb-2">Accuracy</h3>
               <p className="text-stone-400 text-sm">Moving beyond basic quizzes to deep visual analysis for true personalization.</p>
             </div>
             <div>
               <div className="text-champagne-500 font-bold text-5xl mb-4">03</div>
               <h3 className="text-xl font-bold mb-2">Empowerment</h3>
               <p className="text-stone-400 text-sm">Giving you the confidence to wear colors you never thought you could.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};