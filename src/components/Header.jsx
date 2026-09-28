import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, CloudSun, Loader2, X, RefreshCw } from 'lucide-react';
import { searchCities } from '../services/weatherApi';

export default function Header({
  onSelectCity,
  onDetectLocation,
  onRefresh,
  isRefreshing,
  isLocating,
  tempUnit,
  onToggleUnit,
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        const cities = await searchCities(query);
        setResults(cities);
        setIsOpen(true);
      } catch (err) {
        console.error('Erro na pesquisa:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(handler);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    onSelectCity(city);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <header className="relative z-30 flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-2">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg text-white">
          <CloudSun className="w-7 h-7 text-amber-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
            Clima<span className="text-amber-300 font-extrabold">Hoje</span>
          </h1>
          <p className="text-xs text-white/70 font-medium -mt-1">
            Previsão do tempo em tempo real
          </p>
        </div>
      </div>

      {/* Search Bar with Autocomplete */}
      <div className="relative w-full md:max-w-md" ref={dropdownRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar cidade (ex: São Paulo, Rio, Lisboa)..."
            className="w-full bg-white/15 hover:bg-white/20 focus:bg-white/25 backdrop-blur-md text-white placeholder-white/60 text-sm font-medium pl-10 pr-24 py-2.5 rounded-2xl border border-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300/60 shadow-lg transition-all"
          />

          <div className="absolute left-3 text-white/70 pointer-events-none">
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </div>

          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                }}
                className="p-1 text-white/60 hover:text-white rounded-lg transition"
                title="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onDetectLocation}
              disabled={isLocating}
              title="Usar minha localização atual"
              className="p-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-xl transition flex items-center justify-center border border-white/20"
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <MapPin className="w-4 h-4 text-emerald-300" />
              )}
            </button>
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/10 animate-in fade-in duration-200">
            {results.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleSelect(city)}
                className="w-full text-left px-4 py-3 hover:bg-white/15 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-semibold text-white text-sm">
                      {city.name}
                    </span>
                    <span className="text-white/60 text-xs ml-1.5">
                      {[city.admin1, city.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
                {city.countryCode && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                    {city.countryCode}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {isOpen && query.trim().length >= 2 && !isSearching && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-center text-white/70 text-xs z-50">
            Nenhuma cidade encontrada para "{query}".
          </div>
        )}
      </div>

      {/* Right Controls: Unit Toggle & Refresh */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Atualizar clima"
          className="p-2.5 bg-white/15 hover:bg-white/25 active:scale-95 rounded-2xl border border-white/20 text-white backdrop-blur-md shadow-lg transition"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-300' : ''}`}
          />
        </button>

        {/* Celsius / Fahrenheit Toggle */}
        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-1 flex items-center shadow-lg">
          <button
            type="button"
            onClick={() => onToggleUnit('C')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              tempUnit === 'C'
                ? 'bg-white text-slate-900 shadow-md scale-105'
                : 'text-white/70 hover:text-white'
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => onToggleUnit('F')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              tempUnit === 'F'
                ? 'bg-white text-slate-900 shadow-md scale-105'
                : 'text-white/70 hover:text-white'
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
}
