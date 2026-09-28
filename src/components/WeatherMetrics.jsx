import React from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Gauge,
  Umbrella,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { formatTemp, formatWind, getUVLevel, formatTime } from '../utils/formatters';

export default function WeatherMetrics({ weather, tempUnit }) {
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const uvInfo = getUVLevel(current.uvIndex);

  const metrics = [
    {
      id: 'feels_like',
      title: 'Sensação Térmica',
      value: formatTemp(current.apparentTemp, tempUnit),
      subtext: 'Baseada em vento e umidade',
      icon: Thermometer,
      iconColor: 'text-amber-300',
    },
    {
      id: 'humidity',
      title: 'Umidade do Ar',
      value: `${current.humidity}%`,
      subtext: current.humidity > 60 ? 'Umidade alta' : 'Umidade agradável',
      icon: Droplets,
      iconColor: 'text-sky-300',
      progress: current.humidity,
    },
    {
      id: 'wind',
      title: 'Vento',
      value: formatWind(current.windSpeed, tempUnit),
      subtext: 'Brisa leve em superfície',
      icon: Wind,
      iconColor: 'text-teal-300',
    },
    {
      id: 'uv',
      title: 'Índice UV',
      value: `${current.uvIndex}`,
      badge: uvInfo.label,
      badgeColor: uvInfo.color,
      icon: Sun,
      iconColor: 'text-yellow-400',
    },
    {
      id: 'precipitation',
      title: 'Precipitação Atual',
      value: `${current.precipitation} mm`,
      subtext: current.precipitation > 0 ? 'Chovendo no momento' : 'Sem chuva registrada',
      icon: Umbrella,
      iconColor: 'text-cyan-300',
    },
    {
      id: 'pressure',
      title: 'Pressão Atmosférica',
      value: `${Math.round(current.pressure)} hPa`,
      subtext: current.pressure >= 1013 ? 'Alta pressão' : 'Baixa pressão',
      icon: Gauge,
      iconColor: 'text-indigo-300',
    },
  ];

  return (
    <div className="relative z-20 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-xl text-white group"
            >
              <div className="flex items-center justify-between text-white/70">
                <span className="text-xs font-semibold">{item.title}</span>
                <Icon className={`w-4 h-4 ${item.iconColor} group-hover:scale-110 transition-transform`} />
              </div>

              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {item.value}
                  </span>
                  {item.badge && (
                    <span className={`text-[11px] font-bold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.progress !== undefined && (
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, item.progress)}%` }}
                    />
                  </div>
                )}
              </div>

              {item.subtext && (
                <span className="text-[11px] text-white/60 font-medium truncate">
                  {item.subtext}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sun Schedule Bar */}
      {(current.sunrise || current.sunset) && (
        <div className="mt-3 sm:mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center justify-around shadow-xl text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-300/30">
              <Sunrise className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/70 font-semibold block">Nascer do Sol</span>
              <span className="text-base font-bold text-white">{formatTime(current.sunrise)}</span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/20" />

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-400/20 text-indigo-300 border border-indigo-300/30">
              <Sunset className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/70 font-semibold block">Pôr do Sol</span>
              <span className="text-base font-bold text-white">{formatTime(current.sunset)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
