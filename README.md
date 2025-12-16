# Boutique Coffee Market

A full-stack web application built with React that serves as an online marketplace for specialty coffee enthusiasts. This project combines e-commerce functionality with a community forum, allowing users to browse premium coffee products, manage their shopping cart, and engage in discussions with fellow coffee lovers.

## Project Overview

Boutique Coffee Market is a React project that demonstrates solid knowledge in modern web development practices. The application provides a complete user experience from browsing products to participating in community discussions, all within an authenticated environment.

## Features

### Coffee Catalog

- Browse a curated selection of premium coffee products
- View detailed product information including descriptions, prices, and images
- Discover specialty coffee from around the world

### Shopping Cart

- Add products to cart (authenticated users only)
- Adjust product quantities
- Remove items from cart
- Cart persistence across sessions
- Real-time cart total calculations

### Community Forum

- Create and publish forum posts
- View and read posts from other community members
- Detailed post view with full content
- User-specific post management (Edit available)
- Engage in discussions about coffee experiences and techniques

### User Authentication

- User registration
- Login functionality with session management
- Protected routes for authenticated features
- User profile management
- Profile customization with images
- Logout functionality

### User Profiles

- View and manage personal profile
- Track forum post history
- Customize profile information
- Upload profile images

## Technology Stack

### Frontend

- **React 19.2.0** - Modern UI library with latest features
- **React Router DOM 7.10.1** - Client-side routing and navigation
- **Vite 7.2.4** - Fast build tool and development server
- **FontAwesome** - Icon library for UI elements
- **CSS3** - Custom styling with responsive design

### Backend

- **SoftUni Practice Server (Not my property!)** - RESTful API backend
- **JSON-based storage** - Data persistence
- **Authentication system** - User management and authorization

## Project Structure

```
React SoftUni Project/
├── src/
│   ├── components/          # React components
│   │   ├── About.jsx
│   │   ├── CoffeeCatalog.jsx
│   │   ├── CoffeeProduct.jsx
│   │   ├── CoffeeProductDetails.jsx
│   │   ├── Contacts.jsx
│   │   ├── CreateForumPost.jsx
│   │   ├── Footer.jsx
│   │   ├── ForumPost.jsx
│   │   ├── ForumPostDetails.jsx
│   │   ├── ForumPostsCatalog.jsx
│   │   ├── GuestRoute.jsx
│   │   ├── Header.jsx
│   │   ├── HistoryOfCompany.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Logout.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Register.jsx
│   │   ├── ShoppingCart.jsx
│   │   ├── UserDetails.jsx
│   │   └── UserPosts.jsx
│   ├── contexts/            # React contexts for state management
│   │   ├── CartContext.jsx
│   │   └── UserContext.jsx
│   ├── styles/              # CSS stylesheets
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── server/                  # Backend server files
│   ├── server.js
│   ├── package.json
│   └── data/
├── photos/                  # Product images
├── package.json
├── vite.config.js
└── index.html
```

## Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/Nikoloff10/React-SoftUni-Project
cd "React SoftUni Project"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install server dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:3030`

## Available Scripts

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage Guide

### Getting Started

1. Start both the backend server and frontend development server
2. Navigate to `http://localhost:5173` in your browser
3. Register a new account or login with existing credentials

### Browsing Products

- Visit the Catalog page from the navigation menu
- Click on any product to view detailed information
- Add products to your cart when logged in

### Using the Forum

- Navigate to the Forum section
- Create new posts to share your coffee experiences
- Read and engage with posts from other community members
- Manage your posts from your profile page

### Managing Your Profile

- Click on your profile icon in the navigation bar
- View your personal information and post history
- Update your profile details
- Upload a custom profile picture

## Key Components

### Context Providers

- **UserContext** - Manages user authentication state and user data
- **CartContext** - Handles shopping cart state and operations

### Protected Routes

- **ProtectedRoute** - Restricts access to authenticated users only
- **GuestRoute** - Restricts access to non-authenticated users only

### Main Features

- **CoffeeCatalog** - Product listing
- **ForumPostsCatalog** - Community forum post listing
- **ShoppingCart** - Cart management interface
- **UserDetails** - User profile and settings

## API Endpoints

The application communicates with the SoftUni Practice Server (which is NOT my property!) using the following endpoints:

### Authentication

- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/logout` - User logout

### Products

- `GET /data/coffeeProducts` - Fetch all products
- `GET /data/coffeeProducts/:id` - Fetch single product

### Forum Posts

- `GET /data/forumPosts` - Fetch all forum posts
- `GET /data/forumPosts/:id` - Fetch single post
- `POST /data/forumPosts` - Create new post
- `PUT /data/forumPosts/:id` - Update post
- `DELETE /data/forumPosts/:id` - Delete post

### User Profiles

- `GET /data/userProfiles` - Fetch user profiles
- `POST /data/userProfiles` - Create profile
- `PUT /data/userProfiles/:id` - Update profile

## Development Practices

### Code Organization

- Component-based architecture
- Separation of concerns with contexts
- Reusable components
- Consistent file structure

### State Management

- React Context API for global state
- Component-level state with useState
- Effect hooks for side effects
- Custom hooks for reusable logic

### Routing

- Client-side routing with React Router
- Protected and guest route wrappers
- Dynamic route parameters
- Programmatic navigation

### Styling

- Component-specific CSS files
- Responsive design principles
- Mobile-first approach
- Consistent design system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Cart data is stored locally and not persisted to the backend
- Image uploads are handled locally without cloud storage integration
- Payment processing is not implemented

## Contributing

This is a SoftUni educational project. Contributions, issues, and feature requests are welcome for learning purposes.

## License

This project is created for educational purposes as part of the SoftUni curriculum.

## Acknowledgments

- SoftUni for providing the project requirements and backend server
