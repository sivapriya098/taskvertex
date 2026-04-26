# TaskVertex

A full-stack personal task management app built with **React**, **Spring Boot**, and **MySQL** — featuring JWT authentication, priority-based task tracking, and a real-time dashboard.

> 📁 [Frontend](./frontend) &nbsp;|&nbsp; 📁 [Backend](./backend)

---

## ✨ Features

- 🔐 JWT-based register & login with auto session restore
- 📊 Dashboard with live stats — total, in-progress, completed, overdue
- ✅ Full task CRUD with title, description, priority, due date & status
- 🔄 Status workflow: TODO → IN_PROGRESS → DONE
- 📅 Automatic overdue detection with visual highlighting
- 🔍 Search by title + filter by status & priority
- 📱 Fully responsive dark-mode UI

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, React Router v6, Axios, Context API, CSS3 |
| Backend | Spring Boot, Spring Security, Spring Data JPA |
| Database | MySQL |
| Auth | JWT (JSON Web Token), BCrypt |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+, Java 17+, MySQL 8+, Maven 3.8+

### Backend
```bash
# 1. Create database
CREATE DATABASE taskvertex;

# 2. Set application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskvertex
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
app.jwt.secret=YOUR_JWT_SECRET

# 3. Run
mvn spring-boot:run
# Starts at http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install

# Create .env file
REACT_APP_API_BASE_URL=http://localhost:8080

npm start
# Starts at http://localhost:3000
```

---

## 📡 API Reference

All `/api/tasks` endpoints require `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/tasks` | Get all tasks (`?status=` `?priority=`) |
| GET | `/api/tasks/summary` | Dashboard counts |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

---

## 👤 Author

**Murathotti Sivapriya** — [GitHub](https://github.com/sivapriya098) · [LinkedIn](https://www.linkedin.com/in/murathotti-sivapriya-192a56285)
