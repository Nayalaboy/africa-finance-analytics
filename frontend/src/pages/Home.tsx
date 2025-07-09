import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  GlobeAltIcon, 
  NewspaperIcon, 
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Real-time Market Data',
      description: 'Access live financial data from major African exchanges including BRVM, BVMAC, and international markets.'
    },
    {
      icon: NewspaperIcon,
      title: 'Curated News & Analysis',
      description: 'Stay informed with AI-powered news summaries and expert analysis of African financial markets.'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Advanced Analytics',
      description: 'Get insights with our advanced analytics tools and predictive models for better investment decisions.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Market Coverage',
      description: 'Comprehensive coverage of West and Central African markets with global context.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Bank-grade security with real-time data validation and backup systems.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Portfolio Management',
      description: 'Track your investments with our portfolio management tools and performance analytics.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Africa Finance Analytics
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive platform for financial data, market insights, and investment analytics 
            across West and Central Africa. Powered by AI and real-time data aggregation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started Free
            </Link>
            <Link to="/market" className="btn-secondary text-lg px-8 py-3">
              Explore Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Africa Finance Analytics?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the most comprehensive financial data and analytics platform 
            specifically designed for African markets.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <feature.icon className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">African Markets</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Real-time Data</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Financial Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of investors and analysts who trust Africa Finance Analytics 
          for their market intelligence needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Create Free Account
          </Link>
          <Link 
            to="/market" 
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
          >
            View Live Markets
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 