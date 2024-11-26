import { config } from '../config/env';

export const fetchStockData = async (symbol: string, interval: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${config.ALPHA_VANTAGE_API_KEY}`
  );
  return response.json();
};

export const fetchNewsData = async (query: string) => {
  const response = await fetch(
    `${config.NEWS_API_URL}/everything?q=${query}&sortBy=publishedAt&apikey=${config.NEWS_API_KEY}`
  );
  return response.json();
};

export const fetchWeatherData = async (city: string) => {
  const response = await fetch(
    `${config.WEATHER_API_URL}/weather?q=${city}&appid=${config.OPENWEATHER_API_KEY}`
  );
  return response.json();
};