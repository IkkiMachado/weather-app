import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from 'lucide-react';

export const WMO_CODES = {
  0: {
    description: 'Céu limpo',
    dayIcon: Sun,
    nightIcon: Moon,
    category: 'clear',
  },
  1: {
    description: 'Predominantemente limpo',
    dayIcon: Sun,
    nightIcon: Moon,
    category: 'clear',
  },
  2: {
    description: 'Parcialmente nublado',
    dayIcon: CloudSun,
    nightIcon: CloudMoon,
    category: 'cloudy',
  },
  3: {
    description: 'Nublado / Encoberto',
    dayIcon: Cloud,
    nightIcon: Cloud,
    category: 'cloudy',
  },
  45: {
    description: 'Neblina',
    dayIcon: CloudFog,
    nightIcon: CloudFog,
    category: 'fog',
  },
  48: {
    description: 'Névoa com formação de geada',
    dayIcon: CloudFog,
    nightIcon: CloudFog,
    category: 'fog',
  },
  51: {
    description: 'Garoa leve',
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
    category: 'rain',
  },
  53: {
    description: 'Garoa moderada',
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
    category: 'rain',
  },
  55: {
    description: 'Garoa densa',
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
    category: 'rain',
  },
  56: {
    description: 'Garoa congelante leve',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  57: {
    description: 'Garoa congelante densa',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  61: {
    description: 'Chuva leve',
    dayIcon: CloudRain,
    nightIcon: CloudRain,
    category: 'rain',
  },
  63: {
    description: 'Chuva moderada',
    dayIcon: CloudRain,
    nightIcon: CloudRain,
    category: 'rain',
  },
  65: {
    description: 'Chuva forte',
    dayIcon: CloudRain,
    nightIcon: CloudRain,
    category: 'rain',
  },
  66: {
    description: 'Chuva congelante leve',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  67: {
    description: 'Chuva congelante forte',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  71: {
    description: 'Neve leve',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  73: {
    description: 'Neve moderada',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  75: {
    description: 'Neve forte',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  77: {
    description: 'Granizo miúdo',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  80: {
    description: 'Pancadas de chuva leve',
    dayIcon: CloudRain,
    nightIcon: CloudRain,
    category: 'rain',
  },
  81: {
    description: 'Pancadas de chuva moderada',
    dayIcon: CloudRain,
    nightIcon: CloudRain,
    category: 'rain',
  },
  82: {
    description: 'Tempestade de chuva violenta',
    dayIcon: CloudRain,
    nightIcon: CloudRain,
    category: 'rain',
  },
  85: {
    description: 'Pancadas de neve leve',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  86: {
    description: 'Pancadas de neve forte',
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
    category: 'snow',
  },
  95: {
    description: 'Tempestade com trovões',
    dayIcon: CloudLightning,
    nightIcon: CloudLightning,
    category: 'thunder',
  },
  96: {
    description: 'Tempestade com granizo leve',
    dayIcon: CloudLightning,
    nightIcon: CloudLightning,
    category: 'thunder',
  },
  99: {
    description: 'Tempestade com granizo forte',
    dayIcon: CloudLightning,
    nightIcon: CloudLightning,
    category: 'thunder',
  },
};

export function getWeatherDetails(code, isDay = 1) {
  const weather = WMO_CODES[code] || {
    description: 'Condição desconhecida',
    dayIcon: isDay ? Sun : Moon,
    nightIcon: isDay ? Sun : Moon,
    category: 'clear',
  };

  const IconComponent = isDay ? weather.dayIcon : weather.nightIcon;

  // Background and theme setups for each atmosphere
  const themes = {
    clear: isDay
      ? {
          gradient: 'from-amber-500 via-sky-500 to-blue-600',
          cardBg: 'bg-white/20',
          accent: 'text-amber-300',
          tag: 'Dia Ensolarado',
          status: 'clear-day',
        }
      : {
          gradient: 'from-indigo-950 via-slate-900 to-blue-950',
          cardBg: 'bg-indigo-950/40',
          accent: 'text-indigo-300',
          tag: 'Noite Estrelada',
          status: 'clear-night',
        },
    cloudy: isDay
      ? {
          gradient: 'from-slate-500 via-sky-600 to-indigo-700',
          cardBg: 'bg-slate-900/30',
          accent: 'text-sky-200',
          tag: 'Nublado',
          status: 'cloudy-day',
        }
      : {
          gradient: 'from-slate-950 via-zinc-900 to-slate-900',
          cardBg: 'bg-black/40',
          accent: 'text-slate-300',
          tag: 'Noite Nublada',
          status: 'cloudy-night',
        },
    rain: {
      gradient: 'from-sky-900 via-blue-950 to-slate-950',
      cardBg: 'bg-sky-950/40',
      accent: 'text-cyan-300',
      tag: 'Chuvoso',
      status: 'rain',
    },
    thunder: {
      gradient: 'from-purple-950 via-slate-950 to-indigo-950',
      cardBg: 'bg-purple-950/40',
      accent: 'text-amber-400',
      tag: 'Tempestade',
      status: 'thunder',
    },
    snow: {
      gradient: 'from-slate-300 via-sky-400 to-blue-900',
      cardBg: 'bg-white/30',
      accent: 'text-cyan-100',
      tag: 'Nevando',
      status: 'snow',
    },
    fog: {
      gradient: 'from-stone-600 via-slate-700 to-zinc-900',
      cardBg: 'bg-zinc-800/40',
      accent: 'text-stone-300',
      tag: 'Neblina',
      status: 'fog',
    },
  };

  const currentTheme = themes[weather.category] || themes.clear;

  return {
    description: weather.description,
    Icon: IconComponent,
    category: weather.category,
    theme: currentTheme,
  };
}
