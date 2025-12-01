import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in dark:bg-stone-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-stone-900 rounded-3xl shadow-xl overflow-hidden border border-stone-100 dark:border-stone-800">
          
          <div className="p-12 bg-stone-900 dark:bg-black text-white flex flex-col justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-6">Get in Touch</h1>
              <p className="text-stone-400 mb-12">Have questions about the AI analysis or partnership inquiries? We're here to help.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-800 dark:bg-stone-900 flex items-center justify-center text-champagne-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold">Email</p>
                    <p>support@aurasfit.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-800 dark:bg-stone-900 flex items-center justify-center text-champagne-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold">Office</p>
                    <p>101 Fashion Ave, New York, NY</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-0">
               <div className="w-full h-48 bg-stone-800 dark:bg-stone-900 rounded-xl overflow-hidden opacity-50 relative">
                 {/* Map Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-xs">
                   [Interactive Map Placeholder]
                 </div>
               </div>
            </div>
          </div>

          <div className="p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-champagne-500" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-champagne-500" placeholder="jane@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-champagne-500" placeholder="How can we help?" required></textarea>
              </div>
              <Button type="submit" className="w-full" disabled={sent}>
                {sent ? "Message Sent!" : "Send Message"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};