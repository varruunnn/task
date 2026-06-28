# Task Tracker

A full-stack task management app built with the MERN stack.

## Stack

- **Frontend** — React.js (Create React App)
- **Backend** — Node.js + Express.js
- **Database** — MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account and cluster

### Setup

**1. Clone and install**

```bash
git clone <your-repo-url>
cd task-tracker
```

**2. Configure the backend**

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas connection URI:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
NODE_ENV=development
```

Install dependencies and start:

```bash
npm install
npm run dev
```

**3. Configure the frontend**

```bash
cd ../frontend
cp .env.example .env
```

Edit `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Install and start:

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?sort=`, `?search=`) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/health` | Health check |

## Task Fields

| Field | Type | Values |
|-------|------|--------|
| title | String | 3–100 chars, required |
| description | String | up to 500 chars |
| status | String | `todo`, `in-progress`, `completed` |
| priority | String | `low`, `medium`, `high` |
| dueDate | Date | ISO date |


## Features

- Create, view, edit, delete tasks
- Filter by status and priority
- Sort by date, due date, priority, or title
- Search by title
- Completion progress indicator
- Overdue date highlighting
- Responsive design
- Toast notifications for all actions
- Form validation (client + server)
