import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  CalculatorIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const portfolioData = [
    { date: 'Jan 1', value: 100000, return: 0 },
    { date: 'Jan 8', value: 102500, return: 2.5 },
    { date: 'Jan 15', value: 101200, return: 1.2 },
    { date: 'Jan 22', value: 104800, return: 4.8 },
    { date: 'Jan 29', value: 107500, return: 7.5 },
    { date: 'Feb 5', value: 110200, return: 10.2 },
  ];

  const sectorAllocation = [
    { name: 'Banking', value: 35, color: '#3b82f6' },
    { name: 'Telecom', value: 25, color: '#10b981' },
    { name: 'Energy', value: 20, color: '#f59e0b' },
    { name: 'Consumer', value: 15, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ];

  const performanceMetrics = [
    { metric: 'Total Return', value: '10.2%', change: '+2.1%', positive: true },
    { metric: 'Sharpe Ratio', value: '1.45', change: '+0.15', positive: true },
    { metric: 'Beta', value: '0.85', change: '-0.05', positive: true },
    { metric: 'Alpha', value: '2.3%', change: '+0.8%', positive: true },
    { metric: 'Max Drawdown', value: '-8.5%', change: '-1.2%', positive: false },
    { metric: 'Volatility', value: '12.3%', change: '-0.7%', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Advanced portfolio analysis and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="input-field"
          >
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="6M">6 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Portfolio Value</h3>
            <ChartBarIcon className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$110,200</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            +10.2% this month
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Score</h3>
            <CalculatorIcon className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">7.2/10</p>
          <p className="text-sm text-gray-600 mt-2">Moderate risk profile</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Diversification</h3>
            <DocumentTextIcon className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-600 mt-2">Well diversified</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Allocation */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600">{metric.metric}</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              <p className={`text-sm font-medium mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Market Risk</span>
                <span>Medium</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Credit Risk</span>
                <span>Low</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Liquidity Risk</span>
                <span>Low</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Consider increasing exposure to tech sector</p>
                <p className="text-xs text-gray-600">Based on current market trends</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Monitor banking sector volatility</p>
                <p className="text-xs text-gray-600">Recent regulatory changes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Rebalance portfolio monthly</p>
                <p className="text-xs text-gray-600">Maintain target allocations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 