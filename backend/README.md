# Simple Express SQLite API

A minimal REST API using Express.js and SQLite3 with TypeScript.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## API Endpoints

### GET /users
Get all users

### POST /users
Create a new user

Request body:
```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

## Test

Use the `users.http` file to test the endpoints with VS Code's REST Client extension.