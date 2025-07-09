# Africa Finance Analytics - Backend API

A Node.js backend API for the Africa Finance Analytics platform, providing financial data aggregation, analytics, and subscription management.

## 🚀 Features

- **Authentication & Authorization**: JWT-based user authentication
- **Market Data API**: Stock prices, indices, currencies
- **Analytics Engine**: Market analysis, portfolio analysis, trends
- **Subscription Management**: Payment processing with Stripe/Paystack
- **ETL Pipeline**: Data fetching from Yahoo Finance and other sources
- **Real-time Data**: Live market data updates

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for production)
- Redis (for caching)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd africa-finance-analytics/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

- **Database**: PostgreSQL connection details
- **JWT**: Secret key for authentication
- **Payment**: Stripe or Paystack API keys
- **External APIs**: Yahoo Finance, Bloomberg API keys

### Database Setup

1. Install PostgreSQL
2. Create database: `africa_finance`
3. Run migrations (when available)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Market Data
- `GET /api/market` - Get all market data
- `GET /api/market/stocks` - Get stocks list
- `GET /api/market/stocks/:symbol` - Get specific stock
- `GET /api/market/indices` - Get market indices
- `GET /api/market/currencies` - Get currency rates
- `GET /api/market/top-gainers` - Get top gainers
- `GET /api/market/top-losers` - Get top losers

### Analytics (Premium)
- `GET /api/analytics/dashboard` - Dashboard analytics
- `GET /api/analytics/summary` - Market summary
- `GET /api/analytics/sectors` - Sector performance
- `GET /api/analytics/top-performers` - Top performers
- `GET /api/analytics/trends` - Market trends
- `GET /api/analytics/company/:symbol` - Company analysis
- `POST /api/analytics/portfolio` - Portfolio analysis

### Subscriptions
- `GET /api/subscription/plans` - Get available plans
- `POST /api/subscription/checkout` - Create checkout session
- `POST /api/subscription/webhook` - Payment webhook
- `GET /api/subscription/user/:userId` - Get user subscription
- `POST /api/subscription/cancel/:id` - Cancel subscription

## 🔄 ETL Pipeline

### Data Sources
- **Yahoo Finance**: Stock prices, currency rates
- **BRVM**: West African stock exchange data
- **Local News**: Financial news aggregation

### Running ETL Jobs

```bash
# Fetch all data
node etl/fetch_yahoo_finance.js

# Fetch specific symbol
node etl/fetch_yahoo_finance.js AAPL

# Schedule with cron (example)
# 0 */4 * * * cd /path/to/backend && node etl/fetch_yahoo_finance.js
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📊 Data Structure

### Stock Data
```json
{
  "symbol": "BOAS",
  "name": "Bank of Africa Senegal",
  "price": 4280,
  "change": 3.38,
  "volume": 1500000,
  "marketCap": 85000000000,
  "sector": "Finance"
}
```

### Analytics Data
```json
{
  "marketSummary": {
    "totalMarketCap": 2500000000000,
    "totalVolume": 85000000000,
    "activeStocks": 45,
    "gainers": 28,
    "losers": 17
  }
}
```

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Input validation

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t africa-finance-backend .

# Run container
docker run -p 5000:5000 africa-finance-backend
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong JWT secret
- Configure production database
- Set up SSL certificates

## 📈 Monitoring

- Health check endpoint: `GET /api/health`
- Logging with Winston
- Error tracking (Sentry recommended)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📝 License

MIT License

## 🆘 Support

For support, email support@africafinance.com or create an issue.

---

**Next Steps:**
1. Set up PostgreSQL database
2. Configure payment providers
3. Add more data sources
4. Implement real-time features
5. Add comprehensive testing 