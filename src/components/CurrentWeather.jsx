import React from 'react';
import { ArrowUp, ArrowDown, MapPin, Calendar, Clock } from 'lucide-react';
import { formatTemp, formatFullDate, formatTime } from '../utils/formatters';
import { getWeatherDetails } from '../constants/weatherCodes';

export default function CurrentWeather({ city, weather, tempUnit }) {
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const details = getWeatherDetails(current.weatherCode, current.isDay);
  const IconComponent = details.Icon;

  return (
    <div className="relative z-20 w-full">
      <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 shadow-2xl text-white">
        {/* Top bar: location info + date/time */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-300 shrink-0" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                {city.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                {[city.admin1, city.country].filter(Boolean).join(', ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{formatFullDate()}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{formatTime(current.time)}</span>
            </span>
          </div>
        </div>

        {/* Center: Main temperature display and condition */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 sm:py-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter drop-shadow-md">
                {formatTemp(current.temp, tempUnit)}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold bg-white/20 border border-white/25 shadow-sm text-white">
                {details.description}
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                Sensação térmica de{' '}
                <strong className="text-white font-bold">
                  {formatTemp(current.apparentTemp, tempUnit)}
                </strong>
              </span>
            </div>
          </div>

          {/* Large dynamic weather icon & High/Low badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative p-6 rounded-3xl bg-white/15 border border-white/20 shadow-xl backdrop-blur-md">
              <IconComponent className="w-24 h-24 sm:w-28 sm:h-28 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] animate-pulse" />
            </div>

            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/20 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-1 text-emerald-300">
                <ArrowDown className="w-4 h-4" />
                <span>{formatTemp(current.minTemp, tempUnit)}</span>
              </span>
              <span className="h-3 w-[1px] bg-white/30" />
              <span className="flex items-center gap-1 text-rose-300">
                <ArrowUp className="w-4 h-4" />
                <span>{formatTemp(current.maxTemp, tempUnit)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
