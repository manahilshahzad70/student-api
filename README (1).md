# Student Records API — Project 1: REST API Fundamentals

A stateless backend server built with **Node.js + Express** that manages student records.
This satisfies DecodeLabs Project 1 requirements: local server, GET/POST routes, structured JSON responses.

## Why Express (Node.js)?
- Easiest to read and explain if you already know JavaScript basics.
- Huge community and documentation, so it's easy to find help.
- Great fit for I/O-heavy, simple APIs like this one (non-blocking event loop).
- Trade-off: you set things up manually (like JSON parsing), but that's actually good for
  understanding *what's happening under the hood* — which is the whole point of Project 1.

## How to run it
1. Make sure Node.js is installed (`node -v` to check).
2. Open a terminal in this folder.
3. Install the one dependency:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. You'll see: `Student API running at http://localhost:3000`

## Endpoints

| Method | Route            | What it does                          | Success Code |
|--------|------------------|----------------------------------------|--------------|
| GET    | /students        | Returns all students                   | 200 OK       |
| GET    | /students/:id    | Returns one student by id              | 200 OK / 404 Not Found |
| POST   | /students        | Creates a new student                  | 201 Created / 400 Bad Request |

### Example: GET all students
```
curl http://localhost:3000/students
```
Response:
```json
{
  "status": "ok",
  "count": 3,
  "data": [
    { "id": 1, "name": "Manahil Fatima", "department": "Computer Systems Engineering", "semester": 4 },
    ...
  ]
}
```

### Example: GET one student
```
curl http://localhost:3000/students/2
```

### Example: POST a new student
```
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali Raza","department":"Software Engineering","semester":2}'
```
Response (201 Created):
```json
{
  "status": "ok",
  "message": "Student created successfully",
  "data": { "id": 4, "name": "Ali Raza", "department": "Software Engineering", "semester": 2 }
}
```

If you forget a required field (name, department, or semester), you'll get a
**400 Bad Request** instead — this proves the API validates input.

## Key concepts this project demonstrates (in plain words)

- **Stateless server**: Every request stands on its own. The server doesn't "remember"
  who asked for what before — it's like a goldfish, not an elephant carrying baggage.
  This is what lets you run multiple copies of the server (load balancing) without them
  needing to sync with each other.

- **GET vs POST**:
  - GET = "give me data" — safe, doesn't change anything, no body needed.
  - POST = "here's data, create something" — changes server state, needs a JSON body.

- **JSON as the universal language**: The server keeps data as normal JavaScript objects
  internally, but converts ("serializes") them into JSON text to send over HTTP. The
  client then converts that JSON back into its own objects.

- **Status codes = the server's traffic light**:
  - 200 = OK, here's your data
  - 201 = Created, your new resource was made
  - 400 = You (the client) sent something wrong/incomplete
  - 404 = What you're looking for doesn't exist

## If you want to extend this later
- Add PUT `/students/:id` to fully update a student.
- Add DELETE `/students/:id` to remove one.
- Swap the in-memory array for a real database (MongoDB, PostgreSQL).
