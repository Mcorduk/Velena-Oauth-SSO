# TODO List

## High Priority~

- [ ] Understand CORS

## Medium Priority

- [TODO] Do you need Views? delete ejs, middlewares for static files etc.

## Low Priority

- [ ] Add response-time
- [ ] Check if need to remove morgan

## General

- [ ] Consider more granular timeouts: If specific routes or API
      endpoints have known longer response times, apply timeouts selectively.
- [ ] Understand pino a little bit better
- [ ] Fix password tests as it will only accept hashed passwords
- [ ] Add ip, client id, client name etc to loginAt registerAt

## Optional

## Wishful Thinking

## Instructions

### 1. Establish Folder Structure

Create folders for models, controllers, services, middlewares, routes, tests, and config.  
Organize files within each folder for clarity and maintainability.

### 2. Implement Core Models

Use Mongoose to define schemas for:  
User (username, email, password hash, etc.)  
Client (client ID, client secret, redirect URIs, etc.)  
Access Token (client ID, user ID, scopes, expiration, etc.)  
Refresh Token (client ID, user ID, scopes, expiration, etc.)

### 3. Write Tests for Models (TDD)

Use Jest to create tests for model validation, persistence, and retrieval.  
Ensure models meet requirements before implementing functionality.

### 4. Create Services

Encapsulate core business logic in reusable services:  
UserService (register, authenticate, find user, etc.)  
ClientService (create client, find client, generate client credentials, etc.)  
TokenService (generate access tokens, refresh tokens, revoke tokens, etc.)

### 5. Write Tests for Services (TDD)

Test service methods comprehensively, ensuring correct behavior and error handling.

### 6. Implement Controllers

Define Express routes and controller functions for OAuth endpoints:  
Authorization Code Grant flow  
Client Credentials Grant flow  
Password Grant flow (if applicable)  
User registration and authentication

### 7. Write Tests for Controllers (TDD)

Test controller responses, data handling, and integration with services.

### 8. Create Middlewares

Handle authentication, authorization, validation, and error handling:  
Authentication middleware (verify access tokens)  
Authorization middleware (enforce access control)  
Validation middleware (check request parameters)  
Error handling middleware (centralized error handling)

### 9. Write Tests for Middlewares (TDD)

Ensure middlewares function as intended and handle errors gracefully.

### 10. Configure Express Application

Set up Express app, middlewares, and routes.  
Integrate with MongoDB using Mongoose.  
Configure error handling, logging, and security headers (using Helmet).

### 11. Enhance Security

Implement robust password hashing (using bcrypt).  
Enforce rate limiting (using express-rate-limit).  
Secure sensitive data.  
Validate and sanitize user input.  
Protect against common vulnerabilities (e.g., XSS, CSRF).

### 12. Document API

Use Swagger for interactive API documentation and testing.

### 13. Additional Considerations

Implement session management (using express-session) if needed.  
Consider caching strategies for performance optimization.  
Integrate with external authentication providers (e.g., Google, LinkedIn).  
Regularly update dependencies and address security vulnerabilities.
