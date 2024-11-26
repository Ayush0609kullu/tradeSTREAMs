export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  quantity: number;
}

export interface Portfolio {
  stocks: Stock[];
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export interface ChartData {
  time: string;
  value: number;
}

export type TimeInterval = '1D' | '1W' | '1M' | '1Y';

export interface PredictionData {
  prediction: number;
  confidence: number;
  factors: {
    news: number;
    weather: number;
    technical: number;
  };
}