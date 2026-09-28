import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import QuickCities from './components/QuickCities';
import CurrentWeather from './components/CurrentWeather';
import WeatherMetrics from './components/WeatherMetrics';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherAtmosphere from './components/WeatherAtmosphere';
import Footer from './components/Footer';
import { getWeatherData, getCityFromCoords } from './services/weatherApi';
import { getWeatherDetails } from './constants/weatherCodes';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

const DEFAULT_CITY = {
  name: 'São Paulo',
  admin1: 'São Paulo',
  country: 'Brasil',
  latitude: -23.5475,
  longitude: -46.6361,
};

export default function App() {
  const [city, setCity] = useState(() => {
    try {
      const saved = localStorage.getItem('last_city');
      return saved ? JSON.parse(saved) : DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('weather_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [tempUnit, setTempUnit] = useState(() => {
    try {
      return localStorage.getItem('temp_unit') || 'C';
    } catch {
      return 'C';
    }
  });

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('last_city', JSON.stringify(city));
    } catch (e) {
      console.error(e);
    }
  }, [city]);

  useEffect(() => {
    try {
      localStorage.setItem('weather_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('temp_unit', tempUnit);
    } catch (e) {
      console.error(e);
    }
  }, [tempUnit]);

  // Fetch Weather Data
  const fetchWeather = useCallback(async (targetCity, isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await getWeatherData(targetCity.latitude, targetCity.longitude);
      setWeather(data);
    } catch (err) {
      console.error('Erro ao carregar clima:', err);
      setError('Não foi possível obter a previsão para este local. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (city && city.latitude && city.longitude) {
      fetchWeather(city);
    }
  }, [city, fetchWeather]);

  // Toggle favorite city
  const handleToggleFavorite = (targetCity) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) =>
          Math.abs(f.latitude - targetCity.latitude) < 0.05 &&
          Math.abs(f.longitude - targetCity.longitude) < 0.05
      );
      if (exists) {
        return prev.filter(
          (f) =>
            Math.abs(f.latitude - targetCity.latitude) >= 0.05 ||
            Math.abs(f.longitude - targetCity.longitude) >= 0.05
        );
      }
      return [...prev, targetCity];
    });
  };

  // Browser Geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const detectedCity = await getCityFromCoords(lat, lon);
          setCity(detectedCity);
        } catch (err) {
          console.error(err);
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        alert('Não foi possível obter sua localização. Permita o acesso ao GPS nas configurações do seu navegador.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Compute theme gradient and atmosphere based on current weather
  const weatherDetails = weather?.current
    ? getWeatherDetails(weather.current.weatherCode, weather.current.isDay)
    : null;

  const gradientClass = weatherDetails?.theme.gradient || 'from-sky-500 via-blue-600 to-indigo-700';
  const atmosphereStatus = weatherDetails?.theme.status || 'clear-day';

  return (
    <div
      className={`min-h-screen relative w-full bg-gradient-to-br ${gradientClass} transition-all duration-1000 text-white selection:bg-amber-300 selection:text-slate-900`}
    >
      {/* Dynamic atmospheric animations */}
      <WeatherAtmosphere status={atmosphereStatus} />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col min-h-screen">
        <Header
          onSelectCity={setCity}
          onDetectLocation={handleDetectLocation}
          onRefresh={() => fetchWeather(city, true)}
          isRefreshing={refreshing}
          isLocating={locating}
          tempUnit={tempUnit}
          onToggleUnit={setTempUnit}
        />

        <QuickCities
          currentCity={city}
          onSelectCity={setCity}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Error State */}
        {error && (
          <div className="my-6 p-4 rounded-2xl bg-rose-500/20 backdrop-blur-md border border-rose-400/30 text-white flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
            <button
              onClick={() => fetchWeather(city)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading && !weather && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-amber-300" />
            <p className="text-sm font-medium text-white/80">
              Carregando dados meteorológicos...
            </p>
          </div>
        )}

        {/* Main Weather Information */}
        {weather && (
          <main className="flex-1 space-y-6 mt-2">
            <CurrentWeather
              city={city}
              weather={weather}
              tempUnit={tempUnit}
            />

            <WeatherMetrics
              weather={weather}
              tempUnit={tempUnit}
            />

            <HourlyForecast
              hourly={weather.hourly}
              tempUnit={tempUnit}
            />

            <DailyForecast
              daily={weather.daily}
              tempUnit={tempUnit}
            />
          </main>
        )}

        <Footer />
      </div>
    </div>
  );
}
