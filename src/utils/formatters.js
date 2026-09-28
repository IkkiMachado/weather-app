// Utility functions for formatting weather values

export function formatTemp(celsius, unit = 'C') {
  if (celsius === undefined || celsius === null) return '--';
  if (unit === 'F') {
    const fahrenheit = Math.round((celsius * 9) / 5 + 32);
    return `${fahrenheit}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatWind(kmh, unit = 'C') {
  if (kmh === undefined || kmh === null) return '--';
  if (unit === 'F') {
    // mph
    const mph = Math.round(kmh * 0.621371);
    return `${mph} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function getUVLevel(uv) {
  if (uv === undefined || uv === null) return { label: 'Indisponível', color: 'text-gray-300' };
  if (uv <= 2) return { label: 'Baixo', color: 'text-emerald-400' };
  if (uv <= 5) return { label: 'Moderado', color: 'text-yellow-400' };
  if (uv <= 7) return { label: 'Alto', color: 'text-amber-500' };
  if (uv <= 10) return { label: 'Muito Alto', color: 'text-orange-500' };
  return { label: 'Extremo', color: 'text-rose-500' };
}

export function formatTime(isoString) {
  if (!isoString) return '--:--';
  const date = new Date(isoString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function formatDayName(dateString, isFirst = false) {
  if (isFirst) return 'Hoje';
  const date = new Date(dateString + 'T00:00:00');
  const day = date.toLocaleDateString('pt-BR', { weekday: 'short' });
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export function formatFullDate(date = new Date()) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  const formatted = date.toLocaleDateString('pt-BR', options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
