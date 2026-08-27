# Task App Frontend

A frontend web application for managing tasks, built with React and TypeScript.

## Getting Started

### 1. Clone the Repository

Clone the frontend repository from GitHub:

```bash
git clone https://github.com/N1sh97/task-app-frontend.git
```

Navigate into the project:

```bash
cd task-app-frontend
```

### 2. Install Dependencies

Install the required packages:

```bash
npm install
```

### 3. Run Locally

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

# Environment Variables

The frontend communicates with the FastAPI backend using an environment variable.

Create a `.env` file in the root of the project:

```text
REACT_APP_API_URL=http://localhost:8000
```

This points the frontend to the locally running FastAPI backend.

> **Note:** Do not commit your `.env` file if it contains sensitive information.

---

# Project Structure

```text
task-app-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── ...
├── public/
├── .gitignore
├── package.json
└── ...
```

## Technologies

* React
* TypeScript
* Axios
* CSS
* Netlify

## Backend

The frontend communicates with a separate FastAPI backend deployed on Render.Please refer to the backend readme document for more information. 

