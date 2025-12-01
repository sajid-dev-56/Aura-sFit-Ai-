import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Star, CheckCircle, Smartphone, Sparkles, Zap, Aperture, Activity, Shield } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  setPage: (page: Page) => void;
}

// Iron Man / Stark Tech Hologram Component
const HologramCard = ({ onClick }: { onClick: () => void }) => {
  const [currentPose, setCurrentPose] = useState(0);

  // Futuristic/Robotic fashion images to simulate Iron Man suits
  const poses = [
    "https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?q=80&w=600&auto=format&fit=crop", // Tech Suit Face
    "https://images.unsplash.com/photo-1535378437321-6a8fd74f9c0d?q=80&w=600&auto=format&fit=crop", // Full Body Robot
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop"  // VR/Cyberpunk
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPose((prev) => (prev + 1) % poses.length);
    }, 4000); // Change pose every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[340px] animate-float z-30" style={{ animationDelay: '0.5s' }}>
      {/* Glow Effects */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-champagne-500 to-red-500 opacity-30 blur-xl rounded-full animate-pulse"></div>

      {/* Main Glass Container */}
      <div className="relative bg-stone-900/90 backdrop-blur-xl border border-champagne-500/40 p-5 rounded-2xl shadow-[0_0_40px_-10px_rgba(203,175,115,0.5)] overflow-hidden">
        
        {/* Holographic Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent animate-scan pointer-events-none z-10 h-[200%]"></div>

        {/* HUD Header */}
        <div className="flex justify-between items-center mb-4 border-b border-champagne-500/20 pb-2 relative z-20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">J.A.R.V.I.S. SYSTEM ACTIVE</span>
          </div>
          <Aperture size={14} className="text-champagne-500 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        {/* Visualizer Area (The "Poses") */}
        <div className="relative h-64 mb-4 rounded-lg overflow-hidden border border-champagne-500/20 bg-black/50 group cursor-pointer" onClick={onClick}>
           {/* Image Carousel */}
           {poses.map((src, idx) => (
              <img 
                  key={idx}
                  src={src} 
                  alt={`Suit Mark ${idx + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform ${
                    idx === currentPose ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                  style={{ filter: 'contrast(1.2) sepia(0.2)' }}
              />
           ))}

           {/* Overlay UI elements inside image */}
           <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
             <div className="bg-black/60 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-400 border border-cyan-500/30">
               MK-{42 + currentPose}
             </div>
             <div className="bg-black/60 px-2 py-0.5 rounded text-[8px] font-mono text-red-400 border border-red-500/30">
               ARMOR: 100%
             </div>
           </div>

           {/* Floating Interaction Points */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-500/20 rounded-full flex items-center justify-center animate-spin" style={{animationDuration: '20s'}}>
             <div className="w-28 h-28 border border-white/10 rounded-full"></div>
           </div>
        </div>

        {/* Message Box */}
        <div className="bg-stone-800/80 rounded-lg p-3 border-l-2 border-champagne-500 relative z-20">
          <div className="flex items-center gap-2 mb-1">
             <Shield size={12} className="text-champagne-500" />
             <span className="text-[10px] font-bold text-stone-400 uppercase">Styling Protocol</span>
          </div>
          <p className="text-sm text-stone-200 font-serif leading-relaxed">
            "Welcome back. I've analyzed today's trends. The <span className="text-cyan-300 font-semibold">Stark Matte-Black</span> aesthetic is currently optimal for your profile."
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onClick}
          className="w-full mt-3 bg-gradient-to-r from-stone-800 to-stone-900 border border-champagne-500/30 rounded py-2 flex items-center justify-center gap-2 text-xs font-mono text-champagne-400 hover:text-white hover:border-champagne-500 transition-all group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            INITIALIZE MAKEOVER <ArrowRight size={12} />
          </span>
          <div className="absolute inset-0 bg-champagne-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </button>

      </div>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-champagne-100 to-transparent dark:from-stone-900 -z-10 transition-colors duration-300" />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-champagne-200/30 dark:bg-champagne-900/10 rounded-full blur-3xl -z-10 animate-float" />
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up relative z-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-champagne-100 dark:bg-stone-800 text-champagne-800 dark:text-champagne-300 text-sm font-medium tracking-wide border border-champagne-200 dark:border-stone-700">
              ✨ The #1 AI Personal Stylist
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] text-stone-900 dark:text-white">
              Find Your <br/>
              <span className="text-champagne-600 dark:text-champagne-400 italic">Perfect Colors</span>. <br/>
              Instantly.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-lg leading-relaxed">
              Upload one photo and let our AI analyze your skin tone, face shape, and undertones to curate your personal lookbook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setPage('stylist')}>
                Start Analysis <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setPage('about')}>
                How it Works
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/40/40?random=${i}`} alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-800 object-cover" />
                ))}
              </div>
              <div className="text-sm font-medium text-stone-600 dark:text-stone-400">
                <span className="text-stone-900 dark:text-white font-bold">10k+</span> styles generated today.
              </div>
            </div>
          </div>

          <div className="relative h-[600px] hidden md:block animate-fade-in delay-200 z-10">
             {/* Main Hero Image Composition */}
             <div className="absolute inset-0 flex justify-center items-center">
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Fashion Model" 
                    className="absolute right-0 top-10 w-3/4 h-[90%] object-cover rounded-t-[100px] rounded-b-[40px] shadow-2xl z-10"
                  />
                  
                  {/* Iron Man Hologram Assistant - Replaces previous card */}
                  <div className="absolute -left-12 bottom-24 z-30 scale-90 lg:scale-100">
                    <HologramCard onClick={() => setPage('stylist')} />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute right-10 top-20 w-20 h-20 border-r-2 border-t-2 border-champagne-400 rounded-tr-3xl z-20 opacity-50"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-stone-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4 text-stone-900 dark:text-white">Science Meets Style</h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg">We don't just guess. Aura'sFit uses advanced computer vision to map 120+ facial landmarks and analyze pigmentation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Color Analysis", desc: "Discover your seasonal palette (Spring, Summer, Autumn, Winter) and your best power colors.", icon: "🎨" },
              { title: "Face Shape Mapping", desc: "Identify your exact face shape to find the perfect sunglasses, jewelry, and hairstyles.", icon: "📐" },
              { title: "Global Wardrobe", desc: "Get curated recommendations for both Western and Eastern/Pakistani fashion styles.", icon: "🌏" }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-stone-50 dark:bg-stone-800 hover:bg-champagne-50 dark:hover:bg-stone-700 transition-colors duration-300 border border-transparent hover:border-champagne-200 dark:hover:border-stone-600">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-3 text-stone-900 dark:text-white">{feature.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-900 dark:bg-black text-white overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">Loved by 50,000+ Users</h2>
          <div className="flex flex-wrap md:flex-nowrap gap-6 justify-center">
            {[
              { name: "Sarah M.", role: "Fashion Blogger", text: "I always thought I was a Winter, but Aura'sFit showed me I'm actually a Deep Autumn. Changed my entire wardrobe!", img: "https://picsum.photos/100/100?random=10" },
              { name: "Amina K.", role: "Architect", text: "Finally an app that understands ethnic wear! The Pakistani outfit suggestions were spot on for my cousin's wedding.", img: "https://picsum.photos/100/100?random=11" },
              { name: "Jason T.", role: "Marketing Director", text: "Simple, fast, and surprisingly accurate. The beard style suggestions were a nice bonus.", img: "https://picsum.photos/100/100?random=12" },
            ].map((t, i) => (
              <div key={i} className="glass-card bg-white/10 border-white/10 p-8 rounded-2xl max-w-sm">
                <div className="flex gap-1 mb-4 text-champagne-400">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
                <p className="text-stone-300 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-stone-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-champagne-400 to-champagne-600 dark:from-stone-800 dark:to-stone-900 text-center transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Look?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Join thousands of others who have discovered their true style potential with Aura'sFit AI.</p>
          <Button variant="glass" size="lg" className="bg-white text-champagne-800 border-none hover:bg-stone-100 dark:text-stone-900" onClick={() => setPage('stylist')}>
            Try Aura'sFit For Free
          </Button>
        </div>
      </section>
    </div>
  );
};