# VendorPal-FE

A modern, responsive React-based frontend for vendor point-of-sale (POS) and administrative management system. Built with Vite for optimal performance and developer experience.

# VendorPal-FE

A modern, responsive React-based frontend for vendor point-of-sale (POS) and administrative management system. Built with Vite for optimal performance and developer experience.

## Features

### Authentication System
- Secure login/logout with JWT tokens
- Password reset and recovery flows
- Route protection and authorization
- Session management

### Point of Sale (POS)
- **Product Management**: Browse and search product catalog
- **Cart Operations**: Add, remove, and modify cart items
- **Order Processing**: Create, save, and manage customer orders
- **Payment Handling**: Multiple payment methods and processing
- **Order Management**: View order history and status tracking
- **Refund System**: Process returns and refunds

### Admin Dashboard
- **Analytics Dashboard**: Sales reports and business insights
- **Product Management**: CRUD operations for products and categories
- **Order Oversight**: Monitor all system orders and transactions
- **Staff Management**: User accounts and role management
- **System Settings**: Configuration and preferences
- **Reporting Tools**: Generate business reports and analytics

## Project Structure

```
src/
├── pages/                    # Feature-based page components
│   ├── login/               # Authentication pages
│   ├── pos/                 # Point-of-sale interface
│   └── admin/               # Admin dashboard
├── components/              # Reusable UI components
│   ├── AuthGuard.jsx           # Route protection
│   ├── button/                 # Button components
│   ├── dataTable/              # Data table with actions
│   ├── modalWrapper/           # Modal system
│   └── ...                     # Other shared components
├── api/                     # API integration layer
├── hooks/                   # Custom React hooks
├── utils/                   # Utility functions
├── config/                  # Configuration files
└── styles/                  # Global and component styles
```

## Tech Stack

### Core Technologies
- **React** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API communication

### Development Tools
- **ESLint** - Code linting and formatting
- **CSS Modules** - Scoped component styling
- **Modern JavaScript** - ES6+ features and async/await

### Architecture Patterns
- **Component-Based Architecture** - Reusable and maintainable UI components
- **Feature-Folder Structure** - Organized by business functionality
- **Custom Hooks** - Reusable stateful logic (useFetch)
- **Route Guards** - Protected routes with authentication
- **Centralized API Client** - Consistent HTTP request handling

## Styling System

- **CSS Modules** for component-scoped styles
- **Responsive Design** with mobile-first approach

## Authentication Flow

1. **Login**: User credentials → JWT token → localStorage
2. **Route Protection**: AuthGuard checks token validity
3. **API Requests**: Automatic token attachment via interceptors
4. **Session Management**: Auto-logout on token expiration
5. **Logout**: Clear tokens and redirect to login

## Responsive Design

- **Mobile-First**: Optimized for touch devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Enhanced**: Full feature set for large screens
- **Cross-Browser**: Tested on modern browsers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Use CSS Modules for styling
- Write meaningful component and function names
- Add JSDoc comments for complex functions
- Ensure responsive design for all new components

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation wiki
- Contact the development team

---

**Built with ❤️ for modern retail experiences**