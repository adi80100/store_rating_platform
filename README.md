#  Store Rating Platform

A full-stack web application that allows users to rate stores while providing role-based access for Administrators, Store Owners, and Normal Users. The application is built using **React.js, Node.js, Express.js, MySQL, Sequelize ORM, JWT Authentication, and Tailwind CSS**.

---

#  Features

##  System Administrator

- Secure Login
- Dashboard displaying:
  - Total Users
  - Total Stores
  - Total Submitted Ratings
- Add Admin, User, and Store Owner
- Add Stores
- View all Users
- View User Details
- View all Stores
- Search and Filter Users
- Search and Filter Stores
- Change Password
- Logout

---

##  Normal User

- Register
- Login
- Change Password
- View all Stores
- Search Stores by Name and Address
- Submit Ratings (1–5)
- Update Submitted Ratings
- View Overall Store Rating
- View Own Submitted Rating
- Logout

---

##  Store Owner

- Login
- Change Password
- View Users who rated their Store
- View Average Rating of their Store
- Logout

---

#  Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt

---

#  Project Structure

```
Store-Rating-Platform
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── db
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── api
│   ├── public
│   └── package.json
│
└── README.md
```

---

#  Functionalities

## Admin

- Add Users
- Add Stores
- Dashboard Statistics
- View Users
- View User Details
- View Stores
- Search & Filter Users
- Search & Filter Stores

---

## User

- Register
- Login
- View Stores
- Submit Ratings
- Update Ratings
- Search Stores
- Change Password

---

## Store Owner

- Login
- View Users who Rated Store
- View Store Average Rating
- Change Password

---

#  Form Validations

- Name: 20–60 characters
- Address: Maximum 400 characters
- Email: Standard Email Validation
- Password:
  - 8–16 characters
  - At least one uppercase letter
  - At least one special character
- Rating:
  - Minimum: 1
  - Maximum: 5

---

#  Search & Filter

### Users

- Name
- Email
- Address
- Role

### Stores

- Name
- Email
- Address

---

#  Authentication

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected Routes

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/your-username/store-rating-platform.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=8000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating

JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8000
```

---

#  Screenshots

Add screenshots of:

- Login Page
- Register Page
- Admin Dashboard
- User Dashboard
- Store Owner Dashboard
- Users List
- Stores List
- User Details

---

#  Author

**Aditya Dayanand Dhore**

Bachelor of Engineering (Information Technology)

Sinhgad College of Engineering, Pune

GitHub: https://github.com/adi80100

---

#  Project Highlights

- Full Stack MERN-style Architecture (React + Node + Express + MySQL)
- Role-Based Access Control
- JWT Authentication
- Secure Password Hashing
- Store Rating System
- Search, Filter & Sorting
- Responsive UI using Tailwind CSS
- RESTful API Design
- MySQL Database with Sequelize ORM
