# Aistrology

A modern AI-powered astrology application built with React, Node.js, and OpenAI integration.

## 🚀 Features

- Real-time AI-powered astrology readings and chat
- User authentication and authorization
- WebSocket integration for live chat functionality
- MongoDB database for data persistence
- Secure password hashing with bcrypt
- JWT-based authentication
- Modern React frontend with Vite
- Express.js backend with RESTful APIs

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- MongoDB database
- OpenAI API key
- Roxy API key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aistrology.git
cd aistrology
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ROXY_API_KEY=your_roxy_api_key
PORT=3000
```

## 🚀 Development

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## 📦 Project Structure

```
aistrology/
├── frontend/
│   ├── src/           # React source files
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/
│   ├── models/        # MongoDB models
│   ├── utils/         # Utility functions
│   ├── server.js      # Express server
│   ├── ai.js          # AI integration
│   └── package.json   # Backend dependencies
└── README.md
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Secure WebSocket connections

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- Arpit Bansal - Initial work


## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the build tool
- OpenAI for AI capabilities
- MongoDB team for the database
