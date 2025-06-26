
```markdown
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
│   ├── src
│   │   ├── controllers     # Handles business logic
│   │   ├── db
│   │   │   └── prisma      # Prisma setup and schema
│   │   ├── middleware      # Auth middleware (JWT)
│   │   ├── routes          # API routes
│   │   └── index.ts        # Server entry point
│   └── .env                # Backend environment variables
│
├── frontend
│   ├── app                 # Next.js pages and routing
│   ├── components          # Reusable UI components
│   ├── contexts            # Global state & custom hooks
│   ├── public              # Static files & styling
│   └── .env                # Frontend environment variables
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```shellscript
git clone https://github.com/Nitishrai1/Expense-Tracker.git
cd expense-tracker
```

### 2. Setup Backend

```shellscript
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `/backend` directory:

```shellscript
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret
```

#### Run Prisma Migrations

```shellscript
npx prisma generate
npx prisma migrate dev --name init
```

#### Configure Database Seeding

```shellscript
npx ts-node src/db/prisma/seed.ts
```

#### Start Backend Server

```shellscript
npm run dev
```

### 3. Setup Frontend

```shellscript
cd ../frontend
npm install
```

#### Start Frontend Development Server

```shellscript
npm run dev
```

---

## 📱 Features

- **User Authentication**: Secure login/signup with JWT
- **Expense Tracking**: Add, edit, and delete expenses
- **Income Management**: Track multiple income sources
- **Dashboard**: Visual overview of financial data
- **Categories**: Organize expenses by categories
- **Responsive Design**: Works on desktop and mobile devices


---

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login


### Expenses

- `GET /api/expenses` - Get user expenses
- `POST /api/expenses/create/:userId` - Create new expense
- `PUT /api/expenses/update/:id` - Update expense
- `DELETE /api/expenses/delete/:id` - Delete expense


### User Data

- `GET /api/user/totalbalance` - Get total balance
- `GET /api/user/availablebalance` - Get available balance


Project Link: [https://github.com/Nitishrai1/Expense-Tracker](https://github.com/Nitishrai1/Expense-Tracker)

### ScreenShorts

![image](https://github.com/user-attachments/assets/452fb253-f61e-4464-8ac3-4b36b43d0346)
![image](https://github.com/user-attachments/assets/b69c98a3-0aaa-4176-8045-d6385201ba62)

![image](https://github.com/user-attachments/assets/0b4fac0b-9b25-4313-bb6c-f9fadb5e895c)
![image](https://github.com/user-attachments/assets/2fae2664-1df9-47d1-8ede-a625d5b34d2a)

![image](https://github.com/user-attachments/assets/7f35f979-86a3-448a-96ed-e5dee7800cad)






