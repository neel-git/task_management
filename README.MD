# To run the application:

Make sure you have Docker and Docker Compose installed on your system.
Navigate to the project directory in your terminal.
Run docker-compose up --build to build and start the containers.

# Assumptions made:

1. The database is empty when the application starts.
2. All dates are stored and processed in UTC.
3. The JWT token expires after 1 day.
4. Users can only access their own tasks.

# TESTING WITH POSTMAN

1. User Registration:

Method: POST
URL: http://localhost:3000/api/auth/register
Body (raw JSON):
jsonCopy{
"username": "user1",
"password": "password123"
}

2. User Login:

Method: POST
URL: http://localhost:3000/api/auth/login
Body (raw JSON):
jsonCopy{
"username": "user1",
"password": "password123"
}

Save the returned token for subsequent requests.

3. User Login:

Method: POST
URL: http://localhost:3000/api/auth/login
Body (raw JSON):
jsonCopy{
"username": "user1",
"password": "password123"
}

Save the returned token for subsequent requests.

4. Get Tasks:

Method: GET
URL: http://localhost:3000/api/tasks
Headers: Authorization: Bearer <your_token>
Optional Query Parameters: status, priority, dueDate, search

5. Update Task:

Method: PUT
URL: http://localhost:3000/api/tasks/<task_id>
Headers: Authorization: Bearer <your_token>
Body (raw JSON):
jsonCopy{
"title": "Updated Task",
"description": "Updated description",
"status": "In Progress",
"priority": "Medium"
}

6. Delete Task:

Method: DELETE
URL: http://localhost:3000/api/tasks/<task_id>
Headers: Authorization: Bearer <your_token>
