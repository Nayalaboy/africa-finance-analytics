const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Yahoo Finance API configuration
const YAHOO_FINANCE_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Sample African stocks (you can expand this list)
const AFRICAN_STOCKS = [
  'BOAS.SN', // Bank of Africa Senegal
  'SAFC.CI', // Safca Côte d'Ivoire
  'BOAN.NE', // Bank of Africa Niger
  'SMBC.CI', // SMB Côte d'Ivoire
  'CFAC.CI', // CFAO Côte d'Ivoire
  'NSIA.CI', // NSIA Banque Côte d'Ivoire
  'SGBC.CI', // SGBCI Côte d'Ivoire
  'SAPH.CI', // SAPH Côte d'Ivoire
  'PALM.CI', // PALMCI Côte d'Ivoire
  'TOTAL.CI' // Total Côte d'Ivoire
];

// Currency pairs for West Africa
const CURRENCY_PAIRS = [
  'USDXOF=X', // USD to XOF (West African CFA)
  'EURXOF=X', // EUR to XOF
  'GBPXOF=X', // GBP to XOF
  'USDXAF=X', // USD to XAF (Central African CFA)
  'EURXAF=X'  // EUR to XAF
];

/**
 * Fetch stock data from Yahoo Finance
 * @param {string} symbol - Stock symbol
 * @param {string} interval - Data interval (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
 * @param {string} range - Time range
 * @returns {Promise<Object>} Stock data
 */
async function fetchStockData(symbol, interval = '1d', range = '5d') {
  try {
    const url = `${YAHOO_FINANCE_BASE_URL}/${symbol}`;
    const params = {
      interval,
      range,
      includePrePost: false,
      events: 'div,split'
    };

    console.log(`Fetching data for ${symbol}...`);
    
    const response = await axios.get(url, { params });
    
    if (response.data.chart.error) {
      console.error(`Error fetching ${symbol}:`, response.data.chart.error);
      return null;
    }

    const result = response.data.chart.result[0];
    const quote = result.indicators.quote[0];
    const timestamps = result.timestamp;
    
    // Process the data
    const processedData = {
      symbol,
      meta: result.meta,
      data: timestamps.map((timestamp, index) => ({
        timestamp: timestamp * 1000, // Convert to milliseconds
        open: quote.open[index] || null,
        high: quote.high[index] || null,
        low: quote.low[index] || null,
        close: quote.close[index] || null,
        volume: quote.volume[index] || null
      })).filter(item => item.close !== null) // Remove null values
    };

    return processedData;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
    return null;
  }
}

/**
 * Fetch currency data
 * @param {string} pair - Currency pair symbol
 * @returns {Promise<Object>} Currency data
 */
async function fetchCurrencyData(pair) {
  try {
    const data = await fetchStockData(pair, '1d', '5d');
    if (data) {
      return {
        pair,
        currentRate: data.data[data.data.length - 1]?.close,
        change: data.data.length > 1 ? 
          ((data.data[data.data.length - 1].close - data.data[data.data.length - 2].close) / data.data[data.data.length - 2].close * 100) : 0,
        data: data.data
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching currency data for ${pair}:`, error.message);
    return null;
  }
}

/**
 * Save data to JSON file
 * @param {Object} data - Data to save
 * @param {string} filename - Filename
 */
async function saveData(data, filename) {
  try {
    const dataDir = path.join(__dirname, 'data');
    
    // Create data directory if it doesn't exist
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    const filepath = path.join(dataDir, filename);
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filepath}`);
  } catch (error) {
    console.error('Error saving data:', error.message);
  }
}

/**
 * Main function to fetch all data
 */
async function fetchAllData() {
  console.log('🚀 Starting data fetch from Yahoo Finance...');
  
  const results = {
    timestamp: new Date().toISOString(),
    stocks: [],
    currencies: []
  };

  // Fetch stock data
  console.log('\n📈 Fetching stock data...');
  for (const symbol of AFRICAN_STOCKS) {
    const stockData = await fetchStockData(symbol);
    if (stockData) {
      results.stocks.push(stockData);
    }
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Fetch currency data
  console.log('\n💱 Fetching currency data...');
  for (const pair of CURRENCY_PAIRS) {
    const currencyData = await fetchCurrencyData(pair);
    if (currencyData) {
      results.currencies.push(currencyData);
    }
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save data
  console.log('\n💾 Saving data...');
  await saveData(results, `yahoo_finance_${new Date().toISOString().split('T')[0]}.json`);
  
  console.log('\n✅ Data fetch completed!');
  console.log(`📊 Stocks fetched: ${results.stocks.length}`);
  console.log(`💱 Currencies fetched: ${results.currencies.length}`);
  
  return results;
}

/**
 * Fetch data for a specific symbol
 * @param {string} symbol - Stock or currency symbol
 */
async function fetchSpecificData(symbol) {
  console.log(`🔍 Fetching data for ${symbol}...`);
  
  if (symbol.includes('=X')) {
    // Currency pair
    const data = await fetchCurrencyData(symbol);
    if (data) {
      await saveData(data, `${symbol.replace('=X', '')}_${new Date().toISOString().split('T')[0]}.json`);
    }
  } else {
    // Stock
    const data = await fetchStockData(symbol);
    if (data) {
      await saveData(data, `${symbol}_${new Date().toISOString().split('T')[0]}.json`);
    }
  }
}

// Export functions
module.exports = {
  fetchAllData,
  fetchSpecificData,
  fetchStockData,
  fetchCurrencyData
};

// Run if called directly
if (require.main === module) {
  const symbol = process.argv[2];
  
  if (symbol) {
    fetchSpecificData(symbol);
  } else {
    fetchAllData();
  }
} 