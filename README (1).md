# Student Records API

This is my Project 1 submission for the Backend Development track — the goal was to build a basic REST API that can send and receive data using GET and POST requests.

I built it using **Node.js + Express**. I went with this stack mainly because I already know JavaScript basics and Express made it easier to get a server running without a ton of setup.

## What it actually does

It's a small server that keeps track of student records (id, name, department, semester) and lets you:
- Get the full list of students
- Get one specific student by their id
- Add a new student

## How to run it

```
npm install
npm start
```

Then open `http://localhost:3000/students` in your browser to see the data.

## The routes

| Method | Route | What happens |
|--------|-------|---------------|
| GET | /students | Get all students |
| GET | /students/:id | Get one student by id (404 if it doesn't exist) |
| POST | /students | Add a new student (needs name, department, semester in the request body) |

## What I learned building this

- **Stateless servers**: the server doesn't remember previous requests — every request has to bring all the info it needs on its own. This is what makes it possible to run multiple copies of a server without them needing to sync up.
- **GET vs POST**: GET is just for reading data (safe, doesn't change anything). POST is for creating something new, and it needs to carry data in its request body.
- **HTTP status codes**: they're basically the server telling you what happened — 200 means it worked, 201 means something new got created, 400 means I (the client) sent bad/missing data, 404 means whatever I asked for doesn't exist.
- **JSON**: it's just a text format for sending structured data over the internet — similar to how a struct holds data in C++, except this can travel between different programs/languages.

## Possible next steps
- Add PUT to update a student's info
- Add DELETE to remove a student
- Connect it to an actual database instead of an in-memory array
