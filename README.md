# TaskFlow – Full-Stack Task Management Application

## 1. Project Overview

**TaskFlow** is a full-stack task management web application inspired by tools like Trello. It helps users organize, manage, and track their daily tasks through a simple Kanban-style dashboard.

Users can create an account, securely log in, manage their profiles, and perform task management operations through an interactive dashboard.

The application uses a React frontend, a Node.js and Express backend, and MongoDB Atlas for persistent data storage.

The project also demonstrates DevOps practices such as version control with Git and GitHub, containerization using Docker, and Continuous Integration using GitHub Actions.

## 2. Main Objectives

* Develop a responsive task management application.
* Implement secure user registration and authentication.
* Allow users to create, view, update, and delete tasks.
* Store user and task information in MongoDB.
* Ensure users can access only their own tasks.
* Containerize the application using Docker.
* Automate application builds using GitHub Actions.
* Prepare the application for deployment on AWS EC2.

## 3. Technologies Used

| Technology     | Purpose                               |
| -------------- | ------------------------------------- |
| React.js       | Frontend user interface               |
| Vite           | Frontend development and build tool   |
| Node.js        | Backend JavaScript runtime            |
| Express.js     | REST API development                  |
| MongoDB Atlas  | Cloud database                        |
| Mongoose       | MongoDB object modelling              |
| JWT            | User authentication                   |
| bcryptjs       | Password hashing                      |
| Axios          | Frontend API communication            |
| React Router   | Frontend navigation                   |
| Git            | Version control                       |
| GitHub         | Source code hosting and collaboration |
| Docker         | Application containerization          |
| GitHub Actions | CI automation                         |
| AWS EC2        | Planned cloud deployment              |

## 4. Application Features

### 4.1 User Authentication

* User registration with name, email, and password.
* User login using registered credentials.
* Password hashing using bcryptjs.
* JWT-based authentication.
* Protected API routes.
* User profile retrieval.
* Logout functionality through client-side token removal.

### 4.2 User Profile

* Displays the logged-in user's name.
* Retrieves profile information from the backend.
* Associates tasks with the authenticated user.

### 4.3 Task Management

Users can:

* Create new tasks.
* Add task descriptions.
* View their tasks.
* Update task status.
* Delete tasks.
* Organize tasks into three Kanban columns.

### 4.4 Kanban Board

Tasks are organized into three statuses:

| Status      | Description                      |
| ----------- | -------------------------------- |
| To Do       | Tasks that have not been started |
| In Progress | Tasks currently being worked on  |
| Completed   | Tasks that have been finished    |

The dashboard also displays task statistics:

* Total tasks.
* Tasks in progress.
* Completed tasks.

### 4.5 Data Security

* Passwords are stored as hashes rather than plain text.
* JWT tokens protect authenticated API endpoints.
* Each task is associated with a user ID.
* Users can access and modify only their own tasks.

## 5. Project Architecture

TaskFlow follows a client-server architecture.

```text
                  USER
                    |
                    v
             REACT FRONTEND
                    |
                    v
              AXIOS API
                    |
                    v
             EXPRESS SERVER
                    |
          ---------------------
          |                   |
          v                   v
     AUTH ROUTES          TASK ROUTES
          |                   |
          v                   v
     AUTH CONTROLLER     TASK CONTROLLER
          |                   |
          ---------------------
                    |
                    v
              MONGOOSE ODM
                    |
                    v
              MONGODB ATLAS
```

### Architecture Explanation

1. The user interacts with the React frontend.
2. Axios sends HTTP requests to the Express backend.
3. Express routes direct requests to the appropriate controllers.
4. Controllers process application logic.
5. Mongoose communicates with MongoDB Atlas.
6. The backend returns JSON responses to the frontend.
7. React updates the dashboard based on the response.

## 6. Project Folder Structure

```text
TASKFLOW/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Taskboard.jsx
│   │   │   └── Taskcard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── model/
│   │   ├── user.js
│   │   └── task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

## 7. Backend API Endpoints

The backend exposes REST API endpoints under `/api`.

### Authentication APIs

| Method | Endpoint            | Description                     | Authentication |
| ------ | ------------------- | ------------------------------- | -------------- |
| POST   | `/api/auth/signup`  | Register a new user             | No             |
| POST   | `/api/auth/login`   | Log in an existing user         | No             |
| GET    | `/api/auth/profile` | Retrieve logged-in user profile | Yes            |

### Task APIs

| Method | Endpoint         | Description           | Authentication |
| ------ | ---------------- | --------------------- | -------------- |
| POST   | `/api/tasks`     | Create a task         | Yes            |
| GET    | `/api/tasks`     | Retrieve user's tasks | Yes            |
| PUT    | `/api/tasks/:id` | Update a task         | Yes            |
| DELETE | `/api/tasks/:id` | Delete a task         | Yes            |

### Health Check

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/api/health` | Check backend API status |

Protected endpoints require a valid JWT token in the Authorization header:

```text
Authorization: Bearer <JWT_TOKEN>
```

## 8. Database Design

TaskFlow uses MongoDB Atlas with two main collections.

### Users Collection

| Field       | Description                |
| ----------- | -------------------------- |
| `_id`       | Unique user identifier     |
| `name`      | User's full name           |
| `email`     | User's email address       |
| `password`  | Hashed password            |
| `createdAt` | Account creation timestamp |
| `updatedAt` | Last update timestamp      |

### Tasks Collection

| Field         | Description                 |
| ------------- | --------------------------- |
| `_id`         | Unique task identifier      |
| `title`       | Task title                  |
| `description` | Task description            |
| `status`      | Current task status         |
| `userId`      | Reference to the task owner |
| `createdAt`   | Task creation timestamp     |
| `updatedAt`   | Last update timestamp       |

The `userId` field establishes a relationship between tasks and users.

## 9. Running the Project Locally

### Prerequisites

Install the following:

* Node.js and npm
* Git
* MongoDB Atlas account
* Code editor such as Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```bash
cd TASKFLOW
```

### Step 2: Install Frontend Dependencies

```bash
cd client
npm install
```

### Step 3: Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the `server` folder.

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_private_jwt_secret
```

Replace the placeholders with your own configuration values.

**Important:** Never upload `.env` files or database credentials to GitHub.

### Step 5: Start the Backend

From the server directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Step 6: Start the Frontend

From the client directory:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend URL in your browser to use TaskFlow.

## 10. Docker Configuration

TaskFlow uses Docker to package the frontend and backend into a container.

The Dockerfile uses a multi-stage build:

1. The first stage installs frontend dependencies and builds the React application.
2. The second stage installs backend production dependencies.
3. The React production build is copied into the backend's `public` directory.
4. Express serves the frontend and API from the same container.

### Build Docker Image

Run from the project root:

```bash
docker build -t taskflow .
```

### Run Docker Container

```bash
docker run -d --name taskflow-container -p 5001:5000 --env-file server/.env taskflow:latest
```

### Check Running Containers

```bash
docker ps
```

### View Container Logs

```bash
docker logs taskflow-container
```

### Access the Dockerized Application

```text
http://localhost:5001
```

### Check API Health

```text
http://localhost:5001/api/health
```

## 11. CI Pipeline – GitHub Actions

TaskFlow uses GitHub Actions to automate build verification.

The workflow file is located at:

```text
.github/workflows/ci.yml
```

The pipeline runs when code is pushed to the `main` branch or when a pull request targets `main`.

### CI Pipeline Steps

1. Checkout the GitHub repository.
2. Set up Node.js.
3. Install frontend dependencies.
4. Build the React frontend.
5. Install backend dependencies.
6. Build the Docker image.

A successful workflow run indicates that the configured build steps completed successfully.

## 12. DevOps Workflow

The current development workflow is:

```text
Developer Writes Code
         |
         v
     Git Commit
         |
         v
    GitHub Push
         |
         v
  GitHub Actions CI
         |
         v
 Frontend Build Check
         |
         v
 Backend Dependency Check
         |
         v
    Docker Build
         |
         v
   Build Verification
```

AWS EC2 deployment is a planned next phase.

## 13. Team Responsibilities

The project is developed collaboratively by two team members.

The functional work is divided into two main modules:

### Member 1 – Authentication and User Profiles

Responsibilities:

* User registration.
* User login.
* Password hashing.
* JWT authentication.
* Protected routes.
* User profile management.
* Authentication-related frontend pages.

### Member 2 – Task Management

Responsibilities:

* Task creation.
* Task retrieval.
* Task updates.
* Task deletion.
* Kanban board implementation.
* Task status management.
* Dashboard task statistics.

### Shared DevOps Responsibilities

Both members can collaborate on:

* Git and GitHub.
* Docker configuration.
* GitHub Actions.
* Application testing.
* Technical documentation.
* Deployment preparation.

## 14. Future Enhancements

Potential improvements include:

* AWS EC2 deployment.
* Automated deployment through GitHub Actions.
* Task deadlines and priority levels.
* Drag-and-drop Kanban functionality.
* Task search and filtering.
* Team workspaces and collaboration.
* User profile editing.
* Improved error handling and automated tests.

## 15. Conclusion

TaskFlow demonstrates the development of a full-stack web application combined with practical DevOps tools and workflows.

It integrates frontend development, backend API development, database management, authentication, version control, containerization, and continuous integration into one project.

The project provides a foundation for understanding how a modern web application is developed, packaged, tested, and prepared for cloud deployment.
