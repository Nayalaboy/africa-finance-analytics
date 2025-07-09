import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  BookmarkIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'markets', name: 'Markets' },
    { id: 'economy', name: 'Economy' },
    { id: 'companies', name: 'Companies' },
    { id: 'regulation', name: 'Regulation' },
    { id: 'technology', name: 'Technology' },
  ];

  const newsArticles = [
    {
      id: '1',
      title: 'BRVM Index Reaches New High as Banking Stocks Rally',
      excerpt: 'The BRVM Composite Index surged 2.5% today, driven by strong performance in the banking sector. Ecobank and SGB led the gains with increases of 3.2% and 2.8% respectively.',
      category: 'markets',
      source: 'Financial Times Africa',
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Central Bank of West African States Announces New Monetary Policy',
      excerpt: 'The BCEAO has introduced new measures to support economic growth while maintaining price stability. The policy changes include adjustments to reserve requirements and lending rates.',
      category: 'economy',
      source: 'Reuters',
      publishedAt: '2024-01-15T09:15:00Z',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'MTN Group Reports Strong Q4 Results',
      excerpt: 'MTN Group has announced impressive fourth-quarter results with revenue growth of 8.5% year-over-year. The company attributes the growth to increased data usage and digital services.',
      category: 'companies',
      source: 'Bloomberg',
      publishedAt: '2024-01-15T08:45:00Z',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'New Fintech Regulations to Boost Digital Banking in West Africa',
      excerpt: 'Regulatory authorities across West Africa are implementing new frameworks to support the growth of digital banking and fintech innovation while ensuring consumer protection.',
      category: 'regulation',
      source: 'African Business',
      publishedAt: '2024-01-14T16:20:00Z',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
    {
      id: '5',
      title: 'Renewable Energy Investments Surge in Côte d\'Ivoire',
      excerpt: 'Côte d\'Ivoire has seen a significant increase in renewable energy investments, with solar and wind projects receiving over $500 million in funding this quarter.',
      category: 'technology',
      source: 'Energy Africa',
      publishedAt: '2024-01-14T14:30:00Z',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop'
    },
    {
      id: '6',
      title: 'African Continental Free Trade Area Shows Early Success',
      excerpt: 'The AfCFTA has facilitated a 15% increase in intra-African trade in its first year of implementation, with West African countries leading the growth.',
      category: 'economy',
      source: 'African Development Bank',
      publishedAt: '2024-01-14T12:00:00Z',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    }
  ];

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredArticles = newsArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => selectedCategory === 'all' || article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial News</h1>
          <p className="text-gray-600">Stay updated with the latest market news and analysis</p>
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
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <div className="card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img 
                src={filteredArticles[0].image} 
                alt={filteredArticles[0].title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
                    {categories.find(c => c.id === filteredArticles[0].category)?.name}
                  </span>
                  <span className="text-sm text-gray-500">{filteredArticles[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{filteredArticles[0].title}</h2>
                <p className="text-gray-600 mb-4">{filteredArticles[0].excerpt}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{filteredArticles[0].source}</span>
                  <span className="text-sm text-gray-500">{formatDate(filteredArticles[0].publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleBookmark(filteredArticles[0].id)}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    {bookmarkedArticles.includes(filteredArticles[0].id) ? (
                      <BookmarkIconSolid className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <BookmarkIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(1).map((article) => (
          <div key={article.id} className="card hover:shadow-lg transition-shadow duration-300">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
                {categories.find(c => c.id === article.category)?.name}
              </span>
              <span className="text-sm text-gray-500">{article.readTime}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{article.source}</span>
                <span className="text-sm text-gray-500">{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleBookmark(article.id)}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  {bookmarkedArticles.includes(article.id) ? (
                    <BookmarkIconSolid className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <BookmarkIcon className="h-4 w-4" />
                  )}
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <ShareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredArticles.length > 0 && (
        <div className="text-center">
          <button className="btn-primary">
            Load More Articles
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default News; 