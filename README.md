# Civix - Civic Engagement Platform

<div align="center">

![Civix Logo](Civix/frontend/public/vite.svg)

**A modern, full-stack platform empowering citizens to engage with public officials through petitions, polls, and community reporting.**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Key Features Details](#key-features-details)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Civix is a comprehensive civic engagement platform designed to bridge the gap between citizens and public officials. The platform enables citizens to create and sign petitions, participate in polls, and generate reports, while providing officials with tools to manage, review, and respond to community concerns.

### Key Highlights

- **Dual-Dashboard System**: Separate interfaces for citizens and officials
- **Role-Based Access Control**: Secure authentication and authorization
- **File Upload Support**: Attach supporting documents to petitions
- **Real-Time Analytics**: Engagement trends and statistical dashboards
- **Modern UI/UX**: Responsive design built with Tailwind CSS

## ✨ Features

### For Citizens

- 🔐 **Secure Authentication**: Register and login with JWT-based authentication
- 📝 **Create Petitions**: Start petitions with descriptions, categories, and goals
- ✍️ **Sign Petitions**: Support causes you care about
- 💬 **Comment System**: Engage in discussions on petitions
- 📎 **File Attachments**: Upload supporting documents (up to 5 files per petition)
- 📊 **Create Polls**: Create polls with multiple options
- 🗳️ **Vote on Polls**: Participate in community polls
- 📈 **Personal Dashboard**: View your engagement statistics
- 📑 **Reports**: Generate and export detailed reports

### For Officials

- 🏛️ **Official Dashboard**: Access location-specific petitions and polls
- 🔄 **Status Management**: Update petition status (Active, Under Review, Closed)
- 📊 **Advanced Analytics**: View engagement trends and statistics
- 👥 **Community Insights**: Monitor citizen engagement patterns
- 📋 **Location-Based Filtering**: Focus on petitions from your jurisdiction

### General Features

- 🎨 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔒 **Security**: Helmet.js security headers, CORS protection, HTTP-only cookies
- 📱 **Modern UI**: Clean, intuitive interface with smooth animations
- 🚀 **Performance**: Optimized builds with Vite
- 📈 **Data Visualization**: Charts and graphs using Recharts

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **React Router DOM 7.9.1** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Axios 1.12.2** - HTTP client
- **Recharts 2.15.4** - Chart library
- **React Toastify 11.0.5** - Toast notifications
- **Lucide React 0.544.0** - Icon library
- **js-cookie 3.0.5** - Cookie management

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.18.1** - ODM for MongoDB
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 3.0.2** - Password hashing
- **Multer 2.0.2** - File upload handling
- **Helmet 8.1.0** - Security middleware
- **CORS 2.8.5** - Cross-origin resource sharing
- **Cookie Parser 1.4.7** - Cookie parsing
- **dotenv 17.2.2** - Environment variables

## 📁 Project Structure

```
Civix/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authControllers.js    # Authentication logic
│   │   ├── dashboardController.js # Dashboard statistics
│   │   ├── petitionController.js  # Petition CRUD operations
│   │   ├── pollController.js      # Poll CRUD operations
│   │   └── reportController.js    # Report generation
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication middleware
│   │   ├── errorMiddleware.js     # Error handling middleware
│   │   ├── roleMiddleware.js      # Role-based access control
│   │   └── uploadMiddleware.js    # File upload configuration
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Petition.js            # Petition schema
│   │   └── Poll.js                # Poll schema
│   ├── routes/
│   │   ├── Auth.js                # Authentication routes
│   │   ├── dashboardRoutes.js     # Dashboard routes
│   │   ├── petitionRoutes.js      # Petition routes
│   │   ├── pollRoutes.js          # Poll routes
│   │   └── reportRoutes.js        # Report routes
│   ├── utils/
│   │   └── generateToken.js       # JWT token generation
│   ├── uploads/                   # Uploaded files storage
│   ├── server.js                  # Express server entry point
│   └── package.json
│
└── frontend/
    ├── public/                    # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── ui/                # Reusable UI components
    │   │   ├── AuthLayout.jsx
    │   │   ├── CitizenDashboard.jsx
    │   │   ├── CreatePetition.jsx
    │   │   ├── CreatePoll.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── DashboardContent.jsx
    │   │   ├── EditPetition.jsx
    │   │   ├── EditPoll.jsx
    │   │   ├── Login.jsx
    │   │   ├── OfficialDashboard.jsx
    │   │   ├── Petitions.jsx
    │   │   ├── Polls.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Register.jsx
    │   │   ├── Reports.jsx
    │   │   ├── Settings.jsx
    │   │   └── SinglePetition.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Authentication context
    │   ├── Utils/
    │   │   └── api.jsx            # API configuration
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── vite.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Civixgood1
```

2. **Install backend dependencies**

```bash
cd Civix/backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Environment Variables

1. **Backend Environment Variables**

Create a `.env` file in the `Civix/backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/civix
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/civix?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS Configuration
CLIENT_URL=http://localhost:5173
CLIENT_URL_PROD=https://your-production-frontend-url.com
```

2. **Frontend Environment Variables**

Create a `.env` file in the `Civix/frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
# OR for production:
# VITE_API_URL=https://your-production-backend-url.com/api
```

### Running the Application

1. **Start MongoDB** (if using local installation)

```bash
# On macOS/Linux
mongod

# On Windows
net start MongoDB
```

2. **Start the backend server**

```bash
cd Civix/backend
npm run dev
```

The backend server will start on `http://localhost:5000`

3. **Start the frontend development server**

```bash
cd Civix/frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (or port 3000 as configured)

4. **Open your browser**

Navigate to `http://localhost:5173` to access the application

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Petition Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/petitions` | Get all petitions | Yes |
| GET | `/api/petitions/trending` | Get trending petitions | Yes |
| GET | `/api/petitions/official` | Get petitions for officials | Yes (Official) |
| POST | `/api/petitions/create` | Create a new petition | Yes |
| GET | `/api/petitions/:id` | Get petition by ID | Yes |
| PUT | `/api/petitions/:id` | Update petition | Yes |
| DELETE | `/api/petitions/:id` | Delete petition | Yes |
| POST | `/api/petitions/:id/sign` | Sign a petition | Yes |
| PUT | `/api/petitions/:id/status` | Update petition status | Yes (Official) |
| POST | `/api/petitions/:id/files` | Upload supporting files | Yes |
| DELETE | `/api/petitions/:id/files/:fileId` | Delete file | Yes |
| POST | `/api/petitions/:id/comments` | Add comment | Yes |
| DELETE | `/api/petitions/:id/comments/:commentId` | Delete comment | Yes |

### Poll Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/polls` | Get all polls | Yes |
| POST | `/api/polls/create` | Create a new poll | Yes |
| GET | `/api/polls/:id` | Get poll by ID | Yes |
| PUT | `/api/polls/:id` | Update poll | Yes |
| DELETE | `/api/polls/:id` | Delete poll | Yes |
| POST | `/api/polls/:pollId/vote` | Vote on a poll | Yes |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard/stats` | Get citizen dashboard stats | Yes |
| GET | `/api/dashboard/official-stats` | Get official dashboard stats | Yes (Official) |
| GET | `/api/dashboard/engagement-trends` | Get engagement trends | Yes |

### Report Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/reports/stats` | Get report statistics | Yes |
| GET | `/api/reports/detailed` | Get detailed reports | Yes |
| GET | `/api/reports/export` | Export reports as CSV | Yes |

## 🔑 Key Features Details

### Authentication & Authorization

- **JWT-based Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Tokens stored in secure HTTP-only cookies
- **Role-Based Access Control**: Separate permissions for Citizens and Officials
- **Password Hashing**: bcryptjs for secure password storage

### Petitions

- **Status Tracking**: Three statuses - Active, Under Review, Closed
- **Signature Goals**: Set and track signature goals
- **File Attachments**: Upload up to 5 supporting files per petition
- **Comments**: Engage in discussions with comments
- **Category System**: Organize petitions by category
- **Location-Based**: Filter petitions by location
- **Trending Algorithm**: Sort by status priority and signature count

### Polls

- **Multiple Options**: Create polls with multiple answer options
- **Vote Tracking**: Track who has voted (prevents duplicate voting)
- **Real-time Results**: View poll results instantly
- **Location-Based**: Filter polls by location

### Dashboard Analytics

- **Engagement Trends**: View engagement over time (day, week, month, year)
- **Statistical Overview**: Total petitions, polls, signatures, votes
- **Visual Charts**: Interactive charts using Recharts
- **Role-Specific Views**: Different dashboards for citizens and officials

## 🚢 Deployment

### Backend Deployment (Render/Heroku/Vercel)

1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is configured
3. Build command: `npm install`
4. Start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Set `VITE_API_URL` environment variable
2. Build command: `npm run build`
3. Output directory: `dist`

### Database

- Use MongoDB Atlas for cloud database hosting
- Update `MONGO_URI` with your Atlas connection string

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB for the database solution
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors whose packages made this project possible

---

<div align="center">

**Built with ❤️ for better civic engagement**

[Report Bug](https://github.com/yourusername/civix/issues) · [Request Feature](https://github.com/yourusername/civix/issues)

</div>

