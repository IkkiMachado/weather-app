import React from 'react';
import { Calendar, Droplets } from 'lucide-react';
import { formatTemp, formatDayName } from '../utils/formatters';
import { getWeatherDetails } from '../constants/weatherCodes';

export default function DailyForecast({ daily = [], tempUnit }) {
  if (!daily || daily.length === 0) return null;

  // Calculate minimum and maximum temperature of the whole week to draw proportional bars
  const weekMin = Math.min(...daily.map((d) => d.minTemp));
  const weekMax = Math.max(...daily.map((d) => d.maxTemp));
  const totalRange = weekMax - weekMin || 1;

  return (
    <div className="relative z-20 w-full">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-white">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-amber-300" />
          <h3 className="text-lg font-bold tracking-tight text-white">
            Previsão para os Próximos 7 Dias
          </h3>
        </div>

        <div className="divide-y divide-white/10">
          {daily.map((day, index) => {
            const isToday = index === 0;
            const details = getWeatherDetails(day.weatherCode, 1);
            const Icon = details.Icon;

            // Bar calculations
            const leftPercent = Math.max(0, ((day.minTemp - weekMin) / totalRange) * 100);
            const widthPercent = Math.max(10, ((day.maxTemp - day.minTemp) / totalRange) * 100);

            // Date format DD/MM
            const [, month, dayNum] = day.date.split('-');
            const dateStr = `${dayNum}/${month}`;

            return (
              <div
                key={day.date}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 px-2 rounded-xl transition"
              >
                {/* Day name & date */}
                <div className="flex items-center gap-3 w-32 shrink-0">
                  <span
                    className={`font-bold text-sm ${
                      isToday ? 'text-amber-300 font-extrabold' : 'text-white'
                    }`}
                  >
                    {isToday ? 'Hoje' : formatDayName(day.date, false)}
                  </span>
                  <span className="text-xs text-white/50">{dateStr}</span>
                </div>

                {/* Weather condition & icon */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-1.5 rounded-xl bg-white/10 border border-white/15">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/90 font-medium truncate max-w-[160px] sm:max-w-[200px]">
                    {details.description}
                  </span>
                </div>

                {/* Rain probability */}
                <div className="flex items-center gap-1 text-xs text-cyan-200 font-semibold w-16 shrink-0">
                  {day.rainProb > 0 ? (
                    <>
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{day.rainProb}%</span>
                    </>
                  ) : (
                    <span className="text-white/40">-</span>
                  )}
                </div>

                {/* Min / Max and visual range bar */}
                <div className="flex items-center gap-3 sm:w-64 shrink-0">
                  <span className="text-xs sm:text-sm font-semibold text-white/70 w-12 text-right">
                    {formatTemp(day.minTemp, tempUnit)}
                  </span>

                  {/* Gradient Range Bar */}
                  <div className="flex-1 bg-white/15 h-2 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 shadow-sm"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${Math.min(100 - leftPercent, widthPercent)}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-white w-12 text-left">
                    {formatTemp(day.maxTemp, tempUnit)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
