import React from 'react';
import { Button } from '../components/Button';
import { Check, X } from 'lucide-react';

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for a quick check.",
      features: ["Basic Seasonal Analysis", "Top 3 Best Colors", "1 Outfit Suggestion", "Standard Support"],
      button: "Start Free",
      variant: "outline"
    },
    {
      name: "Pro Style",
      price: "$19",
      period: "/month",
      desc: "For the fashion conscious.",
      features: ["Full 12-Season Analysis", "Complete Color Palette", "Unlimited Outfit Combos", "Hair & Makeup Guide", "Lookbook PDF Download"],
      popular: true,
      button: "Get Pro",
      variant: "secondary"
    },
    {
      name: "Elite",
      price: "$49",
      period: "/month",
      desc: "Total wardrobe overhaul.",
      features: ["Everything in Pro", "Personal Shopper Links", "Closet Audit AI", "Priority Processing", "1-on-1 Chat with Human Stylist"],
      button: "Go Elite",
      variant: "primary"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-stone-50 dark:bg-stone-950 animate-fade-in transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-stone-900 dark:text-white mb-4">Invest in Your Image</h1>
          <p className="text-stone-600 dark:text-stone-400 text-lg">Choose the plan that fits your style journey.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative rounded-3xl p-8 bg-white dark:bg-stone-900 border transition-all duration-300 hover:shadow-xl ${
                tier.popular 
                  ? 'border-champagne-500 shadow-lg scale-105 z-10' 
                  : 'border-stone-100 dark:border-stone-800 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-champagne-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">{tier.name}</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-2 mb-6">{tier.desc}</p>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-stone-900 dark:text-white">{tier.price}</span>
                {tier.period && <span className="text-stone-500 dark:text-stone-500 ml-1">{tier.period}</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                      <Check size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.variant as any} 
                className="w-full"
              >
                {tier.button}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};