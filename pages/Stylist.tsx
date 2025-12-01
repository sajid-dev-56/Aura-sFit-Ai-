import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Upload, Camera, Loader2, Download, RefreshCw, Share2, Info, User, Briefcase, Heart, Smile, Sun, Sparkles } from 'lucide-react';
import { AnalysisResult, Gender, Occasion, Outfit } from '../types';
import { analyzeImage } from '../services/geminiService';

interface ColorSwatchProps {
  color?: string;
  name: string;
  hex: string;
  reason?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, hex, reason }) => (
  <div className="group relative flex flex-col items-center gap-2">
    <div 
      className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-2 border-white dark:border-stone-700 transition-transform transform group-hover:scale-110"
      style={{ backgroundColor: hex }}
    />
    <span className="text-xs font-medium text-stone-700 dark:text-stone-300 text-center max-w-[80px] leading-tight">{name}</span>
    {reason && (
      <div className="absolute bottom-full mb-2 hidden group-hover:block w-32 bg-stone-800 text-white text-xs p-2 rounded z-10 text-center shadow-lg">
        {reason}
      </div>
    )}
  </div>
);

interface OutfitCardProps {
  outfit: Outfit;
  type: string;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, type }) => (
  <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 flex-shrink-0 w-80 snap-center transition-colors">
    <div className="flex justify-between items-start mb-3">
      <span className="text-xs font-bold tracking-wider text-champagne-600 dark:text-champagne-400 uppercase">{type}</span>
    </div>
    <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">{outfit.title}</h4>
    <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed line-clamp-3">{outfit.description}</p>
    
    <div className="space-y-3">
      <div>
         <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-1">Key Items:</p>
         <div className="flex flex-wrap gap-2">
           {outfit.items.map((item: string, idx: number) => (
             <span key={idx} className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs px-2 py-1 rounded-md">{item}</span>
           ))}
         </div>
      </div>
      <div>
         <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-1">Color Palette:</p>
         <div className="flex gap-1">
           {outfit.colorTheme.map((c: string, idx: number) => (
             <div key={idx} className="w-4 h-4 rounded-full border border-stone-200 dark:border-stone-700" style={{backgroundColor: c}} title={c}></div>
           ))}
         </div>
      </div>
    </div>
  </div>
);

export const Stylist: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [gender, setGender] = useState<Gender>(Gender.Female);
  const [occasion, setOccasion] = useState<Occasion>(Occasion.Casual);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size too large. Please upload an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setStep('analyzing');
    setError(null);
    
    try {
      const result = await analyzeImage(selectedImage, gender, occasion);
      setAnalysis(result);
      setStep('result');
    } catch (err) {
      setError("We couldn't analyze that image. Please try a clearer photo.");
      setStep('upload');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setSelectedImage(null);
    setAnalysis(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-champagne-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* State: Upload */}
        {step === 'upload' && (
          <div className="animate-slide-up max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">Start Your Transformation</h1>
              <p className="text-stone-600 dark:text-stone-400">Upload a clear photo of your face in natural lighting for the best results.</p>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100 dark:border-stone-800 transition-colors">
              {/* Preferences */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">I identify as</label>
                  <div className="grid grid-cols-1 gap-2">
                     {Object.values(Gender).map((g) => (
                       <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left flex items-center justify-between ${
                          gender === g 
                            ? 'border-champagne-500 bg-champagne-50 dark:bg-champagne-900/20 text-stone-900 dark:text-champagne-100' 
                            : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-champagne-300'
                        }`}
                       >
                         {g}
                         {gender === g && <div className="w-2 h-2 rounded-full bg-champagne-500" />}
                       </button>
                     ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Styling Occasion</label>
                  <select 
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value as Occasion)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-champagne-500 focus:outline-none"
                  >
                    {Object.values(Occasion).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <div className="mt-4 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
                    <p className="text-xs text-stone-500 dark:text-stone-400 flex gap-2">
                      <Info size={16} className="flex-shrink-0" />
                      We'll tailor outfit suggestions specifically for {occasion.toLowerCase()} settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {!selectedImage ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-champagne-300 dark:border-stone-700 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-champagne-50/50 dark:hover:bg-stone-800/50 transition-colors gap-4"
                  >
                    <div className="w-16 h-16 bg-champagne-100 dark:bg-stone-800 text-champagne-600 dark:text-champagne-400 rounded-full flex items-center justify-center">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-stone-800 dark:text-stone-200">Click to upload photo</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden h-96 w-full shadow-inner bg-black">
                     <img src={selectedImage} alt="Preview" className="w-full h-full object-contain opacity-90" />
                     <button 
                       onClick={() => setSelectedImage(null)}
                       className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur-sm"
                     >
                       <RefreshCw size={20} />
                     </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <Info size={16} /> {error}
                </div>
              )}

              <div className="mt-8">
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleAnalyze} 
                  disabled={!selectedImage}
                >
                  Analyze My Style
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* State: Analyzing */}
        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-stone-200 dark:border-stone-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-champagne-500 rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-champagne-500 animate-pulse" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mb-2">Analyzing your unique features...</h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-md">Our AI is detecting your undertones, face shape, and calculating the perfect palette.</p>
          </div>
        )}

        {/* State: Result */}
        {step === 'result' && analysis && (
          <div className="animate-fade-in space-y-8">
            
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 no-print transition-colors">
               <div className="mb-4 md:mb-0">
                 <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">Your Style Profile</h2>
                 <p className="text-stone-500 dark:text-stone-400 text-sm">Generated for {occasion} • {new Date().toLocaleDateString()}</p>
               </div>
               <div className="flex gap-3">
                 <Button variant="outline" size="sm" onClick={handleReset}>Try New Photo</Button>
                 <Button variant="secondary" size="sm" onClick={handlePrint} className="flex gap-2">
                   <Download size={18} /> Lookbook
                 </Button>
               </div>
            </div>

            {/* Core Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Col: Photo + Stats */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white dark:bg-stone-900 p-2 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-800">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                    <img src={selectedImage!} alt="User" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                      <p className="font-serif text-2xl font-bold">{analysis.season}</p>
                      <p className="text-sm opacity-90">{analysis.skinTone} skin • {analysis.undertone} undertone</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                   <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2 text-stone-900 dark:text-white">
                     <Smile size={20} className="text-champagne-600 dark:text-champagne-400"/> Face Shape
                   </h3>
                   <div className="p-4 bg-champagne-50 dark:bg-stone-800 rounded-xl mb-4">
                     <p className="text-center font-medium text-lg text-stone-800 dark:text-champagne-100">{analysis.faceShape}</p>
                   </div>
                   <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                     Your {analysis.faceShape.toLowerCase()} face shape works perfectly with:
                   </p>
                   <ul className="mt-3 space-y-2 text-sm text-stone-600 dark:text-stone-400">
                     <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-stone-400 mt-2"></div> {analysis.accessories.eyewear}</li>
                     <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-stone-400 mt-2"></div> {analysis.accessories.jewelry}</li>
                   </ul>
                </div>
              </div>

              {/* Right Col: Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Colors */}
                <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">Your Power Palette</h3>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Best Colors</span>
                  </div>
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    {analysis.bestColors.map((c, i) => (
                      <ColorSwatch key={i} {...c} />
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-stone-100 dark:border-stone-800">
                    <h4 className="font-medium text-stone-900 dark:text-white mb-2 text-sm">Color Psychology</h4>
                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{analysis.colorPsychology}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-xs font-bold text-stone-500 dark:text-stone-500 uppercase mb-3">Colors to Avoid</p>
                    <div className="flex flex-wrap gap-3">
                      {analysis.worstColors.map((c, i) => (
                         <div key={i} className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 opacity-60 grayscale">
                           <div className="w-4 h-4 rounded-full" style={{backgroundColor: c.hex}}></div>
                           <span className="text-xs text-stone-500 dark:text-stone-400 line-through">{c.name}</span>
                         </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outfits Carousel */}
                <div className="space-y-6">
                   <h3 className="font-serif text-2xl font-bold ml-2 text-stone-900 dark:text-white">Curated Outfits</h3>
                   
                   {/* Western */}
                   <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide flex gap-4 snap-x">
                      {analysis.outfits.western.map((outfit, i) => (
                        <OutfitCard key={i} outfit={outfit} type="Western Wear" />
                      ))}
                   </div>

                   {/* Eastern */}
                   <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide flex gap-4 snap-x">
                      {analysis.outfits.eastern.map((outfit, i) => (
                        <OutfitCard key={i} outfit={outfit} type="Eastern / Desi Wear" />
                      ))}
                   </div>
                </div>

                {/* Grooming */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                    <h3 className="font-serif text-lg font-bold mb-4 text-stone-900 dark:text-white">Hair & Grooming</h3>
                    <div className="space-y-4">
                       {analysis.hairSuggestions.map((h, i) => (
                         <div key={i} className="pb-3 border-b border-stone-50 dark:border-stone-800 last:border-0 last:pb-0">
                           <p className="font-medium text-stone-900 dark:text-stone-200">{h.style}</p>
                           <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{h.description}</p>
                           <p className="text-xs text-champagne-600 dark:text-champagne-400 mt-1 font-medium">Try: {h.color}</p>
                         </div>
                       ))}
                       {analysis.beard && (
                         <div className="pt-2 bg-stone-50 dark:bg-stone-800 p-3 rounded-xl mt-2">
                           <p className="text-xs font-bold uppercase text-stone-400 mb-1">Beard</p>
                           <p className="font-medium text-stone-900 dark:text-stone-200">{analysis.beard.style}</p>
                           <p className="text-xs text-stone-500 dark:text-stone-400">{analysis.beard.description}</p>
                         </div>
                       )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                    <h3 className="font-serif text-lg font-bold mb-4 text-stone-900 dark:text-white">Makeup & Details</h3>
                    {analysis.makeup ? (
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="text-sm text-stone-600 dark:text-stone-400">Foundation Base</span>
                          <span className="text-sm font-medium text-stone-900 dark:text-stone-200 text-right">{analysis.makeup.foundation}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm text-stone-600 dark:text-stone-400">Lip Color</span>
                          <span className="text-sm font-medium text-stone-900 dark:text-stone-200 text-right">{analysis.makeup.lipColor}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm text-stone-600 dark:text-stone-400">Eye Shadow</span>
                          <span className="text-sm font-medium text-stone-900 dark:text-stone-200 text-right">{analysis.makeup.eyeShadow}</span>
                        </li>
                      </ul>
                    ) : (
                      <p className="text-sm text-stone-500 dark:text-stone-500 italic">Makeup suggestions not applicable.</p>
                    )}
                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                      <p className="text-sm font-medium mb-2 text-stone-900 dark:text-stone-200">Styling Note</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 italic">"{analysis.accessories.other}"</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Import for Icon that wasn't used but might be needed */}
      <div className="hidden"><User /></div>
    </div>
  );
};