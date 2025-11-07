# EcoCompanion Backend - Project Structure

## Overview
This is an Express.js backend application using TypeScript and SQLite, structured similar to a C# MVC architecture with clear separation of concerns.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite3
- **Architecture**: MVC-like pattern (Models, Controllers, Services, Routes)

## Project Architecture

### Directory Structure
```
backend/
├── src/
│   ├── models/          # Data models and DTOs (Data Transfer Objects)
│   ├── services/        # Business logic and data access layer
│   ├── controllers/     # HTTP request handlers
│   ├── routes/          # Route definitions
│   └── index.ts         # Application entry point
├── database.sqlite      # SQLite database file (auto-generated)
├── package.json
└── tsconfig.json
```

## Layer Responsibilities

### 1. Models (`src/models/`)
- **Purpose**: Define data structures and types
- **Example**: `User.ts`
- **Contains**:
  - Entity interfaces (e.g., `User`)
  - DTOs for data transfer (e.g., `CreateUserDto`)
- **Similar to C#**: Entity classes and DTOs

### 2. Services (`src/services/`)
- **Purpose**: Business logic and database operations
- **Example**: `UserService.ts`
- **Responsibilities**:
  - Database initialization and schema management
  - CRUD operations (Create, Read, Update, Delete)
  - Business logic validation
  - Data transformation
- **Similar to C#**: Service layer with repository pattern
- **Key Methods**:
  - `getAllUsers()`: Retrieve all entities
  - `getUserById(id)`: Get single entity by ID
  - `createUser(data)`: Create new entity
  - `updateUser(id, data)`: Update existing entity
  - `deleteUser(id)`: Delete entity

### 3. Controllers (`src/controllers/`)
- **Purpose**: Handle HTTP requests and responses
- **Example**: `UserController.ts`
- **Responsibilities**:
  - Validate request parameters
  - Call service methods
  - Format responses
  - Handle errors with appropriate HTTP status codes
- **Similar to C#**: API Controllers
- **Pattern**: Each method corresponds to an HTTP endpoint

### 4. Routes (`src/routes/`)
- **Purpose**: Define API endpoints and map to controllers
- **Example**: `userRoutes.ts`
- **Responsibilities**:
  - Map HTTP methods (GET, POST, PUT, DELETE) to controller methods
  - Define URL patterns
- **Similar to C#**: Route configuration or attribute routing

### 5. Entry Point (`src/index.ts`)
- **Purpose**: Application configuration and server startup
- **Responsibilities**:
  - Initialize Express app
  - Configure middleware (JSON parsing, etc.)
  - Register routes
  - Start HTTP server
- **Similar to C#**: Program.cs and Startup.cs

## Data Flow

```
Client Request
    ↓
Route (userRoutes.ts) → Maps URL to controller method
    ↓
Controller (UserController.ts) → Validates input, handles request/response
    ↓
Service (UserService.ts) → Business logic and database operations
    ↓
Database (SQLite) → Data persistence
    ↓
Response flows back through the layers
```

## API Endpoints

### Users API
Base URL: `/api/users`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/users` | Get all users | None | `User[]` |
| GET | `/api/users/:id` | Get user by ID | None | `User` |
| POST | `/api/users` | Create new user | `{name: string}` | `User` |
| PUT | `/api/users/:id` | Update user | `{name: string}` | `User` |
| DELETE | `/api/users/:id` | Delete user | None | `204 No Content` |

### Health Check
- `GET /health` - Check if server is running

## User Entity Structure

```typescript
interface User {
  id: number;      // Auto-generated primary key
  name: string;    // User's name
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
```

## How to Add New Entities

To add a new entity (e.g., Product), follow this pattern:

1. **Create Model** (`src/models/Product.ts`)
   ```typescript
   export interface Product {
     id: number;
     name: string;
     price: number;
   }
   
   export interface CreateProductDto {
     name: string;
     price: number;
   }
   ```

2. **Create Service** (`src/services/ProductService.ts`)
   - Initialize database table in constructor
   - Implement CRUD methods (getAll, getById, create, update, delete)

3. **Create Controller** (`src/controllers/ProductController.ts`)
   - Create methods for each endpoint
   - Handle validation and error responses

4. **Create Routes** (`src/routes/productRoutes.ts`)
   - Map HTTP methods to controller methods

5. **Register Routes** (in `src/index.ts`)
   ```typescript
   import productRoutes from './routes/productRoutes';
   app.use('/api/products', productRoutes);
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
- Uses `ts-node` to run TypeScript directly
- Hot reload on file changes

### Production Mode
```bash
npm run build  # Compile TypeScript to JavaScript
npm start      # Run compiled code
```

## Environment Configuration

- **Port**: Default 3000 (configurable via `PORT` environment variable)
- **Database**: `database.sqlite` (auto-created in root directory)

## Error Handling

All endpoints return errors in this format:
```json
{
  "error": "Error description",
  "message": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success with no response body
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Key Design Patterns

1. **Dependency Injection**: Controllers instantiate their services
2. **Async/Await**: All database operations use Promises
3. **Arrow Functions**: Controllers use arrow functions to preserve `this` context
4. **Type Safety**: TypeScript interfaces ensure type checking
5. **Separation of Concerns**: Clear boundaries between layers

## Comparison with C#

| C# | TypeScript/Express |
|----|-------------------|
| Entity/Model class | Interface in `models/` |
| Service class | Service class in `services/` |
| API Controller | Controller class in `controllers/` |
| Route attributes | Router in `routes/` |
| Entity Framework | Direct SQLite3 queries |
| Dependency Injection | Manual instantiation or DI container |
| async/await | async/await (same) |

## Best Practices

1. **Always use TypeScript types** - Avoid `any` type
2. **Handle errors properly** - Try-catch in controllers, proper status codes
3. **Validate input** - Check for required fields and data types
4. **Use DTOs** - Separate creation DTOs from entity interfaces
5. **Keep services focused** - One service per entity/domain
6. **Document your code** - Use JSDoc comments for classes and methods
7. **Consistent naming** - Follow the established naming conventions

## Testing Endpoints

Use the `users.http` file with the REST Client extension in VS Code, or use curl:

```bash
# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

## Future Enhancements

Consider adding:
- **Authentication/Authorization** - JWT tokens, middleware
- **Validation Library** - Joi, Zod, or class-validator
- **Logging** - Winston or Pino
- **Error Middleware** - Centralized error handling
- **Database Migrations** - Version control for schema changes
- **API Documentation** - Swagger/OpenAPI
- **Testing** - Jest for unit and integration tests
- **CORS** - Cross-origin resource sharing middleware
- **Rate Limiting** - Protect against abuse

---

**For Chatbots/AI Assistants**: This project follows a layered architecture pattern. When modifying or extending:
1. Start with the model (define data structure)
2. Create service (implement business logic)
3. Create controller (handle HTTP)
4. Create routes (map endpoints)
5. Register in index.ts

Always maintain the separation of concerns and follow the existing patterns.
