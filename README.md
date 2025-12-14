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

### Note: We need to start Docker Engine

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


Each post belongs to **exactly one author**.  
The `authorId` column enforces the relationship between posts and authors.

---

### Relationship Explanation

- One **Author** can have **many Posts**
- Each **Post** belongs to **one Author**
- The relationship is enforced using a **foreign key (`authorId`)**
- When an author is deleted, all associated posts are **automatically deleted** using **CASCADE**

This ensures **referential integrity** at the database level.

---

### Entity-Relationship Diagram (ERD)

The following diagram represents the **one-to-many relationship** between `Author` and `Post`.


<img width="1536" height="1024" alt="ChatGPT Image Dec 14, 2025, 05_55_30 PM" src="https://github.com/user-attachments/assets/4ca9b851-3da3-4a88-bf63-fdfd3ee9f21e" />




**Legend:**
- `PK` → Primary Key  
- `FK` → Foreign Key  
- `1 : *` → One-to-Many relationship  

An **Author** can create multiple **Posts**, while each **Post** belongs to exactly one **Author**.
Deleting an author will automatically delete all associated posts (**CASCADE delete**).





### API Documentation
**Base URL**: http://localhost:3000

### Authors Endpoints
### **1. Create Author**
### **POST** ```/authors```
### **Body:**
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
### **2. Get All Authors**
### **GET** ```/authors```
### **Response (200):**
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
### **3. Get Author by ID**
### **GET** ```/authors/:id```
### **Response (200):**
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
### **4. Update Author**
### **PUT** ```/authors/:id```
### **Body:**
```
{
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
### **5. Delete Author**
### **DELETE** ```/authors/:id```
### **Response (200):**
```
{
  "message": "Author deleted (posts cascaded)"
}
```
### **6. Get Posts by Author**
### **GET** ```/authors/:id/posts```
### **Response (200):**
```
[
  {
    "id": 1,
    "title": "Learning Node.js",
    "content": "Node.js is awesome!",
    "authorId": 1,
    "createdAt": "2025-12-14T07:25:09.585Z",
    "updatedAt": "2025-12-14T07:25:09.585Z"
  }
]
```
---


### **Posts Endpoints**

### **1. Create Post**
### **POST** ```/posts```
### **Body:**
```
{
  "title": "Learning Node.js",
  "content": "Node.js is awesome!",
  "authorId": 1
}
```
**Response (201):**
```
{
  "id": 1,
  "title": "Learning Node.js",
  "content": "Node.js is awesome!",
  "authorId": 1,
  "createdAt": "2025-12-14T07:25:09.585Z",
  "updatedAt": "2025-12-14T07:25:09.585Z"
}
```
**If author does not exist (400):**
```
{
  "message": "Author does not exist"
}
```
### **2. Get All Posts**
### **GET** ```/posts```
### **Response (200):**
```
[
  {
    "id": 1,
    "title": "Learning Node.js",
    "content": "Node.js is awesome!",
    "authorId": 1,
    "Author": {
      "name": "John",
      "email": "john@example.com"
    }
  }
]
```
### **3. Get Post by ID**
### **GET** ```/posts/:id```
### **Response (200):**
```
{
  "id": 1,
  "title": "Learning Node.js",
  "content": "Node.js is awesome!",
  "authorId": 1,
  "Author": {
    "name": "John",
    "email": "john@example.com"
  }
}
```
### **4. Update Post**
### **PUT** ```/posts/:id```
### **Body:**
```
{
  "title": "React",
  "content": "React is library"
}
```
**Response (200):**
```
{
  "id": 1,
  "title": "React",
  "content": "React is library",
  "authorId": 1,
  "createdAt": "2025-12-14T07:25:09.585Z",
  "updatedAt": "2025-12-14T07:35:00.000Z"
}
```
### **5. Delete Post**
### **DELETE** ```/posts/:id```
### **Response (200):**
```
{
  "message": "Post deleted"
}
```
### Testing the API

**You can test the API using:**

**cURL commands (as shown above)**

**Postman or Thunder Client**

**Browser (for GET requests only)**

### ScreenShots

<img width="1888" height="587" alt="Screenshot 2025-12-14 175911" src="https://github.com/user-attachments/assets/764d3594-d43e-4863-9823-6e396da922c1" />


<img width="1919" height="940" alt="Screenshot 2025-12-14 175115" src="https://github.com/user-attachments/assets/97b85ee3-c31a-4cdc-9f64-877d8722d3e8" />

<img width="1919" height="945" alt="Screenshot 2025-12-14 175136" src="https://github.com/user-attachments/assets/837cc402-095e-4988-b315-da58f72ad2cf" />

<img width="1916" height="598" alt="Screenshot 2025-12-14 175207" src="https://github.com/user-attachments/assets/84bd7a77-b88b-45aa-abb9-db9712f12beb" />

<img width="1918" height="604" alt="Screenshot 2025-12-14 175229" src="https://github.com/user-attachments/assets/0282b3b8-e1ff-48d3-aa3d-2e9724d694de" />

<img width="1919" height="594" alt="Screenshot 2025-12-14 175314" src="https://github.com/user-attachments/assets/5c1344fe-5f6d-4d66-b7e2-a84346371229" />

### 404 Bad Request

<img width="1919" height="575" alt="Screenshot 2025-12-14 175339" src="https://github.com/user-attachments/assets/f06e1b9c-0a84-44b8-acef-173ef5546e07" />


<img width="1919" height="951" alt="Screenshot 2025-12-14 175405" src="https://github.com/user-attachments/assets/06ad3467-eb58-4f99-af88-ab6093c954e4" />




<img width="1919" height="949" alt="Screenshot 2025-12-14 175423" src="https://github.com/user-attachments/assets/76b8e1b7-d141-4ae7-bfca-5cae598651e6" />

<img width="1913" height="627" alt="Screenshot 2025-12-14 175456" src="https://github.com/user-attachments/assets/4b607628-e800-4d01-80ce-38078229af7c" />

<img width="1909" height="598" alt="Screenshot 2025-12-14 175517" src="https://github.com/user-attachments/assets/fe7201ca-229f-449e-90f5-88c4d2675c3a" />





