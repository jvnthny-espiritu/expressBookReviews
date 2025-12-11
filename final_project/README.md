# Express Book Reviews API

A RESTful API application for managing books and user reviews with JWT-based authentication. This project demonstrates best practices in Node.js/Express development including proper code organization, error handling, and comprehensive documentation.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- 📚 Browse books by ISBN, author, or title
- 👤 User registration and authentication using JWT
- ✍️ Add, update, and delete book reviews (authenticated users)
- 🔒 Secure routes with JWT token verification
- 📝 Clean code structure following MVC pattern
- ✅ Comprehensive error handling
- 📖 Well-documented API endpoints

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Session Management**: express-session
- **Code Quality**: ESLint
- **Testing**: Jest & Supertest
- **Development**: Nodemon

## Project Structure

```
final_project/
├── src/
│   ├── config/
│   │   └── constants.js        # Application configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── booksController.js  # Books operations
│   │   └── reviewsController.js # Reviews operations
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/
│   │   ├── booksModel.js       # Books data model
│   │   └── usersModel.js       # Users data model
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication routes
│   │   └── publicRoutes.js     # Public routes
│   └── app.js                  # Main application
├── tests/                       # Test files
├── index.js                     # Entry point
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:
```bash
git clone https://github.com/jvnthny-espiritu/expressBookReviews.git
cd expressBookReviews/final_project
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set environment variables:
```bash
# Create a .env file with the following variables
PORT=5000
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Usage

### Development

```bash
# Start development server with auto-reload
npm run dev

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint:fix

# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

### Production

```bash
npm start
```

## API Documentation

### Base URL
```
http://localhost:5000
```

### Public Endpoints

#### 1. Get All Books
```http
GET /
```

**Response:**
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  },
  "2": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "reviews": {}
  }
  // ... more books
}
```

#### 2. Get Book by ISBN
```http
GET /isbn/:isbn
```

**Parameters:**
- `isbn` (path parameter): Book ISBN number

**Example:**
```bash
curl http://localhost:5000/isbn/1
```

**Response:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

#### 3. Get Books by Author
```http
GET /author/:author
```

**Parameters:**
- `author` (path parameter): Author name

**Example:**
```bash
curl http://localhost:5000/author/Jane%20Austen
```

**Response:**
```json
[
  {
    "isbn": "8",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

#### 4. Get Books by Title
```http
GET /title/:title
```

**Parameters:**
- `title` (path parameter): Book title

**Example:**
```bash
curl http://localhost:5000/title/Pride%20and%20Prejudice
```

**Response:**
```json
[
  {
    "isbn": "8",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

#### 5. Register User
```http
POST /register
```

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "message": "User successfully registered. Now you can login"
}
```

### Authentication Required Endpoints

#### 6. Login
```http
POST /customer/login
```

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "message": "User successfully logged in",
  "username": "john_doe",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 7. Add/Update Review
```http
PUT /customer/auth/review/:isbn?review=your_review_text
```

**Parameters:**
- `isbn` (path parameter): Book ISBN
- `review` (query parameter): Review text

**Headers:**
- Session cookie (automatically handled after login)

**Example:**
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!" \
  --cookie "connect.sid=session_id_from_login"
```

**Response:**
```json
{
  "message": "Review added successfully",
  "isbn": "1",
  "username": "john_doe",
  "review": "Great book!"
}
```

#### 8. Delete Review
```http
DELETE /customer/auth/review/:isbn
```

**Parameters:**
- `isbn` (path parameter): Book ISBN

**Headers:**
- Session cookie (automatically handled after login)

**Example:**
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  --cookie "connect.sid=session_id_from_login"
```

**Response:**
```json
{
  "message": "Review deleted successfully",
  "isbn": "1",
  "username": "john_doe"
}
```

## Code Quality

This project follows industry best practices:

### Naming Conventions
- **Variables and Functions**: camelCase (e.g., `getUserByUsername`, `accessToken`)
- **Files**: camelCase (e.g., `authController.js`, `booksModel.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`, `PORT`)

### Code Organization
- **MVC Pattern**: Separation of concerns with Models, Controllers, and Routes
- **Middleware**: Reusable authentication and error handling
- **Configuration**: Centralized constants and configuration

### Error Handling
- Comprehensive try-catch blocks
- Meaningful error messages
- Proper HTTP status codes

### Linting
ESLint is configured with recommended rules. Run:
```bash
npm run lint
```

## Testing

The project uses Jest and Supertest for testing.

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm run test
```

### Test Structure
```
tests/
├── auth.test.js
├── books.test.js
└── reviews.test.js
```

## Security Considerations

- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Server-side session storage
- **Input Validation**: All user inputs are validated
- **Error Messages**: Generic error messages to prevent information leakage

**Note**: In a production environment:
- Use environment variables for sensitive data
- Hash passwords using bcrypt
- Use HTTPS
- Implement rate limiting
- Use a proper database instead of in-memory storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Guidelines
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Author

**jvnthny-espiritu**

## Acknowledgments

- IBM Full Stack Software Developer Professional Certificate
- Express.js community
- Node.js community

---

**Version**: 2.0.0  
**Last Updated**: December 2025
