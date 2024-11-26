import { useQuery } from 'react-query';
import { config } from '../config/env';
import type { ChartData } from '../types';

const generateMockData = (interval: string): ChartData[] => {
  const now = new Date();
  const data: ChartData[] = [];
  const points = interval === '1D' ? 390 : interval === '1W' ? 1820 : interval === '1M' ? 7800 : 9360;
  const timeIncrement = interval === '1D' ? 1 : interval === '1W' ? 5 : interval === '1M' ? 15 : 30;
  
  let baseValue = 1000;
  for (let i = points; i > 0; i--) {
    const time = new Date(now.getTime() - i * timeIncrement * 60000);
    const randomChange = (Math.random() - 0.5) * 20;
    baseValue = Math.max(0, baseValue + randomChange);
    data.push({
      time: time.toISOString(),
      value: baseValue,
    });
  }
  
  return data;
};

export const useStockData = (symbol: string, interval: string) => {
  return useQuery<ChartData[]>(
    ['stock', symbol, interval],
    async () => {
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${config.ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();
        
        if (data['Note'] || !data['Time Series (5min)']) {
          // If API limit is reached or no data, use mock data
          return generateMockData(interval);
        }
        
        const timeSeriesData = data['Time Series (5min)'];
        return Object.entries(timeSeriesData).map(([time, values]: [string, any]) => ({
          time,
          value: parseFloat(values['4. close']),
        }));
      } catch (error) {
        console.error('Error fetching stock data:', error);
        return generateMockData(interval);
      }
    },
    {
      refetchInterval: 60000,
      staleTime: 30000,
      retry: 3,
    }
  );
};