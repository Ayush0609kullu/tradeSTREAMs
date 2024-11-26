import React, { useState } from 'react';
import { Chart } from './components/Chart';
import { Portfolio } from './components/Portfolio';
import { Prediction } from './components/Prediction';
import { TradingPanel } from './components/TradingPanel';
import { NewsPanel } from './components/NewsPanel';
import { BarChart3, LineChart, CandlestickChart, Wallet, Bitcoin, Gem, Coins } from 'lucide-react';
import type { TimeInterval } from './types';
import { mockStocks } from './data/mockStocks';

function App() {
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'bar'>('line');
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('1D');
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);

  const mockPortfolio = {
    stocks: mockStocks,
    totalValue: mockStocks.reduce((acc, stock) => acc + stock.price * stock.quantity, 0),
    dailyChange: 12500,
    dailyChangePercent: 1.25,
  };

  const handleTrade = (type: 'buy' | 'sell', quantity: number) => {
    console.log(`${type.toUpperCase()} ${quantity} shares of ${selectedStock.symbol}`);
    // Implement trade logic here
  };

  return (
    <div className="min-h-screen bg-[#121225]">
      <nav className="bg-[#1a1a2e] border-b border-[#2a2a3e] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="TradeSTREAM" className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">TradeSTREAM</span>
          </div>
          <div className="flex space-x-6">
            <button className="flex items-center text-white hover:text-yellow-400">
              <Wallet className="w-5 h-5 mr-2" />
              Portfolio
            </button>
            <button className="flex items-center text-white hover:text-yellow-400">
              <Bitcoin className="w-5 h-5 mr-2" />
              Crypto
            </button>
            <button className="flex items-center text-white hover:text-yellow-400">
              <Gem className="w-5 h-5 mr-2" />
              IPOs
            </button>
            <button className="flex items-center text-white hover:text-yellow-400">
              <Coins className="w-5 h-5 mr-2" />
              Digital Gold
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setChartType('line')}
                    className={`p-2 rounded ${chartType === 'line' ? 'bg-yellow-400 text-black' : 'text-white'}`}
                  >
                    <LineChart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setChartType('candlestick')}
                    className={`p-2 rounded ${chartType === 'candlestick' ? 'bg-yellow-400 text-black' : 'text-white'}`}
                  >
                    <CandlestickChart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`p-2 rounded ${chartType === 'bar' ? 'bg-yellow-400 text-black' : 'text-white'}`}
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  {(['1D', '1W', '1M', '1Y'] as TimeInterval[]).map((interval) => (
                    <button
                      key={interval}
                      onClick={() => setTimeInterval(interval)}
                      className={`px-3 py-1 rounded ${
                        timeInterval === interval ? 'bg-yellow-400 text-black' : 'text-white'
                      }`}
                    >
                      {interval}
                    </button>
                  ))}
                </div>
              </div>
              <Chart symbol={selectedStock.symbol} type={chartType} interval={timeInterval} />
            </div>
            <TradingPanel
              symbol={selectedStock.symbol}
              currentPrice={selectedStock.price}
              onTrade={handleTrade}
            />
            <Portfolio portfolio={mockPortfolio} onSelectStock={setSelectedStock} />
          </div>
          <div className="space-y-6">
            <Prediction symbol={selectedStock.symbol} />
            <NewsPanel symbol={selectedStock.symbol} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;