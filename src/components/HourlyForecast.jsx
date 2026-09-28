import React, { useRef } from 'react';
import { Clock, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatTemp, formatTime } from '../utils/formatters';
import { getWeatherDetails } from '../constants/weatherCodes';

export default function HourlyForecast({ hourly = [], tempUnit }) {
  const scrollRef = useRef(null);

  if (!hourly || hourly.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-20 w-full">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-white">
        {/* Header with Title and Scroll arrows */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-bold tracking-tight text-white">
              Previsão Hora a Hora (Próximas 24 horas)
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition active:scale-95"
              title="Rolar para esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition active:scale-95"
              title="Rolar para direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal strip */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1"
        >
          {hourly.map((item, index) => {
            const isFirst = index === 0;
            const details = getWeatherDetails(item.weatherCode, item.isDay);
            const Icon = details.Icon;

            return (
              <div
                key={item.time}
                className={`shrink-0 flex flex-col items-center justify-between p-3.5 rounded-2xl border min-w-[90px] transition-all hover:scale-105 ${
                  isFirst
                    ? 'bg-amber-400/25 border-amber-300/40 shadow-lg'
                    : 'bg-white/10 border-white/15 hover:bg-white/20'
                }`}
              >
                {/* Time */}
                <span className="text-xs font-bold text-white/90">
                  {isFirst ? 'Agora' : formatTime(item.time)}
                </span>

                {/* Weather Icon */}
                <div className="my-2.5">
                  <Icon className="w-7 h-7 text-white drop-shadow" />
                </div>

                {/* Temperature */}
                <span className="text-base font-extrabold text-white">
                  {formatTemp(item.temp, tempUnit)}
                </span>

                {/* Rain probability */}
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-cyan-200">
                  <Droplets className="w-3 h-3" />
                  <span>{item.rainProb}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
