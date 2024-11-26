import React from 'react';
import { ArrowUpRight, ArrowDownRight, Cloud, Newspaper, LineChart } from 'lucide-react';
import { useQuery } from 'react-query';
import { config } from '../config/env';

interface PredictionProps {
  symbol: string;
}

export const Prediction: React.FC<PredictionProps> = ({ symbol }) => {
  const { data: newsData } = useQuery(['news', symbol], async () => {
    const response = await fetch(
      `${config.NEWS_API_URL}/everything?q=${symbol}&sortBy=publishedAt&apikey=${config.NEWS_API_KEY}`
    );
    return response.json();
  });

  const { data: weatherData } = useQuery(['weather', 'Mumbai'], async () => {
    const response = await fetch(
      `${config.WEATHER_API_URL}/weather?q=Mumbai&appid=${config.OPENWEATHER_API_KEY}`
    );
    return response.json();
  });

  // Simple mock prediction based on news sentiment and weather
  const prediction = {
    value: 2.5,
    confidence: 0.85,
    factors: {
      news: newsData ? 0.75 : 0,
      weather: weatherData ? 0.60 : 0,
      technical: 0.90,
    },
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">AI Prediction</h2>
      
      <div className="flex items-center space-x-4 mb-6">
        {prediction.value > 0 ? (
          <ArrowUpRight className="w-12 h-12 text-green-400" />
        ) : (
          <ArrowDownRight className="w-12 h-12 text-red-400" />
        )}
        <div>
          <p className={`text-2xl font-bold ${prediction.value > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {prediction.value > 0 ? '+' : ''}{prediction.value.toFixed(2)}%
          </p>
          <p className="text-gray-400">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Newspaper className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white">News Sentiment</span>
          </div>
          <span className="text-gray-400">{(prediction.factors.news * 100).toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Cloud className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-white">Weather Impact</span>
          </div>
          <span className="text-gray-400">{(prediction.factors.weather * 100).toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LineChart className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-white">Technical Analysis</span>
          </div>
          <span className="text-gray-400">{(prediction.factors.technical * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};