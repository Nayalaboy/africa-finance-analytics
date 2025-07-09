import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const MarketData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Mock market data
  const marketData = [
    { symbol: 'MTN', name: 'MTN Group', exchange: 'BRVM', price: 1250.50, change: 2.5, volume: 1500000, marketCap: 2500000000 },
    { symbol: 'ECOBANK', name: 'Ecobank Transnational', exchange: 'BRVM', price: 890.25, change: -1.2, volume: 800000, marketCap: 1800000000 },
    { symbol: 'ORANGE', name: 'Orange Côte d\'Ivoire', exchange: 'BRVM', price: 650.75, change: 0.8, volume: 500000, marketCap: 1200000000 },
    { symbol: 'SGB', name: 'Société Générale de Banques', exchange: 'BRVM', price: 450.00, change: -0.5, volume: 300000, marketCap: 900000000 },
    { symbol: 'NSIA', name: 'NSIA Banque', exchange: 'BRVM', price: 320.50, change: 1.8, volume: 200000, marketCap: 640000000 },
    { symbol: 'BICICI', name: 'BICICI', exchange: 'BRVM', price: 280.25, change: -0.3, volume: 150000, marketCap: 560000000 },
    { symbol: 'SIVOP', name: 'SIVOP', exchange: 'BVMAC', price: 180.75, change: 3.2, volume: 100000, marketCap: 360000000 },
    { symbol: 'BOA', name: 'Bank of Africa', exchange: 'BVMAC', price: 220.00, change: -1.5, volume: 120000, marketCap: 440000000 },
  ];

  const exchanges = [
    { code: 'all', name: 'All Exchanges' },
    { code: 'BRVM', name: 'BRVM (Abidjan)' },
    { code: 'BVMAC', name: 'BVMAC (Douala)' },
    { code: 'NSE', name: 'NSE (Lagos)' },
  ];

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(item => item !== symbol)
        : [...prev, symbol]
    );
  };

  const filteredData = marketData
    .filter(stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(stock => selectedExchange === 'all' || stock.exchange === selectedExchange)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change - a.change;
        case 'volume':
          return b.volume - a.volume;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Data</h1>
          <p className="text-gray-600">Real-time stock prices and market information</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated:</span>
          <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Exchange Filter */}
          <div className="lg:w-48">
            <select
              value={selectedExchange}
              onChange={(e) => setSelectedExchange(e.target.value)}
              className="input-field"
            >
              {exchanges.map(exchange => (
                <option key={exchange.code} value={exchange.code}>
                  {exchange.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="change">Sort by Change</option>
              <option value="volume">Sort by Volume</option>
            </select>
          </div>
        </div>
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-600">BRVM Index</h3>
          <p className="text-2xl font-bold text-gray-900">1,250.50</p>
          <p className="text-sm text-green-600">+2.5%</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-600">BVMAC Index</h3>
          <p className="text-2xl font-bold text-gray-900">890.25</p>
          <p className="text-sm text-red-600">-1.2%</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Volume</h3>
          <p className="text-2xl font-bold text-gray-900">3.2M</p>
          <p className="text-sm text-gray-600">Today</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-600">Active Stocks</h3>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600">Across 3 exchanges</p>
        </div>
      </div>

      {/* Stock Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exchange
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Watchlist
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.exchange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    ${stock.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                         <div className="flex items-center justify-end">
                       {stock.change > 0 ? (
                         <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                       ) : (
                         <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                       )}
                      <span className={`font-medium ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {stock.volume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    ${(stock.marketCap / 1000000).toFixed(0)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => toggleWatchlist(stock.symbol)}
                      className="text-gray-400 hover:text-yellow-500"
                    >
                      {watchlist.includes(stock.symbol) ? (
                        <StarIconSolid className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Watchlist Summary */}
      {watchlist.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Watchlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchlist.map(symbol => {
              const stock = marketData.find(s => s.symbol === symbol);
              if (!stock) return null;
              
              return (
                <div key={symbol} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{stock.symbol}</h4>
                      <p className="text-sm text-gray-500">{stock.name}</p>
                    </div>
                    <button
                      onClick={() => toggleWatchlist(symbol)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <StarIconSolid className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">${stock.price}</span>
                    <span className={`text-sm font-medium ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketData; 