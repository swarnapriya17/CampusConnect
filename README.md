# CampusConnect — College Student Management & Campus Portal

> **Tagline:** *"One Campus. One Connected Experience."*

CampusConnect is a comprehensive, full-stack web application designed for higher education institutions to manage students, faculty, subjects, attendance, assignments, submissions, college events, announcements, and student requests/complaints under a role-based access control (RBAC) architecture.

---

## 🏗️ Project Architecture

```
CampusConnect/
├── frontend/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── assets/              # Static assets & media
│   │   ├── components/          # Reusable UI components
│   │   ├── layouts/             # Dashboard & Auth layout wrappers
│   │   ├── pages/               # Application view components
│   │   ├── services/            # Axios REST API services (api.js)
│   │   ├── context/             # React Context providers (Auth, Theme)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Helper utilities & formatters
│   │   ├── App.jsx              # Routing & main application view
│   │   ├── main.jsx             # React DOM root entry
│   │   └── index.css            # CSS design tokens & foundation
│   ├── public/                  # Public web assets
│   ├── package.json             # Frontend dependencies
│   └── .env.example             # Frontend environment variables template
│
├── backend/                      # Node.js + Express REST API Backend
│   ├── config/                  # DB and server configuration (db.js)
│   ├── controllers/             # Request controllers (healthController.js)
│   ├── middleware/              # Auth & Error handling middleware
│   ├── models/                  # Mongoose data models
│   ├── routes/                  # Express route definitions (healthRoutes.js)
│   ├── services/                # Cloud storage & notification services
│   ├── utils/                   # Helper functions & JWT utilities
│   ├── server.js                # Express application entry point
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Backend environment variables template
│
├── README.md                    # Project documentation
└── .gitignore                   # Version control ignore configuration
```

---

## ⚙️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, JavaScript (ES6+), HTML5, CSS3 Tokens, React Router v6, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **File Storage** | Multer + Cloud Storage (Cloudinary/S3 Integration) |

---

## 👥 User Roles & Core Capabilities

### 1. Student
- Register & Login
- Student Dashboard & Profile Management
- View Enrolled Subjects & Attendance Records
- View & Upload Assignment Submissions (Cloud Storage)
- Track Submission Status & Feedback
- View College Announcements & Events
- Submit & Track Requests / Grievances

### 2. Faculty
- Login & Faculty Dashboard Access
- Manage Assigned Courses & Classes
- Record & Manage Attendance
- Create & Manage Assignments
- Review & Grade Student Assignment Submissions
- Broadcast Announcements & Manage Departmental Events
- Respond to & Manage Student Requests

### 3. Admin
- System Governance & User Management (Students, Faculty, Admin)
- Manage Academic Subjects, Schedules & Classes
- Manage Institution-wide Attendance & Grade Records
- Institutional Announcements & Event Publishing
- Process System-wide Complaints & Administrative Requests

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB Atlas cluster or local MongoDB instance

---

### Step 1: Backend Setup & Execution

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your MongoDB URI and JWT Secret:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/campusconnect
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```
4. Start backend server:
   ```bash
   npm run dev
   ```
5. Verify health endpoint:
   Open [http://localhost:5000/api/health](http://localhost:5000/api/health) in your browser or client.

---

### Step 2: Frontend Setup & Execution

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Ensure `.env` points to the backend API:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start Vite development server:
   ```bash
   npm run dev
   ```
5. Open browser at [http://localhost:5173](http://localhost:5173).

---

## 🔍 Quality Check & Health Verification

- Backend Health Check Endpoint: `GET /api/health`
- Expected Response:
  ```json
  {
    "status": "success",
    "message": "CampusConnect Backend API is running smoothly",
    "app": "CampusConnect",
    "tagline": "One Campus. One Connected Experience.",
    "environment": "development",
    "timestamp": "2026-10-03T19:00:00.000Z",
    "services": {
      "api": "operational",
      "database": "configured",
      "storage": "configured"
    }
  }
  ```

---

## 📌 Status
**Stage 1 Complete:** Project Architecture, Environment Setup, Design Tokens, Routing Foundation, and Health API Verified.
Ready for **Stage 2: Database Schemas, Authentication & Role Authorization**.
