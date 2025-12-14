# RESTful API for a Blog Platform

## Project Overview

This is a RESTful API for a blog platform built using **Node.js**, **Express**, **Sequelize ORM**, and **PostgreSQL**.  
The API allows users to:

- Create, read, update, and delete authors.
- Create, read, update, and delete posts.
- Associate posts with authors (one-to-many relationship).

---

## Setup Instructions

### Prerequisites

- **Node.js v18+**
- **Docker** and **Docker Compose**
- **Git**

### Clone the Repository

```bash
git clone https://github.com/saivenkat-A7/RESTful-API-for-a-blog-platform.git
cd RESTful-API-for-a-blog-platform
```
### Environment Variables
Create a .env file in the root directory with the following:
```
PORT=3000
DB_NAME=blogdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=postgres
DB_PORT=5432

```
### Running with Docker
Build and start the application:
```
docker-compose up --build
```

This will start:

PostgreSQL database container (blog-postgres)

Node.js API container (blog-api)

Logs will indicate:
```
Database connected successfully
Models synchronized
Server running on port 3000
```
## Database Schema

### Authors Table

| Column | Type    | Constraints                  |
|--------|---------|-----------------------------|
| id     | Integer | Primary Key, Auto Increment |
| name   | String  | Not Null                    |
| email  | String  | Unique, Not Null            |

### Posts Table

| Column   | Type    | Constraints                               |
|----------|---------|------------------------------------------|
| id       | Integer | Primary Key, Auto Increment               |
| title    | String  | Not Null                                  |
| content  | Text    | Not Null                                  |
| authorId | Integer | Foreign Key → Authors.id, CASCADE on delete |


### API Documentation
**Base URL**: http://localhost:3000

### Authors Endpoints
**1. Create Author**
**POST** ```/authors```
**Body:**
```
{
  "name": "John",
  "email": "john@example.com"
}
```
**Response (201):**
```
{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "createdAt": "2025-12-14T07:25:09.585Z",
  "updatedAt": "2025-12-14T07:25:09.585Z"
}
```
**2. Get All Authors**
**GET** ```/authors```
**Response (200):**
```
[
  {
    "id": 1,
    "name": "John",
    "email": "john@example.com",
    "createdAt": "2025-12-14T07:25:09.585Z",
    "updatedAt": "2025-12-14T07:25:09.585Z"
  }
]
```
**3. Get Author by ID**
**GET** ```/authors/:id```
**Response (200):**
```
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-12-14T07:25:09.585Z",
  "updatedAt": "2025-12-14T07:25:09.585Z"
}
```
**If Not Found (404):**
```
{
  "message": "Author not found"
}
```
**4. Update Author**
**PUT** ```/authors/:id```
**Body:**
```{
  "name": "venkat"
}
```
**Response (200):**
```
{
  "id": 1,
  "name": "venkat",
  "email": "john@example.com",
  "createdAt": "2025-12-14T07:25:09.585Z",
  "updatedAt": "2025-12-14T07:30:00.000Z"
}
```
**5. Delete Author**
**DELETE ** ```/authors/:id```
**Response (200):**
```
{
  "message": "Author deleted (posts cascaded)"
}
```
**6. Get Posts by Author**
**GET** ```/authors/:id/posts```
**Response (200):**




