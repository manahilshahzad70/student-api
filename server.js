const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());

// ---------------------------------------------
let students = [
  { id: 1, name: "Manahil Fatima", department: "Computer Engineering", semester: 4 },
  { id: 2, name: "Sara", department: "Computer Engineering", semester: 4 },
  { id: 3, name: "Ahmed", department: "Computer Engineering", semester: 4 },
];

let nextId = 4;

app.get("/students", (req, res) => {
  res.status(200).json({
    status: "ok",
    count: students.length,
    data: students,
  });
});


app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
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


app.post("/students", (req, res) => {
  const { name, department, semester } = req.body;

  
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

  
  res.status(201).json({
    status: "ok",
    message: "Student created successfully",
    data: newStudent,
  });
});


app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found. Try /students",
  });
});

app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`);
  console.log(`Try: GET http://localhost:${PORT}/students`);
});
