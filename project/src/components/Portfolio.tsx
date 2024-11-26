import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Portfolio as PortfolioType, Stock } from '../types';

interface PortfolioProps {
  portfolio: PortfolioType;
  onSelectStock: (stock: Stock) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio, onSelectStock }) => {
  return (
    <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-white">₹{portfolio.totalValue.toLocaleString()}</span>
          <div className={`flex items-center ${portfolio.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.dailyChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="ml-1">{portfolio.dailyChangePercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {portfolio.stocks.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => onSelectStock(stock)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between p-4 bg-[#2a2a3e] rounded-lg hover:bg-[#3a3a4e] transition-colors">
              <div>
                <h3 className="text-lg font-semibold text-white">{stock.name}</h3>
                <p className="text-sm text-gray-400">{stock.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-white">₹{stock.price.toLocaleString()}</p>
                <p className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};