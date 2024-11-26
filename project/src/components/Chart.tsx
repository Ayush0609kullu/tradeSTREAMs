import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useStockData } from '../hooks/useStockData';
import type { TimeInterval } from '../types';

interface ChartProps {
  symbol: string;
  type: 'line' | 'candlestick' | 'bar';
  interval: TimeInterval;
}

export const Chart: React.FC<ChartProps> = ({ symbol, type, interval }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { data: stockData, isLoading } = useStockData(symbol, interval);

  useEffect(() => {
    if (chartContainerRef.current && stockData?.length) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#1a1a2e' as ColorType },
          textColor: '#DDD',
        },
        grid: {
          vertLines: { color: '#2a2a3e' },
          horzLines: { color: '#2a2a3e' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const series = type === 'line' 
        ? chart.addLineSeries({
            color: '#ffd700',
            lineWidth: 2,
            crosshairMarkerVisible: true,
            lastValueVisible: true,
            priceLineVisible: true,
          })
        : type === 'candlestick'
        ? chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: true,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          })
        : chart.addBarSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
          });

      const formattedData = stockData.map(item => ({
        time: new Date(item.time).getTime() / 1000,
        value: item.value,
        open: item.value * (1 + Math.random() * 0.02 - 0.01),
        high: item.value * (1 + Math.random() * 0.02),
        low: item.value * (1 - Math.random() * 0.02),
        close: item.value,
      }));

      series.setData(formattedData);

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [stockData, type, interval]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-[#1a1a2e] rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};