import React from 'react';
import { Heart, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 py-8 px-4 text-center text-white/60 text-xs">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span className="flex items-center gap-1">
          Feito com <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" /> usando React & Tailwind CSS
        </span>
        <span className="hidden sm:inline">•</span>
        <a
          href="https://open-meteo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-white transition underline underline-offset-2"
        >
          <Globe className="w-3.5 h-3.5" />
          Dados por Open-Meteo API (Sem custos / Open Source)
        </a>
      </div>
    </footer>
  );
}
