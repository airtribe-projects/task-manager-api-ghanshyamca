# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.js. This project provides a complete task management system with CRUD operations, filtering, sorting, and priority management.

## Features

- ✅ Create, read, update, and delete tasks
- 🔍 Filter tasks by completion status
- 📊 Sort tasks by creation date (ascending/descending)
- 🎯 Priority-based task management (low, medium, high)
- ✨ Input validation and error handling
- 📝 Request logging middleware
- 🧪 Comprehensive test suite

## Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd task-manager-api-ghanshyamca
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Project

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on **http://localhost:3000**

### Health Check
To verify the server is running:
```bash
curl http://localhost:3000/ping
```
Expected response: `Pong`

## Testing

Run the test suite:
```bash
npm test
```

The tests use the TAP testing framework and include comprehensive coverage of all API endpoints.

## API Documentation

Base URL: `http://localhost:3000`

### Routes Overview

All task-related routes are prefixed with `/tasks`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks (with optional filtering and sorting) |
| GET | `/tasks/:id` | Get a specific task by ID |
| GET | `/tasks/priority/:level` | Get the first task by priority level |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

---

### 1. GET /tasks
**Description:** Retrieve all tasks with optional filtering and sorting

**Query Parameters:**
- `completed` (optional): Filter by completion status (`true` or `false`)
- `sort` (optional): Sort by creation date (`asc` or `desc`)

**Examples:**
```bash
# Get all tasks
curl http://localhost:3000/tasks

# Get completed tasks only
curl http://localhost:3000/tasks?completed=true

# Get incomplete tasks sorted by creation date (ascending)
curl http://localhost:3000/tasks?completed=false&sort=asc

# Get all tasks sorted by creation date (descending)
curl http://localhost:3000/tasks?sort=desc
```

**Response:** Array of task objects
```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true,
    "priority": "high",
    "createdAt": "2025-07-05T08:32:10.321Z"
  }
]
```

---

### 2. GET /tasks/:id
**Description:** Retrieve a specific task by its ID

**Parameters:**
- `id` (required): Task ID (integer)

**Example:**
```bash
curl http://localhost:3000/tasks/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "high",
  "createdAt": "2025-07-05T08:32:10.321Z"
}
```

**Error Response (404):**
```json
{
  "error": "Task not found"
}
```

---

### 3. GET /tasks/priority/:level
**Description:** Get the first task with the specified priority level

**Parameters:**
- `level` (required): Priority level (`low`, `medium`, or `high`)

**Example:**
```bash
curl http://localhost:3000/tasks/priority/high
```

**Response:**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "high",
  "createdAt": "2025-07-05T08:32:10.321Z"
}
```

**Error Responses:**
- **400 Bad Request:** Invalid priority level
```json
{
  "error": "Priority must be one of: low, medium, high"
}
```
- **404 Not Found:** No task found with the specified priority
```json
{
  "error": "Task not found"
}
```

---

### 4. POST /tasks
**Description:** Create a new task

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "priority": "medium"
}
```

**Required Fields:**
- `title` (string): Non-empty task title
- `description` (string): Non-empty task description  
- `completed` (boolean): Task completion status

**Optional Fields:**
- `priority` (string): Task priority (`low`, `medium`, `high`). Defaults to `low` if not provided.

**Example:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "completed": false,
    "priority": "high"
  }'
```

**Response (201 Created):**
```json
{
  "id": 16,
  "title": "Learn Node.js",
  "description": "Complete Node.js tutorial",
  "completed": false,
  "priority": "high",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "error": "Title is required and must be a non-empty string"
}
```

---

### 5. PUT /tasks/:id
**Description:** Update an existing task

**Parameters:**
- `id` (required): Task ID (integer)

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "priority": "low"
}
```

**Required Fields:** Same as POST request

**Example:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true,
    "priority": "medium"
  }'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "priority": "medium",
  "createdAt": "2025-07-05T08:32:10.321Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Task not found"
}
```

---

### 6. DELETE /tasks/:id
**Description:** Delete a task by its ID

**Parameters:**
- `id` (required): Task ID (integer)

**Example:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Response (200 OK):**
```
1 deleted successfully
```

**Error Response (404):**
```json
{
  "error": "Task not found"
}
```

---

## Data Model

### Task Object Structure
```json
{
  "id": 1,                                    // Auto-generated unique identifier
  "title": "Task title",                      // Required: Task name
  "description": "Task description",          // Required: Detailed description
  "completed": false,                         // Required: Completion status
  "priority": "medium",                       // Optional: Priority level
  "createdAt": "2025-07-05T08:32:10.321Z",   // Auto-generated: Creation timestamp
  "updatedAt": "2025-07-05T09:32:10.321Z"    // Auto-generated: Last update timestamp
}
```

### Priority Levels
- `low`: Low priority tasks
- `medium`: Medium priority tasks  
- `high`: High priority tasks

## Project Structure

```
task-manager-api-ghanshyamca/
├── app.js                          # Main application entry point
├── package.json                    # Dependencies and scripts
├── constants/
│   └── priority.js                 # Priority level constants
├── controllers/
│   └── tasksController.js          # Task business logic
├── middlewares/
│   ├── loggerMiddleware.js         # Request logging
│   └── validationMiddleware.js     # Input validation
├── models/
│   └── tasksModel.js              # In-memory task data store
├── routes/
│   └── tasksRoutes.js             # API route definitions
└── test/
    └── server.test.js             # API endpoint tests
```

## Middleware

### Logger Middleware
- Logs all incoming requests with method and URL
- Applied to all routes automatically

### Validation Middleware
- Validates task creation and update requests
- Ensures required fields are present and properly formatted
- Validates priority levels against allowed values

## Error Handling

The API returns appropriate HTTP status codes:

- **200 OK**: Successful GET, PUT, DELETE operations
- **201 Created**: Successful POST operations
- **400 Bad Request**: Invalid input data or missing required fields
- **404 Not Found**: Task not found or invalid task ID

Error responses include descriptive error messages in JSON format.

## Development Notes

- **Data Storage**: Tasks are stored in memory (will reset on server restart)
- **Auto-ID Generation**: Task IDs are auto-generated based on array length + 1
- **Timestamps**: Creation and update timestamps are automatically managed
- **Validation**: Comprehensive input validation ensures data integrity

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License. 