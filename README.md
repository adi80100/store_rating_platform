# Store Rating Platform

A full-stack web application that allows users to rate registered stores while providing role-based access for **System Administrators, Normal Users, and Store Owners**.

The application is built using **React.js, Node.js, Express.js, MySQL, Sequelize ORM, JWT Authentication, bcrypt, and Tailwind CSS**.

---

## Features

### System Administrator

- Secure login
- Dashboard with:
  - Total Users
  - Total Stores
  - Total Submitted Ratings
- Add Admin Users
- Add Normal Users
- Add Store Owners
- Add Stores
- View all Users
- View User Details
- View all Stores
- Search and Filter Users
- Search and Filter Stores
- Sort Users by Name, Email, Address, and Role
- Sort Stores by Name, Email, Address, and Average Rating
- View Store Average Ratings
- Change Password
- Logout

---

### Normal User

- Register
- Login
- Change Password
- View all Stores
- Search Stores by Name and Address
- View Overall Store Rating
- View Own Submitted Rating
- Submit Rating from 1–5
- Update Submitted Rating
- Sort Stores by Name, Address, and Overall Rating
- Logout

---

### Store Owner

- Secure Login
- Change Password
- View their Store
- View Store Average Rating
- View Users who rated their Store
- View individual User Ratings
- Sort Rating Users by Name, Email, and Rating
- Logout

---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- React Icons
- Vite

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JSON Web Token (JWT)
- bcrypt
- CORS

---

## Project Structure

```text
Store_Rating_platform/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── admin.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── owner.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── associations.models.js
│   │   │   ├── rating.models.js
│   │   │   ├── store.models.js
│   │   │   └── user.models.js
│   │   │
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── owner.routes.js
│   │   │   ├── store.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── createAdmin.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md