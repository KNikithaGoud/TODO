# Full-Stack Todo Application (Spring Boot + React)

## Overview

This project is a simple full-stack Todo application built with a **Spring Boot backend** and a **React frontend**.
It allows users to create, update, complete, and delete tasks through a clean user interface.

This project was developed as part of a full-stack screening assignment.

---

## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* H2 In-Memory Database
* Maven

### Frontend

* React (Functional Components + Hooks)
* Axios for API calls

---

## Features

### Backend

* Create a Todo (title required)
* Get all Todos
* Filter Todos by completed status
* Update Todo (title, description, status)
* Delete Todo
* RESTful API design
* Basic validation
* Clean controller–service–repository structure

### Frontend

* Display list of todos
* Add new todo
* Mark todo as complete/incomplete
* Inline edit todo
* Delete todo
* API integration using Axios

---

## Project Structure

```
todo-fullstack-app/
│
├── backend/        # Spring Boot application
│   └── src/main/java/com/example/todo
│       ├── controller
│       ├── service
│       ├── repository
│       └── model
│
└── frontend/       # React application
    └── src
        ├── components
        └── services
```

---

## How to Run the Project

### 1. Run Backend

Navigate to backend folder:

```
cd backend
```

Run the application:

```
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

---

### 2. Run Frontend

Open a new terminal and navigate to frontend:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the React app:

```
npm start
```

Frontend will start at:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint                  | Description   |
| ------ | ------------------------- | ------------- |
| POST   | /api/todos                | Create a todo |
| GET    | /api/todos                | Get all todos |
| GET    | /api/todos?completed=true | Filter todos  |
| PUT    | /api/todos/{id}           | Update a todo |
| DELETE | /api/todos/{id}           | Delete a todo |

---

## Future Improvements

* Add user authentication
* Use PostgreSQL instead of H2
* Improve UI styling
* Add unit and integration tests

---

## Author

**Nikitha Kammadanam**
