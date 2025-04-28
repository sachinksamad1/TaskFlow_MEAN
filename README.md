# TaskFlow 📝
A Full-Stack Task Management System built with the MEAN Stack (MongoDB, Express.js, Angular 19+, Node.js) and Angular Material.
## 🚀 Project Overview
TaskFlow is a simple and powerful task management app. Users can create, view, update, and delete tasks with statuses (Todo, In Progress, Done).
This project showcases a full-stack architecture following best practices: modular Angular frontend, Express REST API, and MongoDB database.
## 🛠️ Built With
⚡ Angular 19+

🎨 Angular Material

🔥 Node.js

🚂 Express.js

🍃 MongoDB + Mongoose

🛡️ JWT (Optional for future authentication)

🌐 SCSS for styling
## 📂 Project Structure
### /backend
/backend/models

/backend/routes


/backend/server.js

/backend/.env
### /frontend
/frontend/src/app/core/

/frontend/src/app/shared/

/frontend/src/app/features/tasks/

/frontend/src/environments/

/frontend/angular.json
## 📦 Installation and Setup Instructions
### 1. Clone the repository

```
git clone https://github.com/sachinksamad1/TaskFlow_MEAN.git
cd TaskFlow_MEAN
```
### 2. Setup Backend
```
cd backend
npm install
```
- Create a .env file inside /backend:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```
- Start the backend server:
```
npm run dev
```
Server will run on: http://localhost:5000
### 3. Setup Frontend
```
cd frontend
npm install
```
- Start the Angular development server:
```
ng serve
```
Frontend will run on: http://localhost:4200

Note: API requests are proxied to backend via proxy.conf.json.
## 🔥 Features
- Create, Read, Update, and Delete (CRUD) tasks

- Status management: Todo, In Progress, Done

- Angular Material UI components

- Responsive design for mobile and desktop

- Modular and scalable code structure

- RESTful API with Express.js

- MongoDB Atlas or Local MongoDB support

- Environment-based configuration

- (Optional) Ready to expand with JWT Authentication
## 🧩 Future Improvements
- User Authentication & Authorization (JWT)

- Task deadlines and reminders

- Subtasks and project grouping

- Dark mode toggle

- Deploy to Render, Railway, Vercel, or Netlify

### 🙏 Acknowledgements
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
## 📜 License
This project is licensed under the MIT License — feel free to use it for your projects!
## 👨‍💻 Let's Connect
Feel free to reach out if you have questions, feedback, or contributions!

