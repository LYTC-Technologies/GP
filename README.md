# Villa Musk Guest Portal

A comprehensive guest portal system for luxury hotel services, built with React and TypeScript.

## Overview

The Villa Musk Guest Portal provides guests with a seamless digital experience for managing their stay. The system includes:

- **Order Management**: Browse and order from restaurant menu, drinks, and room service
- **Special Requests**: Submit personalized service requests directly to staff
- **Special Offers**: View and take advantage of exclusive hotel offers
- **Stay Rating**: Provide feedback and rate the overall stay experience
- **Payment Management**: View and manage stay-related payments
- **Real-time Updates**: Track order status and service requests in real-time

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: React Hooks and Context API
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM with hash-based routing
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS with custom luxury theme
- **API Integration**: RESTful API with backend integration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LYTC-Technologies/GP.git
   cd GP
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL (typically http://localhost:5173)

## Configuration

The application connects to the backend API at:
```
https://lytc-hotel-backend.onrender.com
```

API endpoints are configured in `src/lib/api.ts`.

## Features

### Order System
- Browse menu items by category (Food, Drinks, Room Service)
- Add items to cart with quantity management
- Submit orders with optional notes
- Track order status in real-time

### Special Requests
- Submit personalized service requests
- Choose from predefined service categories
- Add detailed notes for specific requirements
- Track request status

### Special Offers
- View exclusive hotel offers
- Access promotional packages
- Take advantage of seasonal deals

### Stay Rating
- Rate overall stay experience
- Provide detailed feedback
- Submit ratings with optional comments

### Payment Management
- View stay-related charges
- Track payment history
- Access billing information

## Project Structure

```
GP/
├── src/
│   ├── components/       # React components
│   ├── lib/             # API services and utilities
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML entry point
└── package.json         # Project dependencies
```

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## API Integration

The application integrates with the following API endpoints:

- `GET /api/guest/menu` - Fetch menu items
- `GET /api/guest/orders` - Fetch order history
- `POST /api/guest/orders` - Create new orders
- `GET /api/guest/stays/special-orders` - Fetch special orders
- `GET /api/guest/special-offers` - Fetch special offers
- `GET /api/guest/stay-details` - Fetch stay information
- `POST /api/guest/stay/rating` - Submit stay rating

## License

This project is proprietary and confidential property of LYTC Technologies.

## Contact

For support and inquiries, contact LYTC Technologies.

## Version

Current version: 1.0.0

