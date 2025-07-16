import { useEffect, useMemo, useState } from "react";
import { Coordinates, Units, WeatherDataArray } from "../types";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../utils/constants";
import { groupWeatherByDay } from "../utils/global.utils";

export interface UseFetchWeatherReturn {
  weatherData: WeatherDataArray | [];
  isLoading: boolean;
  error: string | null;
}

export const useFetchWeather = (cityLocation: Coordinates, unit: Units): UseFetchWeatherReturn => {

  const [weatherData, setWeatherData] = useState<WeatherDataArray>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const units = useMemo(() => unit === 'C' ? 'metric' : 'imperial', [unit]);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      const { lat, lng } = cityLocation;

      try {
        const res = await fetch(
          `${WEATHER_API_URL}?lat=${lat}&lon=${lng}&units=${units}&appid=${WEATHER_API_KEY}`
        );
        if (!res.ok) {
          throw Error('Something went wrong while fetching weather data');
        }
        const data = await res.json();
        const groupedWeather = groupWeatherByDay(data.list);
        setWeatherData(groupedWeather);
      }
      catch (error: any) {
        setError(error.message);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return { weatherData, isLoading, error };
}