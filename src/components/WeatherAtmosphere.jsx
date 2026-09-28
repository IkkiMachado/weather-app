import React, { useMemo } from 'react';

export default function WeatherAtmosphere({ status }) {
  // Generate random positions once so they don't jump around on re-renders
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: `${(i * 2.3) % 100}%`,
        animationDuration: `${0.6 + (i % 6) * 0.15}s`,
        animationDelay: `${(i % 10) * 0.12}s`,
        opacity: 0.3 + (i % 5) * 0.15,
        height: `${14 + (i % 4) * 8}px`,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        top: `${(i * 13) % 95}%`,
        left: `${(i * 19) % 98}%`,
        size: `${1.5 + (i % 3)}px`,
        animationDuration: `${1.5 + (i % 5) * 0.7}s`,
        animationDelay: `${(i % 7) * 0.4}s`,
      })),
    []
  );

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        left: `${(i * 3) % 100}%`,
        animationDuration: `${3.5 + (i % 5) * 0.8}s`,
        animationDelay: `${(i % 6) * 0.6}s`,
        size: `${3 + (i % 4) * 2}px`,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sun glow for clear day */}
      {status === 'clear-day' && (
        <>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-300/25 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-yellow-200/15 blur-3xl" />
        </>
      )}

      {/* Stars for clear night */}
      {status === 'clear-night' && (
        <div className="absolute inset-0">
          <div className="absolute top-12 right-20 w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl" />
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDuration: star.animationDuration,
                animationDelay: star.animationDelay,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds drift for cloudy days/nights */}
      {(status === 'cloudy-day' || status === 'cloudy-night') && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -left-20 w-[600px] h-[300px] bg-white/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 -right-20 w-[700px] h-[350px] bg-slate-300/15 rounded-full blur-3xl animate-[pulse_11s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Rain drops for rainy / storm conditions */}
      {(status === 'rain' || status === 'thunder') && (
        <div className="absolute inset-0">
          {rainDrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-cyan-200 to-white/90 animate-rain rounded-full"
              style={{
                left: drop.left,
                top: '-20px',
                height: drop.height,
                opacity: drop.opacity,
                animationDuration: drop.animationDuration,
                animationDelay: drop.animationDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning flash for thunderstorms */}
      {status === 'thunder' && (
        <div className="absolute inset-0 bg-indigo-300/10 animate-[lightning_6s_ease-in-out_infinite] pointer-events-none" />
      )}

      {/* Snowflakes for snow */}
      {status === 'snow' && (
        <div className="absolute inset-0">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute rounded-full bg-white/90 animate-snow"
              style={{
                left: flake.left,
                top: '-10px',
                width: flake.size,
                height: flake.size,
                animationDuration: flake.animationDuration,
                animationDelay: flake.animationDelay,
                boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              }}
            />
          ))}
        </div>
      )}

      {/* Fog effect */}
      {status === 'fog' && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/40 via-transparent to-slate-800/30 backdrop-blur-[1px]" />
      )}
    </div>
  );
}
