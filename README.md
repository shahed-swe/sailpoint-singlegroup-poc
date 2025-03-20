# Sailpoint User Management API

A Node.js application for managing users and their entitlements/groups, designed for Sailpoint app onboarding.

## Features

- User management with custom IDs
- Group/Entitlement management
- MongoDB integration
- Auto-generation of User and Group IDs
- Health check endpoint

## Prerequisites

- Node.js >= 14.x
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd singleuser
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Seed the database
```bash
npm run seed
```

5. Start the server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /health` - Check application and database status

### Users
- `GET /api/users` - List all users with their groups
- `GET /api/users/:userId` - Get user by userId
- `POST /api/users` - Create new user
- `PUT /api/users/:userId` - Update user

### Groups/Entitlements
- `GET /api/groups` - List all groups
- `POST /api/groups` - Create new group

## API Examples

### Create User
```json
POST /api/users
{
    "salary_id": "EMP004",
    "firstname": "Alex",
    "lastname": "Wilson",
    "username": "alex.wilson",
    "fullname": "Alex Wilson",
    "group": "GRP000001",
    "active": true
}
```

### Update User
```json
PUT /api/users/USER000001
{
    "firstname": "Alexander",
    "group": "GRP000002",
    "active": true
}
```

### Create Group
```json
POST /api/groups
{
    "name": "Finance"
}
```

## Data Models

### User Model
```javascript
{
    userId: String,          // Auto-generated (USER000001)
    salary_id: String,       // Required, Unique
    firstname: String,       // Required
    lastname: String,        // Required
    username: String,        // Required, Unique
    fullname: String,        // Required
    group: String,          // Required (GroupId)
    active: Boolean,        // Default: true
    timestamps: true        // createdAt, updatedAt
}
```

### Group Model
```javascript
{
    groupId: String,        // Auto-generated (GRP000001)
    name: String,          // Required, Unique
    timestamps: true       // createdAt, updatedAt
}
```

## ID Format

- Users: `USER` + 6-digit number (e.g., USER000001)
- Groups: `GRP` + 6-digit number (e.g., GRP000001)

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Development

To run in development mode with auto-reload:
```bash
npm run dev
```

## Testing

You can use the included Postman collection in `/postman/sailpoint_api_collection.json` for testing the API endpoints.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
