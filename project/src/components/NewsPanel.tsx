import React from 'react';
import { useQuery } from 'react-query';
import { config } from '../config/env';
import { Newspaper } from 'lucide-react';

interface NewsProps {
  symbol: string;
}

export const NewsPanel: React.FC<NewsProps> = ({ symbol }) => {
  const { data: news, isLoading } = useQuery(['news', symbol], async () => {
    try {
      const response = await fetch(
        `${config.NEWS_API_URL}/everything?q=${symbol.replace('.BSE', '')}+stock+market&sortBy=publishedAt&apiKey=${config.NEWS_API_KEY}`
      );
      const data = await response.json();
      return data.articles?.slice(0, 5) || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-[#2a2a3e] rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Newspaper className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Latest News</h3>
      </div>
      {news?.map((article: any, index: number) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-[#2a2a3e] rounded-lg hover:bg-[#3a3a4e] transition-colors"
        >
          <h4 className="text-white font-medium mb-2">{article.title}</h4>
          <p className="text-sm text-gray-400">{article.description}</p>
          <div className="mt-2 text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </div>
        </a>
      ))}
    </div>
  );
};