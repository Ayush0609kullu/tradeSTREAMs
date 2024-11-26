import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface TradingPanelProps {
  symbol: string;
  currentPrice: number;
  onTrade: (type: 'buy' | 'sell', quantity: number) => void;
}

export const TradingPanel: React.FC<TradingPanelProps> = ({ symbol, currentPrice, onTrade }) => {
  const [quantity, setQuantity] = useState(1);
  const [dummyBalance] = useState(1000000); // ₹10,00,000 dummy balance

  return (
    <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Trade {symbol}</h3>
        <div className="flex items-center text-yellow-400">
          <DollarSign className="w-5 h-5 mr-1" />
          <span>Balance: ₹{dummyBalance.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-full bg-[#2a2a3e] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => onTrade('buy', quantity)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Buy
          </button>
          <button
            onClick={() => onTrade('sell', quantity)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Sell
          </button>
        </div>

        <div className="text-sm text-gray-400">
          <p>Total Value: ₹{(quantity * currentPrice).toLocaleString()}</p>
          <p>Current Price: ₹{currentPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};