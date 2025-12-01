export type Page = 'home' | 'stylist' | 'about' | 'pricing' | 'contact';

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  NonBinary = 'Non-Binary'
}

export enum Occasion {
  Casual = 'Casual',
  Office = 'Office',
  Party = 'Party',
  Wedding = 'Wedding',
  Travel = 'Travel'
}

export interface Color {
  name: string;
  hex: string;
  reason?: string;
}

export interface Outfit {
  title: string;
  description: string;
  items: string[];
  colorTheme: string[];
}

export interface AnalysisResult {
  skinTone: string;
  undertone: string;
  faceShape: string;
  season: string;
  colorPsychology: string;
  bestColors: Color[];
  worstColors: Color[];
  hairSuggestions: {
    style: string;
    color: string;
    description: string;
  }[];
  accessories: {
    jewelry: string;
    eyewear: string;
    other: string;
  };
  outfits: {
    western: Outfit[];
    eastern: Outfit[]; // Pakistan/Desi wear
  };
  makeup?: {
    foundation: string;
    lipColor: string;
    eyeShadow: string;
  };
  beard?: {
    style: string;
    description: string;
  };
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}