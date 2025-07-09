# Africa Finance Analytics

A full-stack financial analytics platform for West and Central Africa with LLM-powered features and modern UX.

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd africa-finance-analytics
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📋 Project Overview

Aggregate financial data from global (Bloomberg, Yahoo Finance) and local (West/Central African banks, news, APIs) sources, analyze it, and present insights to subscribers (readers and companies).

## 🛠 Tech Stack

- **Frontend:** React.js (TypeScript), Tailwind CSS, Recharts, React Router
- **Backend:** Node.js (Express), JWT Authentication
- **Database:** PostgreSQL (main), Redis (cache)
- **ETL/Data Aggregation:** Node.js scripts with cron jobs
- **Analytics:** Advanced financial analytics and visualization
- **Authentication & Payments:** JWT, Stripe/Paystack integration
- **Deployment:** Docker, docker-compose

## ✨ Features

- **Real-time Market Data** - Live financial data from BRVM, BVMAC, and international markets
- **Advanced Analytics** - Portfolio analysis, risk assessment, and performance metrics
- **News & Analysis** - AI-powered news summaries and expert analysis
- **User Dashboard** - Personalized portfolio tracking and insights
- **Authentication** - Secure user registration and login
- **Responsive Design** - Mobile-first approach with modern UI/UX

## 🏗 Architecture

```mermaid
graph TD
    A[Data Sources<br/>(Bloomberg, Yahoo Finance, BRVM, News APIs)] --> B[ETL Service]
    B --> C[PostgreSQL Database]
    C --> D[Backend API (Node.js)]
    D --> E[Frontend (React.js)]
    D --> F[Redis Cache]
    E --> G[Users (Readers, Companies)]
    G --> H[Payment Gateway (Stripe/Paystack)]
    D --> H
```

## 📁 Project Structure

```
africa-finance-analytics/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic
│   └── package.json
├── frontend/               # React TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── App.tsx         # Main app
│   └── package.json
├── docker-compose.yml      # Docker orchestration
└── README.md
```

## 🔧 Development

### Backend Development
- API endpoints for authentication, market data, and analytics
- JWT-based authentication
- PostgreSQL database integration
- Redis caching for performance

### Frontend Development
- Modern React with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Responsive design for all devices

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
Create `.env` files in both backend and frontend directories:

**Backend (.env):**
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@host:5432/db
REDIS_URL=redis://host:6379
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- **LLM Integration** - Automated news summaries and AI-powered insights
- **Real-time Alerts** - Custom notifications for market movements
- **Mobile App** - Native iOS and Android applications
- **Advanced Analytics** - Machine learning models for predictions
- **Multi-language Support** - French, English, and local languages
- **Community Features** - Forums and user discussions
