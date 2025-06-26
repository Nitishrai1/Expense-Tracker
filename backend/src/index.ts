

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from "./routes/expenseRoute"
import  userRouter  from './routes/userRoute';
import authRouter from "./routes/authRoute";
import { authenticate } from './middleware/authRoute';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/expenses", expenseRoutes); 



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
