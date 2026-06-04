# Simple File Upload App (Express + MySQL + JWT)
This is a simple file upload app built with Node.js(Express) and MySQL, using JWT for authentication.
The main purpose of this project is to understand how to connect to MySQL and how basic authentication and file uploads work.

## Features
- User registration and login with JWT-based authentication
- Store file metadata in MySQL
- Simple and beginner-friendly structure

## Tech Stack
- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)

## Installation Setup
1. Install dependencies
```bash
npm install
```
2. Setup MySQL database
```bash
mysql -u USER -p < db.sql
```
3. Configure environment variables
Create a `.env` file in the root directory:
```Environment
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_KEY=your_secret_key
```
4. Run the project
```bash
DEBUG=file-up:* npm start
```
5. Open your browser and visit **localhost:3000**

## Disclaimer
- This project is not production-ready
- It lacks advanced security features (validations, rate limiting, etc.)
- It is intended only for learning and practice

