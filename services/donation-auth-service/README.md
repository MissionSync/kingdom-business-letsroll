# Donation & Auth Microservice

A Go-based microservice for handling user authentication and donations using SQLite database.

## Setup

### Prerequisites
- Go 1.21 or higher
- Git

### Installation & Running

1. **Navigate to the service directory:**
   ```bash
   cd services/donation-auth-service
   ```

2. **Initialize Go modules and download dependencies:**
   ```bash
   go mod tidy
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env file with your values:**
   ```bash
   nano .env  # or use your preferred editor
   ```

5. **Run the service:**
   ```bash
   go run main.go
   ```

   Or build and run:
   ```bash
   go build -o donation-auth-service
   ./donation-auth-service
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Donations (Protected)
- `POST /donations/` - Create donation
- `GET /donations/` - Get user's donations
- `GET /donations/stats` - Get donation statistics

### Health Check
- `GET /health` - Service health check

### Webhooks
- `POST /webhook/stripe` - Stripe webhook endpoint

## Testing

You can test the API using curl:

```bash
# Health check
curl http://localhost:8080/health

# Register user
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Database

The service uses SQLite and automatically creates the database file and tables on startup. The database file will be created at the path specified in your `.env` file (default: `./database.db`).

## Development

To run in development mode with auto-reload, you can use:
```bash
go run main.go
```

The service will run on port 8080 by default (configurable via `.env`).
