import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    portfolioValue: number;
    portfolioChange: number;
    watchlistCount: number;
    alertsCount: number;
    recentTransactions: Array<{
      id: number;
      symbol: string;
      type: string;
      amount: number;
      date: string;
    }>;
    marketTrends: Array<{
      date: string;
      BRVM: number;
      BVMAC: number;
      NSE: number;
    }>;
  }>({
    portfolioValue: 0,
    portfolioChange: 0,
    watchlistCount: 0,
    alertsCount: 0,
    recentTransactions: [],
    marketTrends: []
  });

  // Mock data for demonstration
  const mockData = {
    portfolioValue: 125000,
    portfolioChange: 2.5,
    watchlistCount: 15,
    alertsCount: 3,
    recentTransactions: [
      { id: 1, symbol: 'MTN', type: 'Buy', amount: 5000, date: '2024-01-15' },
      { id: 2, symbol: 'ECOBANK', type: 'Sell', amount: 3000, date: '2024-01-14' },
      { id: 3, symbol: 'ORANGE', type: 'Buy', amount: 2500, date: '2024-01-13' },
    ],
    marketTrends: [
      { date: 'Jan 10', BRVM: 120, BVMAC: 95, NSE: 110 },
      { date: 'Jan 11', BRVM: 122, BVMAC: 97, NSE: 112 },
      { date: 'Jan 12', BRVM: 118, BVMAC: 93, NSE: 108 },
      { date: 'Jan 13', BRVM: 125, BVMAC: 98, NSE: 115 },
      { date: 'Jan 14', BRVM: 128, BVMAC: 100, NSE: 118 },
      { date: 'Jan 15', BRVM: 130, BVMAC: 102, NSE: 120 },
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Portfolio Value',
      value: `$${dashboardData.portfolioValue.toLocaleString()}`,
      change: dashboardData.portfolioChange,
      icon: CurrencyDollarIcon,
      color: 'text-green-600'
    },
    {
      name: 'Watchlist',
      value: dashboardData.watchlistCount,
      change: 2,
      icon: ChartBarIcon,
      color: 'text-blue-600'
    },
    {
      name: 'Active Alerts',
      value: dashboardData.alertsCount,
      change: -1,
      icon: GlobeAltIcon,
      color: 'text-orange-600'
    },
    {
      name: 'News Updates',
      value: '12',
      change: 5,
      icon: NewspaperIcon,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="opacity-90">
          Here's what's happening with your portfolio and the markets today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.change > 0 ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.marketTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="BRVM" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="BVMAC" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="NSE" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.marketTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="BRVM" fill="#3b82f6" />
              <Bar dataKey="BVMAC" fill="#10b981" />
              <Bar dataKey="NSE" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === 'Buy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <ChartBarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">View Analytics</h3>
          <p className="text-gray-600 mb-4">Get detailed insights and analytics for your portfolio</p>
          <button className="btn-primary w-full">Go to Analytics</button>
        </div>
        
        <div className="card text-center">
          <GlobeAltIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Data</h3>
          <p className="text-gray-600 mb-4">Explore real-time market data and trends</p>
          <button className="btn-primary w-full">View Markets</button>
        </div>
        
        <div className="card text-center">
          <NewspaperIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Latest News</h3>
          <p className="text-gray-600 mb-4">Stay updated with the latest financial news</p>
          <button className="btn-primary w-full">Read News</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 