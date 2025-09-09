# Task Manager API - QuickStart Guide

## Overview

This is a simple CRUD (Create, Read, Update, Delete) Task Manager API built with Node.js and Express.js. The application uses in-memory storage for tasks and provides RESTful endpoints for task management.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Postman (for API testing)

## Getting Started

### 1. Installation

```bash
# Navigate to project directory
cd TaskManager03

# Install dependencies
npm install
```

### 2. Running the Application

```bash
# Start the server in development mode
npm run dev

# OR start in production mode
npm start
```

The server will start on `http://localhost:3000`

You should see the message: `Server running at http://localhost:3000`

## API Endpoints Overview

| Method | Endpoint            | Description                          |
| ------ | ------------------- | ------------------------------------ |
| POST   | `/api/tasks`        | Create a new task                    |
| GET    | `/api/tasks`        | Get all tasks                        |
| GET    | `/api/tasks/search` | Search tasks by title or description |
| GET    | `/api/tasks/:id`    | Get a specific task by ID            |
| PUT    | `/api/tasks/:id`    | Update a task                        |
| DELETE | `/api/tasks/:id`    | Delete a task                        |

## Task Data Structure

```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "status": "To Do"
}
```

**Valid Status Values:** `"To Do"`, `"In Progress"`, `"Completed"`

## Postman Setup & Testing Guide

### Step 1: Set Up Postman Environment

1. Open Postman
2. Create a new Environment called "Task Manager"
3. Add a variable:
   - Variable: `base_url`
   - Initial Value: `http://localhost:3000`
   - Current Value: `http://localhost:3000`

### Step 2: Create API Requests

#### 1. Create a New Task

- **Method:** POST
- **URL:** `{{base_url}}/api/tasks`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the task manager API",
    "status": "To Do"
  }
  ```
- **Expected Response (201):**
  ```json
  {
    "message": "Task created successfully",
    "task": {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the task manager API",
      "status": "To Do"
    }
  }
  ```

#### 2. Get All Tasks

- **Method:** GET
- **URL:** `{{base_url}}/api/tasks`
- **Expected Response (200):**
  ```json
  [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the task manager API",
      "status": "To Do"
    }
  ]
  ```

#### 3. Get Task by ID

- **Method:** GET
- **URL:** `{{base_url}}/api/tasks/1`
- **Expected Response (200):**
  ```json
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the task manager API",
    "status": "To Do"
  }
  ```

#### 4. Search Tasks

- **Method:** GET
- **URL:** `{{base_url}}/api/tasks/search?query=project`
- **Expected Response (200):**
  ```json
  [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the task manager API",
      "status": "To Do"
    }
  ]
  ```

#### 5. Update a Task

- **Method:** PUT
- **URL:** `{{base_url}}/api/tasks/1`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the task manager API",
    "status": "In Progress"
  }
  ```
- **Expected Response (200):**
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the task manager API",
      "status": "In Progress"
    }
  }
  ```

#### 6. Delete a Task

- **Method:** DELETE
- **URL:** `{{base_url}}/api/tasks/1`
- **Expected Response (200):**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

### Step 3: Test Workflow in Postman

1. **Start by creating multiple tasks:**

   - Create Task 1: "Buy groceries" (To Do)
   - Create Task 2: "Review code" (In Progress)
   - Create Task 3: "Deploy application" (Completed)

2. **Test retrieval:**

   - Get all tasks to see your created tasks
   - Get individual tasks by ID

3. **Test search:**

   - Search for "code" to find the review task
   - Search for "buy" to find the groceries task

4. **Test updates:**

   - Update task status from "To Do" to "In Progress"
   - Update task description

5. **Test deletion:**
   - Delete a task and verify it's removed

### Sample Postman Collection

You can create a Postman Collection with all these requests:

1. Create New Collection → "Task Manager API"
2. Add the requests above
3. Set up Tests for automated validation:

**Example Test Script for Create Task:**

```javascript
pm.test("Status code is 201", function () {
  pm.response.to.have.status(201);
});

pm.test("Response has task object", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("task");
  pm.expect(jsonData.task).to.have.property("id");
});
```

## Error Handling Test Cases

### Test Invalid Data

1. **Missing Title:**

   ```json
   {
     "description": "Task without title"
   }
   ```

   Expected: 400 Bad Request

2. **Invalid Status:**

   ```json
   {
     "title": "Test Task",
     "status": "Invalid Status"
   }
   ```

   Expected: 400 Bad Request

3. **Non-existent Task ID:**

   - GET/PUT/DELETE `/api/tasks/999`
   - Expected: 404 Not Found

4. **Missing Search Query:**
   - GET `/api/tasks/search`
   - Expected: 400 Bad Request

## Tips for Testing

1. **Use Postman's Runner** to execute the entire collection automatically
2. **Save responses** to compare data between requests
3. **Use environment variables** for dynamic data like task IDs
4. **Set up pre-request scripts** to clear data before testing
5. **Use tests** to validate response structure and status codes

## Troubleshooting

- **Server not starting:** Check if port 3000 is already in use
- **404 errors:** Ensure the server is running and endpoints are correct
- **JSON parsing errors:** Verify Content-Type header is set to `application/json`
- **Validation errors:** Check that required fields are provided and status values are valid

## Next Steps

After testing with Postman, you might want to:

1. Integrate with a real database (MongoDB, PostgreSQL)
2. Add authentication and authorization
3. Implement data persistence
4. Add more advanced search and filtering options
5. Create a frontend application to consume this API
