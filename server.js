// server.js
// Project 1: REST API Fundamentals — Student Records API
// Stack: Node.js + Express
// This server is STATELESS: every request is handled independently.
// We don't remember who called us before — each request carries everything it needs.

const express = require("express");
const app = express();
const PORT = 3000;

// This middleware lets Express automatically read JSON sent in a POST request body.
// Without this line, req.body would be undefined.
app.use(express.json());

// ---------------------------------------------
// Our "database" — just an array in memory.
// In a real app this would be a real database (like MongoDB or PostgreSQL),
// but for Project 1 we only need to prove we can serve and accept JSON.
// ---------------------------------------------
let students = [
  { id: 1, name: "Manahil Fatima", department: "Computer Systems Engineering", semester: 4 },
  { id: 2, name: "Maria Nawaz", department: "Computer Systems Engineering", semester: 4 },
  { id: 3, name: "Samia Farheen", department: "Computer Systems Engineering", semester: 4 },
];

// A simple counter to generate new IDs when we add a student.
let nextId = 4;

// ---------------------------------------------
// ROUTE 1: GET /students
// Purpose: Return the full list of students as JSON.
// GET = "give me data". It never changes anything on the server (this is called "safe").
// ---------------------------------------------
app.get("/students", (req, res) => {
  res.status(200).json({
    status: "ok",
    count: students.length,
    data: students,
  });
});

// ---------------------------------------------
// ROUTE 2: GET /students/:id
// Purpose: Return ONE student by their id.
// ":id" is a route parameter — Express reads whatever number is in the URL
// (e.g. /students/2) and gives it to us as req.params.id
// ---------------------------------------------
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    // 404 = "Not Found". The resource the client asked for doesn't exist.
    return res.status(404).json({
      status: "error",
      message: `No student found with id ${id}`,
    });
  }

  res.status(200).json({
    status: "ok",
    data: student,
  });
});

// ---------------------------------------------
// ROUTE 3: POST /students
// Purpose: Create a NEW student.
// POST = "here is data, please create something with it".
// The client sends a JSON body like: { "name": "...", "department": "...", "semester": 3 }
// ---------------------------------------------
app.post("/students", (req, res) => {
  const { name, department, semester } = req.body;

  // Basic validation: if required fields are missing, reject the request.
  // 400 = "Bad Request". The client sent something wrong/incomplete.
  if (!name || !department || !semester) {
    return res.status(400).json({
      status: "error",
      message: "Please provide name, department, and semester.",
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    department,
    semester,
  };

  students.push(newStudent);

  // 201 = "Created". This is the correct code for a successful POST
  // that resulted in a new resource being made (not just 200).
  res.status(201).json({
    status: "ok",
    message: "Student created successfully",
    data: newStudent,
  });
});

// ---------------------------------------------
// Catch-all for any route that doesn't exist
// ---------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found. Try /students",
  });
});

// ---------------------------------------------
// Start the server
// ---------------------------------------------
app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`);
  console.log(`Try: GET http://localhost:${PORT}/students`);
});
