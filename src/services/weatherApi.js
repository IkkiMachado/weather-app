const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1';

export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  const response = await fetch(
    `${GEOCODING_BASE_URL}/search?name=${encodeURIComponent(
      query.trim()
    )}&count=8&language=pt&format=json`
  );

  if (!response.ok) {
    throw new Error('Falha ao buscar cidades');
  }

  const data = await response.json();
  if (!data.results) return [];

  return data.results.map((item) => ({
    id: `${item.latitude}_${item.longitude}_${item.id}`,
    name: item.name,
    admin1: item.admin1 || '',
    country: item.country || '',
    countryCode: item.country_code || '',
    latitude: item.latitude,
    longitude: item.longitude,
    timezone: item.timezone,
  }));
}

export async function getCityFromCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    const name = data.city || data.locality || data.principalSubdivision || 'Sua Localização';
    return {
      name,
      admin1: data.principalSubdivision || '',
      country: data.countryName || '',
      latitude: lat,
      longitude: lon,
    };
  } catch (error) {
    return {
      name: 'Localização Atual',
      admin1: '',
      country: '',
      latitude: lat,
      longitude: lon,
    };
  }
}

export async function getWeatherData(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'surface_pressure',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_probability_max',
    ].join(','),
    timezone: 'auto',
  });

  const response = await fetch(`${WEATHER_BASE_URL}/forecast?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Falha ao obter os dados meteorológicos.');
  }

  const data = await response.json();

  // Process Hourly Data (slice the next 24 intervals starting around the current hour)
  const currentIso = data.current.time;
  const currentHourPrefix = currentIso ? currentIso.slice(0, 13) : '';
  let startIndex = data.hourly.time.findIndex((t) => t.startsWith(currentHourPrefix));
  if (startIndex === -1) startIndex = 0;

  const hourlyNext24 = data.hourly.time
    .slice(startIndex, startIndex + 24)
    .map((time, idx) => {
      const realIndex = startIndex + idx;
      return {
        time,
        temp: data.hourly.temperature_2m[realIndex],
        weatherCode: data.hourly.weather_code[realIndex],
        rainProb: data.hourly.precipitation_probability[realIndex] ?? 0,
        isDay: data.hourly.is_day[realIndex] ?? 1,
      };
    });

  // Process Daily Data (7 days)
  const daily7Days = data.daily.time.map((time, idx) => ({
    date: time,
    weatherCode: data.daily.weather_code[idx],
    maxTemp: data.daily.temperature_2m_max[idx],
    minTemp: data.daily.temperature_2m_min[idx],
    rainProb: data.daily.precipitation_probability_max?.[idx] ?? 0,
    uvIndex: data.daily.uv_index_max?.[idx] ?? 0,
    sunrise: data.daily.sunrise?.[idx],
    sunset: data.daily.sunset?.[idx],
  }));

  return {
    current: {
      time: data.current.time,
      temp: data.current.temperature_2m,
      apparentTemp: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      isDay: data.current.is_day,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      pressure: data.current.surface_pressure,
      uvIndex: daily7Days[0]?.uvIndex ?? 0,
      sunrise: daily7Days[0]?.sunrise,
      sunset: daily7Days[0]?.sunset,
      maxTemp: daily7Days[0]?.maxTemp,
      minTemp: daily7Days[0]?.minTemp,
    },
    hourly: hourlyNext24,
    daily: daily7Days,
  };
}
