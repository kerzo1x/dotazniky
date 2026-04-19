> ⚠️ Token hashing logic is currently broken and may be refactored later.
## Authentication Module

This module implements basic user registration and test endpoints using a TypeScript backend with Drizzle ORM and Bun runtime.

## Features

### User Registration (`registerPost`)

Handles user signup with validation, password hashing, and database storage.

#### Flow:
- Parses JSON request body
- Validates input using **Zod**
- Checks if username already exists in the database
- Hashes password using **Argon2id (Bun.password.hash)**
- Generates a secure random token
- Inserts new user into database
- Returns created user (id, username, token)

#### Validation rules:
- Username: 3–20 characters
- Password: 6–256 characters

#### Responses:
- `200` → user created successfully
- `400` → validation error
- `409` → username already exists
- `500` → internal server error

---

### Test Endpoint (`testPost`)

Simple endpoint for testing POST requests.

Returns:
```json
{ "success": "that was post method" }
