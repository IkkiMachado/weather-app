import React from 'react';
import { Star, MapPin } from 'lucide-react';

const DEFAULT_POPULAR_CITIES = [
  { name: 'São Paulo', admin1: 'SP', country: 'Brasil', latitude: -23.5475, longitude: -46.6361 },
  { name: 'Rio de Janeiro', admin1: 'RJ', country: 'Brasil', latitude: -22.9064, longitude: -43.1822 },
  { name: 'Brasília', admin1: 'DF', country: 'Brasil', latitude: -15.7797, longitude: -47.9297 },
  { name: 'Curitiba', admin1: 'PR', country: 'Brasil', latitude: -25.4284, longitude: -49.2733 },
  { name: 'Salvador', admin1: 'BA', country: 'Brasil', latitude: -12.9714, longitude: -38.5014 },
  { name: 'Lisboa', admin1: 'Lisboa', country: 'Portugal', latitude: 38.7167, longitude: -9.139 },
  { name: 'Nova York', admin1: 'NY', country: 'EUA', latitude: 40.7128, longitude: -74.006 },
  { name: 'Londres', admin1: 'Inglaterra', country: 'Reino Unido', latitude: 51.5085, longitude: -0.1257 },
  { name: 'Tóquio', admin1: 'Tóquio', country: 'Japão', latitude: 35.6895, longitude: 139.6917 },
];

export default function QuickCities({
  currentCity,
  onSelectCity,
  favorites = [],
  onToggleFavorite,
}) {
  const isCurrentFavorite = favorites.some(
    (f) =>
      Math.abs(f.latitude - currentCity.latitude) < 0.05 &&
      Math.abs(f.longitude - currentCity.longitude) < 0.05
  );

  return (
    <div className="relative z-20 flex items-center justify-between gap-3 py-2">
      {/* Scrollable chip list */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {/* Favorite indicator for current city */}
        <button
          type="button"
          onClick={() => onToggleFavorite(currentCity)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition active:scale-95 shadow-sm ${
            isCurrentFavorite
              ? 'bg-amber-400/25 border-amber-300/40 text-amber-200 hover:bg-amber-400/35'
              : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
          }`}
          title={isCurrentFavorite ? 'Remover dos favoritos' : 'Salvar como favorito'}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              isCurrentFavorite ? 'fill-amber-300 text-amber-300' : 'text-white/70'
            }`}
          />
          <span>{isCurrentFavorite ? 'Favorito' : 'Favoritar'}</span>
        </button>

        {/* Saved favorites if any */}
        {favorites.map((fav) => {
          const isActive =
            Math.abs(fav.latitude - currentCity.latitude) < 0.05 &&
            Math.abs(fav.longitude - currentCity.longitude) < 0.05;

          return (
            <button
              key={`fav-${fav.latitude}-${fav.longitude}`}
              type="button"
              onClick={() => onSelectCity(fav)}
              className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition active:scale-95 ${
                isActive
                  ? 'bg-amber-400/30 border-amber-300 text-white shadow-md'
                  : 'bg-amber-500/15 border-amber-400/30 text-amber-100 hover:bg-amber-500/25'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>{fav.name}</span>
            </button>
          );
        })}

        {/* Separator if favorites exist */}
        {favorites.length > 0 && (
          <div className="h-4 w-[1px] bg-white/25 shrink-0 mx-1" />
        )}

        {/* Default popular cities */}
        {DEFAULT_POPULAR_CITIES.map((city) => {
          const isActive =
            Math.abs(city.latitude - currentCity.latitude) < 0.05 &&
            Math.abs(city.longitude - currentCity.longitude) < 0.05;

          return (
            <button
              key={`pop-${city.latitude}-${city.longitude}`}
              type="button"
              onClick={() => onSelectCity(city)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md border transition active:scale-95 ${
                isActive
                  ? 'bg-white text-slate-900 border-white shadow-lg font-bold scale-105'
                  : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <MapPin className="w-3 h-3 opacity-60" />
              <span>{city.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
