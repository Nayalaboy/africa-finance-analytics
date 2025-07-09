# Africa Finance Analytics - Frontend

A modern React TypeScript frontend for the Africa Finance Analytics platform.

## Features

- **Modern UI/UX**: Built with React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive components
- **Real-time Data**: Live market data and financial information
- **Authentication**: JWT-based authentication with protected routes
- **Interactive Charts**: Advanced financial charts using Recharts
- **News & Analytics**: Comprehensive financial news and analytics tools

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Heroicons** for icons

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Navigation component
│   └── ProtectedRoute.tsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Dashboard.tsx   # User dashboard
│   ├── MarketData.tsx  # Market data page
│   ├── Analytics.tsx   # Analytics page
│   ├── News.tsx        # News page
│   └── Profile.tsx     # User profile page
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## API Integration

The frontend communicates with the backend API running on `http://localhost:5000`. The proxy is configured in `package.json`.

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Market Data Endpoints

- `GET /api/market/data` - Get market data
- `GET /api/market/stocks` - Get stock listings

### Analytics Endpoints

- `GET /api/analytics/portfolio` - Get portfolio analytics
- `GET /api/analytics/performance` - Get performance metrics

## Styling

The app uses Tailwind CSS with custom components defined in `src/index.css`. Custom utility classes include:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.card` - Card component styling
- `.input-field` - Input field styling

## State Management

Authentication state is managed using React Context (`AuthContext`) with the following features:

- User authentication status
- JWT token management
- Login/logout functionality
- Protected route handling

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Environment Variables

Create a `.env` file in the frontend root directory:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## Contributing

1. Follow the existing code style and structure
2. Use TypeScript for all new components
3. Add proper error handling and loading states
4. Test your changes thoroughly
5. Update documentation as needed

## License

This project is licensed under the MIT License. 