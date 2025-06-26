# 💸 Expense Tracker App

A full-stack expense tracking application that helps users manage their finances by tracking income and expenses. Built with **Node.js, Express, Prisma, PostgreSQL, and JWT** on the backend, and **Next.js, Tailwind CSS** on the frontend.

---

## 🔧 Tech Stack

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Axios

---

## 📁 Project Structure

```bash
├── backend
│ ├── src
│ │ ├── controllers # Handles business logic
│ │ ├── db
│ │ │ └── prisma # Prisma setup and schema
│ │ ├── middleware # Auth middleware (JWT)
│ │ ├── routes # API routes
│ │ └── index.ts # Server entry point
│ └── .env # Backend environment variables
│
├── frontend
│ ├── app # Next.js pages and routing
│ ├── components # Reusable UI components
│ ├── contexts / hooks # Global state & custom hooks
│ ├── public / styles # Static files & styling
│ └── .env # Frontend environment variables

```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nitishrai1/Expense-Tracker.git
cd expense-tracker
```

## Setup Backend

```bash
cd backend
npm install

```
---

➕ Configure .env in /backend

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret
```

---

➕ Run Prisma Migrations

```bash
npx prisma generate
npx prisma migrate dev --name init

```

---
▶ Start Backend

```bash
npm run dev
```


## Setup Frontend

```bash
cd ../frontend
npm install
```
---
▶ Start Frontend
```bash
npm run dev
```
