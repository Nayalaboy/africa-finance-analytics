const express = require('express');
const router = express.Router();

// Mock market data (replace with real data from ETL)
const mockMarketData = {
  stocks: [
    {
      symbol: 'BOAS',
      name: 'Bank of Africa Senegal',
      price: 4280,
      change: 3.38,
      volume: 1500000,
      marketCap: 85000000000,
      sector: 'Finance'
    },
    {
      symbol: 'SAFC',
      name: 'Safca',
      price: 690,
      change: 1.47,
      volume: 2500000,
      marketCap: 45000000000,
      sector: 'Agriculture'
    },
    {
      symbol: 'BOAN',
      name: 'Bank of Africa Niger',
      price: 2455,
      change: -6.65,
      volume: 800000,
      marketCap: 32000000000,
      sector: 'Finance'
    }
  ],
  indices: [
    {
      name: 'BRVM COMPOSITE',
      value: 308.45,
      change: -1.15,
      volume: 1500000000
    },
    {
      name: 'BRVM 30',
      value: 125.67,
      change: 0.85,
      volume: 1200000000
    }
  ],
  currencies: [
    {
      pair: 'USD/XOF',
      rate: 650.25,
      change: 0.12
    },
    {
      pair: 'EUR/XOF',
      rate: 710.50,
      change: -0.08
    }
  ]
};

// Get all market data
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockMarketData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Market data error:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// Get stocks
router.get('/stocks', (req, res) => {
  try {
    const { sector, limit = 50 } = req.query;
    
    let stocks = mockMarketData.stocks;
    
    if (sector) {
      stocks = stocks.filter(stock => 
        stock.sector.toLowerCase() === sector.toLowerCase()
      );
    }
    
    if (limit) {
      stocks = stocks.slice(0, parseInt(limit));
    }
    
    res.json({
      success: true,
      data: stocks,
      count: stocks.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Stocks error:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

// Get specific stock
router.get('/stocks/:symbol', (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = mockMarketData.stocks.find(s => 
      s.symbol.toLowerCase() === symbol.toLowerCase()
    );
    
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    
    res.json({
      success: true,
      data: stock,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Stock detail error:', error);
    res.status(500).json({ error: 'Failed to fetch stock details' });
  }
});

// Get indices
router.get('/indices', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockMarketData.indices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Indices error:', error);
    res.status(500).json({ error: 'Failed to fetch indices' });
  }
});

// Get currencies
router.get('/currencies', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockMarketData.currencies,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Currencies error:', error);
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
});

// Get top gainers
router.get('/top-gainers', (req, res) => {
  try {
    const gainers = mockMarketData.stocks
      .filter(stock => stock.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 10);
    
    res.json({
      success: true,
      data: gainers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Top gainers error:', error);
    res.status(500).json({ error: 'Failed to fetch top gainers' });
  }
});

// Get top losers
router.get('/top-losers', (req, res) => {
  try {
    const losers = mockMarketData.stocks
      .filter(stock => stock.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 10);
    
    res.json({
      success: true,
      data: losers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Top losers error:', error);
    res.status(500).json({ error: 'Failed to fetch top losers' });
  }
});

module.exports = router; 